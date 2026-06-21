"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

/**
 * Loading screen: balls drop from the top and pile up under gravity until
 * the screen is full (100%). Every ball is recolored by its position — balls
 * that come to rest inside the "CESUR" region turn black, the rest stay white.
 * So the surname is literally formed by the piled balls, then it fades out.
 */
export default function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;

    const { Engine, Render, Runner, World, Bodies, Composite, Events } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 1;
    // Let settled piles go to sleep so they stop jittering (stable letters).
    engine.enableSleeping = true;

    const render = Render.create({
      element: sceneRef.current!,
      engine,
      options: {
        width: W,
        height: H,
        wireframes: false,
        background: "#000000",
        // Don't dim sleeping balls (otherwise they render gray).
        showSleeping: false,
      },
    });

    // Static walls keep the balls inside the viewport.
    const wallOpts = { isStatic: true, render: { visible: false } };
    const t = 200;
    World.add(engine.world, [
      Bodies.rectangle(W / 2, H + t / 2, W + t * 4, t, wallOpts), // floor
      Bodies.rectangle(-t / 2, H / 2, t, H * 4, wallOpts), // left
      Bodies.rectangle(W + t / 2, H / 2, t, H * 4, wallOpts), // right
    ]);

    // --- "CESUR" mask: alpha bitmap used to recolor balls by position -----
    let mask: Uint8ClampedArray | null = null;
    function buildMask() {
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      // Fit "CESUR" to ~82% of the width, sitting in the lower-middle so the
      // word emerges as the pile rises through it.
      let fontSize = Math.min(H * 0.36, W * 0.26);
      ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
      const measured = ctx.measureText("CESUR").width;
      fontSize *= (W * 0.82) / measured;
      ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
      ctx.fillText("CESUR", W / 2, H * 0.74);

      mask = ctx.getImageData(0, 0, W, H).data;
    }

    function inText(x: number, y: number) {
      if (!mask) return false;
      const xi = x | 0;
      const yi = y | 0;
      if (xi < 0 || yi < 0 || xi >= W || yi >= H) return false;
      return mask[(yi * W + xi) * 4 + 3] > 128;
    }

    // --- Falling balls (small, so the letters read crisply) ---------------
    const fillR = Math.max(8, Math.round(Math.min(W, H) * 0.017));

    function dropBalls(n: number) {
      const batch: Matter.Body[] = [];
      for (let i = 0; i < n; i++) {
        const r = fillR * (0.9 + Math.random() * 0.3);
        const x = r + Math.random() * (W - r * 2);
        const y = -r - Math.random() * H * 0.6;
        batch.push(
          Bodies.circle(x, y, r, {
            restitution: 0.15,
            friction: 0.6,
            label: "fill",
            render: { fillStyle: "#ffffff" },
          })
        );
      }
      Composite.add(engine.world, batch);
    }

    // Recolor settled balls: black inside the CESUR shape, white elsewhere.
    // The speed guard avoids fast falling balls flickering black mid-air.
    Events.on(engine, "afterUpdate", () => {
      const bodies = Composite.allBodies(engine.world);
      for (const b of bodies) {
        if (b.label !== "fill") continue;
        // Only recolor settled balls; keep a fast (falling/jittering) ball's
        // current color so the letters don't flicker on/off.
        if (b.speed > 1.4) continue;
        b.render.fillStyle = inText(b.position.x, b.position.y)
          ? "#000000"
          : "#ffffff";
      }
    });

    // Enough balls to actually fill the whole screen (they overflow slightly
    // and pack down, so the viewport is full at 100%).
    const target = Math.min(
      2000,
      Math.round((W * H) / (Math.PI * fillR * fillR))
    );

    Runner.run(Runner.create(), engine);
    Render.run(render);

    let dropped = 0;
    let spawnTimer: ReturnType<typeof setInterval>;
    let settleTimer: ReturnType<typeof setInterval>;
    let finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      // Hold a beat so the full screen + CESUR reads clearly, then fade out.
      setTimeout(() => setFading(true), 700);
      setTimeout(() => {
        setHidden(true);
        onFinish?.();
      }, 1700);
    }

    // Once every ball is dropped, wait until the pile has actually settled
    // (most balls asleep) so the screen is full and CESUR is stable, then go.
    function watchSettle() {
      const spawnedAt = Date.now();
      settleTimer = setInterval(() => {
        const bodies = Composite.allBodies(engine.world);
        let fill = 0;
        let asleep = 0;
        for (const b of bodies) {
          if (b.label !== "fill") continue;
          fill++;
          if (b.isSleeping) asleep++;
        }
        const settled = fill > 0 && asleep / fill > 0.9;
        const timedOut = Date.now() - spawnedAt > 7000; // safety fallback
        if (settled || timedOut) {
          clearInterval(settleTimer);
          finish();
        }
      }, 200);
    }

    function start() {
      buildMask();
      spawnTimer = setInterval(() => {
        if (dropped >= target) {
          clearInterval(spawnTimer);
          watchSettle();
          return;
        }
        const n = Math.min(18, target - dropped);
        dropBalls(n);
        dropped += n;
        setPercent(Math.min(100, Math.round((dropped / target) * 100)));
      }, 55);
    }

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) {
      fonts.ready.then(start);
    } else {
      start();
    }

    return () => {
      clearInterval(spawnTimer);
      clearInterval(settleTimer);
      Events.off(engine, "afterUpdate", () => {});
      Render.stop(render);
      render.canvas.remove();
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black transition-opacity duration-1000"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div ref={sceneRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 mix-blend-difference">
        <span className="text-5xl font-light tabular-nums tracking-tight text-white md:text-6xl">
          {percent}%
        </span>
      </div>
    </div>
  );
}

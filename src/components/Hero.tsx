"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const lineAnim = (delay: number) => ({
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const BASE_SIZE = "clamp(4.5rem, 17vw, 15rem)";
const LARGE_SIZE = "clamp(5rem, 19vw, 17rem)";

const OUTLINE = {
  color: "transparent",
  WebkitTextStroke: "1.5px rgba(255,255,255,0.8)",
} as const;

const FONT_BASE = {
  fontSize: BASE_SIZE,
  fontWeight: 700,
  fontStyle: "italic",
  letterSpacing: "-0.04em",
  lineHeight: 0.9,
  margin: 0,
  flexShrink: 0,
  ...OUTLINE,
} as const;

const SIAR_STYLE = {
  ...FONT_BASE,
  display: "flex",
  alignItems: "flex-end",
} as const;

const ESAT_STYLE = {
  ...FONT_BASE,
} as const;

const CESUR_STYLE = {
  ...FONT_BASE,
  fontFamily: "var(--font-script), cursive",
  fontSize: "clamp(3.5rem, 13vw, 12rem)",
  fontWeight: 400,
  fontStyle: "normal",
  letterSpacing: "-0.01em",
  color: "#ffffff",
  WebkitTextStroke: "0px transparent",
} as const;

function Line({ flex, delay, origin }: { flex: number; delay: number; origin: "left" | "right" }) {
  return (
    <motion.div
      {...lineAnim(delay)}
      style={{ flex, height: 1, backgroundColor: "#ffffff", opacity: 0.3, transformOrigin: origin }}
    />
  );
}

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);
  const [aPos, setAPos] = useState<{ top: number; left: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const measure = () => {
      if (!aRef.current) return;
      const rect = aRef.current.getBoundingClientRect();
      setAPos({ top: rect.top, left: rect.left });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const esatX        = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "-70%"]);
  const esatOpacity  = useTransform(scrollYProgress, [0.1, 0.6], [1, 0]);
  const cesurX       = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "70%"]);
  const cesurOpacity = useTransform(scrollYProgress, [0.1, 0.6], [1, 0]);

  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.38]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  const aOpacity     = useTransform(scrollYProgress, [0.12, 0.2], [1, 0]);
  const cloneY       = useTransform(scrollYProgress, [0.15, 0.85], [0, 1000]);
  const cloneRotate  = useTransform(scrollYProgress, [0.15, 0.85], [0, 360]);
  const cloneOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.7, 0.85], [0, 1, 1, 0]);
  const letterAOp    = useTransform(scrollYProgress, [0.15, 0.45], [1, 0]);
  const letterAtOp   = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);

  return (
    <div ref={wrapperRef} style={{ height: "200vh" }}>
      <section
        id="hero"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          backgroundColor: "#0d0d0d",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(6rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vh, 3rem)",
          overflow: "visible",
        }}
      >
        <motion.div
          style={{
            scale,
            opacity,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.05em",
            transformOrigin: "center center",
          }}
        >
          {/* SIAR — outline */}
          <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "clamp(0.8rem, 2.5vw, 2.5rem)" }}>
            <Line flex={1} delay={0.2} origin="right" />
            <motion.p {...fade(0.1)} style={SIAR_STYLE}>
              <span>SI</span>
              <motion.span ref={aRef} style={{ opacity: aOpacity, display: "inline-block", WebkitTextStroke: "1.5px #ffed29" }}>A</motion.span>
              <span>R</span>
            </motion.p>
            <Line flex={1} delay={0.2} origin="left" />
          </div>

          {/* ESAT — bold fill, "E" sarı */}
          <motion.div style={{ x: esatX, opacity: esatOpacity, position: "relative", display: "flex", alignItems: "center", width: "100%", gap: "clamp(0.8rem, 2.5vw, 2.5rem)" }}>
            <Line flex={0.3} delay={0.32} origin="right" />
            <motion.p {...fade(0.22)} style={ESAT_STYLE}>ESAT</motion.p>
            <Line flex={2} delay={0.32} origin="left" />
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.55 }}
              style={{ position: "absolute", right: 0, bottom: "clamp(0.4rem, 1.2vw, 1rem)", pointerEvents: "none" }}
            >
              <span style={{ fontSize: "clamp(0.55rem, 0.9vw, 0.78rem)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#ffffff", opacity: 0.3, whiteSpace: "nowrap" }}>
                Oslo, Norway
              </span>
            </motion.div>
          </motion.div>

          {/* CESUR — italic thin */}
          <motion.div style={{ x: cesurX, opacity: cesurOpacity, display: "flex", alignItems: "center", width: "100%", gap: "clamp(0.8rem, 2.5vw, 2.5rem)" }}>
            <Line flex={2} delay={0.44} origin="right" />
            <motion.p {...fade(0.34)} style={CESUR_STYLE}>CESUR</motion.p>
            <Line flex={0.6} delay={0.44} origin="left" />
          </motion.div>
        </motion.div>

        {/* Düşen A klon — outline style ile */}
        {aPos && (
          <motion.span
            aria-hidden
            style={{
              position: "fixed",
              top: aPos.top,
              left: aPos.left,
              y: cloneY,
              rotate: cloneRotate,
              opacity: cloneOpacity,
              fontSize: BASE_SIZE,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.8)",
              pointerEvents: "none",
              zIndex: 9999,
              display: "inline-block",
            }}
          >
            <motion.span style={{ position: "absolute", top: 0, left: 0, opacity: letterAOp, WebkitTextStroke: "1.5px #ffed29" }}>A</motion.span>
            <motion.span style={{ opacity: letterAtOp }}>@</motion.span>
          </motion.span>
        )}

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "1.2rem", display: "flex", justifyContent: "flex-end" }}
        >
          <a
            href="#about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,0.5)",
              overflow: "hidden",
            }}
          >
            <span style={{ padding: "0.55rem 1.1rem", fontSize: "clamp(0.6rem, 0.8vw, 0.72rem)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ffffff" }}>
              Scroll
            </span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.55rem 0.7rem", borderLeft: "1.5px solid rgba(255,255,255,0.5)", color: "#ffffff", fontSize: "0.85rem" }}>
              ↓
            </span>
          </a>
        </motion.div>
      </section>
    </div>
  );
}

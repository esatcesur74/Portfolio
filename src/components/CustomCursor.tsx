"use client";

import { useEffect, useRef } from "react";

/** A white circular cursor that smoothly follows the mouse. */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] h-4 w-4 rounded-full bg-white mix-blend-difference"
      style={{ willChange: "transform" }}
    />
  );
}

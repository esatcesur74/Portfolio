"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

type Variant = "default" | "view";

export default function CustomCursor() {
  const [variant, setVariant] = useState<Variant>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement;
      setVariant(target.closest("[data-cursor='view']") ? "view" : "default");
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [x, y]);

  return (
    <>
      <style>{`@media (pointer: fine) { *, *::before, *::after { cursor: none !important; } }`}</style>

      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x,
          y,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
        }}
      >
        <svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L1 18L5.5 13.5L8.5 21L11.5 19.8L8.5 12L16 12L1 1Z"
            fill="#111111"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        <AnimatePresence>
          {variant === "view" && (
            <motion.div
              key="view-label"
              initial={{ opacity: 0, scale: 0.85, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: 16,
                left: 14,
                backgroundColor: "#111111",
                color: "#ffffff",
                padding: "5px 13px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              View
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

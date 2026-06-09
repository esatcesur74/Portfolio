"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
const TEXT = "@who.am.i. i'm an IT graduate and entrepreneur, i'm a creative developer. on the side i do photography, marketing campaigns and other projects.";

const YELLOW = "#ffed29";
const GRAY   = "rgba(255,255,255,0.18)";

function Word({ word, progress, start, end }: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const color = useTransform(progress, [start, end], [GRAY, YELLOW]);

  return (
    <motion.span style={{ color, display: "inline-block", marginRight: "0.25em" }}>
      {word}
    </motion.span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = TEXT.split(" ");

  return (
    <section
      id="about"
      ref={containerRef}
      style={{
        backgroundColor: "#0d0d0d",
        padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 6vw, 5rem)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Scroll-reveal text */}
      <p
        style={{
          fontSize: "clamp(1.8rem, 4.5vw, 5rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          margin: 0,
          textAlign: "center",
        }}
      >
        {words.map((word, i) => (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            start={i / words.length * 0.6}
            end={(i + 1) / words.length * 0.6}
          />
        ))}
      </p>

      {/* Bottom — resim sol altta, etiketler yanında */}
      <div style={{ marginTop: "4rem", display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "flex-end" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "clamp(160px, 20vw, 280px)", aspectRatio: "3/4", overflow: "hidden", flexShrink: 0 }}
        >
          <img src="/images/whoami.jpeg" alt="Siar Esat Cesur" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </motion.div>
        {["Oslo, Norway", "Open to work"].map((tag) => (
          <span key={tag} style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

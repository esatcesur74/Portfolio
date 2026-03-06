"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface CardData {
  index: string;
  title: string;
  body: string;
  highlight: string;
  bg: string;
  textColor: string;
  highlightColor: string;
}

interface Props extends CardData {
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export default function ParallaxCard({
  i,
  index,
  title,
  body,
  highlight,
  bg,
  textColor,
  highlightColor,
  progress,
  range,
  targetScale,
}: Props) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const highlightY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const highlightOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center px-6"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          backgroundColor: bg,
          transformOrigin: "top",
        }}
        className="relative sticky w-full max-w-5xl rounded-3xl p-10 md:p-16 overflow-hidden"
      >
        <p
          className="text-xs font-bold tracking-widest uppercase mb-8 opacity-40"
          style={{ color: textColor }}
        >
          {index}
        </p>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          <div className="flex-1">
            <h3
              className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-6"
              style={{ color: textColor }}
            >
              {title}
            </h3>
            <p
              className="text-base leading-relaxed opacity-70 max-w-sm"
              style={{ color: textColor }}
            >
              {body}
            </p>
          </div>

          <div className="flex-1 flex items-end justify-end overflow-hidden">
            <motion.p
              style={{
                y: highlightY,
                opacity: highlightOpacity,
                color: highlightColor,
              }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none select-none text-right"
            >
              {highlight}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface CardData {
  index: string;
  title: string;
  body: string;
  bg: string;
  textColor: string;
  image?: string;
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
  bg,
  textColor,
  image,
  progress,
  range,
  targetScale,
}: Props) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const titleY    = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const imgOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const scale     = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20}px)`,
          backgroundColor: bg,
          transformOrigin: "top",
        }}
        className="sticky w-full h-screen overflow-hidden"
      >
        {image ? (
          <div className="flex flex-col h-full px-8 md:px-16 lg:px-24 pt-24 pb-12">

            <div className="flex flex-col gap-5 shrink-0">
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase opacity-30"
                style={{ color: textColor }}
              >
                {index}
              </span>
              <motion.h3
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 6.5rem)",
                  color: textColor,
                  letterSpacing: "-0.11em",
                  fontWeight: 600,
                  y: titleY,
                } as React.CSSProperties & { y: MotionValue<number> }}
              >
                {title}
              </motion.h3>
            </div>

            <div className="relative flex-1 my-6">
              <motion.div
                style={{ opacity: imgOpacity } as React.CSSProperties & { opacity: MotionValue<number> }}
                className="absolute top-0 right-0 h-full overflow-hidden"
                style={{ width: "28%" }}
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="shrink-0">
              <div
                className="w-full mb-6"
                style={{ height: "1px", backgroundColor: textColor, opacity: 0.12 }}
              />
              <motion.p
                style={{ color: textColor, opacity: 0.65 }}
                className="text-base md:text-lg leading-relaxed max-w-3xl"
              >
                {body}
              </motion.p>
            </div>
          </div>

        ) : (
          <div className="flex flex-col justify-between h-full px-8 md:px-16 lg:px-24 pt-24 pb-12">
            <div className="flex flex-col gap-5">
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase opacity-30"
                style={{ color: textColor }}
              >
                {index}
              </span>

              <motion.h3
                style={{
                  fontSize: "clamp(2.8rem, 6.5vw, 7.5rem)",
                  color: textColor,
                  letterSpacing: "-0.11em",
                  fontWeight: 600,
                  y: titleY,
                } as React.CSSProperties & { y: MotionValue<number> }}
              >
                {title}
              </motion.h3>
            </div>

            <div>
              <div
                className="w-full mb-6"
                style={{ height: "1px", backgroundColor: textColor, opacity: 0.12 }}
              />
              <div className="flex items-end justify-between gap-8">
                <motion.p
                  style={{ color: textColor, opacity: 0.65 }}
                  className="text-base md:text-lg leading-relaxed max-w-2xl"
                >
                  {body}
                </motion.p>
                <span
                  className="text-[10px] font-semibold tracking-[0.3em] uppercase opacity-20 shrink-0"
                  style={{ color: textColor }}
                >
                  About
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

const GREETINGS = [
  "hi, i'm",
  "merhaba, ben",
  "bonjour, je suis",
  "hola, soy",
  "hallo, ich bin",
];

const chapters = [
  { label: "About Me",   href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Tech Stack", href: "#skills" },
  { label: "Contact Me", href: "#contact" },
];

export default function Hero() {
  const { text } = useTypewriter({
    words: GREETINGS,
    typingSpeed: 60,
    deletingSpeed: 35,
    pauseMs: 1800,
  });

  return (
    <section className="relative min-h-screen flex flex-col bg-white overflow-hidden">

      <div className="flex flex-1 items-start justify-between px-8 md:px-16 lg:px-24 pt-28 md:pt-32">

        <div className="flex flex-col gap-2">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm md:text-base font-medium text-gray-500 tracking-wide min-h-[1.5em]"
          >
            {text}
            <span className="animate-pulse font-black text-gray-400">|</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="font-black tracking-tight leading-none text-gray-900"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 6rem)" }}
          >
            Siar Esat<br />Cesur
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:flex flex-col items-end gap-1 pt-2"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
            Norway Oslo
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="px-8 md:px-16 lg:px-24 pb-12"
      >
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-4">
          Chapters
        </p>

        <div className="border-t border-gray-200">
          {chapters.map((ch, i) => (
            <motion.a
              key={ch.href}
              href={ch.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
              className="flex items-center justify-between py-3 border-b border-gray-200"
            >
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-semibold tracking-widest text-gray-300 w-6">
                  0{i + 1}
                </span>
                <span className="text-sm md:text-base font-medium text-gray-700">
                  {ch.label}
                </span>
              </div>
              <span className="text-gray-300 text-lg">→</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

    </section>
  );
}

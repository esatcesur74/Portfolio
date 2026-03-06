"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import PixelGrid from "./PixelGrid";
import { useTypewriter } from "@/hooks/useTypewriter";

const GREETINGS = [
  "Hi, I'm",
  "Merhaba, ben",
  "Bonjour, je suis",
  "Hola, soy",
  "Ciao, sono",
  "Hallo, ich bin",
];

export default function Hero() {
  const { text } = useTypewriter({
    words: GREETINGS,
    typingSpeed: 70,
    deletingSpeed: 40,
    pauseMs: 1600,
  });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <PixelGrid />

      <div className="relative w-full px-8 md:px-16 lg:px-24 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-medium mb-3 text-gray-500"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
        >
          {text}
          <span style={{ color: "#ffed29" }} className="animate-pulse font-black">|</span>
        </motion.p>

        <div style={{ mixBlendMode: "difference" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h1
              className="font-black uppercase leading-none tracking-tighter select-none"
              style={{ fontSize: "clamp(3.5rem, 10vw, 11rem)", color: "#ffffff" }}
            >
              Siar Esat
            </h1>
            <h1
              className="font-black uppercase leading-none tracking-tighter select-none"
              style={{ fontSize: "clamp(3.5rem, 10vw, 11rem)", color: "#ffffff" }}
            >
              Cesur
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="h-1 my-5 origin-left"
          style={{
            width: "clamp(200px, 40vw, 600px)",
            backgroundColor: "#ffed29",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="font-medium tracking-wide text-gray-700"
          style={{ fontSize: "clamp(1rem, 2vw, 1.75rem)" }}
        >
          Developer · Student
        </motion.p>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-black transition-colors z-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} />
      </motion.a>
    </section>
  );
}

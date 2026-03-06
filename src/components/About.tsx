"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ParallaxCard from "./ParallaxCard";

const cards = [
  {
    index: "01",
    title: "Who I Am",
    body: "I'm Siar — a student and entrepreneur with a passion for building products from scratch. I love turning ideas into real, working things.",
    highlight: "BUILD",
    bg: "#fffde7",
    textColor: "#111111",
    highlightColor: "#ffed29",
  },
  {
    index: "02",
    title: "What I Do",
    body: "Whether it's a web app, a business idea, or a side project, I'm always working on something. Development is how I bring ideas to life.",
    highlight: "CREATE",
    bg: "#6767FF",
    textColor: "#ffffff",
    highlightColor: "#ffed29",
  },
  {
    index: "03",
    title: "Right Now",
    body: "Sharpening my development skills, launching projects that solve real problems, and looking for opportunities to grow and collaborate.",
    highlight: "GROW",
    bg: "#FF6767",
    textColor: "#ffffff",
    highlightColor: "#ffed29",
  },
];

export default function About() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="about" ref={container} style={{ height: `${cards.length * 100}vh` }}>
      <div className="sticky top-0 z-0 pt-24 pb-4 px-8 md:px-16 lg:px-24 pointer-events-none">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-300">
          About
        </p>
      </div>

      <div className="-mt-24">
        {cards.map((card, i) => {
          const targetScale = 1 - (cards.length - i) * 0.05;
          return (
            <ParallaxCard
              key={card.index}
              i={i}
              {...card}
              progress={scrollYProgress}
              range={[i * (1 / cards.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

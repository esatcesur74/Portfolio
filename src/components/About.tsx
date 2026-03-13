"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ParallaxCard from "./ParallaxCard";

const cards = [
  {
    index: "01",
    title: "@who.am.i",
    body: "Turkish-Norwegian IT student, graduating this semester. I work across multiple projects as a freelancer, within my bachelor, and through my own company which I've been running for two years.",
    bg: "#fffde7",
    textColor: "#111111",
    image: "/images/whoami.jpeg",
  },
  {
    index: "02",
    title: "@what.i.do",
    body: "I'm creative, focusing mostly on UI/UX. Running my own company gave me real experience in product marketing and user experience.",
    bg: "#6767FF",
    textColor: "#ffffff",
  },
  {
    index: "03",
    title: "@right.now",
    body: "I'm constantly learning new techniques in UI and web design. Currently focused on React, Next.js, Three.js and Blender.",
    bg: "#FF6767",
    textColor: "#ffffff",
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
    </section>
  );
}

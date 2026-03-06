"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import portfolio from "@/data/portfolio";
import {
  fadeUpVariants,
  staggerContainerVariants,
  viewportOptions,
} from "@/hooks/useScrollAnimation";

const disperseTransforms = [
  { x: -0.8, y: -0.6, r: -29 }, { x: -0.2, y: -0.4, r: -6 },
  { x: 0.3,  y: -0.7, r: 15  }, { x: 0.7,  y: -0.3, r: 22  },
  { x: 0.5,  y: 0.5,  r: -18 }, { x: -0.5, y: 0.4,  r: 8   },
  { x: -0.6, y: -0.8, r: -35 }, { x: 0.2,  y: 0.6,  r: 12  },
  { x: 0.9,  y: -0.5, r: -20 }, { x: -0.3, y: 0.8,  r: 30  },
  { x: 0.6,  y: 0.3,  r: -10 }, { x: -0.7, y: -0.2, r: 18  },
  { x: 0.4,  y: -0.9, r: -25 }, { x: -0.9, y: 0.6,  r: 5   },
  { x: 0.1,  y: 0.9,  r: -40 }, { x: -0.4, y: -0.5, r: 28  },
  { x: 0.8,  y: 0.2,  r: -15 }, { x: -0.1, y: 0.7,  r: 35  },
  { x: 0.3,  y: -0.3, r: -8  }, { x: -0.8, y: 0.1,  r: 20  },
  { x: 0.5,  y: -0.8, r: -32 }, { x: -0.2, y: 0.3,  r: 10  },
];

function DisperseChars({ text, isHovered, offset = 0 }: { text: string; isHovered: boolean; offset?: number }) {
  return (
    <>
      {text.split("").map((char, i) => {
        const t = disperseTransforms[(i + offset) % disperseTransforms.length];
        return (
          <motion.span
            key={i}
            animate={
              isHovered
                ? { x: t.x * 200, y: t.y * 100, rotateZ: t.r, opacity: 0 }
                : { x: 0, y: 0, rotateZ: 0, opacity: 1 }
            }
            transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </>
  );
}

function DisperseHeading() {
  const [isHovered, setIsHovered] = useState(false);
  const line1 = "Let's build";
  const line2 = "something.";
  return (
    <h2
      className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight cursor-default select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DisperseChars text={line1} isHovered={isHovered} offset={0} />
      <br />
      <DisperseChars text={line2} isHovered={isHovered} offset={line1.length} />
    </h2>
  );
}

const links = [
  { label: "Email",    href: `mailto:${portfolio.email}`, value: portfolio.email,    external: false },
  { label: "GitHub",   href: portfolio.github,            value: "@esatcesur74",     external: true  },
  { label: "LinkedIn", href: portfolio.linkedin,          value: "Siar Esat Cesur",  external: true  },
];

function ContactLink({ label, href, value, external, index }: {
  label: string; href: string; value: string; external: boolean; index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center justify-between py-8 border-b border-gray-200 group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-baseline gap-6">
        <span className="text-xs font-mono text-gray-400 tabular-nums">
          0{index + 1}
        </span>
        <span className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-gray-900 select-none">
          <DisperseChars text={label} isHovered={isHovered} />
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm font-mono text-gray-400 group-hover:text-gray-700 transition-colors duration-300">
          {value}
        </span>
        <motion.div
          animate={isHovered ? { x: 4, y: -4 } : { x: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        >
          <ArrowUpRight size={22} className="text-gray-300 group-hover:text-gray-900 transition-colors duration-300" />
        </motion.div>
      </div>
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-8 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainerVariants}
          className="mb-16"
        >
          <motion.p
            variants={fadeUpVariants}
            className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4"
          >
            Contact
          </motion.p>
          <motion.div variants={fadeUpVariants}>
            <DisperseHeading />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainerVariants}
          className="border-t border-gray-200"
        >
          {links.map(({ label, href, value, external }, i) => (
            <motion.div key={label} variants={fadeUpVariants}>
              <ContactLink
                label={label}
                href={href}
                value={value}
                external={external}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

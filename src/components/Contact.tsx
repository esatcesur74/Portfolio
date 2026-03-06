"use client";

import { useRef, useEffect, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import portfolio from "@/data/portfolio";
import {
  fadeUpVariants,
  staggerContainerVariants,
  viewportOptions,
} from "@/hooks/useScrollAnimation";

const links = [
  {
    label: "Email",
    href: `mailto:${portfolio.email}`,
    icon: <Mail size={18} />,
    value: portfolio.email,
    revealColor: "#ffed29",
  },
  {
    label: "GitHub",
    href: portfolio.github,
    icon: <Github size={18} />,
    value: "@esatcesur74",
    revealColor: "#fff176",
  },
  {
    label: "LinkedIn",
    href: portfolio.linkedin,
    icon: <Linkedin size={18} />,
    value: "Siar Esat Cesur",
    revealColor: "#fffde7",
  },
];

interface PaintLinkProps {
  href: string;
  external?: boolean;
  revealColor: string;
  children: ReactNode;
}

function PaintLink({ href, external, revealColor, children }: PaintLinkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPos = useRef<{ x: number; y: number } | null>(null);
  const ready = useRef(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ready.current = true;
  }, []);

  useEffect(() => {
    initCanvas();
    const observer = new ResizeObserver(initCanvas);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [initCanvas]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ready.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";

    const prev = prevPos.current;
    if (prev) {
      const dist = Math.sqrt((x - prev.x) ** 2 + (y - prev.y) ** 2);
      const steps = Math.max(1, Math.floor(dist / 3));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const cx = prev.x + (x - prev.x) * t;
        const cy = prev.y + (y - prev.y) * t;
        ctx.beginPath();
        ctx.arc(cx, cy, 38, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 38, 0, Math.PI * 2);
      ctx.fill();
    }

    prevPos.current = { x, y };
  }, []);

  const handleMouseLeave = useCallback(() => {
    prevPos.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden border-b border-gray-200"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: revealColor }}
      />

      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="relative z-10 flex items-center justify-between py-6 group"
      >
        {children}
      </a>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-5"
        style={{ pointerEvents: "none" }}
      />
    </div>
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
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight"
          >
            Let&apos;s build
            <br />
            something.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainerVariants}
          className="border-t border-gray-200"
        >
          {links.map(({ label, href, icon, value, revealColor }) => (
            <motion.div key={label} variants={fadeUpVariants}>
              <PaintLink
                href={href}
                external={label !== "Email"}
                revealColor={revealColor}
              >
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 group-hover:text-gray-900 transition-colors">
                    {icon}
                  </span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
                      {label}
                    </p>
                    <p className="font-semibold text-gray-900">{value}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-gray-300 group-hover:text-gray-900 transition-colors"
                />
              </PaintLink>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

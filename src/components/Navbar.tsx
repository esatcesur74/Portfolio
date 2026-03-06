"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolio from "@/data/portfolio";
import PixelTransition from "./PixelTransition";

const navLinks = [
  { label: "About",    href: "#about",    color: "#93c5fd" },
  { label: "Projects", href: "#projects", color: "#86efac" },
  { label: "Skills",   href: "#skills",   color: "#f5f5f5" },
  { label: "Contact",  href: "#contact",  color: "#c4b5fd" },
];

const YELLOW = "#ffed29";
const EASE   = "cubic-bezier(0.33, 1, 0.68, 1)";

const linkVariants = {
  initial: { opacity: 0, y: 50 },
  open: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.2 + i * 0.07, ease: [0.33, 1, 0.68, 1] },
  }),
  closed: (i: number) => ({
    opacity: 0, y: 20,
    transition: { duration: 0.2, delay: i * 0.03 },
  }),
};

function SlideLink({
  index,
  label,
  href,
  color,
  onClick,
}: {
  index: number;
  label: string;
  href: string;
  color: string;
  onClick: () => void;
}) {
  const bgRef = useRef<HTMLDivElement>(null);

  const getDir = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return e.clientY < rect.top + rect.height / 2 ? "-101%" : "101%";
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const from = getDir(e);
    if (!bgRef.current) return;
    bgRef.current.style.transition = "none";
    bgRef.current.style.transform = `translateY(${from})`;
    void bgRef.current.offsetHeight;
    bgRef.current.style.transition = `transform 0.35s ${EASE}`;
    bgRef.current.style.transform = "translateY(0%)";
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const to = getDir(e);
    if (!bgRef.current) return;
    bgRef.current.style.transition = `transform 0.35s ${EASE}`;
    bgRef.current.style.transform = `translateY(${to})`;
  };

  return (
    <div
      data-cursor="view"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: color,
          transform: "translateY(101%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <a
        href={href}
        onClick={(e) => { e.preventDefault(); onClick(); }}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "baseline",
          gap: "clamp(0.5rem, 2vw, 1.5rem)",
          padding: "0.15em 0",
          width: "100%",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
            fontWeight: 700,
            color: "#111111",
            opacity: 0.35,
            letterSpacing: "0.05em",
            minWidth: "2ch",
          }}
        >
          0{index + 1}
        </span>

        <span
          className="font-black uppercase leading-none select-none"
          style={{
            display: "block",
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            color: "#111111",
            letterSpacing: "-0.03em",
          }}
        >
          {label}
        </span>
      </a>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 transition-all duration-300" style={{ zIndex: 200 }}>
        <nav
          className="px-8 md:px-16 h-16 flex items-center justify-between"
          style={{
            backgroundColor: menuOpen ? "transparent" : scrolled ? "rgba(255,255,255,0.92)" : "transparent",
            backdropFilter: !menuOpen && scrolled ? "blur(8px)" : "none",
            transition: "background-color 0.3s, border-bottom 0.3s",
          }}
        >
          <a href="#" className="text-lg font-bold" style={{ color: "#111111", position: "relative", zIndex: 201 }}>
            {portfolio.name.split(" ")[0]}
            <span style={{ color: YELLOW }}>.</span>
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ position: "relative", zIndex: 201, background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "7px" }}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }} style={{ display: "block", width: 28, height: 2, backgroundColor: "#111111", transformOrigin: "center" }} />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} style={{ display: "block", width: 28, height: 2, backgroundColor: "#111111" }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }} style={{ display: "block", width: 28, height: 2, backgroundColor: "#111111", transformOrigin: "center" }} />
          </button>
        </nav>
      </header>

      <PixelTransition isActive={menuOpen} />

      <AnimatePresence>
        {menuOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 clamp(2rem, 8vw, 8rem)",
              pointerEvents: "none",
            }}
          >
            <nav style={{ borderBottom: "1px solid rgba(0,0,0,0.15)" }}>
              {navLinks.map((link, i) => (
                <div key={link.href} style={{ overflow: "hidden" }}>
                  <motion.div
                    custom={i}
                    variants={linkVariants}
                    initial="initial"
                    animate="open"
                    exit="closed"
                    style={{ pointerEvents: "auto" }}
                  >
                    <SlideLink
                      index={i}
                      label={link.label}
                      href={link.href}
                      color={link.color}
                      onClick={() => handleNavClick(link.href)}
                    />
                  </motion.div>
                </div>
              ))}
            </nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

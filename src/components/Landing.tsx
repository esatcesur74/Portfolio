"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Landing.module.css";

const HERO_IMAGE = "/images/realisticsiyah3.png";

const GREETINGS = [
  "Hi! I am",
  "Hei! Jeg er",
  "مرحباً! أنا",
  "Ben",
  "Mo jẹ́",
  "私は",
];
const FINAL_GREETING = "Hei! Jeg er";

const TYPE_SPEED = 80;
const DELETE_SPEED = 45;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

function TypewriterCycle() {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (stopped) return;

    const target = GREETINGS[index];

    if (!isDeleting && displayed === target) {
      // Last greeting typed → switch to final Norwegian and stop
      if (index === GREETINGS.length - 1) {
        const t = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayed === "") {
      const nextIndex = index + 1;
      if (nextIndex >= GREETINGS.length) {
        // Cycle done — type final Norwegian and stop
        const t = setTimeout(() => {
          setIndex(-1); // signal final
          setIsDeleting(false);
        }, PAUSE_AFTER_DELETE);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setIndex(nextIndex);
        setIsDeleting(false);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(t);
    }

    // Final Norwegian phase
    if (index === -1) {
      if (displayed === FINAL_GREETING) {
        setStopped(true);
        return;
      }
      const t = setTimeout(() => {
        setDisplayed(FINAL_GREETING.slice(0, displayed.length + 1));
      }, TYPE_SPEED);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setDisplayed(isDeleting
        ? target.slice(0, displayed.length - 1)
        : target.slice(0, displayed.length + 1)
      );
    }, isDeleting ? DELETE_SPEED : TYPE_SPEED);

    return () => clearTimeout(t);
  }, [displayed, index, isDeleting, stopped]);

  return (
    <h1 className={styles.typewriter}>
      {displayed}
    </h1>
  );
}

function SplitText({ text, className, baseDelay = 0 }: { text: string; className?: string; baseDelay?: number }) {
  return (
    <h1 className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={styles.letter}
          style={{ "--i": i + baseDelay } as React.CSSProperties}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </h1>
  );
}

export default function Landing() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLAnchorElement>(null);
  const scrollBtnRef = useRef<HTMLAnchorElement>(null);
  const blurBandRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [dlCursor, setDlCursor] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / (vh * 0.4), 1);
      const exiting = progress > 0.05;

      headlineRef.current?.classList.toggle(styles.headlineExit, exiting);
      scrollCueRef.current?.classList.toggle(styles.fadeExit, exiting);
      scrollBtnRef.current?.classList.toggle(styles.fadeExit, exiting);
      blurBandRef.current?.classList.toggle(styles.blurBandActive, exiting);
      navRef.current?.classList.toggle(styles.fadeExit, exiting);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.heroWrapper}>
      <section className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.bg} src={HERO_IMAGE} alt="" />
        <div ref={blurBandRef} className={styles.blurBand} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={`${styles.bg} ${styles.blurImg}`} src={HERO_IMAGE} alt="" />
        </div>
        <div className={styles.scrim} />

        <nav ref={navRef} className={styles.nav}>
          <div className={styles.navLeft}>
            <a className={styles.navLink} href="#projects">Projects</a>
            <a className={styles.navLink} href="#about">About</a>
            <a className={styles.navLink} href="#contact">Contact</a>
          </div>
          <span />
          <div className={styles.navRight}>
            <a
              className={styles.navLink}
              href="/resume.pdf"
              download="Esat_Cesur_CV.pdf"
              style={{ cursor: "none" }}
              onMouseEnter={() => setDlCursor(v => ({ ...v, visible: true }))}
              onMouseLeave={() => setDlCursor(v => ({ ...v, visible: false }))}
              onMouseMove={(e) => setDlCursor({ x: e.clientX, y: e.clientY, visible: true })}
            >Resume</a>
          {dlCursor.visible && typeof document !== "undefined" && createPortal(
            <div className={styles.dlCursor} style={{ left: dlCursor.x, top: dlCursor.y }}>
              Download
            </div>,
            document.body
          )}
          </div>
        </nav>

        <div ref={headlineRef} className={styles.headline}>
          <TypewriterCycle />
          <SplitText text="Esat Cesur." className={styles.headlineRight} baseDelay={0} />
        </div>

        <a ref={scrollCueRef} className={styles.scrollCueLeft} href="#work" aria-label="Scroll down">
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
            <path d="M8 1v25M1 19l7 7 7-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <a ref={scrollBtnRef} href="#work" className={styles.scroll} aria-label="Scroll to explore">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M8 1v17M2 12l6 6 6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Scroll to explore</span>
        </a>
      </section>
    </div>
  );
}

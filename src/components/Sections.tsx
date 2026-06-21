"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Sections.module.css";
import Gallery3D, { Gallery3DHandle } from "./Gallery3D";
import ProjectsSection, { ProjectsSectionHandle } from "./ProjectsSection";
import TechSection from "./TechSection";
import ContactSection from "./ContactSection";

const SECTIONS = [
  {
    id: "about",
    num: "01",
    label: "About",
    subItems: [
      { label: "Myself", idx: 0 },
      { label: "Graduation", idx: 1 },
      { label: "Interests", idx: 2 },
    ],
  },
  {
    id: "projects",
    num: "02",
    label: "Projects",
    subItems: [
      { label: "Mesta", idx: 0 },
      { label: "Liva Food", idx: 1 },
      { label: "AI Trainer", idx: 2 },
      { label: "Ekip", idx: 3 },
      { label: "Gallery", idx: 4 },
    ],
  },
  { id: "tech", num: "03", label: "Tech stack", subItems: [] },
  { id: "contact", num: "04", label: "Contact", subItems: [] },
];

const ABOUT_SLIDES = [
  <>
    <span className={styles.sectionIntroLead}>Hi, I&apos;m Esat, 21 years old.</span>
    I have a deep passion for creativity, design, social media, marketing, and building identities that last. I love taking an idea from a blank page all the way to something people actually feel and remember.
  </>,
  <>
    <span className={styles.sectionIntroLead}>Graduated from OsloMet in IT. Bachelor earned an A.</span>
    I led the frontend design and development, building the entire experience for Mesta from the ground up.
    <br /><br />
    <span className={styles.sectionIntroLabel}>Employee rating · design 1–10</span>
    <em>«10, veldig moderne design og bruker Mestas farger. Fint med dark mode for de som liker det.»</em>
  </>,
  <>
    <span className={styles.sectionIntroLead}>Outside of IT, I play football and train strength.</span>
    On the side, I run Ekip, a clothing brand I&apos;ve been building for three years, now generating thousands of views and consistent sales. I also lead OsloStart, a student association working on refugee inclusion through weekly language cafes and social events across Oslo, Bergen, and Trondheim.
  </>,
];

export default function Sections() {
  const [active, setActive] = useState("about");
  const [aboutSlide, setAboutSlide] = useState(0);
  const [aboutTextVisible, setAboutTextVisible] = useState(true);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const projectsRef = useRef<ProjectsSectionHandle>(null);
  const galleryRef = useRef<Gallery3DHandle>(null);

  // Intersection observer for active nav item
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Section snapping: single self-contained state machine ──────────
  // index 0 = hero, 1..N = sections (matches SECTIONS order)
  const targetIdxRef = useRef(0);
  const animatingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const sectionTop = (idx: number) => {
    if (idx === 0) return 0; // hero
    const el = sectionRefs.current[SECTIONS[idx - 1].id];
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  };

  // Own tween — we know exactly when it starts and ends, no 3rd-party guesswork
  const animateTo = (idx: number, duration = 750) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = window.scrollY;
    const end = sectionTop(idx);
    const distance = end - start;
    if (Math.abs(distance) < 1) { animatingRef.current = false; return; }

    const startTime = performance.now();
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // ease-in-out cubic

    animatingRef.current = true;
    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, start + distance * ease(p));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        animatingRef.current = false;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  // Wheel → one section per gesture (gesture end detected by quiet period).
  // Desktop/pointer only — on touch we let the browser scroll natively so the
  // page behaves like a normal stacked layout (galleries keep their swipe handlers).
  useEffect(() => {
    let armed = true;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Re-arm only after the gesture (incl. trackpad momentum) goes quiet
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => { armed = true; }, 140);

      if (!armed || animatingRef.current) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(SECTIONS.length, targetIdxRef.current + dir));
      if (next === targetIdxRef.current) return;

      armed = false;
      targetIdxRef.current = next;
      animateTo(next);
    };

    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    let attached = false;

    const sync = () => {
      if (mq.matches && !attached) {
        window.addEventListener("wheel", handleWheel, { passive: false });
        attached = true;
      } else if (!mq.matches && attached) {
        window.removeEventListener("wheel", handleWheel);
        attached = false;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        animatingRef.current = false;
      }
    };

    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      if (attached) window.removeEventListener("wheel", handleWheel);
      if (settleTimer) clearTimeout(settleTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: string) => {
    const idx = SECTIONS.findIndex((s) => s.id === id) + 1;
    targetIdxRef.current = idx;
    animateTo(idx);
  };

  // Called from Gallery3D whenever slide changes (swipe or programmatic goTo)
  const handleGalleryChange = (idx: number) => {
    if (idx === aboutSlide) return;
    setAboutTextVisible(false);
    setTimeout(() => {
      setAboutSlide(idx);
      setAboutTextVisible(true);
    }, 300);
  };

  return (
    <div id="work" className={styles.wrapper}>
      {/* Left sticky nav */}
      <nav className={styles.nav}>
        {SECTIONS.map(({ id, label, subItems }) => (
          <div key={id} className={styles.navGroup}>
            <button
              className={`${styles.navItem} ${active === id ? styles.active : ""}`}
              onClick={() => scrollTo(id)}
            >
              <span className={styles.navLabel}>{label}</span>
            </button>

            {subItems && subItems.length > 0 && (
              <div className={`${styles.submenu} ${active === id ? styles.submenuOpen : ""}`}>
                {subItems.map((sub) => {
                  const isActiveSub =
                    id === "about"
                      ? aboutSlide === sub.idx
                      : id === "projects"
                      ? activeProjectIdx === sub.idx
                      : false;
                  return (
                    <button
                      key={sub.label}
                      className={`${styles.subItem} ${isActiveSub ? styles.subItemActive : ""}`}
                      onClick={() => {
                        scrollTo(id);
                        if (id === "about") {
                          galleryRef.current?.goTo(sub.idx);
                        } else if (id === "projects") {
                          projectsRef.current?.jumpTo(sub.idx);
                        }
                      }}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Right content */}
      <div className={styles.content}>
        {SECTIONS.map(({ id, num, label }) => (
          <section
            key={id}
            id={id}
            ref={(el) => { sectionRefs.current[id] = el; }}
            className={`${styles.section} ${id === "contact" ? styles.sectionContact : ""}`}
          >
            {id === "about" ? (
              <div className={styles.aboutLayout}>
                <div className={styles.aboutLeft}>
                  <p className={`${styles.sectionIntro} ${aboutTextVisible ? styles.textVisible : styles.textHidden}`}>
                    {ABOUT_SLIDES[aboutSlide]}
                  </p>
                </div>
                <div className={styles.aboutRight}>
                  <Gallery3D ref={galleryRef} onSlideChange={handleGalleryChange} />
                </div>
              </div>
            ) : id === "projects" ? (
              <ProjectsSection ref={projectsRef} onActiveProjectChange={setActiveProjectIdx} />
            ) : id === "tech" ? (
              <TechSection />
            ) : id === "contact" ? (
              <ContactSection num={num} label={label} />
            ) : (
              <div className={styles.placeholder} />
            )}
            {id !== "contact" && (
              <div className={styles.sectionTitlePin}>
                <span className={styles.sectionNum}>{num}</span>
                <h2 className={styles.sectionTitle}>{label}</h2>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ProjectsSection.module.css";

const ICON_MAP: Record<string, string> = {
  "React": "react",
  "Next.js": "nextjs",
  "TypeScript": "ts",
  "Tailwind CSS": "tailwind",
  "Vite": "vite",
  "HTML5": "html",
  "CSS3": "css",
  "Vanilla JS": "js",
  "Three.js": "threejs",
  "FastAPI": "fastapi",
  "ASP.NET Core": "dotnet",
  "Python": "py",
  "Node.js": "nodejs",
  "PostgreSQL": "postgres",
  "SQLite": "sqlite",
  "React Native": "react",
  "Figma": "figma",
  "Cloudflare Pages": "cloudflare",
};

const ALT_ICON_URL: Record<string, string> = {
  "Framer Motion": "https://cdn.simpleicons.org/framer/ffffff",
};

const PROJECTS = [
  {
    title: "Mesta",
    tags: ["Web Design", "Dashboard", "Dev"],
    lead: "Operational dashboard for Norway's largest road maintenance company.",
    description:
      "I led the entire frontend: interactive maps showing salting routes and weather heatmaps, KPI cards, cost tracking, and bilingual support. Bachelor project, graded A.",
    url: null,
    tech: [
      { label: "React", color: "blue" },
      { label: "TypeScript", color: "blue" },
      { label: "Vite", color: "blue" },
      { label: "MapLibre GL", color: "blue" },
      { label: "ASP.NET Core", color: "yellow" },
      { label: "PostgreSQL", color: "yellow" },
    ],
    images: [
      "/images/mesta.png",
      "/images/mestasaltpunkt.png",
      "/images/mestaenglishdark.png",
      "/images/mestaværkort.png",
    ],
  },
  {
    title: "Liva Food",
    tags: ["Web Design", "Menu", "Dev"],
    lead: "Menu and catering site for a Middle Eastern restaurant in Eindhoven.",
    description:
      "Static, fast, and mobile-first, with online ordering integration and a catering request form that emails directly to the team.",
    url: "https://www.livafood.nl",
    tech: [
      { label: "HTML5", color: "blue" },
      { label: "CSS3", color: "blue" },
      { label: "Vanilla JS", color: "blue" },
      { label: "Cloudflare Pages", color: "yellow" },
    ],
    images: [
      "/images/livafoodmenu.png",
      "/images/livafoodaboutus.png",
      "/images/livafoodcatering.png",
    ],
  },
  {
    title: "AI Trainer",
    tags: ["Product", "AI", "Dev"],
    lead: "AI personal trainer app with multiple coach personas.",
    description:
      "Users go through onboarding, then chat with a character-driven AI coach for custom workout plans, voice interaction, and exercise video matching. Built with React Native, FastAPI, and Claude.",
    url: null,
    tech: [
      { label: "React Native", color: "blue" },
      { label: "Expo", color: "blue" },
      { label: "TypeScript", color: "blue" },
      { label: "FastAPI", color: "yellow" },
      { label: "Python", color: "yellow" },
      { label: "Claude", color: "yellow" },
      { label: "SQLite", color: "yellow" },
    ],
    images: [
      "/images/aitrainer.png",
      "/images/aitraner2.png",
    ],
  },
  {
    title: "Ekip",
    tags: ["Branding", "Fashion", "Creative Dir."],
    lead: "Oslo-based clothing brand, built with a team.",
    description:
      "I oversee production, economy, and marketing. Three years in, with campaigns shot across Oslo, Amsterdam, and Nice, now generating thousands of views and consistent sales.",
    url: "https://ekipeu.com/",
    tech: [] as { label: string; color: string }[],
    images: [
      "/images/shootday4.mp4",
      "/images/ekip.jpeg",
      "/images/ekiprichard.jpeg",
      "/images/ekipfoto2.jpeg",
    ],
  },
  {
    title: "Gallery",
    tags: ["Creative Dev", "Animation"],
    lead: "Experimental portfolio with free-floating images.",
    description:
      "Mouse-parallax depth and horizontal scroll powered by GSAP. Each photo carries campaign metadata: shoot location, date, and photographer.",
    url: "https://esatcesur74.github.io/gsap_training/",
    tech: [
      { label: "React", color: "blue" },
      { label: "GSAP", color: "blue" },
      { label: "Three.js", color: "blue" },
      { label: "Framer Motion", color: "blue" },
      { label: "Lenis", color: "blue" },
      { label: "Vite", color: "blue" },
    ],
    images: [
      "/images/floating gallery.png",
      "/images/floatinggalleryfirstpage.png",
      "/images/floatinggalleryverticalscroll.png",
      "/images/floatinggalleryscrollimageffect.png",
    ],
  },
];

export interface ProjectsSectionHandle {
  jumpTo: (idx: number) => void;
}

const ProjectsSection = forwardRef<ProjectsSectionHandle, {
  onActiveProjectChange?: (idx: number) => void;
}>(function ProjectsSection({ onActiveProjectChange }, ref) {
  const [activeProject, setActiveProject] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const galleryColRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimating = useRef(false);

  const project = PROJECTS[activeProject];
  const images = project.images;
  const totalImages = PROJECTS.reduce((acc, p) => acc + p.images.length, 0);
  const globalIndex = useRef(0);

  const goToGlobalIndex = (nextGlobal: number) => {
    if (isAnimating.current) return;
    const clamped = Math.max(0, Math.min(nextGlobal, totalImages - 1));
    if (clamped === globalIndex.current) return;

    isAnimating.current = true;

    let count = 0;
    let projIdx = 0;
    for (let i = 0; i < PROJECTS.length; i++) {
      if (count + PROJECTS[i].images.length > clamped) {
        projIdx = i;
        break;
      }
      count += PROJECTS[i].images.length;
    }
    const imgIdx = clamped - count;
    const projectChanged = projIdx !== activeProject;
    globalIndex.current = clamped;

    if (projectChanged) {
      setTextVisible(false);
      setTimeout(() => {
        setActiveProject(projIdx);
        setActiveImage(imgIdx);
        setTextVisible(true);
      }, 300);
    } else {
      setActiveImage(imgIdx);
    }

    setTimeout(() => { isAnimating.current = false; }, 1100);
  };

  useImperativeHandle(ref, () => ({
    jumpTo: (idx: number) => {
      if (idx === activeProject) return;
      setTextVisible(false);
      let count = 0;
      for (let i = 0; i < idx; i++) count += PROJECTS[i].images.length;
      globalIndex.current = count;
      setTimeout(() => {
        setActiveProject(idx);
        setActiveImage(0);
        setTextVisible(true);
      }, 300);
    },
  }));

  useEffect(() => {
    setActiveImage(0);
    onActiveProjectChange?.(activeProject);
  }, [activeProject, onActiveProjectChange]);

  useEffect(() => {
    const el = galleryColRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const goingDown = e.deltaY > 0;
      const atEnd = globalIndex.current >= totalImages - 1 && goingDown;
      const atStart = globalIndex.current <= 0 && !goingDown;

      // At boundary — release so page snap can fire
      if (atEnd || atStart) {
        wheelAccum.current = 0;
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (isAnimating.current) return;

      wheelAccum.current += e.deltaY;
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => { wheelAccum.current = 0; }, 300);

      if (wheelAccum.current > 60) {
        wheelAccum.current = 0;
        goToGlobalIndex(globalIndex.current + 1);
      } else if (wheelAccum.current < -60) {
        wheelAccum.current = 0;
        goToGlobalIndex(globalIndex.current - 1);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  const [viewCursor, setViewCursor] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });

  const dragStart = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => { dragStart.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    if (delta < -40) goToGlobalIndex(globalIndex.current + 1);
    else if (delta > 40) goToGlobalIndex(globalIndex.current - 1);
    dragStart.current = null;
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* Project title — absolute top-right of section */}
      <h2 className={`${styles.galleryTitle} ${textVisible ? styles.infoVisible : styles.infoHidden}`}>
        {project.title.toUpperCase()}
      </h2>

      {/* Main content: left info + right gallery */}
      <div className={styles.content}>
        {/* Left: description + actions */}
        <div className={`${styles.info} ${textVisible ? styles.infoVisible : styles.infoHidden}`}>
          <p className={styles.desc}>
            {project.lead && <span className={styles.descLead}>{project.lead}</span>}
            {project.description}
          </p>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.visitBtn}
              onMouseEnter={() => setViewCursor(v => ({ ...v, visible: true }))}
              onMouseLeave={() => setViewCursor(v => ({ ...v, visible: false }))}
              onMouseMove={(e) => setViewCursor({ x: e.clientX, y: e.clientY, visible: true })}
            >
              Visit ↗
            </a>
          ) : (
            <span className={styles.confidential}>Confidential</span>
          )}
          {viewCursor.visible && typeof document !== "undefined" && createPortal(
            <div
              className={styles.viewCursor}
              style={{ left: viewCursor.x, top: viewCursor.y }}
            >
              VIEW
            </div>,
            document.body
          )}
        </div>

        {/* Right: gallery — wheel here cycles projects, not sections */}
        <div ref={galleryColRef} className={styles.stageWrapper}>
          <div
            ref={stageRef}
            className={styles.stage}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            {images.map((src, i) => {
              const offset = i - activeImage;
              const isActive = offset === 0;
              const visible = Math.abs(offset) <= 1;

              return (
                <div
                  key={src}
                  className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                  style={{
                    transform: `
                      translateX(${offset * 72}%)
                      translateZ(${isActive ? 0 : -120}px)
                      rotateY(${offset * -22}deg)
                      scale(${isActive ? 1 : 0.78})
                    `,
                    opacity: visible ? (isActive ? 1 : 0.45) : 0,
                    pointerEvents: isActive ? "auto" : "none",
                    zIndex: isActive ? 2 : 1,
                  }}
                >
                  {src.endsWith(".mp4") ? (
                    <video src={src} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt="" draggable={false} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech fan pinned bottom-right (same level as section title pin) */}
      {project.tech.length > 0 && (
        <div className={`${styles.techFanPin} ${textVisible ? styles.infoVisible : styles.infoHidden}`}>
          <div className={styles.techFan}>
            {project.tech.map((t) => {
              const iconKey = ICON_MAP[t.label];
              const altUrl = ALT_ICON_URL[t.label];
              const accentColor = t.color === "blue" ? "#60a5fa" : "#fbbf24";
              return (
                <button
                  key={t.label}
                  className={styles.fanItem}
                  style={{ "--accent": accentColor } as React.CSSProperties}
                  aria-label={t.label}
                  data-label={t.label}
                >
                  {iconKey ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://skillicons.dev/icons?i=${iconKey}`}
                      alt={t.label}
                      className={styles.fanIcon}
                    />
                  ) : altUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={altUrl}
                      alt={t.label}
                      className={styles.fanIcon}
                    />
                  ) : (
                    <span className={styles.fanText}>{t.label.slice(0, 2).toUpperCase()}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

export default ProjectsSection;

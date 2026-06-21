"use client";

import styles from "./TechSection.module.css";

const ICON_MAP: Record<string, string> = {
  "React": "react",
  "Next.js": "nextjs",
  "TypeScript": "ts",
  "Tailwind CSS": "tailwind",
  "Vite": "vite",
  "HTML5 / CSS3": "html",
  "Three.js": "threejs",
  "FastAPI": "fastapi",
  "ASP.NET Core": "dotnet",
  "Python": "py",
  "Node.js": "nodejs",
  "PostgreSQL": "postgres",
  "SQLite": "sqlite",
  "React Native": "react",
  "Figma": "figma",
  "Git / GitHub": "git",
  "Cloudflare Pages": "cloudflare",
  "GSAP": "js",
  "Framer Motion": "framer",
};

const CATEGORIES = [
  {
    label: "Frontend",
    color: "blue" as const,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "HTML5 / CSS3"],
  },
  {
    label: "Animation & 3D",
    color: "blue" as const,
    items: ["GSAP", "Framer Motion", "Three.js", "React Three Fiber", "Lenis"],
  },
  {
    label: "Backend",
    color: "yellow" as const,
    items: ["FastAPI", "ASP.NET Core", "Python", "Node.js", "Dapper", "PostgreSQL", "SQLite"],
  },
  {
    label: "Mobile",
    color: "blue" as const,
    items: ["React Native", "Expo", "Expo Router"],
  },
  {
    label: "AI",
    color: "yellow" as const,
    items: ["Claude (Anthropic)", "Anthropic SDK"],
  },
  {
    label: "Tools & Platforms",
    color: "yellow" as const,
    items: ["Figma", "Git / GitHub", "Cloudflare Pages", "MapLibre GL"],
  },
];

export default function TechSection() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {CATEGORIES.map((cat) => (
          <div key={cat.label} className={styles.category}>
            <span className={styles.catLabel}>{cat.label}</span>
            <div className={styles.items}>
              {cat.items.map((item) => (
                <span key={item} className={styles.item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

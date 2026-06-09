"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",     label: "01" },
  { id: "about",    label: "02" },
  { id: "projects", label: "03" },
  { id: "skills",   label: "04" },
  { id: "contact",  label: "05" },
];

export default function Timeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, i) => {
      const el = document.getElementById(section.id) ?? (i === 0 ? document.querySelector("section") : null);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: "clamp(1rem, 2.5vw, 2.5rem)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      {SECTIONS.map((section, i) => {
        const isActive = i === active;
        const isPast   = i < active;

        return (
          <div key={section.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Numara */}
            <a
              href={`#${section.id}`}
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: isActive ? "#ffffff" : "#ffffff",
                opacity: isActive ? 1 : isPast ? 0.3 : 0.2,
                textDecoration: "none",
                transition: "opacity 0.4s ease",
                lineHeight: 1,
                padding: "0.3rem 0",
              }}
            >
              {section.label}
            </a>

            {/* Çizgi (son eleman hariç) */}
            {i < SECTIONS.length - 1 && (
              <div
                style={{
                  width: 1,
                  height: 40,
                  backgroundColor: "#ffffff",
                  opacity: isPast ? 0.35 : 0.12,
                  transition: "opacity 0.4s ease",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

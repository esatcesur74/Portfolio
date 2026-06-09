"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const displayUrl = (project?.liveUrl ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const hasSections = project?.sections && project.sections.length > 0;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(10px)",
              zIndex: 1000,
            }}
          />

          {/* Centering wrapper */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1001,
              pointerEvents: "none",
              padding: "2rem",
            }}
          >
            {/* Fake browser window */}
            <motion.div
              key="browser"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                pointerEvents: "all",
                width: "min(94vw, 1060px)",
                height: "min(90vh, 820px)",
                backgroundColor: "#111111",
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 48px 140px rgba(0,0,0,0.85)",
              }}
            >
              {/* Title bar */}
              <div
                style={{
                  height: 44,
                  backgroundColor: "#1e1e1e",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                  flexShrink: 0,
                  position: "relative",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <button
                  onClick={onClose}
                  style={{
                    width: 13, height: 13, borderRadius: "50%",
                    backgroundColor: "#ff5f57", border: "none",
                    cursor: "pointer", padding: 0, flexShrink: 0,
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#2a2a2a",
                    borderRadius: 6,
                    padding: "4px 14px",
                    minWidth: "clamp(140px, 28%, 340px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                    <rect x="1" y="5" width="8" height="7" rx="1.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
                    <path d="M3 5V3.5a2 2 0 0 1 4 0V5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontWeight: 500, whiteSpace: "nowrap" }}>
                    {displayUrl || `project ${project.id}`}
                  </span>
                </div>
              </div>

              {/* Scrollable content — data-lenis-prevent stops Lenis intercepting wheel events */}
              <div data-lenis-prevent style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>

                {hasSections ? (
                  <>
                    {/* Header */}
                    <div style={{ padding: "2.5rem 3rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)" }}>
                          0{project.id}
                        </span>
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.06em",
                              color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.1)",
                              padding: "3px 10px", borderRadius: 4,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontWeight: 900, color: "#ffffff", margin: 0, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                        {project.title}
                      </h2>
                    </div>

                    {/* Sections */}
                    {project.sections!.map((section, i) => {
                      if (section.type === "hero") {
                        return (
                          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            {/* Full-width video */}
                            <div style={{ width: "100%", backgroundColor: "#000", lineHeight: 0 }}>
                              {section.video ? (
                                <video
                                  src={section.video}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  style={{ width: "100%", height: "auto", display: "block", maxHeight: 420, objectFit: "cover" }}
                                />
                              ) : section.image ? (
                                <img src={section.image} alt={section.heading} style={{ width: "100%", height: "auto", display: "block" }} />
                              ) : null}
                            </div>
                            {/* Text below */}
                            <div style={{ padding: "2rem 2.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", margin: 0, textTransform: "uppercase" }}>
                                {String(i + 1).padStart(2, "0")}
                              </p>
                              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#ffffff", margin: 0, letterSpacing: "-0.02em" }}>
                                {section.heading}
                              </h3>
                              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>
                                {section.body}
                              </p>
                            </div>
                          </div>
                        );
                      }

                      const imgLeft = section.imagePosition === "left";
                      const media = section.video ?? section.image ?? "";
                      const isVideo = !!section.video;
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            flexDirection: imgLeft ? "row" : "row-reverse",
                            borderBottom: i < project.sections!.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                            alignItems: "stretch",
                          }}
                        >
                          {/* Media */}
                          <div style={{ flex: "0 0 45%", backgroundColor: "#0d0d0d", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
                            {isVideo ? (
                              <video
                                src={media}
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
                              />
                            ) : (
                              <img
                                src={media}
                                alt={section.heading}
                                style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
                              />
                            )}
                          </div>

                          {/* Text */}
                          <div
                            style={{
                              flex: 1,
                              padding: "2.5rem",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              gap: "1rem",
                              borderLeft: imgLeft ? "1px solid rgba(255,255,255,0.06)" : "none",
                              borderRight: !imgLeft ? "1px solid rgba(255,255,255,0.06)" : "none",
                            }}
                          >
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", margin: 0, textTransform: "uppercase" }}>
                              {String(i + 1).padStart(2, "0")}
                            </p>
                            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#ffffff", margin: 0, letterSpacing: "-0.02em" }}>
                              {section.heading}
                            </h3>
                            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>
                              {section.body}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    {/* Visit Website button */}
                    {project.liveUrl && (
                      <div style={{ padding: "2rem 3rem", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 10,
                            backgroundColor: "#ffffff", color: "#000000",
                            padding: "13px 32px", borderRadius: 8,
                            fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
                            letterSpacing: "0.02em",
                          }}
                        >
                          <ExternalLink size={15} />
                          Visit Website
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  /* Fallback: generic layout for projects without sections */
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {project.image && (
                      <div style={{ width: "100%", height: "clamp(160px, 30vh, 300px)", flexShrink: 0, overflow: "hidden" }}>
                        <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                      </div>
                    )}
                    <div style={{ padding: "2rem 2.5rem 2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)" }}>0{project.id}</span>
                        {project.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)", padding: "3px 10px", borderRadius: 4 }}>{tag}</span>
                        ))}
                      </div>
                      <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 900, color: "#ffffff", margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{project.title}</h2>
                      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, maxWidth: "62ch" }}>{project.description}</p>
                      <div style={{ display: "flex", gap: "1rem", paddingTop: "0.5rem" }}>
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#ffffff", color: "#000000", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
                            <ExternalLink size={14} />Live Site
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 20px", borderRadius: 8, fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
                            <Github size={14} />Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

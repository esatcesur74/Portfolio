"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Lock } from "lucide-react";
import type { Project } from "@/types";

interface Props {
  project: Project;
  i: number;
}

const slideEase: [number, number, number, number] = [0.23, 1, 0.32, 1];
const panelVariants = {
  closed: { width: 0, opacity: 0 },
  open: {
    width: 160,
    opacity: 1,
    transition: { duration: 0.45, ease: slideEase },
  },
};

export default function ProjectRow({ project, i }: Props) {
  const [hovered, setHovered] = useState(false);
  const isWip = !project.liveUrl;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        backgroundColor: hovered ? project.color : "#ffffff",
        y: hovered ? -5 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ marginTop: i > 0 ? "-1px" : "0", position: "relative", zIndex: hovered ? 10 : i }}
      data-cursor={isWip ? undefined : "view"}
      className="border border-gray-200 px-8 py-8 flex items-center gap-6 overflow-hidden"
    >
      <motion.span
        animate={{ color: hovered ? project.textColor : "#d1d5db" }}
        transition={{ duration: 0.2 }}
        className="text-xs font-bold tracking-widest shrink-0 w-6"
      >
        0{project.id}
      </motion.span>

      <div className="flex-1 min-w-0">
        <motion.h3
          animate={{ color: hovered ? project.textColor : "#111111" }}
          transition={{ duration: 0.2 }}
          className="text-xl md:text-2xl font-black tracking-tight mb-1"
        >
          {project.title}
        </motion.h3>
        <motion.p
          animate={{ color: hovered ? project.textColor : "#6b7280", opacity: hovered ? 0.7 : 1 }}
          transition={{ duration: 0.2 }}
          className="text-sm leading-relaxed max-w-md"
        >
          {project.description}
        </motion.p>
      </div>

      <div className="hidden md:flex flex-wrap gap-2 shrink-0">
        {project.tags.map((tag) => (
          <motion.span
            key={tag}
            animate={{
              borderColor: hovered ? `${project.textColor}40` : "#e5e7eb",
              color: hovered ? project.textColor : "#6b7280",
            }}
            transition={{ duration: 0.2 }}
            className="text-xs font-medium px-3 py-1 border"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <div className="flex gap-4 shrink-0">
        {isWip ? (
          <motion.span
            animate={{
              color: hovered ? project.textColor : "#9ca3af",
              opacity: hovered ? 0.6 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-sm font-semibold cursor-default select-none"
          >
            <Lock size={13} />
            Work in Progress
          </motion.span>
        ) : (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative z-20"
          >
            <motion.span
              animate={{ color: hovered ? project.textColor : "#111111" }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-60 transition-opacity"
            >
              <ExternalLink size={13} />
              Live
            </motion.span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative z-20"
          >
            <motion.span
              animate={{ color: hovered ? project.textColor : "#6b7280" }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-60 transition-opacity"
            >
              <Github size={13} />
              Code
            </motion.span>
          </a>
        )}
      </div>

      <AnimatePresence>
        {hovered && project.image && (
          <motion.div
            key="slide-panel"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="shrink-0 overflow-hidden"
            style={{
              height: "80px",
              border: `1px solid ${project.textColor}25`,
            }}
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{
                  display: "block",
                  objectPosition: "center center",
                }}
              />
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

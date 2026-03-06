"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import { fadeUpVariants } from "@/hooks/useScrollAnimation";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <motion.div
      variants={fadeUpVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group border border-gray-200 p-8 hover:border-gray-900 transition-colors duration-300 flex flex-col gap-5"
    >
      {/* Number */}
      <span className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
        0{project.id}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 tracking-tight">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-3 py-1 border border-gray-200 text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 pt-2 border-t border-gray-100">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:opacity-60 transition-opacity"
        >
          <ExternalLink size={14} />
          Live
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <Github size={14} />
          Code
        </a>
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectRow from "./ProjectRow";
import ProjectModal from "./ProjectModal";
import portfolio from "@/data/portfolio";
import type { Project } from "@/types";
import {
  slideLeftVariants,
  staggerContainerVariants,
  viewportOptions,
} from "@/hooks/useScrollAnimation";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-28 px-8 md:px-16 lg:px-24" style={{ backgroundColor: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainerVariants}
            className="mb-16"
          >
            <motion.p
              variants={slideLeftVariants}
              className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Work
            </motion.p>
            <motion.h2
              variants={slideLeftVariants}
              className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: "#ffffff" }}
            >
              Selected Projects
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainerVariants}
          >
            {portfolio.projects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } },
                }}
              >
                <ProjectRow project={project} i={i} onClick={() => setSelected(project)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import ProjectRow from "./ProjectRow";
import portfolio from "@/data/portfolio";
import {
  slideLeftVariants,
  staggerContainerVariants,
  viewportOptions,
} from "@/hooks/useScrollAnimation";

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainerVariants}
          className="mb-16"
        >
          <motion.p
            variants={slideLeftVariants}
            className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4"
          >
            Work
          </motion.p>
          <motion.h2
            variants={slideLeftVariants}
            className="text-4xl md:text-5xl font-black tracking-tight text-gray-900"
          >
            Selected Projects
          </motion.h2>
        </motion.div>

        {/* Stacked rows — colored card overlap + image slide on hover */}
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
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: i * 0.1 },
                },
              }}
            >
              <ProjectRow project={project} i={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

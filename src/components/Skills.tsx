"use client";

import { motion } from "framer-motion";
import portfolio from "@/data/portfolio";
import {
  fadeUpVariants,
  slideLeftVariants,
  staggerContainerVariants,
  viewportOptions,
} from "@/hooks/useScrollAnimation";

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
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
          Skills
        </motion.p>
        <motion.h2
          variants={slideLeftVariants}
          className="text-4xl md:text-5xl font-black tracking-tight text-gray-900"
        >
          Tech Stack
        </motion.h2>
      </motion.div>

      <div className="space-y-12">
        {portfolio.skillGroups.map((group) => (
          <motion.div
            key={group.category}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainerVariants}
          >
            <motion.p
              variants={fadeUpVariants}
              className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5"
            >
              {group.category}
            </motion.p>

            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={fadeUpVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "#ffed29", borderColor: "#ffed29" }}
                  className="px-5 py-2.5 border border-gray-200 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

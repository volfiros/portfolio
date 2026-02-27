"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { PageHeader } from "@/components/PageHeader";
import { projects } from "@/lib/data";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const tagVariant = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: "easeOut" },
  }),
};

export default function ProjectsPage() {
  if (projects.length === 0) {
    return (
      <div>
        <BackButton />
        <PageHeader
          title="projects"
          tagline="things i've built — side projects, experiments, and work."
          count={0}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-20 text-center"
        >
          <p className="font-mono text-sm text-slate-600">coming soon</p>
          <p className="mt-1 text-[13px] text-slate-700">projects will be listed here.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <BackButton />
      <PageHeader
        title="projects"
        tagline="things i've built — side projects, experiments, and work."
        count={projects.length}
      />

      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={cardVariant}>
            <motion.div
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors duration-300"
              whileHover={{
                y: -3,
                borderColor: "rgba(139,92,246,0.18)",
                backgroundColor: "rgba(255,255,255,0.03)",
                boxShadow: "0 12px 40px rgba(139,92,246,0.07)",
              }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              {/* Ambient glow on hover */}
              <motion.div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/[0.06] blur-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Header: number + title + year */}
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[10px] text-violet-400/50 transition-colors duration-300 group-hover:text-violet-400/90">
                    {project.id}
                  </span>
                  <h2 className="text-[13px] font-medium tracking-tight text-slate-300 transition-colors duration-300 group-hover:text-white">
                    {project.title}
                  </h2>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-slate-700">
                  {project.year}
                </span>
              </div>

              {/* Description */}
              <p className="mb-5 flex-1 text-[12.5px] leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                {project.description}
              </p>

              {/* Footer: tags + links */}
              <div className="flex items-center justify-between gap-3">
                {/* Tags as dot-separated text */}
                <div className="flex items-center gap-0 overflow-hidden">
                  {project.tags.slice(0, 4).map((tag, i) => (
                    <motion.span
                      key={tag}
                      custom={i}
                      variants={tagVariant}
                      className="flex items-center font-mono text-[10px] text-slate-600 transition-colors duration-300 group-hover:text-slate-500"
                    >
                      {i > 0 && (
                        <span className="mx-1.5 text-slate-700">·</span>
                      )}
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex shrink-0 items-center gap-3">
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-[10px] text-slate-600 transition-colors duration-200 hover:text-violet-400"
                    >
                      <ExternalLink size={10} />
                      live
                    </Link>
                  )}
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono text-[10px] text-slate-600 transition-colors duration-200 hover:text-violet-400"
                  >
                    <Github size={10} />
                    code
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

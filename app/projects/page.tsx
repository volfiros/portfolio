"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { PageHeader } from "@/components/PageHeader";
import { projects } from "@/lib/data";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
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
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={cardVariant}>
            <Link href={project.link}>
              <motion.div
                className="group relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
                whileHover={{
                  scale: 1.015,
                  y: -2,
                  borderColor: "rgba(139,92,246,0.2)",
                  boxShadow: "0 8px 32px rgba(139,92,246,0.08)",
                }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-violet-400/70">
                    {project.id}
                  </span>
                  <span className="font-mono text-[10px] text-slate-700">
                    {project.year}
                  </span>
                </div>

                <h2 className="mb-2 text-sm font-medium text-slate-200 transition-colors duration-200 group-hover:text-violet-300">
                  {project.title}
                </h2>

                <p className="mb-4 flex-1 text-[13px] leading-relaxed text-slate-500">
                  {project.description}
                </p>

                <div className="flex items-end justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    size={13}
                    className="shrink-0 text-slate-700 transition-colors group-hover:text-violet-400"
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/BackButton";
import { PageHeader } from "@/components/PageHeader";
import { experience } from "@/lib/data";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const bulletVariant = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export default function ExperiencePage() {
  return (
    <div>
      <BackButton />
      <PageHeader
        title="experience"
        tagline="where i've worked and what i've built there."
      />

      <div className="relative">
        <motion.div
          className="absolute left-[5px] top-2 w-px origin-top bg-gradient-to-b from-violet-500/30 via-white/[0.04] to-transparent"
          initial={{ scaleY: 0, height: "calc(100% - 1rem)" }}
          animate={{ scaleY: 1, height: "calc(100% - 1rem)" }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        />

        <motion.div
          className="space-y-10"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {experience.map((job) => (
            <motion.div
              key={job.id}
              className="relative pl-6 sm:pl-8"
              variants={cardVariant}
            >
              <motion.div
                className="absolute left-0 top-1.5 flex h-3 w-3 items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full border border-violet-400/40"
                  animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border border-violet-400/20"
                  animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5, repeatDelay: 1 }}
                />
                <div className="h-1.5 w-1.5 rounded-full bg-violet-400/60" />
              </motion.div>

              <motion.div
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5"
                whileHover={{
                  borderColor: "rgba(139,92,246,0.12)",
                  backgroundColor: "rgba(139,92,246,0.02)",
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-1 flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <div className="min-w-0">
                    <h2 className="text-sm font-medium text-slate-200">
                      {job.role}
                    </h2>
                    <p className="mt-0.5 text-sm text-violet-400/80">
                      {job.company}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-[10px] text-slate-600">
                      {job.period}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-slate-700">
                      {job.location}
                    </p>
                  </div>
                </div>

                <div className="my-4 h-px bg-white/[0.04]" />

                <motion.ul
                  className="space-y-2"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {job.description.map((point, j) => (
                    <motion.li
                      key={j}
                      variants={bulletVariant}
                      className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-500"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-700" />
                      {point}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

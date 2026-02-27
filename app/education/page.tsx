"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/BackButton";
import { PageHeader } from "@/components/PageHeader";
import { education } from "@/lib/data";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function EducationPage() {
  return (
    <div>
      <BackButton />
      <PageHeader
        title="education"
        tagline="formal and self-directed — the learning never stops."
      />

      <motion.div
        className="space-y-5"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {education.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariant}
            whileHover={{
              y: -2,
              borderColor: "rgba(139,92,246,0.15)",
              boxShadow: "0 8px 32px rgba(139,92,246,0.06)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="mb-1 font-mono text-[10px] text-violet-400/60">
                  {item.id}
                </div>
                <h2 className="text-sm font-medium text-slate-200">
                  {item.degree}
                </h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  {item.institution}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[10px] text-slate-700">
                {item.period}
              </span>
            </div>

            <p className="mb-5 text-[13px] leading-relaxed text-slate-500">
              {item.description}
            </p>

            <motion.div
              className="flex flex-wrap gap-2"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {item.highlights.map((highlight, j) => (
                <motion.span
                  key={j}
                  variants={cardVariant}
                  whileHover={{
                    scale: 1.06,
                    borderColor: "rgba(167,139,250,0.25)",
                    color: "#a78bfa",
                  }}
                  transition={{ duration: 0.15 }}
                  className="cursor-default rounded-lg border border-white/[0.05] bg-white/[0.03] px-3 py-1 text-[11px] text-slate-500"
                >
                  {highlight}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

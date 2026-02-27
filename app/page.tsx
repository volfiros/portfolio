"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, Database, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  SiTypescript,
  SiPython,
  SiRust,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiFastapi,
  SiDocker,
  SiPostgresql,
  SiSolidity,
} from "react-icons/si";
import { experience, personalInfo, roles, skills } from "@/lib/data";
import { GithubCalendar } from "@/components/GithubCalendar";

const skillIcons: Record<string, React.ElementType> = {
  typescript: SiTypescript,
  python: SiPython,
  rust: SiRust,
  "next.js": SiNextdotjs,
  react: SiReact,
  "node.js": SiNodedotjs,
  mongodb: SiMongodb,
  fastapi: SiFastapi,
  docker: SiDocker,
  postgresql: SiPostgresql,
  convex: Database,
  solidity: SiSolidity,
};

const skillColors: Record<string, string> = {
  typescript: "#3b82f6",
  python: "#facc15",
  rust: "#fb923c",
  "next.js": "#e2e8f0",
  react: "#22d3ee",
  "node.js": "#4ade80",
  mongodb: "#6dbf5b",
  fastapi: "#2dd4bf",
  docker: "#60a5fa",
  postgresql: "#818cf8",
  convex: "#a78bfa",
  solidity: "#94a3b8",
};

function RoleTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="font-mono text-[10px] text-slate-700">↳</span>
      <div className="relative h-[18px] w-28 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="absolute font-mono text-[11px] text-slate-500"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function HomePage() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="space-y-14"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-5">
        <section className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <motion.div
              variants={fadeUp}
              className="mb-3 flex items-center gap-2"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-2.5 py-1 font-mono text-[10px] text-violet-400">
                <Sparkles size={9} />
                {personalInfo.status}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-700">
                <MapPin size={9} />
                {personalInfo.location}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-shimmer text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-2 text-base text-slate-500">
              {personalInfo.title}
            </motion.p>

            <motion.div variants={fadeUp}>
              <RoleTicker />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            className="shrink-0"
          >
            <motion.div
              animate={reduce ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-2xl" />
              <div className="relative h-28 w-28 overflow-hidden rounded-full border border-violet-500/20 ring-2 ring-violet-500/10 ring-offset-2 ring-offset-[#080b14] sm:h-32 sm:w-32">
                <Image
                  src="/avatar.jpeg"
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <motion.section variants={fadeUp} className="space-y-3">
          {personalInfo.bio.map((paragraph, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-slate-400">
              {paragraph}
            </p>
          ))}
        </motion.section>
      </div>

      <motion.section variants={fadeUp}>
        <div className="flex items-stretch gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="flex flex-col items-center gap-1 pt-0.5">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </div>
            <div className="w-px flex-1 bg-gradient-to-b from-violet-500/20 to-transparent" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-1">
              currently
            </p>
            <p className="text-sm text-slate-300">
              {experience[0].role} at{" "}
              <span className="text-violet-400">{experience[0].company}</span>
            </p>
            <p className="mt-0.5 text-[13px] text-slate-600">
              contract · {experience[0].location} · {experience[0].period}
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section variants={fadeUp} className="space-y-3">
        <p className="font-mono text-[10px] tracking-widest text-slate-600 uppercase">
          tech stack
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => {
            const Icon = skillIcons[skill];
            return (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.03, duration: 0.25 }}
                whileHover={{ scale: 1.05, color: "#a78bfa" }}
                className="cursor-default inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-slate-500 transition-colors hover:border-violet-500/20 hover:text-violet-300"
              >
                {Icon && (
                  <Icon size={11} style={{ color: skillColors[skill] }} />
                )}
                {skill}
              </motion.span>
            );
          })}
        </div>
      </motion.section>

      <motion.section variants={fadeUp} className="space-y-3">
        <p className="font-mono text-[10px] tracking-widest text-slate-600 uppercase">
          explore
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "projects", path: "/projects" },
            { label: "experience", path: "/experience" },
            { label: "education", path: "/education" },
            { label: "contact", path: "/contact" },
          ].map(({ label, path }) => (
            <motion.div
              key={path}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={path}>
                <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-400 transition-all duration-200 hover:border-violet-500/20 hover:bg-violet-500/[0.04] hover:text-slate-200">
                  {label}
                  <ArrowUpRight size={12} className="text-slate-600" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={fadeUp}>
        <GithubCalendar />
      </motion.section>
    </motion.div>
  );
}

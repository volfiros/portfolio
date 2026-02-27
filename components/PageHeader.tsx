"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  tagline?: string;
  count?: number;
}

export function PageHeader({ title, tagline, count }: PageHeaderProps) {
  const words = title.split(" ");

  return (
    <div className="mb-12">
      <div className="flex items-baseline gap-3">
        <h1 className="overflow-hidden text-3xl font-semibold tracking-tight text-slate-100">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{ marginRight: "0.22em" }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.09, ease: "easeOut" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        {count !== undefined && (
          <motion.span
            className="font-mono text-sm text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            {count}
          </motion.span>
        )}
      </div>

      {tagline && (
        <motion.p
          className="mt-2 text-sm text-slate-500"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4, ease: "easeOut" }}
        >
          {tagline}
        </motion.p>
      )}

      <motion.div
        className="mt-4 h-px w-12 rounded-full bg-violet-500/50"
        style={{ originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";

export function BackButton() {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm tracking-wide text-slate-500 transition-colors hover:text-slate-300"
      >
        <CornerUpLeft size={14} />
        back
      </Link>
    </motion.div>
  );
}

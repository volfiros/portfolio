"use client";

import { motion } from "framer-motion";
import { CornerUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm tracking-wide text-slate-500 transition-colors hover:text-slate-300"
      >
        <CornerUpLeft size={14} />
        back
      </button>
    </motion.div>
  );
}

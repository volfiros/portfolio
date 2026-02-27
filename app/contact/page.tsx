"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { PageHeader } from "@/components/PageHeader";
import { personalInfo } from "@/lib/data";

function TelegramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const links = [
  {
    icon: Mail,
    label: "email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: TelegramIcon,
    label: "telegram",
    value: `@${personalInfo.telegram.split("/").pop()}`,
    href: personalInfo.telegram,
  },
];

export default function ContactPage() {
  return (
    <div>
      <BackButton />
      <PageHeader
        title="contact"
        tagline="say hello — i'm always happy to chat."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {links.map(({ icon: Icon, label, value, href }, i) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-violet-500/20 hover:bg-violet-500/[0.03]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-slate-500 transition-colors group-hover:bg-violet-500/10 group-hover:text-violet-400">
              <Icon size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-300">{label}</p>
              <p className="truncate font-mono text-[11px] text-slate-600">
                {value}
              </p>
            </div>
            <ArrowUpRight
              size={13}
              className="shrink-0 text-slate-700 transition-colors group-hover:text-violet-400"
            />
          </motion.a>
        ))}
      </div>

      <motion.div
        className="mt-20 text-center"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-xl font-semibold tracking-tight sm:text-2xl overflow-hidden">
          {["let's", "build", "something"].map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-[0.28em] text-slate-700"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              {word}
            </motion.span>
          ))}
        </p>
        <p className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl overflow-hidden">
          {["worth", "remembering."].map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-[0.28em] text-slate-700"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.12, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              {word}
            </motion.span>
          ))}
        </p>
        <div className="mt-4 flex justify-center">
          <motion.div
            className="h-px rounded-full bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
            style={{ width: "2rem" }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: 1,
              scaleX: [0, 1, 3, 1],
            }}
            transition={{
              opacity: { delay: 1.1, duration: 0.4 },
              scaleX: {
                delay: 1.1,
                duration: 2.5,
                times: [0, 0.12, 0.55, 1],
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2,
              },
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

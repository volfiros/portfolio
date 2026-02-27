"use client";

import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Home,
  Mail,
  Github,
  Linkedin,
  Twitter,
  FolderOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { personalInfo } from "@/lib/data";

function TelegramIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const navLinks = [
  { label: "home", path: "/", icon: Home },
  { label: "projects", path: "/projects", icon: FolderOpen },
  { label: "experience", path: "/experience", icon: Briefcase },
  { label: "education", path: "/education", icon: GraduationCap },
  { label: "contact", path: "/contact", icon: Mail },
];

const externalLinks = [
  { label: "github", href: personalInfo.github, icon: Github },
  { label: "linkedin", href: personalInfo.linkedin, icon: Linkedin },
  { label: "twitter", href: personalInfo.twitter, icon: Twitter },
  { label: "email", href: `mailto:${personalInfo.email}`, icon: Mail },
  { label: "telegram", href: personalInfo.telegram, icon: TelegramIcon },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const openExternal = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="fixed left-1/2 top-24 z-[100] w-full max-w-lg px-4"
            style={{ x: "-50%" }}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#0f1220] shadow-2xl overflow-hidden">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

              <Command>
                <div className="flex items-center border-b border-white/[0.06] px-1">
                  <span className="pl-3 text-slate-500">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </span>
                  <Command.Input placeholder="type a command or search..." />
                </div>

                <Command.List>
                  <Command.Empty>no results found.</Command.Empty>

                  <Command.Group heading="navigate">
                    {navLinks.map(({ label, path, icon: Icon }) => (
                      <Command.Item
                        key={path}
                        onSelect={() => navigate(path)}
                        value={label}
                      >
                        <Icon size={13} className="shrink-0" />
                        <span>{label}</span>
                        <ArrowRight
                          size={11}
                          className="ml-auto opacity-30"
                        />
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Separator />

                  <Command.Group heading="connect">
                    {externalLinks.map(({ label, href, icon: Icon }) => (
                      <Command.Item
                        key={href}
                        onSelect={() => openExternal(href)}
                        value={label}
                      >
                        <Icon size={13} className="shrink-0" />
                        <span>{label}</span>
                        <span className="ml-auto text-[10px] text-slate-600 font-mono">
                          ↗
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>

                <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-2">
                  <span className="text-[10px] text-slate-600 font-mono">
                    ↑↓ navigate
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono">
                    ↵ select · esc close
                  </span>
                </div>
              </Command>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

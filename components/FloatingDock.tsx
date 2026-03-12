"use client";

import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Home,
  Mail,
  FolderOpen,
  Search,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const navItems = [
  { icon: Home, label: "home", path: "/" },
  { icon: FolderOpen, label: "projects", path: "/projects" },
  { icon: Briefcase, label: "experience", path: "/experience" },
  { icon: GraduationCap, label: "education", path: "/education" },
  { icon: Mail, label: "contact", path: "/contact" },
];

function DockIcon({
  icon: Icon,
  label,
  mouseX,
  isActive,
  onClick,
  href,
}: {
  icon: React.ElementType;
  label: string;
  mouseX: MotionValue<number>;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distance, [-100, 0, 100], [40, 58, 40]);
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 170, damping: 12 });

  const iconContent = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      suppressHydrationWarning
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setHovered(false); }}
      whileTap={{ scale: 0.88 }}
      className={`relative flex items-center justify-center rounded-xl transition-colors duration-150 ${
        isActive
          ? "bg-violet-600/20 text-violet-400"
          : "text-slate-500 hover:bg-white/[0.06] hover:text-slate-300"
      }`}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-violet-500/20 blur-sm"
          layoutId="activeGlow"
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      )}
      <Icon size={16} strokeWidth={isActive ? 2 : 1.5} className="relative z-10" />
    </motion.div>
  );

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
          >
            <span className="whitespace-nowrap rounded-lg border border-white/[0.08] bg-[#0f1220] px-2 py-1 font-mono text-[10px] text-slate-300">
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {href ? (
        <Link href={href}>{iconContent}</Link>
      ) : (
        <button onClick={onClick}>{iconContent}</button>
      )}

      {isActive && (
        <motion.div
          className="absolute -bottom-1.5 h-0.5 w-3 rounded-full bg-violet-400"
          layoutId="activeDot"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </div>
  );
}

export function FloatingDock() {
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-50"
      style={{ x: "-50%" }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-end gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 backdrop-blur-xl shadow-xl shadow-black/40"
        onPointerMove={(e) => { if (e.pointerType === "mouse") mouseX.set(e.pageX); }}
        onPointerLeave={(e) => { if (e.pointerType === "mouse") mouseX.set(Infinity); }}
      >
        {navItems.map(({ icon, label, path }) => {
          const isActive =
            path === "/" ? pathname === "/" : pathname.startsWith(path);
          return (
            <DockIcon
              key={path}
              icon={icon}
              label={label}
              href={path}
              mouseX={mouseX}
              isActive={isActive}
            />
          );
        })}

        <div className="mx-1 h-5 w-px self-center bg-white/[0.08]" />

        <DockIcon
          icon={Search}
          label="search"
          mouseX={mouseX}
          onClick={() => {
            document.dispatchEvent(
              new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
                bubbles: true,
              })
            );
          }}
        />
      </motion.div>
    </motion.nav>
  );
}

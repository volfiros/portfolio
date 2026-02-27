"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { personalInfo } from "@/lib/data";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((m) => m.GitHubCalendar),
  { ssr: false }
);

const theme = {
  dark: ["#0f1220", "#1e1245", "#3b1fa8", "#6d28d9", "#a78bfa"],
};

export function GithubCalendar() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let cleanup: (() => void) | null = null;

    const setup = (scrollEl: HTMLElement) => {
      (scrollEl.style as any).scrollbarWidth = "none";
      (scrollEl.style as any).msOverflowStyle = "none";
      (scrollEl.style as any).overflowX = "auto";

      const styleId = "github-cal-no-scrollbar";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          .github-cal-inner::-webkit-scrollbar { display: none !important; }
        `;
        document.head.appendChild(style);
      }

      scrollEl.classList.add("github-cal-inner");
      scrollEl.style.cursor = "grab";

      let isDragging = false;
      let startX = 0;
      let startScrollLeft = 0;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        startX = e.pageX;
        startScrollLeft = scrollEl.scrollLeft;
        scrollEl.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        scrollEl.scrollLeft = startScrollLeft - (e.pageX - startX);
      };

      const onMouseUp = () => {
        if (!isDragging) return;
        isDragging = false;
        scrollEl.style.cursor = "grab";
        document.body.style.userSelect = "";
      };

      let touchStartX = 0;
      let touchStartScrollLeft = 0;

      const onTouchStart = (e: TouchEvent) => {
        touchStartX = e.touches[0].pageX;
        touchStartScrollLeft = scrollEl.scrollLeft;
      };

      const onTouchMove = (e: TouchEvent) => {
        scrollEl.scrollLeft = touchStartScrollLeft - (e.touches[0].pageX - touchStartX);
      };

      scrollEl.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      scrollEl.addEventListener("touchstart", onTouchStart, { passive: true });
      scrollEl.addEventListener("touchmove", onTouchMove, { passive: true });

      cleanup = () => {
        scrollEl.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        scrollEl.removeEventListener("touchstart", onTouchStart);
        scrollEl.removeEventListener("touchmove", onTouchMove);
        document.body.style.userSelect = "";
      };
    };

    const findCalendarScrollEl = (): HTMLElement | null => {
      const candidates = wrapper.querySelectorAll<HTMLElement>("[style]");
      for (const el of candidates) {
        if (el.style.overflowX === "auto" || el.style.overflowX === "scroll") {
          return el;
        }
      }
      return null;
    };

    const trySetup = (): boolean => {
      const el = findCalendarScrollEl();
      if (el) { setup(el); return true; }
      return false;
    };

    if (trySetup()) return () => cleanup?.();

    const observer = new MutationObserver(() => {
      if (trySetup()) observer.disconnect();
    });

    observer.observe(wrapper, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[10px] tracking-widest text-slate-600 uppercase">
          contributions
        </p>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-slate-700 transition-colors hover:text-violet-400"
        >
          {personalInfo.github.replace("https://", "")} ↗
        </a>
      </div>

      <div ref={wrapperRef}>
        <GitHubCalendar
          username={personalInfo.github.split("/").pop() ?? ""}
          colorScheme="dark"
          theme={theme}
          year={2026}
          blockSize={10}
          blockMargin={3}
          fontSize={10}
          style={{ color: "#475569" }}
        />
      </div>
    </motion.div>
  );
}

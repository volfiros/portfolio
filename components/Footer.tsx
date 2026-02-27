"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/lib/data";

function formatVisits(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return n.toString();
}

export function Footer() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visits")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === "number") setVisits(data.count);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="w-full bg-[#080b14]">
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex items-center justify-center gap-3 py-5">
          <span className="font-mono text-[10px] text-slate-700">© {new Date().getFullYear()}</span>
          <span className="h-3 w-px bg-white/[0.06]" />
          <span className="font-mono text-[10px] text-slate-700">
            built with next.js
          </span>
          {visits !== null && (
            <>
              <span className="h-3 w-px bg-white/[0.06]" />
              <span className="font-mono text-[10px] text-slate-700">
                {formatVisits(visits)} visits
              </span>
            </>
          )}
        </div>
      </div>

      <div
        className="w-full overflow-hidden"
        style={{
          height: "clamp(60px, 13vw, 190px)",
          background:
            "linear-gradient(to bottom, #080b14 0%, #06091c 40%, #040210 100%)",
        }}
      >
        <p
          className="select-none text-center font-bold leading-none tracking-tighter"
          style={{
            fontSize: "clamp(56px, 22vw, 320px)",
            lineHeight: 1,
            background:
              "linear-gradient(to bottom, rgba(180, 170, 240, 0.14), rgba(180, 170, 240, 0.01))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {personalInfo.name.split(" ")[0].toLowerCase()}
        </p>
      </div>
    </footer>
  );
}

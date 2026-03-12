"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particlesConfig: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: { value: 70, density: { enable: true, width: 1200, height: 800 } },
    color: {
      value: ["#a78bfa", "#8b5cf6", "rgba(255,255,255,0.3)"],
    },
    opacity: {
      value: { min: 0.15, max: 0.35 },
      animation: { enable: true, speed: 0.3, startValue: "random", sync: false },
    },
    size: {
      value: { min: 1, max: 2.5 },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#8b5cf6",
      opacity: 0.08,
      width: 1,
    },
    move: {
      enable: true,
      speed: { min: 0.3, max: 0.6 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.15, color: "#a78bfa" } },
    },
  },
  detectRetina: true,
};

export default function ParticleBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      options={particlesConfig}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

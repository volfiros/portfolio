"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { useState, useEffect } from "react";

const Avatar3DScene = dynamic(() => import("./Avatar3D"), {
  ssr: false,
  loading: () => null,
});

export function Avatar3DWrapper({ onReady }: { onReady?: () => void }) {
  const reduce = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  useEffect(() => {
    if (reduce) {
      setIntroComplete(true);
      onReady?.();
    }
  }, [reduce, onReady]);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    onReady?.();
  };

  // Fallback: 2D avatar if WebGL unavailable
  if (!webglSupported) {
    return (
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
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-violet-500/20 ring-2 ring-violet-500/10 ring-offset-2 ring-offset-[#080b14] sm:h-28 sm:w-28">
            <Image
              src="/assets/avatar.jpeg"
              alt={personalInfo.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Full-screen overlay during intro */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ background: "rgba(8, 11, 20, 0.95)" }}
          >
            {/* Violet glow behind the model during intro */}
            <div className="absolute h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="relative h-[400px] w-[400px]">
              <Avatar3DScene
                reducedMotion={!!reduce}
                isOverlay={true}
                onIntroComplete={handleIntroComplete}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline avatar in hero after intro */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={introComplete ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative shrink-0"
        style={{ width: 160, height: 160 }}
      >
        <div className="pointer-events-none absolute -inset-4 rounded-full bg-violet-500/10 blur-xl" />
        {introComplete && (
          <Avatar3DScene
            reducedMotion={!!reduce}
            isOverlay={false}
            onIntroComplete={() => {}}
          />
        )}
      </motion.div>
    </>
  );
}

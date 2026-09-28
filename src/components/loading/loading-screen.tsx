"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const MOBILE_COLUMNS = [0, 1, 2, 3, 4];
const DESKTOP_COLUMNS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function LoadingScreen() {
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = Date.now();
    const duration = 1200;
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(next);
      if (next >= 100) clearInterval(progressTimer);
    }, 16);

    const finishTimer = setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = originalOverflow;
    }, 2850);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isFinished) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-auto flex overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.55,
          times: [0, 0.15, 0.82, 1],
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-20 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-neutral-900/60 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-full bg-red-600"
          />
        </div>

        <div className="absolute top-3 right-6 flex items-baseline gap-1 font-mono text-sm sm:text-base text-neutral-300 tabular-nums">
          <span className="font-semibold">{progress}</span>
          <span className="text-xs text-neutral-500">%</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-wide text-white uppercase font-sans"
          >
            SARFRAZ <span className="text-red-600">AUTOS</span>
          </motion.h1>
        </div>
      </motion.div>

      <div className="absolute inset-0 flex w-full h-full z-10 pointer-events-none md:hidden">
        {MOBILE_COLUMNS.map((index) => (
          <motion.div
            key={index}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{
              duration: 0.75,
              delay: 1.45 + index * 0.08,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ width: "20%", transformOrigin: "top" }}
            className="origin-top h-full bg-black border-r border-neutral-900/60 last:border-r-0 will-change-transform"
          />
        ))}
      </div>

      <div className="absolute inset-0 hidden md:flex w-full h-full z-10 pointer-events-none">
        {DESKTOP_COLUMNS.map((index) => (
          <motion.div
            key={index}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{
              duration: 0.75,
              delay: 1.45 + index * 0.05,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ width: "10%", transformOrigin: "top" }}
            className="origin-top h-full bg-black border-r border-neutral-900/60 last:border-r-0 will-change-transform"
          />
        ))}
      </div>
    </div>
  );
}

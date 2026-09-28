"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { HeroScene3D, HeroStatsCard, RightParts } from "./hero";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative flex items-end text-white bg-black h-full min-h-screen overflow-hidden"
    >
      <HeroScene3D />

      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-72 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

      <div className="absolute left-3 sm:left-6 xl:left-12 top-24 sm:top-32 z-20 pointer-events-auto hidden md:block">
        <HeroStatsCard />
      </div>

      <div className="absolute right-3 sm:right-6 xl:right-12 top-24 sm:top-32 z-20 pointer-events-auto">
        <RightParts />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 xl:px-16 w-full pointer-events-none">
        <div className="flex flex-col gap-4 sm:gap-6 py-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 1.95, ease: "easeOut" }}
            className="flex items-start gap-2.5 md:gap-4 pointer-events-auto"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
              <motion.img
                src="/wheel-rim.png"
                alt="Motorcycle Wheel Rim"
                width={48}
                height={48}
                className="w-full h-full object-contain drop-shadow-[0_0_3px_rgba(220,38,38,0.5)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="sm:text-base text-sm sm:leading-6 leading-5 font-normal text-white sm:max-w-sm">
              Supplying <span className="text-red-500 font-semibold">100% genuine</span>{" "}
              Crown motorcycle spare parts &amp; bulk orders across Pakistan.
            </p>
          </motion.div>

          <div className="flex sm:flex-row flex-col items-start lg:items-baseline gap-4 pointer-events-auto">
            <div className="overflow-hidden pb-1 sm:pb-3">
              <motion.h1
                initial={{ y: "125%" }}
                animate={isInView ? { y: "0%" } : { y: "125%" }}
                transition={{
                  duration: 0.95,
                  delay: 2.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-10 lg:leading-32 font-bold tracking-tight inline-block"
              >
                SARFRAZ AUTOS
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "125%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : { y: "125%", opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 2.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a href="/login" className="block">
                  <div className="bg-red-600 hover:bg-red-700 transition-colors rounded-full p-1 pl-8">
                    <div className="lg:p-3 p-2 bg-white text-black rounded-full">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

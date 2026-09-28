"use client";

import dynamic from "next/dynamic";

export const HeroScene3D = dynamic(() => import("./HeroScene3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#080808] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
    </div>
  ),
});

export { RightParts } from "./PartsSelector";
export { HeroStatsCard } from "./HeroStatsCard";
export { useHeroStore } from "./useHeroStore";

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

interface TabData {
  category: string;
  badge: string;
  link: string;
  stat: string;
  title: string;
  description: string;
}

const TABS: TabData[] = [
  {
    category: "Wholesale",
    badge: "Master Cartons",
    link: "/wholesale",
    stat: "40%",
    title: "higher dealer profit margins",
    description:
      "with direct factory bilty dispatch to all cities across Pakistan from Karachi master warehouse.",
  },
  {
    category: "Retail",
    badge: "Genuine Parts",
    link: "/retail",
    stat: "100%",
    title: "authentic Crown guaranteed",
    description:
      "over-the-counter and doorstep delivery for mechanics and individual motorcycle riders.",
  },
];

export function HeroStatsCard() {
  const [activeTab, setActiveTab] = useState(0);
  const current = TABS[activeTab % TABS.length];

  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-white/15 p-5 sm:p-6 w-[275px] sm:w-[305px] text-white backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300"
      style={{
        background:
          "radial-gradient(circle at 18% 12%, rgba(220, 38, 38, 0.88) 0%, rgba(153, 27, 27, 0.45) 45%, rgba(12, 12, 12, 0.95) 85%)",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-base sm:text-lg font-bold tracking-tight text-white">
          {current.category}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setActiveTab((prev) => (prev + 1) % TABS.length)}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-[11px] sm:text-xs font-normal text-white flex items-center gap-1 transition-colors shrink-0"
          >
            <span>{current.badge}</span>
            <ChevronDown className="w-3 h-3 text-white/80 shrink-0" />
          </button>

          <Link
            href={current.link}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0"
          >
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-white" />
          </Link>
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <div className="flex items-start gap-1">
          <span className="text-5xl sm:text-6xl font-light tracking-tight text-white leading-none">
            {current.stat}
          </span>
          <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 shrink-0 mt-1" />
        </div>

        <div className="mt-3.5 sm:mt-4">
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
            {current.title}
          </h2>
          <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed font-normal mt-1 min-h-[34px]">
            {current.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-5 sm:mt-6 px-0.5">
        {TABS.map((tab, idx) => {
          const isSelected = activeTab === idx;
          return (
            <button
              key={tab.category}
              onClick={() => setActiveTab(idx)}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                isSelected ? "bg-white" : "bg-white/25 hover:bg-white/40"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

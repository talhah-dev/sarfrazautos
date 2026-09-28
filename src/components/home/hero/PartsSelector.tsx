"use client";

import { useHeroStore, HeroPart } from "./useHeroStore";
import { Cog, Zap, RotateCcw } from "lucide-react";

interface PartItem {
  id: HeroPart;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

const RIGHT_PARTS: PartItem[] = [
  {
    id: "engine",
    name: "Engine Assembly",
    badge: "1000cc DOHC Block",
    icon: Cog,
  },
  {
    id: "headlight",
    name: "LED Headlight",
    badge: "Twin Projector Beam",
    icon: Zap,
  },
];

function PartCard({ item }: { item: PartItem }) {
  const activePart = useHeroStore((s) => s.activePart);
  const setActivePart = useHeroStore((s) => s.setActivePart);
  const Icon = item.icon;
  const isActive = activePart === item.id;

  return (
    <button
      onClick={() => setActivePart(isActive ? "bike" : item.id)}
      className={`group relative flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 backdrop-blur-md w-48 sm:w-56 pointer-events-auto ${isActive
          ? "bg-red-950/50 border-red-500 shadow-[0_0_24px_rgba(239,68,68,0.35)] ring-1 ring-red-500/50"
          : "bg-neutral-900/60 border-neutral-800/80 hover:bg-neutral-800/80 hover:border-neutral-700"
        }`}
    >
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive
            ? "bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.6)]"
            : "bg-neutral-800/90 text-neutral-400 group-hover:text-white group-hover:bg-neutral-700"
          }`}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      <div className="min-w-0 flex-1">
        <span
          className={`text-xs sm:text-sm font-semibold block truncate transition-colors ${isActive ? "text-white" : "text-neutral-200 group-hover:text-white"
            }`}
        >
          {item.name}
        </span>
        <span
          className={`text-[10px] sm:text-[11px] block truncate transition-colors ${isActive ? "text-red-400 font-medium" : "text-neutral-400"
            }`}
        >
          {item.badge}
        </span>
      </div>

      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 shadow-[0_0_6px_#ef4444]" />
      )}
    </button>
  );
}

export function RightParts() {
  const activePart = useHeroStore((s) => s.activePart);
  const setActivePart = useHeroStore((s) => s.setActivePart);

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 items-end">
      {activePart !== "bike" && (
        <button
          onClick={() => setActivePart("bike")}
          className="text-[11px] font-medium text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 pointer-events-auto mb-0.5"
        >
          <RotateCcw className="w-3 h-3 text-red-500" />
          <span>Full Superbike</span>
        </button>
      )}
      {RIGHT_PARTS.map((item) => (
        <PartCard key={item.id} item={item} />
      ))}
    </div>
  );
}

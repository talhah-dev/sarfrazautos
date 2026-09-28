import { create } from "zustand";

export type HeroPart = "bike" | "engine" | "tires" | "headlight" | "exhaust";

export interface PartViewConfig {
  id: HeroPart;
  label: string;
  sublabel: string;
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
  fov: number;
}

export const PART_CONFIGS: Record<HeroPart, PartViewConfig> = {
  bike: {
    id: "bike",
    label: "Full Superbike",
    sublabel: "Crown Genuine Edition",
    cameraPos: [4.2, 0.4, 0.9],
    targetPos: [0, 0.25, 0],
    fov: 30,
  },
  engine: {
    id: "engine",
    label: "Engine Assembly",
    sublabel: "1000cc DOHC Block",
    cameraPos: [1.3, 0.1, 0.2],
    targetPos: [0.05, 0.0, -0.02],
    fov: 20,
  },
  tires: {
    id: "tires",
    label: "Wheels & Tires",
    sublabel: "Racing Alloy Slicks",
    cameraPos: [1.2, -0.1, -0.65],
    targetPos: [-0.01, -0.21, -0.95],
    fov: 22,
  },
  headlight: {
    id: "headlight",
    label: "LED Headlight",
    sublabel: "Twin Projector Beam",
    cameraPos: [0.6, 0.75, -2.1],
    targetPos: [-0.01, 0.67, -1.0],
    fov: 20,
  },
  exhaust: {
    id: "exhaust",
    label: "Titanium Exhaust",
    sublabel: "Performance Full System",
    cameraPos: [1.5, -0.15, 1.1],
    targetPos: [0.32, -0.27, 0.58],
    fov: 22,
  },
};

interface HeroState {
  activePart: HeroPart;
  setActivePart: (part: HeroPart) => void;
  hoveredPart: HeroPart | null;
  setHoveredPart: (part: HeroPart | null) => void;
  partPositions: Partial<Record<HeroPart, [number, number, number]>>;
  setPartPosition: (part: HeroPart, pos: [number, number, number]) => void;
}

export const useHeroStore = create<HeroState>((set) => ({
  activePart: "bike",
  setActivePart: (part) => set({ activePart: part }),
  hoveredPart: null,
  setHoveredPart: (part) => set({ hoveredPart: part }),
  partPositions: {},
  setPartPosition: (part, pos) =>
    set((state) => ({
      partPositions: { ...state.partPositions, [part]: pos },
    })),
}));

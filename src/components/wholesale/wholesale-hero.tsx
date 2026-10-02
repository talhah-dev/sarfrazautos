"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BIKES = [
  { id: "all", name: "All Brands" },
  { id: "honda", name: "Honda" },
  { id: "super-power", name: "Super Power" },
  { id: "unique", name: "Unique" },
  { id: "road-prince", name: "Road Prince" },
  { id: "crown", name: "Crown" },
  { id: "suzuki", name: "Suzuki" },
  { id: "yamaha", name: "Yamaha" },
  { id: "united", name: "United" },
  { id: "hi-speed", name: "Hi-Speed" },
  { id: "habib", name: "Habib" },
  { id: "super-star", name: "Super Star" },
  { id: "others", name: "Others" },
];

const CATEGORIES = [
  "All",
  "Cylinders & Heads",
  "Engine Blocks",
  "Clutch Plates",
  "Crankshafts",
  "Carburetors",
  "Others",
];

export function WholesaleHero({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  activeBike = "All Brands",
  onBikeChange,
  className = "",
}: {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  activeBike?: string;
  onBikeChange?: (bike: string) => void;
  className?: string;
}) {
  return (
    <section className={cn("w-full bg-white pt-12 md:pt-16 pb-8", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-semibold tracking-tight capitalize text-neutral-950 md:text-start text-center leading-tight">
            Wholesale spare parts &amp;{" "}
            <span className="text-red-600">master cartons.</span>
          </h1>

          <p className="text-neutral-500 text-sm sm:text-base mt-3 leading-relaxed md:block hidden">
            <span>
              Direct factory master cartons &amp; volume dealer supply across Pakistan. Dispatch from Saddar &amp; SITE Hub.
            </span>
          </p>
        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search wholesale cartons (e.g. cylinder, block, clutch)..."
              className="w-full h-9 pl-10 pr-4 transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Select value={activeCategory} onValueChange={(val) => onCategoryChange(val as string)}>
              <SelectTrigger className=" w-full sm:w-[190px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={activeBike} onValueChange={(val) => onBikeChange?.(val as string)}>
              <SelectTrigger className=" w-full sm:w-[190px]">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Motorcycle Brands</SelectLabel>
                  {BIKES.map((bike) => (
                    <SelectItem key={bike.id} value={bike.name}>
                      {bike.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WholesaleHero;

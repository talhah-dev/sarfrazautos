import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function RetailHero({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  className = "",
}: {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  className?: string;
}) {
  const categories = [
    "All",
    "Clutch & Gears",
    "Engine & Parts",
    "Carburetor & Air",
    "Brakes",
    "Electrical",
    "Others",
  ];

  return (
    <section className={cn("w-full bg-white pt-12 md:pt-16 pb-8", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold mb-4 border border-red-100">
            <span>Retail Counter &amp; Direct-to-Consumer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-950 leading-tight">
            Single parts &amp; retail counter.{" "}
            <span className="text-red-600">Built for Riders.</span>
          </h1>

          <p className="text-neutral-500 text-sm sm:text-base mt-3 leading-relaxed">
            <span className="md:hidden">
              Genuine single replacement parts &amp; overhaul kits at wholesale rates. Instant Saddar pickup or delivery.
            </span>
            <span className="hidden md:inline">
              Order single unit replacement parts, engine overhaul kits, and performance spares at direct wholesale retail prices. Available for instant pickup at our Saddar market shop or door-to-door delivery.
            </span>
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search parts by name (e.g. cylinder, clutch, piston)..."
              className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-neutral-200 bg-white placeholder:text-neutral-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer",
                  activeCategory === cat
                    ? "bg-red-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RetailHero;

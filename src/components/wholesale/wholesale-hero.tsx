import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function WholesaleHero({
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
    "Cylinders & Heads",
    "Engine Blocks",
    "Clutch Plates",
    "Crankshafts",
    "Carburetors",
    "Others",
  ];

  return (
    <section className={cn("w-full bg-white pt-12 md:pt-16 pb-8", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold mb-4 border border-red-100">
            <span>Bulk Master Cartons &amp; Dealer Rates</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-950 leading-tight">
            Wholesale spare parts &amp; master cartons.{" "}
            <span className="text-red-600">Built for Dealers.</span>
          </h1>

          <p className="text-neutral-500 text-sm sm:text-base mt-3 leading-relaxed">
            <span className="md:hidden">
              Direct factory master cartons &amp; volume dealer supply across Pakistan. Dispatch from Saddar &amp; SITE Hub.
            </span>
            <span className="hidden md:inline">
              Source direct factory master cartons and volume crates for retail shops, mechanics, and dealerships. Dispatched straight from our Saddar wholesale counters and SITE central logistics hub.
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
              placeholder="Search wholesale cartons (e.g. cylinder, block, clutch)..."
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

export default WholesaleHero;

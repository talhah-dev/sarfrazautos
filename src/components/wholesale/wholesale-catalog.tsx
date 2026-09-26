"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WholesaleProduct {
  id: string;
  name: string;
  price: string;
  category: string;
  badge?: string;
  image: string;
}

const allWholesaleProducts: WholesaleProduct[] = [
  {
    id: "ws-1",
    name: "CD70 Complete Cylinder Head (Carton of 12)",
    price: "Rs. 84,000 / ctn",
    category: "Cylinders & Heads",
    badge: "-20%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-2",
    name: "4-Stroke Engine Block Master Crate (6 sets)",
    price: "Rs. 92,000 / crate",
    category: "Engine Blocks",
    badge: "-15%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-3",
    name: "125cc Piston Kits Bulk Box (25 pcs)",
    price: "Rs. 87,500 / box",
    category: "Cylinders & Heads",
    badge: "-25%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-4",
    name: "Crown Heavy Clutch Plates Bulk Pack (50 sets)",
    price: "Rs. 135,000 / ctn",
    category: "Clutch Plates",
    badge: "-10%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-5",
    name: "Performance Crankshaft Wholesale Pack (10 pcs)",
    price: "Rs. 85,000 / box",
    category: "Crankshafts",
    badge: "-15%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-6",
    name: "Oil Pump Assemblies Master Box (30 pcs)",
    price: "Rs. 64,500 / box",
    category: "Others",
    badge: "-20%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-7",
    name: "Camshaft & Rocker Arm Sets (20 kits)",
    price: "Rs. 92,000 / ctn",
    category: "Cylinders & Heads",
    badge: "-18%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-8",
    name: "Complete Overhaul Gasket Master Carton (100 pk)",
    price: "Rs. 145,000 / ctn",
    category: "Others",
    badge: "-30%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-9",
    name: "Japanese Standard Carburetors Bulk Crate (20 pcs)",
    price: "Rs. 88,000 / ctn",
    category: "Carburetors",
    badge: "-15%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-10",
    name: "CG125 Cylinder Block Barrel (Master Carton of 8)",
    price: "Rs. 98,000 / ctn",
    category: "Engine Blocks",
    badge: "-12%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-11",
    name: "Complete Clutch Housing Master Box (15 pcs)",
    price: "Rs. 94,500 / box",
    category: "Clutch Plates",
    badge: "-18%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-12",
    name: "CD70 Heavy Duty Connecting Rods (50 pcs)",
    price: "Rs. 58,000 / box",
    category: "Crankshafts",
    badge: "-20%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-13",
    name: "High-Compression Cylinder Kits 150cc (10 sets)",
    price: "Rs. 110,000 / ctn",
    category: "Cylinders & Heads",
    badge: "-15%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-14",
    name: "OEM Specification Stator Coils Bulk Pack (25 pcs)",
    price: "Rs. 96,000 / ctn",
    category: "Others",
    badge: "-22%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-15",
    name: "Front & Rear Brake Shoes Master Crate (100 pairs)",
    price: "Rs. 125,000 / crate",
    category: "Others",
    badge: "-25%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-16",
    name: "Deluxe Carburetor Repair Kits Bulk Box (100 sets)",
    price: "Rs. 42,000 / box",
    category: "Carburetors",
    badge: "-10%",
    image: "/wholesale-bulk.png",
  },
];

export function WholesaleCatalog({
  searchQuery = "",
  activeCategory = "All",
  className = "",
}: {
  searchQuery?: string;
  activeCategory?: string;
  className?: string;
}) {
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const filteredProducts = allWholesaleProducts.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAdd = (id: string) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 1800);
  };

  return (
    <section className={cn("w-full bg-white md:pt-6 md:pb-20 pb-16", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200">
            <h3 className="text-base font-semibold text-neutral-900">
              No wholesale cartons found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find matching wholesale cartons for &quot;{searchQuery}&quot;. Try searching for another part name or clear filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:gap-y-16 gap-y-10">
            {filteredProducts.map((product) => {
              const isAdded = !!addedItems[product.id];
              return (
                <div key={product.id} className="group flex flex-col">
                  <Link
                    href="/wholesale-product-overview"
                    className="relative aspect-square w-full rounded-2xl bg-[#f4f4f5] overflow-hidden p-6 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ebebee]"
                  >
                    {product.badge && (
                      <span className="absolute top-3.5 left-3.5 text-xs font-semibold px-2.5 py-0.5 rounded-full z-10 bg-red-100 text-red-600">
                        {product.badge}
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex items-center justify-between gap-3 mt-3.5">
                    <Link href="/wholesale-product-overview" className="min-w-0 flex-1 group/title">
                      <h3 className="font-medium text-neutral-900 group-hover/title:text-red-600 transition-colors text-sm md:text-base leading-snug line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="font-semibold text-neutral-900 text-sm md:text-base">
                          {product.price}
                        </p>
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleAdd(product.id)}
                      aria-label={`Order wholesale bulk ${product.name}`}
                      className={cn(
                        "shrink-0 size-9 rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer",
                        isAdded
                          ? "bg-green-600 text-white scale-105"
                          : "bg-red-600 hover:bg-red-700 active:scale-95 text-white"
                      )}
                    >
                      {isAdded ? (
                        <Check className="size-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="size-4 stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default WholesaleCatalog;

"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Eye, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WholesaleProduct {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  rating?: number;
  badge?: string;
  image: string;
}

const allWholesaleProducts: WholesaleProduct[] = [
  {
    id: "ws-1",
    name: "CD70 Complete Cylinder Head",
    price: "Rs. 84,000",
    originalPrice: "Rs. 105,000",
    category: "Cylinders & Heads",
    rating: 4.9,
    badge: "-20%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-2",
    name: "4-Stroke Engine Block",
    price: "Rs. 92,000",
    originalPrice: "Rs. 108,000",
    category: "Engine Blocks",
    rating: 4.8,
    badge: "-15%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-3",
    name: "125cc Piston Kit",
    price: "Rs. 87,500",
    originalPrice: "Rs. 116,000",
    category: "Cylinders & Heads",
    rating: 4.9,
    badge: "-25%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-4",
    name: "Crown Heavy Duty Clutch Plates",
    price: "Rs. 135,000",
    originalPrice: "Rs. 150,000",
    category: "Clutch Plates",
    rating: 4.7,
    badge: "-10%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-5",
    name: "Performance Crankshaft Assembly",
    price: "Rs. 85,000",
    originalPrice: "Rs. 100,000",
    category: "Crankshafts",
    rating: 4.8,
    badge: "-15%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-6",
    name: "Deluxe High-Flow Oil Pump",
    price: "Rs. 64,500",
    originalPrice: "Rs. 80,000",
    category: "Others",
    rating: 4.6,
    badge: "-20%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-7",
    name: "Camshaft & Rocker Arm Set",
    price: "Rs. 92,000",
    originalPrice: "Rs. 112,000",
    category: "Cylinders & Heads",
    rating: 4.8,
    badge: "-18%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-8",
    name: "Complete Overhaul Gasket Set",
    price: "Rs. 145,000",
    originalPrice: "Rs. 205,000",
    category: "Others",
    rating: 4.7,
    badge: "-30%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-9",
    name: "Japanese Standard Carburetor",
    price: "Rs. 88,000",
    originalPrice: "Rs. 103,500",
    category: "Carburetors",
    rating: 4.9,
    badge: "-15%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-10",
    name: "CG125 Cylinder Block Barrel",
    price: "Rs. 98,000",
    originalPrice: "Rs. 111,000",
    category: "Engine Blocks",
    rating: 4.8,
    badge: "-12%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-11",
    name: "Complete Clutch Housing & Plate",
    price: "Rs. 94,500",
    originalPrice: "Rs. 115,000",
    category: "Clutch Plates",
    rating: 4.7,
    badge: "-18%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-12",
    name: "CD70 Heavy Duty Connecting Rod",
    price: "Rs. 58,000",
    originalPrice: "Rs. 72,500",
    category: "Crankshafts",
    rating: 4.9,
    badge: "-20%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-13",
    name: "High-Compression Cylinder Kit 150cc",
    price: "Rs. 110,000",
    originalPrice: "Rs. 129,000",
    category: "Cylinders & Heads",
    rating: 4.8,
    badge: "-15%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-14",
    name: "OEM Specification Stator Coil",
    price: "Rs. 96,000",
    originalPrice: "Rs. 123,000",
    category: "Others",
    rating: 4.6,
    badge: "-22%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-15",
    name: "Front & Rear Brake Shoe Set",
    price: "Rs. 125,000",
    originalPrice: "Rs. 166,000",
    category: "Others",
    rating: 4.8,
    badge: "-25%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-16",
    name: "Deluxe Carburetor Repair Kit",
    price: "Rs. 42,000",
    originalPrice: "Rs. 46,500",
    category: "Carburetors",
    rating: 4.7,
    badge: "-10%",
    image: "/wholesale-bulk.png",
  },
];

export function WholesaleCatalog({
  searchQuery = "",
  activeCategory = "All",
  activeBike = "All Brands",
  className = "",
}: {
  searchQuery?: string;
  activeCategory?: string;
  activeBike?: string;
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

    const matchesBike =
      !activeBike ||
      activeBike === "All Brands" ||
      activeBike === "All" ||
      p.name.toLowerCase().includes(activeBike.toLowerCase()) ||
      (activeBike === "Others" &&
        !["Honda", "Suzuki", "Yamaha", "Crown", "Road Prince", "Super Power", "Unique", "United"].some((b) =>
          p.name.toLowerCase().includes(b.toLowerCase())
        ));

    return matchesSearch && matchesCategory && matchesBike;
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
                      className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
                    />

                    <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-neutral-900 text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="size-3.5 text-neutral-700" />
                        <span>Preview</span>
                      </span>
                    </div>
                  </Link>

                  <div className="mt-3.5 flex flex-col gap-1 flex-1">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-neutral-500 font-medium truncate">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-neutral-700 font-semibold shrink-0">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating || 4.5}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 mt-0.5">
                      <Link href="/wholesale-product-overview" className="min-w-0 flex-1 group/title">
                        <h3 className="font-medium text-neutral-900 group-hover/title:text-red-600 transition-colors text-sm md:text-base leading-snug line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="font-semibold text-neutral-900 text-sm md:text-base">
                            {product.price}
                          </p>
                          {product.originalPrice && (
                            <span className="text-xs md:text-sm text-red-600 line-through font-normal">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleAdd(product.id)}
                        aria-label={`Order wholesale bulk ${product.name}`}
                        className={cn(
                          "shrink-0 size-9 rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer mt-0.5",
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

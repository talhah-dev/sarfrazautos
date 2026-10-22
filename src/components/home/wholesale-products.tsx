"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Eye, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export interface WholesaleItem {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  category?: string;
  brand?: string;
  rating?: number;
  badge?: string;
  image: string;
}

const defaultWholesaleProducts: WholesaleItem[] = [
  {
    id: "ws-1",
    name: "CD70 Complete Cylinder Head",
    price: "Rs. 84,000",
    originalPrice: "Rs. 105,000",
    category: "Cylinders & Heads",
    brand: "Honda",
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
    brand: "Honda",
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
    brand: "Honda",
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
    brand: "Crown",
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
    brand: "Honda",
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
    brand: "Honda",
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
    brand: "Honda",
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
    brand: "Honda",
    rating: 4.7,
    badge: "-30%",
    image: "/wholesale-bulk.png",
  },
];

export function WholesaleProducts({
  title = "Wholesale & Bulk Supply",
  products = defaultWholesaleProducts,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  products?: WholesaleItem[];
  className?: string;
}) {
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAdd = (id: string) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 1800);
  };

  return (
    <section id="wholesale" className={cn("w-full bg-white text-neutral-900 py-14 md:py-20 border-t border-zinc-100", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl md:text-start text-center font-semibold tracking-tight text-foreground opacity-90">
              {title}
            </h2>
          </div>
          <Link
            href="/wholesale"
            className="group md:flex hidden items-center gap-1.5 text-sm font-medium text-neutral-800 hover:text-red-600 transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:gap-y-16 gap-y-10">
          {products.map((product) => {
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
                      {product.category || "Bulk Supply"}
                    </span>
                    <div className="flex items-center gap-1 text-neutral-700 font-semibold shrink-0">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating || 4.8}</span>
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
                      {product.brand && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                          <span className="text-neutral-400 font-medium">Brand:</span>
                          <span className="font-semibold text-neutral-800">
                            {product.brand}
                          </span>
                        </div>
                      )}
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
        <Link href="/wholesale">
          <Button className="md:hidden flex items-center justify-center mt-12 mx-auto ">
            View all
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default WholesaleProducts;

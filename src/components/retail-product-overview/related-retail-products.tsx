"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RelatedProductItem {
  id: string;
  name: string;
  price: string;
  badge?: string;
  image: string;
}

const relatedProducts: RelatedProductItem[] = [
  {
    id: "rel-1",
    name: "125cc Piston & Ring Kit (Standard)",
    price: "Rs. 4,200",
    badge: "-10%",
    image: "/bike-engine.png",
  },
  {
    id: "rel-2",
    name: "Crown Heavy Duty Clutch Plate Set",
    price: "Rs. 3,150",
    badge: "-20%",
    image: "/bike-engine.png",
  },
  {
    id: "rel-3",
    name: "CD70 Performance Crankshaft Assembly",
    price: "Rs. 9,600",
    badge: "-15%",
    image: "/bike-engine.png",
  },
  {
    id: "rel-4",
    name: "Japanese Standard Carburetor Assembly",
    price: "Rs. 4,950",
    badge: "-12%",
    image: "/bike-engine.png",
  },
];

export function RelatedRetailProducts({ className = "" }: { className?: string }) {
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAdd = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 1800);
  };

  return (
    <section className={cn("w-full bg-white py-12 md:py-16 border-t border-neutral-100", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950">
            You may also like
          </h2>
          <p className="text-sm text-neutral-500 mt-1.5">
            Recommended replacement parts and compatible components for your engine overhaul.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((product) => {
            const isAdded = !!addedItems[product.id];
            return (
              <div key={product.id} className="group flex flex-col">
                <Link
                  href="/product-overview"
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
                  <Link href="/product-overview" className="min-w-0 flex-1 group/title">
                    <h3 className="font-medium text-neutral-900 group-hover/title:text-red-600 transition-colors text-sm md:text-base leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="font-semibold text-neutral-900 text-sm md:text-base mt-0.5">
                      {product.price}
                    </p>
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => handleAdd(product.id, e)}
                    aria-label={`Add ${product.name} to cart`}
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
      </div>
    </section>
  );
}

export default RelatedRetailProducts;

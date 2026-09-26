"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  badge?: string;
  image: string;
}

const defaultProducts: ProductItem[] = [
  {
    id: "prod-1",
    name: "Complete 70cc Cylinder Head Assembly",
    price: "Rs. 8,450",
    badge: "-25%",
    image: "/bike-engine.png",
  },
  {
    id: "prod-2",
    name: "High-Compression 4-Stroke Engine Block",
    price: "Rs. 16,800",
    badge: "-15%",
    image: "/bike-engine.png",
  },
  {
    id: "prod-3",
    name: "125cc Piston & Ring Kit (Standard)",
    price: "Rs. 4,200",
    badge: "-10%",
    image: "/bike-engine.png",
  },
  {
    id: "prod-4",
    name: "Crown Heavy Duty Clutch Plate Set",
    price: "Rs. 3,150",
    badge: "-20%",
    image: "/bike-engine.png",
  },
  {
    id: "prod-5",
    name: "CD70 Performance Crankshaft Assembly",
    price: "Rs. 9,600",
    badge: "-15%",
    image: "/bike-engine.png",
  },
  {
    id: "prod-6",
    name: "Deluxe Engine Oil Pump Assembly",
    price: "Rs. 2,450",
    image: "/bike-engine.png",
  },
  {
    id: "prod-7",
    name: "Heavy Duty Camshaft & Rocker Arm Set",
    price: "Rs. 5,100",
    badge: "-18%",
    image: "/bike-engine.png",
  },
  {
    id: "prod-8",
    name: "Complete Engine Overhaul Gasket Pack",
    price: "Rs. 1,850",
    badge: "-30%",
    image: "/bike-engine.png",
  },
];

export function RetailProducts({
  title = "Retail Counter & Online Shop",
  subtitle = "Genuine & OEM certified performance spares for 70cc, 125cc & 150cc",
  products = defaultProducts,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  products?: ProductItem[];
  className?: string;
}) {
  return (
    <section id="retail" className={cn("w-full bg-white text-neutral-900 py-14 md:py-20", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">
              {title}
            </h2>
            <p className="text-neutral-500 text-sm md:text-base mt-3">
              {subtitle}
            </p>
          </div>
          <Link
            href="/signup"
            className="group md:flex hidden items-center gap-1.5 text-sm font-medium text-neutral-800 shrink-0 hover:text-red-600 transition-colors"
          >
            <span>See all</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:gap-y-20 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col">
              <div className="relative aspect-square w-full rounded-2xl bg-[#f4f4f5] overflow-hidden p-6 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ebebee]">
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
              </div>

              <div className="flex items-center justify-between gap-3 mt-3.5">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-neutral-900 text-sm md:text-base leading-snug md:line-clamp-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="font-semibold text-neutral-900 text-sm md:text-base mt-0.5">
                    {product.price}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={`Add ${product.name} to cart`}
                  className="shrink-0 size-9 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="size-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RetailProducts;

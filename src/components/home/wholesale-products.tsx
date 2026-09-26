"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WholesaleItem {
  id: string;
  name: string;
  price: string;
  badge?: string;
  image: string;
}

const defaultWholesaleProducts: WholesaleItem[] = [
  {
    id: "ws-1",
    name: "CD70 Complete Cylinder Head (Carton of 12)",
    price: "Rs. 84,000 / ctn",
    badge: "-20%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-2",
    name: "4-Stroke Engine Block Master Crate (6 sets)",
    price: "Rs. 92,000 / crate",
    badge: "-15%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-3",
    name: "125cc Piston Kits Bulk Box (25 pcs)",
    price: "Rs. 87,500 / box",
    badge: "-25%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-4",
    name: "Crown Heavy Clutch Plates Bulk Pack (50 sets)",
    price: "Rs. 135,000 / ctn",
    badge: "-10%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-5",
    name: "Performance Crankshaft Wholesale Pack (10 pcs)",
    price: "Rs. 85,000 / box",
    badge: "-15%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-6",
    name: "Oil Pump Assemblies Master Box (30 pcs)",
    price: "Rs. 64,500 / box",
    badge: "-20%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-7",
    name: "Camshaft & Rocker Arm Sets (20 kits)",
    price: "Rs. 92,000 / ctn",
    badge: "-18%",
    image: "/wholesale-bulk.png",
  },
  {
    id: "ws-8",
    name: "Complete Overhaul Gasket Master Carton (100 pk)",
    price: "Rs. 145,000 / ctn",
    badge: "-30%",
    image: "/wholesale-bulk.png",
  },
];

export function WholesaleProducts({
  title = "Wholesale & Bulk Supply",
  subtitle = "Direct factory master carton packaging & volume dealer discounts",
  products = defaultWholesaleProducts,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  products?: WholesaleItem[];
  className?: string;
}) {
  return (
    <section id="wholesale" className={cn("w-full bg-white text-neutral-900 py-14 md:py-20 border-t border-zinc-100", className)}>
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
            href="/login"
            className="group flex items-center gap-1.5 text-sm font-medium text-neutral-800 hover:text-red-600 transition-colors"
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
                  aria-label={`Order wholesale bulk ${product.name}`}
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

export default WholesaleProducts;

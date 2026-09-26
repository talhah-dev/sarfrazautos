"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LuCheck,
  LuHeart,
  LuHouse,
  LuRotateCcw,
  LuShoppingCart,
  LuStar,
  LuTruck,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RelatedWholesaleCartons from "./related-wholesale-cartons";

const wholesaleImages = [
  {
    id: "ws-img-1",
    src: "/wholesale-bulk.png",
    alt: "Master Carton Sealed Export Packaging",
  },
  {
    id: "ws-img-2",
    src: "/bike-engine.png",
    alt: "Complete 70cc Cylinder Head - Internal Assemblies",
  },
  {
    id: "ws-img-3",
    src: "/branch-godam.jpg",
    alt: "SITE Logistics Hub Bulk Stock",
  },
  {
    id: "ws-img-4",
    src: "/bike-hero.png",
    alt: "CD70 Motorcycle Fitment",
  },
];

const colorOptions = [
  { name: "Matte Black", hex: "#18181b" },
  { name: "Red", hex: "#e7000b" },
];

export function WholesaleProductOverviewSection({ className = "" }: { className?: string }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      <section className={cn("w-full bg-white text-neutral-900 py-10 md:py-16", className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-6">
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0 scrollbar-none">
                {wholesaleImages.map((img, idx) => {
                  const isActive = activeImageIndex === idx;
                  return (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "size-20 sm:size-22 rounded-2xl p-2.5 bg-[#f5f5f7] border-2 transition-all flex items-center justify-center cursor-pointer shrink-0 overflow-hidden",
                        isActive
                          ? "border-neutral-950 shadow-xs"
                          : "border-transparent hover:border-neutral-300"
                      )}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>

              <div className="relative flex-1 aspect-square sm:aspect-auto sm:min-h-[580px] rounded-3xl bg-[#f5f5f7] p-8 sm:p-12 flex items-center justify-center overflow-hidden">
                <img
                  src={wholesaleImages[activeImageIndex].src}
                  alt={wholesaleImages[activeImageIndex].alt}
                  className="w-full h-full max-h-[440px] object-contain drop-shadow-md transition-all duration-300 transform hover:scale-105"
                />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col space-y-6">
              <nav className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                <Link href="/" className="hover:text-neutral-900 transition-colors">
                  <LuHouse className="size-3.5" />
                </Link>
                <span>&rsaquo;</span>
                <Link href="/wholesale" className="hover:text-neutral-900 transition-colors">
                  Wholesale
                </Link>
                <span>&rsaquo;</span>
                <span className="text-neutral-900 font-semibold truncate">
                  Master Cartons
                </span>
              </nav>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-neutral-950 leading-tight">
                  CD70 Complete Cylinder Head (Carton of 12)
                </h1>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    <LuStar className="size-4 fill-amber-500 stroke-amber-500" />
                    <LuStar className="size-4 fill-amber-500 stroke-amber-500" />
                    <LuStar className="size-4 fill-amber-500 stroke-amber-500" />
                    <LuStar className="size-4 fill-amber-500 stroke-amber-500" />
                    <LuStar className="size-4 fill-amber-500 stroke-amber-500" />
                    <span className="text-xs font-semibold text-neutral-900 ml-1">4.9</span>
                  </div>

                  <a href="#reviews" className="text-xs text-neutral-600 underline font-medium hover:text-neutral-900">
                    84 reviews
                  </a>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    In Stock
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-3 pt-5 border-t border-neutral-100">
                <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950">
                  Rs. 84,000
                </span>
                <span className="text-lg text-neutral-400 line-through font-normal">
                  Rs. 105,000
                </span>
                <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
                  20% Off
                </span>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Precision-manufactured Crown 70cc cylinder head master carton containing 12 factory-sealed complete assemblies with valves and springs.
              </p>

              <div className="space-y-3">
                <span className="text-sm font-semibold text-neutral-900">
                  Color Finish
                </span>
                <div className="flex items-center gap-3 pt-3">
                  {colorOptions.map((color, idx) => {
                    const isSelected = selectedColorIndex === idx;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        aria-label={`Select ${color.name}`}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={cn(
                          "size-7 rounded-full transition-transform cursor-pointer flex items-center justify-center p-0.5",
                          isSelected && "ring-2 ring-neutral-950 ring-offset-2 scale-110"
                        )}
                      >
                        <span
                          className="size-full rounded-full border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button
                  type="button"
                  onClick={handleAddToCart}
                  className={cn(
                    "flex-1 h-12 font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm",
                    isAdded
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-neutral-950 hover:bg-neutral-800 text-white"
                  )}
                >
                  {isAdded ? (
                    <>
                      <LuCheck className="size-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <LuShoppingCart className="size-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label="Add to wishlist"
                  className={cn(
                    "size-12 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs",
                    isWishlisted
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                  )}
                >
                  <LuHeart className={cn("size-5", isWishlisted && "fill-red-600")} />
                </button>
              </div>

              <div className="pt-6 border-t border-neutral-100 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-neutral-600">
                  <LuTruck className="size-4 text-neutral-500 shrink-0" />
                  <span>
                    Free Bilty dispatch on bulk orders or direct warehouse dock loading
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-neutral-600">
                  <LuRotateCcw className="size-4 text-neutral-500 shrink-0" />
                  <span>
                    Direct factory sealed guarantee &amp; 100% genuine wholesale stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedWholesaleCartons />
    </>
  );
}

export default WholesaleProductOverviewSection;

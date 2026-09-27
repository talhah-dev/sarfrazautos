"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CategoryBannersProps {
  className?: string;
}

export function CategoryBanners({ className = "" }: CategoryBannersProps) {
  return (
    <section className={cn("w-full bg-background overflow-hidden pt-12 pb-4 md:pt-20 md:pb-14", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full">
        <div className="max-w-2xl mb-8 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-4 leading-tight">
            Single Parts or Bulk Orders <span className="text-red-600">Built for Every Buyer</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Whether you need a single replacement component for your motorcycle or high-volume master cartons for your retail shop, Sarfraz Autos delivers certified OEM quality with instant dispatch across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative group rounded-2xl overflow-hidden min-h-[300px] md:min-h-[400px] flex flex-col justify-end p-5 md:p-6 border border-border/60">
            <Image
              src="/branch-saddar.jpg"
              alt="Retail Motorcycle Spare Parts"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="relative z-10 w-full">
              <Link
                href="#retail"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full bg-white text-neutral-900 hover:bg-neutral-100 font-semibold h-12 text-sm md:text-base shadow-lg transition-all"
                )}
              >
                Visit Retail Shop
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>

          <div className="relative group rounded-2xl overflow-hidden min-h-[300px] md:min-h-[400px] flex flex-col justify-end p-5 md:p-6 border border-border/60">
            <Image
              src="/branch-godam.jpg"
              alt="Wholesale Motorcycle Parts Supply"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="relative z-10 w-full">
              <Link
                href="#wholesale"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full bg-red-600 text-white hover:bg-red-700 font-semibold h-12 text-sm md:text-base shadow-lg transition-all"
                )}
              >
                Visit Wholesaler
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryBanners;

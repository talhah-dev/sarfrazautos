"use client";

import { NotchedCard } from "./notched-card";
import { cn } from "@/lib/utils";

export interface CategoryBannersProps {
  className?: string;
}

export function CategoryBanners({ className = "" }: CategoryBannersProps) {
  return (
    <section
      className={cn(
        "w-full bg-background overflow-hidden pt-12 pb-4 md:pt-20 md:pb-14",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full">
        <div className="max-w-2xl mb-8 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-4 leading-tight">
            Single Parts or Bulk Orders{" "}
            <span className="text-red-600">Built for Every Buyer</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Whether you need a single replacement component for your motorcycle
            or high-volume master cartons for your retail shop, Sarfraz Autos
            delivers certified OEM quality with instant dispatch across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <NotchedCard
            image="/branch-saddar.jpg"
            imageAlt="Retail Motorcycle Spare Parts"
            description="Explore genuine Crown replacement parts and accessories ready for fast over-the-counter pickup and nationwide courier delivery."
            buttonLabel="Get Started"
            href="/retail"
            variant="white"
          />

          <NotchedCard
            image="/branch-godam.jpg"
            imageAlt="Wholesale Motorcycle Parts Supply"
            description="Access factory-sealed master cartons with guaranteed bulk trade margins and priority bilty terminal dispatch across Pakistan."
            buttonLabel="Get Started"
            href="/wholesale"
            variant="red"
          />
        </div>
      </div>
    </section>
  );
}

export default CategoryBanners;

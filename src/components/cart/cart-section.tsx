"use client";

import { useState } from "react";
import { Boxes, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import RetailCart from "./retail-cart";
import WholesaleCart from "./wholesale-cart";

export function CartSection({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"retail" | "wholesale">("retail");

  return (
    <section className={cn("w-full bg-white text-neutral-900 py-10 md:py-16", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Manage your retail motorcycle parts or bulk wholesale master carton orders.
            </p>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-neutral-100 border border-neutral-200/80 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("retail")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                activeTab === "retail"
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              )}
            >
              <ShoppingBag className="size-3.5" />
              <span>Retail Items</span>
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px]",
                  activeTab === "retail"
                    ? "bg-red-50 text-red-600 font-bold"
                    : "bg-neutral-200/70 text-neutral-600"
                )}
              >
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("wholesale")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                activeTab === "wholesale"
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              )}
            >
              <Boxes className="size-3.5" />
              <span>Wholesale Cartons</span>
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px]",
                  activeTab === "wholesale"
                    ? "bg-red-50 text-red-600 font-bold"
                    : "bg-neutral-200/70 text-neutral-600"
                )}
              >
                2
              </span>
            </button>
          </div>
        </div>

        {activeTab === "retail" ? <RetailCart /> : <WholesaleCart />}
      </div>
    </section>
  );
}

export default CartSection;

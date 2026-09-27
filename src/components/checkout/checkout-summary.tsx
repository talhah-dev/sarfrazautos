"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const checkoutItems = [
  {
    id: "item-1",
    title: "Complete 70cc Cylinder Head Assembly",
    subtitle: "Matte Black • Qty: 1",
    price: "Rs. 8,450",
    image: "/bike-engine.png",
  },
  {
    id: "item-2",
    title: "Crown Heavy Duty Clutch Plate Set (70cc)",
    subtitle: "5-Friction Plates • Qty: 1",
    price: "Rs. 3,150",
    image: "/wholesale-bulk.png",
  },
  {
    id: "item-3",
    title: "Heavy Duty Alloy Wheel Rim Hub Assembly",
    subtitle: "Chrome Finish • Qty: 1",
    price: "Rs. 4,950",
    image: "/wheel-rim.png",
  },
];

export function CheckoutSummary({ className = "" }: { className?: string }) {
  const subtotal = 16550;
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <Card
      className={cn(
        "rounded-2xl border-border bg-card p-5 sm:p-6 space-y-6 sticky top-24",
        className
      )}
    >
      <CardContent className="p-0 space-y-6">
        <div className="space-y-4">
          {checkoutItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3.5">
              <div className="relative size-16 rounded-xl bg-background border border-border p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold text-foreground truncate leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.subtitle}</p>
              </div>

              <span className="text-xs sm:text-sm font-semibold text-foreground shrink-0">
                {item.price}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs sm:text-sm">
            <span>Subtotal</span>
            <span className="font-semibold text-foreground">
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-muted-foreground text-xs sm:text-sm">
            <span>Shipping</span>
            <span className="font-semibold text-emerald-600">Free</span>
          </div>

          <Separator />

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-sm sm:text-base font-semibold text-foreground">Total</span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Rs. {total.toLocaleString()}
            </span>
          </div>
        </div>

        <Link href="/payment" className="block w-full">
          <Button
            type="button"
            className="w-full h-12 cursor-pointer flex items-center justify-center gap-2 text-sm font-medium"
          >
            <ShieldCheck className="size-4" />
            Continue to Payment
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default CheckoutSummary;

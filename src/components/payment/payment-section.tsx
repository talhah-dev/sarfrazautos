"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Banknote,
  Check,
  ChevronLeft,
  CreditCard,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import BankTransferForm from "./bank-transfer-form";
import PaymentSuccess from "./payment-success";

const summaryItems = [
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

export function PaymentSection({ className = "" }: { className?: string }) {
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);

  const subtotal = 16550;
  const shipping = 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isSubmitted) {
    return (
      <section className={cn("w-full bg-white text-neutral-900 py-8 sm:py-12 md:py-16", className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PaymentSuccess
            orderId="#SA-98241"
            paymentMethod={paymentMethod}
            amount={`Rs. ${total.toLocaleString()}`}
          />
        </div>
      </section>
    );
  }

  return (
    <section className={cn("w-full bg-white text-neutral-900 py-8 sm:py-12 md:py-16", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-8">
          <Link
            href="/checkout"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="size-4" />
            Back to Information
          </Link>

          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/checkout" className="flex items-center gap-2 group cursor-pointer">
              <span className="size-6 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center">
                <Check className="size-3.5 stroke-[3]" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground">
                Information
              </span>
            </Link>

            <div className="w-8 sm:w-16 h-px bg-border" />

            <div className="flex items-center gap-2">
              <span className="size-6 rounded-full bg-neutral-950 text-white text-xs font-semibold flex items-center justify-center">
                2
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground">
                Payment
              </span>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start w-full min-w-0">
          <div className="w-full min-w-0 lg:col-span-7 xl:col-span-8 space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground block">
                Choose Payment Method
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={paymentMethod === "bank" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("bank")}
                  className="h-14 rounded-xl flex items-center justify-center gap-2.5 text-sm font-medium cursor-pointer"
                >
                  <CreditCard className="size-4 shrink-0" />
                  <span>Direct Bank Transfer / Raast</span>
                </Button>

                <Button
                  type="button"
                  variant={paymentMethod === "cod" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("cod")}
                  className="h-14 rounded-xl flex items-center justify-center gap-2.5 text-sm font-medium cursor-pointer"
                >
                  <Banknote className="size-4 shrink-0" />
                  <span>Cash on Delivery (COD)</span>
                </Button>
              </div>
            </div>

            {paymentMethod === "bank" && (
              <BankTransferForm onProofChange={(file) => setProofFile(file)} />
            )}

            {paymentMethod === "cod" && (
              <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Truck className="size-4 text-neutral-700" />
                  <span>Cash on Delivery Policy</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Please keep exact cash ready upon delivery. Our authorized delivery rider or courier service (TCS / Leopards / Trax) will collect the total amount of Rs. {total.toLocaleString()} at your doorstep upon handing over the parcel.
                </p>
                <div className="p-3 rounded-xl bg-muted/40 border border-border/80 text-[11px] text-muted-foreground">
                  Direct inspection allowed upon package receipt before payment settlement.
                </div>
              </div>
            )}
          </div>

          <div className="w-full min-w-0 lg:col-span-5 xl:col-span-4">
            <Card className="rounded-2xl border-border bg-card p-5 sm:p-6 space-y-6 sticky top-24">
              <CardContent className="p-0 space-y-6">
                <div className="space-y-4">
                  {summaryItems.map((item) => (
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

                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full h-12 cursor-pointer flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <ShieldCheck className="size-4" />
                  {paymentMethod === "bank"
                    ? "Submit Payment Proof & Confirm"
                    : "Confirm & Place Order (COD)"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentSection;

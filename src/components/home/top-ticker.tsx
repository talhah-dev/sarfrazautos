"use client";

import Link from "next/link";
import { Zap, Truck, ShieldCheck, Package, PhoneCall } from "lucide-react";

const TICKER_ITEMS = [
  {
    icon: Zap,
    highlight: "ADVANCE PAYMENT OFFER:",
    text: "Pay in advance via Bank / Easypaisa & Get 100% FREE Delivery Across Pakistan!",
    href: "/payment",
    highlightColor: "text-amber-300",
  },
  {
    icon: Truck,
    highlight: "FAST EXPRESS SHIPPING:",
    text: "Same-day dispatch with 24–48hr nationwide delivery to your doorstep!",
    href: "/retail",
    highlightColor: "text-white",
  },
  {
    icon: ShieldCheck,
    highlight: "100% GENUINE PARTS:",
    text: "Original Crown & OEM factory-tested motorcycle spare parts guaranteed!",
    href: "/product-overview",
    highlightColor: "text-amber-300",
  },
  {
    icon: Package,
    highlight: "DIRECT FACTORY IMPORTER:",
    text: "Wholesale master cartons & bulk rates for mechanics & dealers nationwide!",
    href: "/wholesale",
    highlightColor: "text-white",
  },
  {
    icon: PhoneCall,
    highlight: "EXPERT ASSISTANCE:",
    text: "Call or WhatsApp our parts specialist at +92 321 8273645",
    href: "tel:+923218273645",
    highlightColor: "text-amber-300",
  },
];

export function TopTicker() {
  return (
    <div className="relative w-full h-8 sm:h-9 bg-gradient-to-r from-red-800 via-red-600 to-red-800 text-white overflow-hidden flex items-center border-b border-red-500/30 select-none z-50">
      <div className="animate-marquee flex items-center">
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center shrink-0">
            {TICKER_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="inline-flex items-center gap-2 px-5 sm:px-7 text-[11px] sm:text-xs font-medium tracking-wide uppercase transition-opacity hover:opacity-85 whitespace-nowrap"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 text-white" />
                  <span className={`font-bold ${item.highlightColor}`}>
                    {item.highlight}
                  </span>
                  <span className="text-white/95 lowercase first-letter:uppercase">
                    {item.text}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopTicker;

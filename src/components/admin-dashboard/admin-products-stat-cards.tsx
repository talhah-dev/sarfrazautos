"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

export function AdminProductsStatCards({
  totalCount = 84,
  retailCount = 36,
  wholesaleCount = 48,
}: {
  totalCount?: number
  retailCount?: number
  wholesaleCount?: number
}) {
  const cards = [
    {
      title: "Total Products",
      subtitle: "All products uploaded to store",
      value: totalCount,
      trend: "+12.5% than last month",
      imageSrc: "/hero-parts-boxes.png",
      imageAlt: "Total Products",
      imageClass: "bottom-0 right-0 max-h-24 sm:max-h-28",
    },
    {
      title: "Retail Products",
      subtitle: "Products for retail customers",
      value: retailCount,
      trend: "+4.2% than last week",
      imageSrc: "/bikes.png",
      imageAlt: "Retail Products",
      imageClass: "bottom-0 right-1 max-h-20 sm:max-h-24",
    },
    {
      title: "Wholesale Products",
      subtitle: "Products for wholesale dealers",
      value: wholesaleCount,
      trend: "+8.6% than last week",
      imageSrc: "/wholesale-bulk.png",
      imageAlt: "Wholesale Products",
      imageClass: "bottom-0 right-0 max-h-24 sm:max-h-28",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-4 lg:px-6">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-2xs hover:border-neutral-300 transition-colors"
        >
          <CardContent className=" flex flex-col justify-between min-h-[148px]">
            <div className="relative z-10 pr-28">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                {card.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {card.subtitle}
              </p>
            </div>

            <div className="relative z-10 mt-4 sm:mt-5">
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 tabular-nums">
                {card.value}
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-1">
                <ArrowUpRight className="size-3.5" />
                <span>{card.trend}</span>
              </div>
            </div>

            <img
              src={card.imageSrc}
              alt={card.imageAlt}
              className={`absolute object-contain pointer-events-none select-none drop-shadow-sm ${card.imageClass}`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import Link from "next/link"
import { Package, ShoppingCart, CreditCard, TrendingUp } from "lucide-react"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function AdminOverviewCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <ShoppingCart className="size-8 text-neutral-700 stroke-[1.5]" />
          <CardDescription className="pt-7">Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            284
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
              +12 This Week
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <Package className="size-8 text-neutral-700 stroke-[1.5]" />
          <CardDescription className="pt-7">Total Products</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            148
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs">
              Retail + Wholesale
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CreditCard className="size-8 text-neutral-700 stroke-[1.5]" />
          <CardDescription className="pt-7">Pending Payments</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            7 Pending
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
              Needs Review
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}

export { AdminOverviewCards }

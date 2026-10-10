import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ShoppingBag, PackageCheck, Clock } from "lucide-react"
import { PiCoinsLight } from "react-icons/pi"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <PiCoinsLight className="size-8 text-neutral-700 opacity-80" />
          <CardDescription className="pt-7">Total Money Spent</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rs. 18,42,000
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
              +Rs. 1.2L This Month
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <ShoppingBag className="size-8 text-neutral-700 stroke-[1.5]" />
          <CardDescription className="pt-7">Total Purchases</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            198 Orders
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
          <Clock className="size-8 text-neutral-700 stroke-[1.5]" />
          <CardDescription className="pt-7">Orders In Processing</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            2 Orders
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
              Packing Now
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}

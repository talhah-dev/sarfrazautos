import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp, Boxes, Clock, ShieldCheck } from "lucide-react"
import { PiCoinsLight } from "react-icons/pi"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <PiCoinsLight className="size-10 opacity-80" />
          <CardDescription className="pt-5">Total Money Spent</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rs. 3.11M
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <TrendingUp className="size-3 text-emerald-600" />
              <span>+14.2%</span>
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <Boxes className="size-10 opacity-80 text-neutral-700 stroke-[1.5]" />
          <CardDescription className="pt-5">Cartons Purchased</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            174 Cartons
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs">
              24 Orders
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <Clock className="size-10 opacity-80 text-neutral-700 stroke-[1.5]" />
          <CardDescription className="pt-5">Orders In Processing</CardDescription>
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

      <Card className="@container/card">
        <CardHeader>
          <ShieldCheck className="size-10 opacity-80 text-neutral-700 stroke-[1.5]" />
          <CardDescription className="pt-5">Available Credit Limit</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rs. 650,000
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
              Khata Active
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}

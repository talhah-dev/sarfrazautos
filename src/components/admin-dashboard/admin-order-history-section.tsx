"use client"

import { useState } from "react"
import { PackageCheck, Clock, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const orders = [
  { id: "ORD-2026-001", dealer: "Ali Brothers Traders", product: "CD70 Cylinder Head x2", type: "Wholesale", amount: "Rs. 168,000", status: "Delivered", date: "04 Oct 2026" },
  { id: "ORD-2026-002", dealer: "Zaman Auto Parts", product: "Clutch Plates x5", type: "Wholesale", amount: "Rs. 675,000", status: "Processing", date: "03 Oct 2026" },
  { id: "ORD-2026-003", dealer: "Customer (Retail)", product: "125cc Piston Kit x1", type: "Retail", amount: "Rs. 1,850", status: "Delivered", date: "02 Oct 2026" },
  { id: "ORD-2026-004", dealer: "Raza & Sons", product: "Engine Block x3", type: "Wholesale", amount: "Rs. 276,000", status: "Pending", date: "01 Oct 2026" },
  { id: "ORD-2026-005", dealer: "Customer (Retail)", product: "Carburetor x1", type: "Retail", amount: "Rs. 2,400", status: "Delivered", date: "30 Sep 2026" },
  { id: "ORD-2026-006", dealer: "Bilal Motor Works", product: "Overhaul Gasket Set x2", type: "Wholesale", amount: "Rs. 290,000", status: "Processing", date: "29 Sep 2026" },
  { id: "ORD-2026-007", dealer: "Tariq Traders", product: "Crankshaft x4", type: "Wholesale", amount: "Rs. 340,000", status: "Delivered", date: "27 Sep 2026" },
  { id: "ORD-2026-008", dealer: "Customer (Retail)", product: "Camshaft Kit x1", type: "Retail", amount: "Rs. 3,200", status: "Cancelled", date: "25 Sep 2026" },
]

export function AdminOrderHistorySection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.dealer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.product.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = statusFilter === "All" ? true : o.status === statusFilter
    return matchSearch && matchStatus
  })

  const statusBadge = (status: string) => {
    if (status === "Delivered") return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">Delivered</Badge>
    if (status === "Processing") return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">Processing</Badge>
    if (status === "Pending") return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">Pending</Badge>
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">Cancelled</Badge>
  }

  return (
    <div className="flex flex-col gap-5 px-4 lg:px-6 py-4 md:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Order History</h2>
          <p className="text-sm text-neutral-500 mt-1">Complete history of retail and wholesale orders.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-3">
        <Card className="@container/card">
          <CardHeader>
            <PackageCheck className="size-8 text-neutral-700 stroke-[1.5]" />
            <CardDescription className="pt-7">Delivered Orders</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {orders.filter((o) => o.status === "Delivered").length}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                Successfully Completed
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <Clock className="size-8 text-neutral-700 stroke-[1.5]" />
            <CardDescription className="pt-7">Pending Orders</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {orders.filter((o) => o.status === "Pending" || o.status === "Processing").length}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                Needs Attention
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <XCircle className="size-8 text-neutral-700 stroke-[1.5]" />
            <CardDescription className="pt-7">Cancelled Orders</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {orders.filter((o) => o.status === "Cancelled").length}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                Not Fulfilled
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="w-64">
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <div className="flex items-center gap-1">
          {["All", "Delivered", "Processing", "Pending", "Cancelled"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${statusFilter === s ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-neutral-200 rounded-xl bg-white shadow-xs overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-neutral-700">Order ID</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Dealer / Customer</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Product</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Type</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Amount</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Status</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id} className="text-xs hover:bg-neutral-50/70">
                <TableCell className="font-mono text-neutral-600">{order.id}</TableCell>
                <TableCell className="font-medium text-neutral-900">{order.dealer}</TableCell>
                <TableCell className="text-neutral-600 max-w-[180px] truncate">{order.product}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={order.type === "Wholesale" ? "bg-blue-50 text-blue-700 border-blue-200 text-xs" : "bg-purple-50 text-purple-700 border-purple-200 text-xs"}>
                    {order.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-neutral-900 whitespace-nowrap">{order.amount}</TableCell>
                <TableCell>{statusBadge(order.status)}</TableCell>
                <TableCell className="text-neutral-600 whitespace-nowrap">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

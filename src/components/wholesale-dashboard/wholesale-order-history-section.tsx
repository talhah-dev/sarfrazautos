"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const orders = [
  { id: "ORD-2026-001", product: "CD70 Complete Cylinder Head", qty: 2, amount: "Rs. 168,000", status: "Delivered", date: "04 Oct 2026" },
  { id: "ORD-2026-004", product: "4-Stroke Engine Block", qty: 3, amount: "Rs. 276,000", status: "Processing", date: "01 Oct 2026" },
  { id: "ORD-2026-007", product: "Performance Crankshaft Assembly", qty: 4, amount: "Rs. 340,000", status: "Delivered", date: "27 Sep 2026" },
  { id: "ORD-2026-009", product: "Crown Heavy Duty Clutch Plates", qty: 5, amount: "Rs. 675,000", status: "Delivered", date: "22 Sep 2026" },
  { id: "ORD-2026-012", product: "Complete Overhaul Gasket Set", qty: 2, amount: "Rs. 290,000", status: "Pending", date: "18 Sep 2026" },
  { id: "ORD-2026-015", product: "Japanese Standard Carburetor", qty: 10, amount: "Rs. 24,000", status: "Delivered", date: "14 Sep 2026" },
  { id: "ORD-2026-018", product: "Camshaft & Rocker Arm Set", qty: 3, amount: "Rs. 276,000", status: "Cancelled", date: "10 Sep 2026" },
  { id: "ORD-2026-021", product: "125cc Piston Kit", qty: 20, amount: "Rs. 37,000", status: "Delivered", date: "05 Sep 2026" },
]

export function WholesaleOrderHistorySection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">Order History</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Your complete purchase history with Sarfraz Autos.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-52">
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
      </div>

      <div className="border border-neutral-200 rounded-xl bg-white shadow-xs overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-neutral-700">Order ID</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Product</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Qty</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Amount</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Status</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id} className="text-xs hover:bg-neutral-50/70">
                <TableCell className="font-mono text-neutral-600">{order.id}</TableCell>
                <TableCell className="font-medium text-neutral-900 max-w-[220px] truncate">{order.product}</TableCell>
                <TableCell className="text-neutral-600">{order.qty} pcs</TableCell>
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

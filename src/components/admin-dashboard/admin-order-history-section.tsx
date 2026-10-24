"use client"

import { useState } from "react"
import { PackageCheck, Clock, XCircle, Truck, RefreshCw, RotateCcw, Ban } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AdminPagination } from "@/components/admin-dashboard/admin-pagination"

const initialOrders = [
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
  const [orderList, setOrderList] = useState(initialOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrderList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
  }

  const filtered = orderList.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.dealer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.product.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = statusFilter === "All" ? true : o.status === statusFilter
    return matchSearch && matchStatus
  })

  const statusBadge = (status: string) => {
    if (status === "Delivered") {
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
          Delivered
        </Badge>
      )
    }
    if (status === "Processing") {
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-medium">
          Processing
        </Badge>
      )
    }
    if (status === "Pending") {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-medium">
          Pending
        </Badge>
      )
    }
    if (status === "Returned") {
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs font-medium">
          Returned
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs font-medium">
        Cancelled
      </Badge>
    )
  }

  return (
    <div className="flex flex-col gap-5 px-4 lg:px-6 py-4 md:py-6 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Orders</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage and track all retail and wholesale orders in real time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-3">
        <Card className="@container/card border-neutral-200 shadow-2xs bg-white">
          <CardHeader>
            <PackageCheck className="size-8 text-neutral-700 stroke-[1.5]" />
            <CardDescription className="pt-7">Delivered Orders</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-neutral-900">
              {orderList.filter((o) => o.status === "Delivered").length}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                Successfully Completed
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="@container/card border-neutral-200 shadow-2xs bg-white">
          <CardHeader>
            <Clock className="size-8 text-neutral-700 stroke-[1.5]" />
            <CardDescription className="pt-7">Pending / Processing Orders</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-neutral-900">
              {orderList.filter((o) => o.status === "Pending" || o.status === "Processing").length}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                In Progress
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="@container/card border-neutral-200 shadow-2xs bg-white">
          <CardHeader>
            <XCircle className="size-8 text-neutral-700 stroke-[1.5]" />
            <CardDescription className="pt-7">Cancelled / Returned</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-neutral-900">
              {orderList.filter((o) => o.status === "Cancelled" || o.status === "Returned").length}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                Cancelled / Returned
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
            className="h-8 text-xs bg-white"
          />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          {["All", "Delivered", "Processing", "Pending", "Cancelled", "Returned"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === s ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-neutral-200 rounded-xl bg-white shadow-2xs overflow-x-auto">
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
              <TableHead className="text-xs font-semibold text-neutral-700 text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id} className="text-xs hover:bg-neutral-50/70">
                <TableCell className="font-mono text-neutral-600">{order.id}</TableCell>
                <TableCell className="font-medium text-neutral-900">{order.dealer}</TableCell>
                <TableCell className="text-neutral-600 max-w-[180px] truncate">{order.product}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      order.type === "Wholesale"
                        ? "bg-blue-50 text-blue-700 border-blue-200 text-xs"
                        : "bg-purple-50 text-purple-700 border-purple-200 text-xs"
                    }
                  >
                    {order.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-neutral-900 whitespace-nowrap">{order.amount}</TableCell>
                <TableCell>{statusBadge(order.status)}</TableCell>
                <TableCell className="text-neutral-600 whitespace-nowrap">{order.date}</TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <div className="group relative">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, "Delivered")}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          order.status === "Delivered"
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                            : "hover:bg-emerald-50 text-neutral-500 hover:text-emerald-700 border-neutral-200 hover:border-emerald-300"
                        }`}
                      >
                        <Truck className="size-3.5" />
                      </button>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-[10px] font-medium px-2 py-0.5 rounded-md shadow-md whitespace-nowrap z-30">
                        Deliver
                      </span>
                    </div>

                    <div className="group relative">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, "Processing")}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          order.status === "Processing"
                            ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                            : "hover:bg-blue-50 text-neutral-500 hover:text-blue-700 border-neutral-200 hover:border-blue-300"
                        }`}
                      >
                        <RefreshCw className="size-3.5" />
                      </button>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-[10px] font-medium px-2 py-0.5 rounded-md shadow-md whitespace-nowrap z-30">
                        Processing
                      </span>
                    </div>

                    <div className="group relative">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, "Cancelled")}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          order.status === "Cancelled"
                            ? "bg-red-600 text-white border-red-600 shadow-2xs"
                            : "hover:bg-red-50 text-neutral-500 hover:text-red-700 border-neutral-200 hover:border-red-300"
                        }`}
                      >
                        <Ban className="size-3.5" />
                      </button>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-[10px] font-medium px-2 py-0.5 rounded-md shadow-md whitespace-nowrap z-30">
                        Cancel
                      </span>
                    </div>

                    <div className="group relative">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, "Returned")}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          order.status === "Returned"
                            ? "bg-purple-600 text-white border-purple-600 shadow-2xs"
                            : "hover:bg-purple-50 text-neutral-500 hover:text-purple-700 border-neutral-200 hover:border-purple-300"
                        }`}
                      >
                        <RotateCcw className="size-3.5" />
                      </button>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-[10px] font-medium px-2 py-0.5 rounded-md shadow-md whitespace-nowrap z-30">
                        Return
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AdminPagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  RotateCcw,
  Search,
  CheckCircle2,
  Clock,
  Package,
  ArrowRight,
  Boxes,
  Truck,
  RotateCcwIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AdminPagination } from "@/components/admin-dashboard/admin-pagination"

const initialReturns = [
  {
    id: "RET-2026-052",
    orderId: "ORD-2026-004",
    client: "Raza & Sons",
    city: "Gujranwala",
    type: "Wholesale",
    product: "CD70 4-Stroke Cylinder Head",
    quantity: 2,
    returnAmount: 168000,
    reason: "Duplicate carton shipped by dispatch team",
    condition: "Sealed Carton / 100% Brand New",
    status: "Pending Receipt",
    date: "13 Oct 2026",
  },
  {
    id: "RET-2026-051",
    orderId: "ORD-2026-002",
    client: "Zaman Auto Parts",
    city: "Karachi",
    type: "Wholesale",
    product: "125cc Heavy Clutch Plates Set",
    quantity: 1,
    returnAmount: 68000,
    reason: "Dealer ordered CG125 instead of CD70 by mistake",
    condition: "Original Blister Packaging Intact",
    status: "Received",
    date: "11 Oct 2026",
  },
  {
    id: "RET-2026-049",
    orderId: "ORD-2026-003",
    client: "Muhammad Tariq (Retail)",
    city: "Karachi",
    type: "Retail",
    product: "70cc Standard Carburetor Assembly",
    quantity: 1,
    returnAmount: 2400,
    reason: "Customer bike is CD Dream model, carburetor mismatch",
    condition: "Unused in Box",
    status: "Restocked",
    date: "09 Oct 2026",
  },
  {
    id: "RET-2026-045",
    orderId: "ORD-2026-001",
    client: "Ali Brothers Traders",
    city: "Lahore",
    type: "Wholesale",
    product: "CD70 Complete Overhaul Gasket Kits",
    quantity: 3,
    returnAmount: 105000,
    reason: "Excess stock adjustment agreed during seasonal discount",
    condition: "Restocked to Saddar Warehouse",
    status: "Refunded",
    date: "04 Oct 2026",
  },
]

export function AdminReturnsSection() {
  const [returnsList, setReturnsList] = useState(initialReturns)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedReturn, setSelectedReturn] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const pendingCount = returnsList.filter((r) => r.status === "Pending Receipt" || r.status === "Received").length
  const restockedCount = returnsList.filter((r) => r.status === "Restocked" || r.status === "Refunded").length
  const totalReturnVal = returnsList.reduce((acc, curr) => acc + curr.returnAmount, 0)

  const filteredReturns = returnsList.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.product.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" ? true : r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateReturnStatus = (id: string, newStatus: string) => {
    setReturnsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    )
    if (selectedReturn && selectedReturn.id === id) {
      setSelectedReturn((prev: any) => ({ ...prev, status: newStatus }))
    }
  }

  const getStatusBadge = (status: string) => {
    if (status === "Restocked" || status === "Refunded") {
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium gap-1">
          <CheckCircle2 className="size-3" />
          {status}
        </Badge>
      )
    }
    if (status === "Received") {
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-medium gap-1">
          <Truck className="size-3" />
          Goods Received
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-medium gap-1">
        <Clock className="size-3" />
        Pending Receipt
      </Badge>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6 w-full bg-white">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Product Returns & RMA
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Track customer and wholesale dealer returns, warehouse intake, and inventory restocking.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Inbound Returns</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="size-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900 mt-3">{pendingCount}</p>
          <span className="text-[11px] text-amber-600 font-medium mt-1 inline-block">
            Goods in transit or awaiting intake
          </span>
        </Card>

        <Card className="rounded-2xl border bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Restocked to Inventory</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Boxes className="size-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900 mt-3">{restockedCount}</p>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">
            Available back in stock
          </span>
        </Card>

        <Card className="rounded-2xl border bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Total Value Processed</span>
            <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
              <RotateCcwIcon className="size-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900 mt-3">
            Rs. {totalReturnVal.toLocaleString()}
          </p>
          <span className="text-[11px] text-neutral-500 font-medium mt-1 inline-block">
            Managed across Saddar & Hub branches
          </span>
        </Card>

        <Card className="rounded-2xl border bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Restock Efficiency</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Package className="size-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900 mt-3">98.5%</p>
          <span className="text-[11px] text-blue-600 font-medium mt-1 inline-block">
            Resellable mint condition returns
          </span>
        </Card>
      </div>

      <Card className="rounded-2xl border bg-white shadow-2xs">
        <CardHeader className="flex sm:flex-row flex-col sm:items-center justify-between gap-4 px-6 pt-6 pb-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400" />
            <Input
              placeholder="Search return ID, order, client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {["All", "Pending Receipt", "Received", "Restocked", "Refunded"].map((st) => (
              <Button
                key={st}
                size="sm"
                variant={statusFilter === st ? "default" : "outline"}
                onClick={() => setStatusFilter(st)}
                className="h-8 text-xs cursor-pointer rounded-xl"
              >
                {st}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-0">
          <div className="overflow-x-auto rounded-xl border border-neutral-200/80">
            <Table>
              <TableHeader className="bg-neutral-50/70">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-neutral-700">Return ID & Date</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">Order Ref</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">Client / Dealer</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">Product & Qty</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">Return Value</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturns.map((r) => (
                  <TableRow key={r.id} className="text-xs hover:bg-neutral-50/50">
                    <TableCell>
                      <div className="font-semibold text-neutral-900">{r.id}</div>
                      <div className="text-[11px] text-neutral-400">{r.date}</div>
                    </TableCell>
                    <TableCell className="font-mono text-neutral-700 font-medium">
                      {r.orderId}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-neutral-900">{r.client}</div>
                      <div className="text-[11px] text-neutral-500">{r.city} • {r.type}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-neutral-800">{r.product}</div>
                      <div className="text-[11px] text-neutral-500">Qty: {r.quantity} Carton(s)</div>
                    </TableCell>
                    <TableCell className="font-bold text-neutral-900">
                      Rs. {r.returnAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(r.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedReturn(r)}
                          className="h-7 px-2 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer"
                        >
                          Details
                        </Button>
                        {r.status === "Pending Receipt" && (
                          <Button
                            size="sm"
                            onClick={() => updateReturnStatus(r.id, "Received")}
                            className="h-7 px-2.5 text-xs bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                          >
                            Mark Received
                          </Button>
                        )}
                        {r.status === "Received" && (
                          <Button
                            size="sm"
                            onClick={() => updateReturnStatus(r.id, "Restocked")}
                            className="h-7 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                          >
                            Restock
                          </Button>
                        )}
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
        </CardContent>
      </Card>

      <Dialog open={!!selectedReturn} onOpenChange={(open) => !open && setSelectedReturn(null)}>
        <DialogContent className="sm:max-w-md p-6 rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold text-neutral-900">
              <RotateCcw className="size-5 text-red-600" />
              Return Details & Inspection
            </DialogTitle>
          </DialogHeader>

          {selectedReturn && (
            <div className="flex flex-col gap-4 mt-2 text-xs">
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm">{selectedReturn.product}</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5 font-mono">{selectedReturn.id} • Order: {selectedReturn.orderId}</p>
                </div>
                {getStatusBadge(selectedReturn.status)}
              </div>

              <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
                <span className="text-neutral-400 text-[11px]">Client / Dealer</span>
                <p className="font-semibold text-neutral-900 mt-0.5">{selectedReturn.client} ({selectedReturn.city})</p>
                <p className="text-neutral-500 text-[11px]">Date Logged: {selectedReturn.date}</p>
              </div>

              <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
                <span className="text-neutral-400 text-[11px]">Reason for Return</span>
                <p className="font-medium text-neutral-900 mt-1 leading-relaxed">{selectedReturn.reason}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200/70">
                  <Package className="size-3" />
                  Condition: {selectedReturn.condition}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 bg-neutral-50/50 font-semibold">
                <span className="text-neutral-600">Restock Credit Amount:</span>
                <span className="text-neutral-900 text-sm">Rs. {selectedReturn.returnAmount.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
                {selectedReturn.status === "Pending Receipt" && (
                  <Button
                    size="sm"
                    onClick={() => updateReturnStatus(selectedReturn.id, "Received")}
                    className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  >
                    Confirm Goods Received
                  </Button>
                )}
                {selectedReturn.status === "Received" && (
                  <Button
                    size="sm"
                    onClick={() => updateReturnStatus(selectedReturn.id, "Restocked")}
                    className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  >
                    Restock To Inventory & Credit Account
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedReturn(null)}
                  className="h-8 text-xs cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

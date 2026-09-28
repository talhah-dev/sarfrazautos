"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download, ExternalLink, Check, Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface BulkOrder {
  id: string
  date: string
  items: string
  cartonCount: number
  destination: string
  biltyNumber: string
  totalAmount: number
  status: "In Transit" | "Processing" | "Delivered"
}

const initialOrders: BulkOrder[] = [
  {
    id: "BO-9482",
    date: "24 Sep 2026",
    items: "Complete 70cc Cylinder Head Assembly",
    cartonCount: 24,
    destination: "Rawalpindi Goods Depot",
    biltyNumber: "LP-4821",
    totalAmount: 620000,
    status: "In Transit",
  },
  {
    id: "BO-9420",
    date: "22 Sep 2026",
    items: "Crown Heavy Duty Clutch Plate Set (5 Pcs)",
    cartonCount: 40,
    destination: "Multan Transport Center",
    biltyNumber: "TC-9912",
    totalAmount: 445000,
    status: "In Transit",
  },
  {
    id: "BO-9391",
    date: "21 Sep 2026",
    items: "125cc Piston & Ring Kits (Standard)",
    cartonCount: 60,
    destination: "Peshawar Logistics Terminal",
    biltyNumber: "Pending Loading",
    totalAmount: 890000,
    status: "Processing",
  },
  {
    id: "BO-9350",
    date: "18 Sep 2026",
    items: "Heavy Duty Alloy Wheel Rim Hub Assembly",
    cartonCount: 18,
    destination: "Faisalabad Freight Hub",
    biltyNumber: "RL-7740",
    totalAmount: 385000,
    status: "Delivered",
  },
  {
    id: "BO-9304",
    date: "15 Sep 2026",
    items: "CD70 Performance Crankshaft Assembly",
    cartonCount: 32,
    destination: "Gujranwala Goods Transport",
    biltyNumber: "LP-3310",
    totalAmount: 768000,
    status: "Delivered",
  },
]

export function BulkOrdersTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [copiedBilty, setCopiedBilty] = useState<string | null>(null)

  const filteredOrders = initialOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.biltyNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "All" ? true : order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleCopyBilty = (bilty: string) => {
    if (bilty === "Pending Loading") return
    navigator.clipboard.writeText(bilty)
    setCopiedBilty(bilty)
    setTimeout(() => setCopiedBilty(null), 2000)
  }

  const getStatusBadge = (status: BulkOrder["status"]) => {
    switch (status) {
      case "In Transit":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
            In Transit
          </Badge>
        )
      case "Processing":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-medium">
            Processing
          </Badge>
        )
      case "Delivered":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
            Delivered
          </Badge>
        )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", "In Transit", "Processing", "Delivered"].map((tab) => (
            <Button
              key={tab}
              variant={statusFilter === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(tab)}
              className="text-xs h-8 px-3 cursor-pointer shrink-0"
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Bilty, City..."
            className="pl-9 h-9 text-xs sm:text-sm bg-white"
          />
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50/70 hover:bg-neutral-50/70">
              <TableHead className="font-semibold text-neutral-700 text-xs py-3.5">Order ID</TableHead>
              <TableHead className="font-semibold text-neutral-700 text-xs">Date</TableHead>
              <TableHead className="font-semibold text-neutral-700 text-xs">Master Cartons & Product</TableHead>
              <TableHead className="font-semibold text-neutral-700 text-xs">Destination Hub</TableHead>
              <TableHead className="font-semibold text-neutral-700 text-xs">Bilty Receipt</TableHead>
              <TableHead className="font-semibold text-neutral-700 text-xs text-right">Amount (PKR)</TableHead>
              <TableHead className="font-semibold text-neutral-700 text-xs text-center">Status</TableHead>
              <TableHead className="font-semibold text-neutral-700 text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-neutral-500 text-sm">
                  No bulk orders match your query.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-neutral-50/50">
                  <TableCell className="font-bold text-neutral-900 text-xs sm:text-sm">
                    #{order.id}
                  </TableCell>
                  <TableCell className="text-xs text-neutral-500 whitespace-nowrap">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-xs">
                    <p className="font-semibold text-neutral-900">{order.cartonCount} Master Cartons</p>
                    <p className="text-neutral-500 line-clamp-1">{order.items}</p>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-700 whitespace-nowrap">
                    {order.destination}
                  </TableCell>
                  <TableCell className="text-xs">
                    {order.biltyNumber === "Pending Loading" ? (
                      <span className="text-neutral-400 italic">Dock Loading</span>
                    ) : (
                      <button
                        onClick={() => handleCopyBilty(order.biltyNumber)}
                        className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                        title="Click to copy Bilty Number"
                      >
                        {order.biltyNumber}
                        {copiedBilty === order.biltyNumber ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-neutral-400" />
                        )}
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="text-xs font-bold text-neutral-900 text-right whitespace-nowrap">
                    Rs. {order.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer"
                        title="Download Commercial Invoice"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" />
                        Invoice
                      </Button>
                      <Link href="/wholesale">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-xs cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

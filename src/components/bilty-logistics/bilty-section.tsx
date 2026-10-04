"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Download, Truck, PackageCheck, Clock } from "lucide-react"
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

export interface BiltyRecord {
  id: string
  biltyNumber: string
  orderNumber: string
  date: string
  transportCompany: string
  destinationCity: string
  cartonsCount: number
  status: "In Transit" | "Ready for Pickup" | "Delivered"
}

const biltyData: BiltyRecord[] = [
  {
    id: "b-1",
    biltyNumber: "BL-984210",
    orderNumber: "BO-9482",
    date: "24 Sep 2026",
    transportCompany: "Bilal Goods Transport",
    destinationCity: "Multan",
    cartonsCount: 24,
    status: "In Transit",
  },
  {
    id: "b-2",
    biltyNumber: "FSL-441209",
    orderNumber: "BO-9420",
    date: "22 Sep 2026",
    transportCompany: "Faisal Movers Freight",
    destinationCity: "Faisalabad",
    cartonsCount: 40,
    status: "Ready for Pickup",
  },
  {
    id: "b-3",
    biltyNumber: "TCS-881920",
    orderNumber: "BO-9391",
    date: "21 Sep 2026",
    transportCompany: "TCS Logistics Cargo",
    destinationCity: "Rawalpindi",
    cartonsCount: 60,
    status: "In Transit",
  },
  {
    id: "b-4",
    biltyNumber: "KOH-712034",
    orderNumber: "BO-9350",
    date: "18 Sep 2026",
    transportCompany: "Kohistan Goods",
    destinationCity: "Peshawar",
    cartonsCount: 18,
    status: "Delivered",
  },
  {
    id: "b-5",
    biltyNumber: "ALM-654190",
    orderNumber: "BO-9304",
    date: "15 Sep 2026",
    transportCompany: "Al-Imdad Transport",
    destinationCity: "Hyderabad",
    cartonsCount: 32,
    status: "Delivered",
  },
]

export function BiltySection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredBilties = biltyData.filter((item) => {
    const matchesSearch =
      item.biltyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transportCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destinationCity.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "All" ? true : item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: BiltyRecord["status"]) => {
    switch (status) {
      case "In Transit":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-medium">
            In Transit
          </Badge>
        )
      case "Ready for Pickup":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-medium">
            Ready for Pickup
          </Badge>
        )
      case "Delivered":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
            Delivered
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6 py-4 md:py-6">
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <Link href="/wholesale-dashboard" className="hover:text-neutral-900 transition-colors">
          Wholesale Portal
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-900 font-medium">Bilty & Logistics</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Bilty & Goods Logistics
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Track goods transport bilty numbers, dispatch dates, and delivery adda locations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="@container/card">
          <CardHeader>
            <Truck className="size-8 text-blue-600 stroke-[1.5]" />
            <CardDescription className="pt-7">Shipments In Transit</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-neutral-900">
              2 Shipments
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                Active Fleet
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <Clock className="size-8 text-amber-600 stroke-[1.5]" />
            <CardDescription className="pt-7">Ready for Adda Pickup</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-neutral-900">
              1 Shipment
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                Faisalabad Adda
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <PackageCheck className="size-8 text-emerald-600 stroke-[1.5]" />
            <CardDescription className="pt-7">Delivered Shipments</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-neutral-900">
              18 Bilties
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                100% Cleared
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col gap-4 border border-neutral-200 rounded-xl bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search Bilty #, order, transport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 text-xs"
            />
          </div>

          <div className="flex items-center gap-1">
            {["All", "In Transit", "Ready for Pickup", "Delivered"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  statusFilter === st
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-neutral-700">Bilty #</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Order #</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Date</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Goods Transport</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Destination</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Cartons</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Status</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700 text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBilties.map((item) => (
                <TableRow key={item.id} className="text-xs hover:bg-neutral-50/70">
                  <TableCell className="font-semibold text-neutral-900 font-mono">
                    {item.biltyNumber}
                  </TableCell>
                  <TableCell className="text-neutral-600 font-mono text-[11px]">
                    {item.orderNumber}
                  </TableCell>
                  <TableCell className="text-neutral-600 whitespace-nowrap">
                    {item.date}
                  </TableCell>
                  <TableCell className="font-medium text-neutral-900">
                    {item.transportCompany}
                  </TableCell>
                  <TableCell className="text-neutral-700">
                    {item.destinationCity}
                  </TableCell>
                  <TableCell className="font-semibold text-neutral-900 whitespace-nowrap">
                    {item.cartonsCount} Cartons
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer"
                      onClick={() => alert(`Downloading Bilty Slip for: ${item.biltyNumber}`)}
                    >
                      <Download className="size-3.5 mr-1" />
                      <span>Slip</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { PackagePlus, Truck, Clock, CheckCircle2, PackageCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function BulkOrdersHeader() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Bulk Orders & Bilty Bookings
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Monitor wholesale master carton dispatches, goods transport bilty receipts, and invoices.
          </p>
        </div>
        <Link href="/wholesale">
          <Button className="h-10 px-4 font-medium cursor-pointer shadow-xs">
            <PackagePlus className="w-4 h-4 mr-2" />
            Book New Cartons
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border border-neutral-200/80 shadow-none py-0">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-700">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 font-medium">Total Bookings</p>
              <p className="text-lg sm:text-xl font-bold text-neutral-900">142 Cartons</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-neutral-200/80 shadow-none py-0">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 font-medium">In Transit Bilty</p>
              <p className="text-lg sm:text-xl font-bold text-blue-600">8 Shipments</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-neutral-200/80 shadow-none py-0">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 font-medium">Dock Loading</p>
              <p className="text-lg sm:text-xl font-bold text-amber-600">2 Consignments</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-neutral-200/80 shadow-none py-0">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 font-medium">Delivered (Month)</p>
              <p className="text-lg sm:text-xl font-bold text-emerald-600">38 Orders</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

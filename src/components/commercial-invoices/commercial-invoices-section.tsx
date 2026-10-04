"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Download, Search, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface CommercialInvoice {
  id: string
  invoiceNumber: string
  orderNumber: string
  issueDate: string
  dueDate: string
  itemsSummary: string
  amount: number
  status: "Paid" | "Pending" | "Overdue"
}

const invoicesData: CommercialInvoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-0891",
    orderNumber: "BO-9482",
    issueDate: "24 Sep 2026",
    dueDate: "08 Oct 2026",
    itemsSummary: "24x CD70 Complete Cylinder Head",
    amount: 620000,
    status: "Paid",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-0844",
    orderNumber: "BO-9420",
    issueDate: "22 Sep 2026",
    dueDate: "06 Oct 2026",
    itemsSummary: "40x Crown Heavy Duty Clutch Plates",
    amount: 445000,
    status: "Paid",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-0798",
    orderNumber: "BO-9391",
    issueDate: "21 Sep 2026",
    dueDate: "05 Oct 2026",
    itemsSummary: "60x 125cc Piston Kits",
    amount: 890000,
    status: "Pending",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-0720",
    orderNumber: "BO-9350",
    issueDate: "18 Sep 2026",
    dueDate: "02 Oct 2026",
    itemsSummary: "18x Heavy Duty Wheel Hub Assembly",
    amount: 385000,
    status: "Paid",
  },
  {
    id: "inv-5",
    invoiceNumber: "INV-2026-0685",
    orderNumber: "BO-9304",
    issueDate: "15 Sep 2026",
    dueDate: "29 Sep 2026",
    itemsSummary: "32x CD70 Performance Crankshafts",
    amount: 768000,
    status: "Paid",
  },
]

export function CommercialInvoicesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredInvoices = invoicesData.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.itemsSummary.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "All" ? true : inv.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: CommercialInvoice["status"]) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
            Paid
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-medium">
            Pending
          </Badge>
        )
      case "Overdue":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs font-medium">
            Overdue
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
        <span className="text-neutral-900 font-medium">Commercial Invoices</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Commercial Invoices
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Download and view official sales invoices and tax billing records for wholesale orders.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-neutral-200 rounded-xl bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search invoice or order #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 text-xs"
            />
          </div>

          <div className="flex items-center gap-1">
            {["All", "Paid", "Pending"].map((st) => (
              <Button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`cursor-pointer ${
                  statusFilter === st
                    ? ""
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                }`}
              >
                {st}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-neutral-700">Invoice #</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Order #</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Issue Date</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Items Summary</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Amount</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Status</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700 text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((inv) => (
                <TableRow key={inv.id} className="text-xs hover:bg-neutral-50/70">
                  <TableCell className="font-semibold text-neutral-900 font-mono">
                    {inv.invoiceNumber}
                  </TableCell>
                  <TableCell className="text-neutral-600 font-mono text-[11px]">
                    {inv.orderNumber}
                  </TableCell>
                  <TableCell className="text-neutral-600 whitespace-nowrap">
                    {inv.issueDate}
                  </TableCell>
                  <TableCell className="text-neutral-700 font-medium max-w-[220px] truncate">
                    {inv.itemsSummary}
                  </TableCell>
                  <TableCell className="font-semibold text-neutral-900 whitespace-nowrap">
                    Rs. {inv.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(inv.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer"
                      onClick={() => alert(`Downloading Invoice PDF: ${inv.invoiceNumber}`)}
                    >
                      <Download className="size-3.5 mr-1" />
                      <span>PDF</span>
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

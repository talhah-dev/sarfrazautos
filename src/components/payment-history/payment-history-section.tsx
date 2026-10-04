"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Download, Search, CheckCircle2, Clock } from "lucide-react"
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

export interface PaymentRecord {
  id: string
  txnId: string
  date: string
  method: string
  bankName: string
  invoiceNumber: string
  amount: number
  status: "Cleared" | "In Processing" | "Failed"
}

const paymentsData: PaymentRecord[] = [
  {
    id: "pay-1",
    txnId: "PAY-981240",
    date: "24 Sep 2026",
    method: "Bank Transfer (IBFT)",
    bankName: "Bank Alfalah (Raast)",
    invoiceNumber: "INV-2026-0891",
    amount: 500000,
    status: "Cleared",
  },
  {
    id: "pay-2",
    txnId: "PAY-976520",
    date: "22 Sep 2026",
    method: "Direct Deposit Slip",
    bankName: "Meezan Bank Ltd",
    invoiceNumber: "INV-2026-0844",
    amount: 445000,
    status: "Cleared",
  },
  {
    id: "pay-3",
    txnId: "PAY-971033",
    date: "18 Sep 2026",
    method: "Habib Bank Cheque (#4401)",
    bankName: "HBL Commercial",
    invoiceNumber: "INV-2026-0720",
    amount: 385000,
    status: "Cleared",
  },
  {
    id: "pay-4",
    txnId: "PAY-968910",
    date: "15 Sep 2026",
    method: "Bank Transfer (IBFT)",
    bankName: "Faysal Bank Islamic",
    invoiceNumber: "INV-2026-0685",
    amount: 768000,
    status: "Cleared",
  },
  {
    id: "pay-5",
    txnId: "PAY-964205",
    date: "05 Sep 2026",
    method: "Online Raast QR",
    bankName: "Allied Bank (ABL)",
    invoiceNumber: "INV-2026-0610",
    amount: 250000,
    status: "Cleared",
  },
]

export function PaymentHistorySection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredPayments = paymentsData.filter((payment) => {
    const matchesSearch =
      payment.txnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "All" ? true : payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: PaymentRecord["status"]) => {
    switch (status) {
      case "Cleared":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
            Cleared
          </Badge>
        )
      case "In Processing":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-medium">
            In Processing
          </Badge>
        )
      case "Failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs font-medium">
            Failed
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
        <span className="text-neutral-900 font-medium">Payment History</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Payment History & Receipts
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Complete record of cleared bank transfers, cheques, and official payment receipts.
          </p>
        </div>

        <Button
          variant="outline"
          className="h-10 px-4 text-xs font-medium cursor-pointer shadow-xs"
          onClick={() => alert("Downloading Complete Payments Log PDF")}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Payments (PDF)
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Card className="@container/card">
          <CardHeader>
            <CheckCircle2 className="size-8 text-emerald-600 stroke-[1.5]" />
            <CardDescription className="pt-7">Total Payments Cleared</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-neutral-900">
              Rs. 2,348,000
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                5 Transactions
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <Clock className="size-8 text-neutral-700 stroke-[1.5]" />
            <CardDescription className="pt-7">Pending Verifications</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-neutral-900">
              0 Pending
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="text-xs">
                Up to Date
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col gap-4 border border-neutral-200 rounded-xl bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search receipt, method, bank, invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 text-xs"
            />
          </div>

          <div className="flex items-center gap-1">
            {["All", "Cleared", "In Processing"].map((st) => (
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
                <TableHead className="text-xs font-semibold text-neutral-700">Receipt / Txn ID</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Date</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Payment Channel & Bank</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Linked Invoice</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Amount Paid</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Status</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700 text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="text-xs hover:bg-neutral-50/70">
                  <TableCell className="font-semibold text-neutral-900 font-mono">
                    {payment.txnId}
                  </TableCell>
                  <TableCell className="text-neutral-600 whitespace-nowrap">
                    {payment.date}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-900">{payment.method}</span>
                      <span className="text-[11px] text-neutral-500">{payment.bankName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-600 font-mono text-[11px]">
                    {payment.invoiceNumber}
                  </TableCell>
                  <TableCell className="font-semibold text-emerald-700 whitespace-nowrap">
                    Rs. {payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer"
                      onClick={() => alert(`Downloading Receipt for ${payment.txnId}`)}
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

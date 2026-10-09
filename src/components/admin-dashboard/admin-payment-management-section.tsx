"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

type PaymentStatus = "Pending" | "Approved" | "Rejected"

interface Payment {
  id: string
  dealer: string
  orderId: string
  amount: string
  method: string
  submittedAt: string
  status: PaymentStatus
}

const initialPayments: Payment[] = [
  { id: "PAY-001", dealer: "Ali Brothers Traders", orderId: "ORD-2026-001", amount: "Rs. 168,000", method: "Bank Transfer", submittedAt: "04 Oct 2026, 10:30 AM", status: "Pending" },
  { id: "PAY-002", dealer: "Zaman Auto Parts", orderId: "ORD-2026-002", amount: "Rs. 675,000", method: "EasyPaisa", submittedAt: "03 Oct 2026, 02:15 PM", status: "Pending" },
  { id: "PAY-003", dealer: "Raza & Sons", orderId: "ORD-2026-004", amount: "Rs. 276,000", method: "JazzCash", submittedAt: "01 Oct 2026, 09:45 AM", status: "Approved" },
  { id: "PAY-004", dealer: "Bilal Motor Works", orderId: "ORD-2026-006", amount: "Rs. 290,000", method: "Bank Transfer", submittedAt: "29 Sep 2026, 04:00 PM", status: "Pending" },
  { id: "PAY-005", dealer: "Tariq Traders", orderId: "ORD-2026-007", amount: "Rs. 340,000", method: "EasyPaisa", submittedAt: "27 Sep 2026, 11:00 AM", status: "Approved" },
  { id: "PAY-006", dealer: "Customer (Retail)", orderId: "ORD-2026-008", amount: "Rs. 3,200", method: "JazzCash", submittedAt: "25 Sep 2026, 03:00 PM", status: "Rejected" },
]

export function AdminPaymentManagementSection() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [filter, setFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)

  const filtered = payments.filter((p) => {
    const matchSearch =
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.dealer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchFilter = filter === "All" ? true : p.status === filter
    return matchSearch && matchFilter
  })

  const updateStatus = (id: string, newStatus: PaymentStatus) => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
    setSelectedPayment(null)
  }

  const statusBadge = (status: PaymentStatus) => {
    if (status === "Approved") return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">Approved</Badge>
    if (status === "Rejected") return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">Rejected</Badge>
    return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">Pending</Badge>
  }

  return (
    <div className="flex flex-col gap-5 px-4 lg:px-6 py-4 md:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Payment Management</h2>
          <p className="text-sm text-neutral-500 mt-1">Review payment screenshots and approve or reject dealer payments.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <span className="font-semibold text-amber-700">
            {payments.filter((p) => p.status === "Pending").length} payments awaiting review
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="w-64">
          <Input
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <div className="flex items-center gap-1">
          {["All", "Pending", "Approved", "Rejected"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${filter === f ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-neutral-200 rounded-xl bg-white shadow-xs overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-neutral-700">Payment ID</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Dealer</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Order ID</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Amount</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Method</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Submitted</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Status</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((payment) => (
              <TableRow key={payment.id} className="text-xs hover:bg-neutral-50/70">
                <TableCell className="font-mono text-neutral-600">{payment.id}</TableCell>
                <TableCell className="font-medium text-neutral-900">{payment.dealer}</TableCell>
                <TableCell className="font-mono text-neutral-600">{payment.orderId}</TableCell>
                <TableCell className="font-semibold text-neutral-900 whitespace-nowrap">{payment.amount}</TableCell>
                <TableCell className="text-neutral-600">{payment.method}</TableCell>
                <TableCell className="text-neutral-600 whitespace-nowrap">{payment.submittedAt}</TableCell>
                <TableCell>{statusBadge(payment.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 cursor-pointer"
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <Eye className="size-3.5 text-neutral-500" />
                    </Button>
                    {payment.status === "Pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 cursor-pointer"
                          onClick={() => updateStatus(payment.id, "Approved")}
                        >
                          <CheckCircle2 className="size-3.5 text-emerald-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 cursor-pointer"
                          onClick={() => updateStatus(payment.id, "Rejected")}
                        >
                          <XCircle className="size-3.5 text-red-500" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold text-neutral-900">Payment Details</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="flex flex-col gap-3">
              <div className="aspect-video bg-neutral-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-2">📄</div>
                  <p className="text-xs text-neutral-500 font-medium">Payment Screenshot</p>
                  <p className="text-[11px] text-neutral-400">{selectedPayment.method}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-neutral-500">Payment ID</span><p className="font-mono font-medium mt-0.5">{selectedPayment.id}</p></div>
                <div><span className="text-neutral-500">Amount</span><p className="font-semibold text-neutral-900 mt-0.5">{selectedPayment.amount}</p></div>
                <div><span className="text-neutral-500">Dealer</span><p className="font-medium text-neutral-900 mt-0.5">{selectedPayment.dealer}</p></div>
                <div><span className="text-neutral-500">Method</span><p className="font-medium text-neutral-900 mt-0.5">{selectedPayment.method}</p></div>
                <div className="col-span-2"><span className="text-neutral-500">Submitted At</span><p className="font-medium text-neutral-900 mt-0.5">{selectedPayment.submittedAt}</p></div>
              </div>
              {selectedPayment.status === "Pending" && (
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1 h-8 text-xs cursor-pointer" onClick={() => updateStatus(selectedPayment.id, "Approved")}>
                    <CheckCircle2 className="size-3.5 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 h-8 text-xs cursor-pointer text-red-600 border-red-200 hover:bg-red-50" onClick={() => updateStatus(selectedPayment.id, "Rejected")}>
                    <XCircle className="size-3.5 mr-1" /> Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

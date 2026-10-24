"use client"

import { useState } from "react"
import {
  Clock,
  Search,
  AlertCircle,
  TrendingDown,
  Building2,
  Calendar,
  Send,
  Download,
  AlertTriangle,
  FileSpreadsheet,
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

const initialAgingData = [
  {
    dealerCode: "DLR-5021",
    dealerName: "Ali Brothers Traders",
    city: "Lahore",
    creditLimit: 1500000,
    totalDue: 840000,
    days0_30: 520000,
    days31_60: 220000,
    days61_90: 100000,
    days90Plus: 0,
    lastPayment: "04 Oct 2026 (Rs. 168,000)",
    status: "Healthy",
    phone: "0300-8472910",
  },
  {
    dealerCode: "DLR-4819",
    dealerName: "Zaman Auto Parts",
    city: "Karachi",
    creditLimit: 2000000,
    totalDue: 1450000,
    days0_30: 850000,
    days31_60: 420000,
    days61_90: 180000,
    days90Plus: 0,
    lastPayment: "03 Oct 2026 (Rs. 675,000)",
    status: "Healthy",
    phone: "0321-9874512",
  },
  {
    dealerCode: "DLR-3912",
    dealerName: "Raza & Sons",
    city: "Gujranwala",
    creditLimit: 800000,
    totalDue: 690000,
    days0_30: 210000,
    days31_60: 260000,
    days61_90: 140000,
    days90Plus: 80000,
    lastPayment: "01 Oct 2026 (Rs. 276,000)",
    status: "Attention",
    phone: "0333-5129481",
  },
  {
    dealerCode: "DLR-2980",
    dealerName: "Bilal Motor Works",
    city: "Faisalabad",
    creditLimit: 1200000,
    totalDue: 980000,
    days0_30: 340000,
    days31_60: 290000,
    days61_90: 210000,
    days90Plus: 140000,
    lastPayment: "29 Sep 2026 (Rs. 290,000)",
    status: "Overdue",
    phone: "0301-7482910",
  },
  {
    dealerCode: "DLR-1045",
    dealerName: "Tariq Traders",
    city: "Rawalpindi",
    creditLimit: 1000000,
    totalDue: 930000,
    days0_30: 730000,
    days31_60: 50000,
    days61_90: 50000,
    days90Plus: 100000,
    lastPayment: "27 Sep 2026 (Rs. 340,000)",
    status: "Overdue",
    phone: "0345-2849102",
  },
]

export function AdminAgingReportSection() {
  const [agingData, setAgingData] = useState(initialAgingData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReminder, setSelectedReminder] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const totalOutstanding = agingData.reduce((acc, curr) => acc + curr.totalDue, 0)
  const totalDays0_30 = agingData.reduce((acc, curr) => acc + curr.days0_30, 0)
  const totalDays31_60 = agingData.reduce((acc, curr) => acc + curr.days31_60, 0)
  const totalDays61_90 = agingData.reduce((acc, curr) => acc + curr.days61_90, 0)
  const totalDays90Plus = agingData.reduce((acc, curr) => acc + curr.days90Plus, 0)

  const filteredData = agingData.filter((d) => {
    return (
      d.dealerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.dealerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleCopyReminder = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6 w-full bg-white">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Accounts Receivable Aging Report
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Track overdue dealer credit balances, payment cycles (30, 60, 90+ days), and cashflow risk.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert("Aging report exported to CSV successfully.")}
          className="h-9 text-xs gap-1.5 cursor-pointer rounded-xl border-neutral-300"
        >
          <FileSpreadsheet className="size-3.5 text-neutral-600" />
          <span>Export Ledger Aging</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <Card className="rounded-2xl border bg-white p-4.5 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
            Total Outstanding
          </span>
          <p className="text-2xl font-bold text-neutral-900 mt-2">
            Rs. {totalOutstanding.toLocaleString()}
          </p>
          <span className="text-[11px] text-neutral-500 font-medium mt-1 inline-block">
            Across active wholesale accounts
          </span>
        </Card>

        <Card className="rounded-2xl border bg-white p-4.5 shadow-2xs">
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            0 – 30 Days (Current)
          </span>
          <p className="text-xl font-bold text-neutral-900 mt-2">
            Rs. {totalDays0_30.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">
            Standard payment credit cycle
          </span>
        </Card>

        <Card className="rounded-2xl border bg-white p-4.5 shadow-2xs">
          <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-amber-500" />
            31 – 60 Days (Due)
          </span>
          <p className="text-xl font-bold text-neutral-900 mt-2">
            Rs. {totalDays31_60.toLocaleString()}
          </p>
          <span className="text-[11px] text-amber-600 font-medium mt-1 inline-block">
            First reminder notice zone
          </span>
        </Card>

        <Card className="rounded-2xl border bg-white p-4.5 shadow-2xs">
          <span className="text-[11px] font-semibold text-orange-600 uppercase tracking-wider flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-orange-500" />
            61 – 90 Days (Overdue)
          </span>
          <p className="text-xl font-bold text-neutral-900 mt-2">
            Rs. {totalDays61_90.toLocaleString()}
          </p>
          <span className="text-[11px] text-orange-600 font-medium mt-1 inline-block">
            Urgent settlement required
          </span>
        </Card>

        <Card className="rounded-2xl border border-red-200 bg-red-50/30 p-4.5 shadow-2xs">
          <span className="text-[11px] font-semibold text-red-600 uppercase tracking-wider flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-red-600 animate-pulse" />
            90+ Days (Critical)
          </span>
          <p className="text-xl font-bold text-red-600 mt-2">
            Rs. {totalDays90Plus.toLocaleString()}
          </p>
          <span className="text-[11px] text-red-600 font-medium mt-1 inline-block">
            Credit hold / Stop dispatches
          </span>
        </Card>
      </div>

      <Card className="rounded-2xl border bg-white pb-0">
        <CardHeader className="flex sm:flex-row flex-col sm:items-center justify-between gap-4 px-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400" />
            <Input
              placeholder="Search dealer, city, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
          <span className="text-xs text-neutral-500 font-medium">
            Showing {filteredData.length} Dealers with Ledger Balances
          </span>
        </CardHeader>
        <CardContent className="px-6 pt-0">
          <div className="overflow-x-auto rounded-xl border border-neutral-200/80">
            <Table>
              <TableHeader className="bg-neutral-50/70">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-neutral-700">Dealer Name & Code</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">City</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">Credit Limit</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">Total Outstanding</TableHead>
                  <TableHead className="text-xs font-semibold text-emerald-700">0 – 30 Days</TableHead>
                  <TableHead className="text-xs font-semibold text-amber-700">31 – 60 Days</TableHead>
                  <TableHead className="text-xs font-semibold text-orange-700">61 – 90 Days</TableHead>
                  <TableHead className="text-xs font-semibold text-red-700">90+ Days</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((d) => (
                  <TableRow key={d.dealerCode} className="text-xs hover:bg-neutral-50/50">
                    <TableCell>
                      <div className="font-semibold text-neutral-900">{d.dealerName}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{d.dealerCode}</div>
                    </TableCell>
                    <TableCell className="text-neutral-700 font-medium">
                      {d.city}
                    </TableCell>
                    <TableCell className="text-neutral-600 font-mono">
                      Rs. {d.creditLimit.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-bold text-neutral-900">
                      Rs. {d.totalDue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-emerald-700 font-medium">
                      Rs. {d.days0_30.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-amber-700 font-medium">
                      Rs. {d.days31_60.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-orange-700 font-medium">
                      Rs. {d.days61_90.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {d.days90Plus > 0 ? (
                        <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                          Rs. {d.days90Plus.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-neutral-400">Rs. 0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedReminder(d)}
                        className="h-7 px-2.5 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer gap-1"
                      >
                        <Send className="size-3" />
                        <span>Remind</span>
                      </Button>
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

      <Dialog open={!!selectedReminder} onOpenChange={(open) => !open && setSelectedReminder(null)}>
        <DialogContent className="sm:max-w-md p-6 rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold text-neutral-900">
              <Clock className="size-5 text-red-600" />
              Dealer Payment Reminder Notice
            </DialogTitle>
          </DialogHeader>

          {selectedReminder && (
            <div className="flex flex-col gap-4 mt-2 text-xs">
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm">{selectedReminder.dealerName}</h4>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{selectedReminder.dealerCode} • {selectedReminder.city}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-neutral-400">Total Outstanding</span>
                  <p className="font-bold text-neutral-900 text-sm">Rs. {selectedReminder.totalDue.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50">
                  <span className="text-neutral-400 text-[11px]">Due Over 60 Days</span>
                  <p className="font-bold text-orange-600 mt-1">Rs. {selectedReminder.days61_90.toLocaleString()}</p>
                </div>
                <div className="p-2.5 rounded-lg border border-red-100 bg-red-50/50">
                  <span className="text-red-600 text-[11px]">Critical (Over 90 Days)</span>
                  <p className="font-bold text-red-700 mt-1">Rs. {selectedReminder.days90Plus.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
                <span className="text-neutral-400 text-[11px]">Drafted WhatsApp Reminder:</span>
                <p className="font-sans text-neutral-800 mt-1.5 p-2 bg-white rounded border border-neutral-200 text-xs leading-relaxed">
                  Salam {selectedReminder.dealerName}! This is a reminder from Sarfraz Autos Wholesale regarding your outstanding ledger balance of Rs. {selectedReminder.totalDue.toLocaleString()} (including Rs. {selectedReminder.days90Plus.toLocaleString()} overdue beyond 90 days). Kindly arrange payment clearance via bank transfer to avoid dispatch delays. JazakAllah.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopyReminder(`Salam ${selectedReminder.dealerName}! This is a reminder from Sarfraz Autos Wholesale regarding your outstanding ledger balance of Rs. ${selectedReminder.totalDue.toLocaleString()} (including Rs. ${selectedReminder.days90Plus.toLocaleString()} overdue beyond 90 days). Kindly arrange payment clearance via bank transfer to avoid dispatch delays. JazakAllah.`)}
                  className="h-8 text-xs cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy Message"}
                </Button>
                <Button
                  size="sm"
                  onClick={() => window.open(`https://wa.me/${selectedReminder.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Salam ${selectedReminder.dealerName}! This is a reminder from Sarfraz Autos Wholesale regarding your outstanding ledger balance of Rs. ${selectedReminder.totalDue.toLocaleString()} (including Rs. ${selectedReminder.days90Plus.toLocaleString()} overdue beyond 90 days). Kindly arrange payment clearance via bank transfer to avoid dispatch delays. JazakAllah.`)}`, "_blank")}
                  className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                >
                  Open WhatsApp
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

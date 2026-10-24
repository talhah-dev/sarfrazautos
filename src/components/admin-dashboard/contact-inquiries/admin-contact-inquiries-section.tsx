"use client"

import { useState } from "react"
import {
  Inbox,
  Clock,
  CheckCircle2,
  Search,
  Eye,
  Phone,
  Mail,
  Building2,
} from "lucide-react"
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
import { ContactInquiryDetailDialog } from "./contact-inquiry-detail-dialog"

const initialInquiries = [
  {
    id: "MSG-301",
    name: "Kamran Akram",
    email: "kamran.akram@gmail.com",
    phone: "0300-4829103",
    shopName: "Kamran Autos",
    message: "Salam. I want to inquire about bulk carton prices for CD 70 Cylinder Heads and Crown Clutch Plates. Can you please share your latest dealer price list for Karachi delivery?",
    date: "12 Oct 2026, 11:20 AM",
    status: "New",
  },
  {
    id: "MSG-302",
    name: "Muhammad Asif",
    email: "asif.parts@yahoo.com",
    phone: "0321-7892014",
    shopName: "Asif Bike Tuning Point",
    message: "Do you have Japanese standard carburetors for CG 125 in stock? I need 10 pieces for my workshop in Lahore. Let me know delivery options.",
    date: "12 Oct 2026, 09:45 AM",
    status: "New",
  },
  {
    id: "MSG-303",
    name: "Naveed Qureshi",
    email: "naveed.q@outlook.com",
    phone: "0333-6481920",
    shopName: "Qureshi Spare Parts",
    message: "Wanted to know if you offer credit terms for registered wholesale dealers in Multan. We already buy around 15 cartons a month.",
    date: "11 Oct 2026, 04:15 PM",
    status: "New",
  },
  {
    id: "MSG-304",
    name: "Bilal Hussain",
    email: "bilal.h@gmail.com",
    phone: "0345-8192034",
    shopName: "",
    message: "Looking for complete 4-stroke engine block assembly for a personal bike project. Is retail counter delivery available in Rawalpindi?",
    date: "10 Oct 2026, 02:30 PM",
    status: "Replied",
  },
  {
    id: "MSG-305",
    name: "Usman Ghani",
    email: "usman.ghani@hotmail.com",
    phone: "0312-5928104",
    shopName: "Ghani Auto Agency",
    message: "We placed an order last week and received the shipment safely. Just wanted to confirm when the next shipment of performance crankshafts arrives.",
    date: "09 Oct 2026, 12:10 PM",
    status: "Replied",
  },
]

export function AdminContactInquiriesSection() {
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const newCount = inquiries.filter((m) => m.status === "New").length
  const repliedCount = inquiries.filter((m) => m.status === "Replied").length

  const filteredInquiries = inquiries.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "All" ? true : m.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateStatus = (id: string, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    )
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev: any) => ({ ...prev, status: newStatus }))
    }
  }

  const getStatusBadge = (status: string) => {
    if (status === "New") {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-medium gap-1">
          <Clock className="size-3" />
          New
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium gap-1">
        <CheckCircle2 className="size-3" />
        Replied
      </Badge>
    )
  }

  return (
    <div className="flex flex-col gap-5 px-4 lg:px-6 py-4 md:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Contact Messages & Inquiries
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Inquiries and parts consultation requests submitted from the website contact form.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-3">
        <Card className="@container/card">
          <CardHeader>
            <Inbox className="size-8 text-neutral-700 stroke-[1.5]" />
            <CardDescription className="pt-7">Total Messages</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {inquiries.length}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-neutral-100 text-neutral-700 border-neutral-200 text-xs">
                Inbox
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <Clock className="size-8 text-neutral-700 stroke-[1.5]" />
            <CardDescription className="pt-7">New Inquiries</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {newCount}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                Needs Response
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CheckCircle2 className="size-8 text-neutral-700 stroke-[1.5]" />
            <CardDescription className="pt-7">Replied / Resolved</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {repliedCount}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                Completed
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col gap-4 border border-neutral-200 rounded-xl bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400" />
            <Input
              placeholder="Search name, email, phone, message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>

          <div className="flex items-center gap-1">
            {["All", "New", "Replied"].map((st) => (
              <Button
                key={st}
                type="button"
                size="sm"
                variant={statusFilter === st ? "default" : "outline"}
                onClick={() => setStatusFilter(st)}
                className="h-8 text-xs cursor-pointer"
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
                <TableHead className="text-xs font-semibold text-neutral-700">Sender</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Contact</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Shop Name</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Message Preview</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Received</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700">Status</TableHead>
                <TableHead className="text-xs font-semibold text-neutral-700 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-neutral-500 text-xs">
                    No contact messages found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((m) => (
                  <TableRow key={m.id} className="text-xs hover:bg-neutral-50/70">
                    <TableCell>
                      <div className="font-semibold text-neutral-900">{m.name}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{m.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-neutral-800">{m.phone}</div>
                      <div className="text-[11px] text-neutral-400 truncate max-w-[150px]">{m.email}</div>
                    </TableCell>
                    <TableCell className="text-neutral-700">
                      {m.shopName || <span className="text-neutral-400">Individual</span>}
                    </TableCell>
                    <TableCell className="max-w-[260px] truncate text-neutral-600">
                      {m.message}
                    </TableCell>
                    <TableCell className="text-neutral-500 whitespace-nowrap">
                      {m.date}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(m.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2.5 text-xs text-neutral-700 hover:text-neutral-900 border-neutral-200 cursor-pointer gap-1.5"
                        onClick={() => setSelectedInquiry(m)}
                      >
                        <Eye className="size-3.5" />
                        <span>View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <AdminPagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>

      <ContactInquiryDetailDialog
        inquiry={selectedInquiry}
        open={!!selectedInquiry}
        onOpenChange={(open: boolean) => {
          if (!open) setSelectedInquiry(null)
        }}
        onStatusChange={updateStatus}
      />
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Eye,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
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

const initialRequests = [
  {
    id: "REQ-104",
    shopName: "Al-Madina Auto Spares",
    ownerName: "Tariq Mahmood",
    email: "tariq.madina@gmail.com",
    phone: "0300-8472910",
    city: "Faisalabad",
    address: "Shop #12, Katchery Bazaar, Circular Road",
    cnic: "33100-8492019-1",
    ntn: "4192084-2",
    date: "11 Oct 2026",
    status: "Pending",
  },
  {
    id: "REQ-103",
    shopName: "Chaudhry Bike Center",
    ownerName: "Muhammad Farooq",
    email: "farooq.chaudhry@yahoo.com",
    phone: "0321-9874512",
    city: "Gujranwala",
    address: "Near Sialkoti Gate, Main GT Road",
    cnic: "34101-7294019-5",
    ntn: "8204910-1",
    date: "10 Oct 2026",
    status: "Pending",
  },
  {
    id: "REQ-102",
    shopName: "Khan Brothers Motorcycles",
    ownerName: "Imran Khan Niazi",
    email: "khan.brothers@gmail.com",
    phone: "0333-5129481",
    city: "Rawalpindi",
    address: "Plaza 4, Gawalmandi Auto Market",
    cnic: "37405-1928475-3",
    ntn: "9102847-8",
    date: "09 Oct 2026",
    status: "Approved",
  },
  {
    id: "REQ-101",
    shopName: "Multan Autos & Machinery",
    ownerName: "Sheikh Abdul Rehman",
    email: "rehman.multan@gmail.com",
    phone: "0301-7482910",
    city: "Multan",
    address: "Shop #8, Hussain Agahi Auto Sector",
    cnic: "36302-8471920-7",
    ntn: "3819204-5",
    date: "08 Oct 2026",
    status: "Approved",
  },
  {
    id: "REQ-100",
    shopName: "Zubair Spare Traders",
    ownerName: "Zubair Ahmed",
    email: "zubair.traders@hotmail.com",
    phone: "0345-2849102",
    city: "Hyderabad",
    address: "Auto Market, Station Road",
    cnic: "41303-9182746-1",
    ntn: "Unregistered",
    date: "07 Oct 2026",
    status: "Rejected",
  },
]

export function AdminDealerRequestsTable() {
  const [requests, setRequests] = useState(initialRequests)
  const [selectedDealer, setSelectedDealer] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const updateStatus = (id: string, newStatus: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    )
    if (selectedDealer && selectedDealer.id === id) {
      setSelectedDealer((prev: any) => ({ ...prev, status: newStatus }))
    }
  }

  const getStatusBadge = (status: string) => {
    if (status === "Approved") {
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium gap-1">
          <CheckCircle2 className="size-3" />
          Approved
        </Badge>
      )
    }
    if (status === "Pending") {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-medium gap-1">
          <Clock className="size-3" />
          Pending
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs font-medium gap-1">
        <XCircle className="size-3" />
        Rejected
      </Badge>
    )
  }

  return (
    <>
      <Card className="w-full rounded-2xl border bg-white pb-0">
        <CardHeader className="flex sm:flex-row flex-col justify-between sm:items-center items-start gap-4 px-6 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold text-neutral-900 tracking-tight">
              Recent Dealer Requests
            </CardTitle>
            <CardDescription className="text-xs text-neutral-500 mt-0.5">
              Wholesale accounts registration requests pending verification and pricing access.
            </CardDescription>
          </div>
          <Link
            href="/admin/dealer-requests"
            className="inline-flex items-center gap-1.5 h-8 rounded-xl border border-input bg-background hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 text-xs font-medium px-3 shadow-2xs transition-colors shrink-0"
          >
            <span>Manage All</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </CardHeader>

        <CardContent className="px-6 ">
          <div className="overflow-x-auto rounded-xl border border-neutral-200/80">
            <Table>
              <TableHeader className="bg-neutral-50/70">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-neutral-700">Shop / Business</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">Owner Name</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">City & Contact</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">CNIC / NTN</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">Date</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-neutral-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id} className="text-xs hover:bg-neutral-50/50">
                    <TableCell>
                      <div className="font-semibold text-neutral-900">{r.shopName}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{r.id}</div>
                    </TableCell>
                    <TableCell className="text-neutral-700 font-medium">
                      {r.ownerName}
                    </TableCell>
                    <TableCell>
                      <div className="text-neutral-800 font-medium">{r.phone}</div>
                      <div className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="size-3" />
                        {r.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-neutral-700 text-[11px]">{r.cnic}</div>
                      <div className="text-[11px] text-neutral-400">NTN: {r.ntn}</div>
                    </TableCell>
                    <TableCell className="text-neutral-600 whitespace-nowrap">
                      {r.date}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(r.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer"
                          onClick={() => setSelectedDealer(r)}
                        >
                          <Eye className="size-3.5 mr-1" />
                          View
                        </Button>
                        {r.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              className="h-7 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                              onClick={() => updateStatus(r.id, "Approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                              onClick={() => updateStatus(r.id, "Rejected")}
                            >
                              Reject
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
          <AdminPagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      <Dialog open={!!selectedDealer} onOpenChange={(open) => !open && setSelectedDealer(null)}>
        <DialogContent className="sm:max-w-md p-6 rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold text-neutral-900">
              <Building2 className="size-5 text-neutral-700" />
              Dealer Application Details
            </DialogTitle>
          </DialogHeader>

          {selectedDealer && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm">{selectedDealer.shopName}</h4>
                  <p className="text-xs text-neutral-500 mt-0.5 font-mono">{selectedDealer.id} • Applied {selectedDealer.date}</p>
                </div>
                {getStatusBadge(selectedDealer.status)}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50">
                  <span className="text-neutral-400 text-[11px] flex items-center gap-1">
                    <ShieldCheck className="size-3" /> Owner
                  </span>
                  <p className="font-medium text-neutral-900 mt-1">{selectedDealer.ownerName}</p>
                </div>
                <div className="p-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50">
                  <span className="text-neutral-400 text-[11px] flex items-center gap-1">
                    <MapPin className="size-3" /> City
                  </span>
                  <p className="font-medium text-neutral-900 mt-1">{selectedDealer.city}</p>
                </div>
                <div className="p-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50">
                  <span className="text-neutral-400 text-[11px] flex items-center gap-1">
                    <Phone className="size-3" /> Phone
                  </span>
                  <p className="font-medium text-neutral-900 mt-1">{selectedDealer.phone}</p>
                </div>
                <div className="p-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50">
                  <span className="text-neutral-400 text-[11px] flex items-center gap-1">
                    <Mail className="size-3" /> Email
                  </span>
                  <p className="font-medium text-neutral-900 mt-1 truncate">{selectedDealer.email}</p>
                </div>
              </div>

              <div className="text-xs p-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
                <span className="text-neutral-400 text-[11px]">Shop Address</span>
                <p className="font-medium text-neutral-900 mt-1">{selectedDealer.address}</p>
              </div>

              <div className="flex items-center justify-between text-xs p-3 rounded-lg border border-neutral-100 bg-neutral-50/50 font-mono">
                <div>
                  <span className="text-neutral-400 text-[11px] font-sans">CNIC</span>
                  <p className="font-medium text-neutral-900 mt-0.5">{selectedDealer.cnic}</p>
                </div>
                <div>
                  <span className="text-neutral-400 text-[11px] font-sans">NTN Number</span>
                  <p className="font-medium text-neutral-900 mt-0.5">{selectedDealer.ntn}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
                {selectedDealer.status === "Pending" ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                      onClick={() => updateStatus(selectedDealer.id, "Rejected")}
                    >
                      Reject Application
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                      onClick={() => updateStatus(selectedDealer.id, "Approved")}
                    >
                      Approve Dealership
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs cursor-pointer"
                    onClick={() => setSelectedDealer(null)}
                  >
                    Close
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

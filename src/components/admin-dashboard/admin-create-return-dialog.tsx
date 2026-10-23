"use client"

import { useState } from "react"
import {
  Search,
  ChevronDown,
  Check,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  User,
  Phone,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const catalogueProducts = [
  { id: "P-001", name: "CD70 Complete Cylinder Head", category: "Cylinders & Heads", retailPrice: 2800, wholesalePrice: 84000 },
  { id: "P-002", name: "Crown Heavy Duty Clutch Plates", category: "Clutch Plates", retailPrice: 1850, wholesalePrice: 135000 },
  { id: "P-003", name: "125cc Complete Piston Kit", category: "Pistons", retailPrice: 2100, wholesalePrice: 42000 },
  { id: "P-004", name: "4-Stroke Engine Block Assembly", category: "Engine Blocks", retailPrice: 9500, wholesalePrice: 92000 },
  { id: "P-005", name: "Performance Crankshaft Assembly", category: "Crankshafts", retailPrice: 8800, wholesalePrice: 85000 },
  { id: "P-006", name: "Japanese Standard 70cc Carburetor", category: "Carburetors", retailPrice: 2400, wholesalePrice: 48000 },
  { id: "P-007", name: "Complete Overhaul Gasket Set", category: "Gaskets", retailPrice: 1400, wholesalePrice: 35000 },
  { id: "P-008", name: "Camshaft & Rocker Arm Kit", category: "Cylinders & Heads", retailPrice: 3200, wholesalePrice: 92000 },
  { id: "P-009", name: "Front & Rear Brake Shoe Set", category: "Brakes", retailPrice: 650, wholesalePrice: 26000 },
  { id: "P-010", name: "Heavy Duty Drive Chain 428-104L", category: "Chains", retailPrice: 1200, wholesalePrice: 36000 },
]

const recentOrders = [
  { id: "POS-2026-104", client: "Walk-in Customer", phone: "0300-8821942", product: "CD70 Complete Cylinder Head", type: "Retail", amount: 2800, qty: 1, productId: "P-001", timeAgo: "Today (25 mins ago)" },
  { id: "POS-2026-103", client: "Tariq Mechanic", phone: "0321-4491023", product: "Crown Heavy Duty Clutch Plates", type: "Retail", amount: 1850, qty: 1, productId: "P-002", timeAgo: "Today (1 hr ago)" },
  { id: "POS-2026-102", client: "Cash Customer", phone: "", product: "125cc Complete Piston Kit", type: "Retail", amount: 2100, qty: 1, productId: "P-003", timeAgo: "Yesterday" },
  { id: "POS-2026-101", client: "Bilal Auto Works", phone: "0345-9912003", product: "Japanese Standard 70cc Carburetor", type: "Retail", amount: 2400, qty: 1, productId: "P-006", timeAgo: "2 days ago" },
  { id: "ORD-2026-004", client: "Raza & Sons", phone: "0302-3344551", product: "4-Stroke Engine Block Assembly", type: "Wholesale", amount: 276000, qty: 3, productId: "P-004", timeAgo: "3 days ago" },
  { id: "ORD-2026-002", client: "Zaman Auto Parts", phone: "0312-8877665", product: "Crown Heavy Duty Clutch Plates", type: "Wholesale", amount: 675000, qty: 5, productId: "P-002", timeAgo: "5 days ago" },
  { id: "ORD-2026-001", client: "Ali Brothers Traders", phone: "0333-1122334", product: "CD70 Complete Cylinder Head", type: "Wholesale", amount: 168000, qty: 2, productId: "P-001", timeAgo: "6 days ago" },
]

export function AdminCreateReturnDialog({
  open,
  onOpenChange,
  onReturnCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReturnCreated: (newReturn: any) => void
}) {
  const [returnId, setReturnId] = useState(() => "RET-2026-" + Math.floor(100 + Math.random() * 900))
  const [searchInput, setSearchInput] = useState("")
  const [selectedOrderRef, setSelectedOrderRef] = useState("")
  const [isRecentDropdownOpen, setIsRecentDropdownOpen] = useState(false)
  const [matchingOrders, setMatchingOrders] = useState<typeof recentOrders>([])
  const [fetchMessage, setFetchMessage] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" })

  const [clientName, setClientName] = useState("Walk-in Customer")
  const [clientPhone, setClientPhone] = useState("")
  const [returnType, setReturnType] = useState<"Retail" | "Wholesale">("Retail")
  const [selectedProduct, setSelectedProduct] = useState(catalogueProducts[0])
  const [productSearch, setProductSearch] = useState("")
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)
  const [quantity, setQuantity] = useState("1")
  const [refundAmount, setRefundAmount] = useState("2800")

  const [reason, setReason] = useState("Mismatch / Wrong part taken by customer")
  const [condition, setCondition] = useState("Original Packaging / Unused")
  const [refundPaymentMethod, setRefundPaymentMethod] = useState("Cash Refund (Naqd)")
  const [returnStockStatus, setReturnStockStatus] = useState("Restocked (Back on Shelf)")

  const filteredProducts = catalogueProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  )

  const handleApplyOrder = (order: typeof recentOrders[0]) => {
    setSelectedOrderRef(order.id)
    setClientName(order.client)
    setClientPhone(order.phone || "")
    setReturnType(order.type as "Retail" | "Wholesale")
    setQuantity(String(order.qty))
    setRefundAmount(String(order.amount))

    const matchedProd = catalogueProducts.find(
      (p) => p.id === order.productId || p.name === order.product
    )
    if (matchedProd) {
      setSelectedProduct(matchedProd)
    }

    setFetchMessage({
      type: "success",
      text: `Loaded ${order.id}: ${order.client} • ${order.product} (Rs. ${order.amount.toLocaleString()})`,
    })
    setMatchingOrders([])
    setIsRecentDropdownOpen(false)
  }

  const handleSearchOrFetch = () => {
    const query = searchInput.trim().toLowerCase()
    if (!query) {
      setFetchMessage({
        type: "error",
        text: "Please type an Order ID, Customer Name, or Phone Number to search.",
      })
      return
    }

    const matches = recentOrders.filter(
      (o) =>
        o.id.toLowerCase().includes(query) ||
        o.client.toLowerCase().includes(query) ||
        o.phone.toLowerCase().includes(query) ||
        o.product.toLowerCase().includes(query)
    )

    if (matches.length === 1) {
      handleApplyOrder(matches[0])
    } else if (matches.length > 1) {
      setMatchingOrders(matches)
      setFetchMessage({
        type: "success",
        text: `Found ${matches.length} matching sales. Click one below to auto-fill:`,
      })
    } else {
      setMatchingOrders([])
      setFetchMessage({
        type: "error",
        text: `No previous order found for "${searchInput.trim()}". You can still record this direct counter return below.`,
      })
    }
  }

  const handleDirectReturn = () => {
    setSelectedOrderRef("Walk-in Direct Return")
    setSearchInput("")
    setMatchingOrders([])
    setIsRecentDropdownOpen(false)
    setFetchMessage({
      type: "success",
      text: "Direct Counter Return selected (No Order ID required). Choose the product and refund details below.",
    })
  }

  const handleSelectProduct = (prod: any) => {
    setSelectedProduct(prod)
    const unitPrice = returnType === "Wholesale" ? prod.wholesalePrice : prod.retailPrice
    const qty = Math.max(1, parseInt(quantity) || 1)
    setRefundAmount(String(unitPrice * qty))
    setIsProductDropdownOpen(false)
    setProductSearch("")
  }

  const handleQuantityChange = (newQtyStr: string) => {
    setQuantity(newQtyStr)
    const qty = Math.max(1, parseInt(newQtyStr) || 1)
    const unitPrice = returnType === "Wholesale" ? selectedProduct.wholesalePrice : selectedProduct.retailPrice
    setRefundAmount(String(unitPrice * qty))
  }

  const handleTypeChange = (newType: "Retail" | "Wholesale") => {
    setReturnType(newType)
    const qty = Math.max(1, parseInt(quantity) || 1)
    const unitPrice = newType === "Wholesale" ? selectedProduct.wholesalePrice : selectedProduct.retailPrice
    setRefundAmount(String(unitPrice * qty))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

    const finalStatus =
      returnStockStatus.startsWith("Restocked")
        ? "Restocked"
        : returnStockStatus.startsWith("Refunded")
        ? "Refunded"
        : returnStockStatus.startsWith("Received")
        ? "Received"
        : "Pending Receipt"

    const newReturn = {
      id: returnId,
      orderId: selectedOrderRef.trim()
        ? selectedOrderRef.trim()
        : searchInput.trim()
        ? searchInput.trim()
        : "Walk-in Direct Return",
      client: clientName + (clientPhone ? ` (${clientPhone})` : ""),
      city: "Shop Counter",
      type: returnType,
      product: selectedProduct.name,
      quantity: Math.max(1, parseInt(quantity) || 1),
      returnAmount: Math.max(0, parseInt(refundAmount) || 0),
      reason: reason,
      condition: condition,
      status: finalStatus,
      refundMethod: refundPaymentMethod,
      date: today,
    }

    onReturnCreated(newReturn)
    onOpenChange(false)

    setReturnId("RET-2026-" + Math.floor(100 + Math.random() * 900))
    setSearchInput("")
    setSelectedOrderRef("")
    setMatchingOrders([])
    setFetchMessage({ type: null, text: "" })
    setClientName("Walk-in Customer")
    setClientPhone("")
    setQuantity("1")
    setRefundAmount(String(catalogueProducts[0].retailPrice))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto p-6 rounded-2xl bg-white shadow-xl">
        <DialogHeader className="pb-2 border-b border-neutral-100">
          <div className="flex items-center justify-between pr-6">
            <div>
              <DialogTitle className="text-base font-bold text-neutral-900">
                Record Walk-in Return
              </DialogTitle>
              <p className="text-xs text-neutral-500 mt-0.5">
                7-Day Return Policy: Locate sales from the last 7 days by Order ID, Name, or Phone, or log a direct counter return.
              </p>
            </div>
            <Badge variant="outline" className="font-mono text-xs px-2.5 py-1 bg-neutral-50 text-neutral-700 border-neutral-200 shrink-0">
              {returnId}
            </Badge>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="searchOrderInput" className="text-xs font-semibold text-neutral-800">
                Find Sale by Order ID, Customer Name, or Phone (Last 7 Days)
              </Label>
              <button
                type="button"
                onClick={handleDirectReturn}
                className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
              >
                No Order ID? Direct Return
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400" />
                <Input
                  id="searchOrderInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleSearchOrFetch()
                    }
                  }}
                  placeholder="e.g. POS-2026-104, Tariq Mechanic, or 0300..."
                  className="pl-8 h-9 text-xs bg-white"
                />
              </div>

              <Button
                type="button"
                onClick={handleSearchOrFetch}
                className="h-9 px-4 text-xs bg-neutral-900 hover:bg-neutral-800 text-white cursor-pointer shrink-0 font-medium"
              >
                Search
              </Button>

              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRecentDropdownOpen(!isRecentDropdownOpen)}
                  className="h-9 px-3 text-xs border-neutral-200 hover:bg-white cursor-pointer shrink-0 gap-1.5"
                  title="View sales from the last 7 days eligible for return"
                >
                  <Clock className="size-3.5 text-neutral-500" />
                  <span>Last 7 Days Sales</span>
                </Button>

                {isRecentDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 z-50 rounded-xl border border-neutral-200 bg-white shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95">
                    <div className="p-2 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-800">
                        Recent Sales (Last 7 Days Policy)
                      </span>
                      <span className="text-[11px] text-emerald-600 font-medium">Eligible for Return</span>
                    </div>
                    <div className="max-h-56 overflow-y-auto p-1 divide-y divide-neutral-50">
                      {recentOrders.map((ord) => (
                        <button
                          key={ord.id}
                          type="button"
                          onClick={() => handleApplyOrder(ord)}
                          className="w-full flex items-center justify-between p-2.5 text-left text-xs hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <div className="flex flex-col min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-semibold text-neutral-900">{ord.id}</span>
                              <span className="text-[11px] text-neutral-400">• {ord.timeAgo}</span>
                            </div>
                            <span className="font-medium text-neutral-700 truncate">{ord.client}</span>
                            <span className="text-[11px] text-neutral-500 truncate">{ord.product}</span>
                          </div>
                          <span className="font-mono text-xs font-bold text-neutral-900 shrink-0">
                            Rs. {ord.amount.toLocaleString()}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {matchingOrders.length > 0 && (
              <div className="p-2 rounded-lg bg-white border border-neutral-200 space-y-1">
                <span className="text-[11px] font-semibold text-neutral-700">Multiple Matches Found:</span>
                <div className="divide-y divide-neutral-100 max-h-36 overflow-y-auto">
                  {matchingOrders.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleApplyOrder(m)}
                      className="w-full flex items-center justify-between py-1.5 px-2 text-left text-xs hover:bg-neutral-50 rounded transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col min-w-0 pr-2">
                        <span className="font-medium text-neutral-900">{m.client} ({m.id})</span>
                        <span className="text-[11px] text-neutral-500">{m.product}</span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-neutral-800">
                        Rs. {m.amount.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {fetchMessage.type && (
              <div
                className={`p-2 rounded-lg text-xs flex items-center gap-1.5 ${
                  fetchMessage.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                {fetchMessage.type === "success" ? (
                  <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="size-3.5 shrink-0 text-amber-600" />
                )}
                <span>{fetchMessage.text}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="clientName" className="text-xs font-medium text-neutral-700">
                Customer / Dealer Name *
              </Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Walk-in Customer"
                className="h-9 text-xs mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="clientPhone" className="text-xs font-medium text-neutral-700">
                Customer Phone (Optional)
              </Label>
              <Input
                id="clientPhone"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="e.g. 0300-1234567"
                className="h-9 text-xs mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-neutral-700">Return Channel</Label>
              <Select
                value={returnType}
                onValueChange={(val: any) => handleTypeChange(val || "Retail")}
              >
                <SelectTrigger className="w-full h-9 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Retail">Retail (Single Unit)</SelectItem>
                  <SelectItem value="Wholesale">Wholesale (Carton)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5 relative">
            <Label className="text-xs font-medium text-neutral-700">Returned Product *</Label>
            <button
              type="button"
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-input bg-white text-left text-xs transition-colors hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer shadow-2xs"
            >
              <div className="flex flex-col min-w-0 pr-2">
                <span className="font-semibold text-neutral-900 truncate">
                  {selectedProduct ? selectedProduct.name : "Select returned product..."}
                </span>
                <span className="text-[11px] text-neutral-500">
                  {selectedProduct?.category} ({selectedProduct?.id})
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono font-bold text-neutral-800 text-xs">
                  Rs.{" "}
                  {(returnType === "Wholesale"
                    ? selectedProduct.wholesalePrice
                    : selectedProduct.retailPrice
                  ).toLocaleString()}
                </span>
                <ChevronDown className="size-4 text-neutral-400" />
              </div>
            </button>

            {isProductDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl border border-neutral-200 bg-white shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95">
                <div className="p-2 border-b border-neutral-100 bg-neutral-50">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-neutral-400" />
                    <Input
                      placeholder="Search product name or code..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pl-7 h-8 text-xs bg-white"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="max-h-52 overflow-y-auto p-1 divide-y divide-neutral-50">
                  {filteredProducts.length === 0 ? (
                    <div className="p-3 text-center text-xs text-neutral-400">
                      No matching product found
                    </div>
                  ) : (
                    filteredProducts.map((p) => {
                      const isSelected = p.id === selectedProduct.id
                      const pPrice = returnType === "Wholesale" ? p.wholesalePrice : p.retailPrice
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectProduct(p)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-red-50 text-red-900 font-medium"
                              : "hover:bg-neutral-50 text-neutral-800"
                          }`}
                        >
                          <div className="flex flex-col min-w-0 pr-2">
                            <span className="font-medium truncate">{p.name}</span>
                            <span className="text-[11px] text-neutral-400">{p.category}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono text-xs font-semibold text-neutral-700">
                              Rs. {pPrice.toLocaleString()}
                            </span>
                            {isSelected && <Check className="size-3.5 text-red-600" />}
                          </div>
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="quantity" className="text-xs font-medium text-neutral-700">
                Returned Quantity *
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="h-9 text-xs mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="refundAmount" className="text-xs font-medium text-neutral-700">
                Refund Amount (Rs.) *
              </Label>
              <Input
                id="refundAmount"
                type="number"
                min="0"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="h-9 text-xs mt-1 font-mono font-semibold text-neutral-900"
                required
              />
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-neutral-700">Return Reason</Label>
              <Select value={reason} onValueChange={(val: any) => setReason(val || "")}>
                <SelectTrigger className="w-full h-9 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mismatch / Wrong part taken by customer">Mismatch / Wrong part taken</SelectItem>
                  <SelectItem value="Customer changed mind / Not needed">Not needed / Changed mind</SelectItem>
                  <SelectItem value="Defective / Leakage or manufacturing fault">Defective / Manufacturing fault</SelectItem>
                  <SelectItem value="Wrong bike model / Fitting mismatch">Fitting mismatch</SelectItem>
                  <SelectItem value="Excess dealer stock return">Excess dealer stock return</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium text-neutral-700">Inspected Condition</Label>
              <Select value={condition} onValueChange={(val: any) => setCondition(val || "")}>
                <SelectTrigger className="w-full h-9 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Original Packaging / Unused">Original Packaging / 100% Unused</SelectItem>
                  <SelectItem value="Opened but Unused in Box">Opened but Unused in Box</SelectItem>
                  <SelectItem value="Tested / Light Fitting Marks">Tested / Minor Marks</SelectItem>
                  <SelectItem value="Faulty / Damaged (Return to Supplier)">Faulty / Return to Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-neutral-700">Refund Payment Method</Label>
              <Select value={refundPaymentMethod} onValueChange={(val: any) => setRefundPaymentMethod(val || "")}>
                <SelectTrigger className="w-full h-9 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash Refund (Naqd)">Cash Refund (Naqd)</SelectItem>
                  <SelectItem value="Khata / Ledger Credit">Khata / Ledger Credit</SelectItem>
                  <SelectItem value="Bank Transfer / Raast">Bank Transfer / Raast</SelectItem>
                  <SelectItem value="Part Exchange / Replacement">Direct Part Replacement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium text-neutral-700">Return Stock Status</Label>
              <Select value={returnStockStatus} onValueChange={(val: any) => setReturnStockStatus(val || "")}>
                <SelectTrigger className="w-full h-9 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Restocked (Back on Shelf)">Restocked (Back on Shelf)</SelectItem>
                  <SelectItem value="Received (Under Inspection)">Received (Under Inspection)</SelectItem>
                  <SelectItem value="Refund Issued">Refund Issued</SelectItem>
                  <SelectItem value="Pending Receipt">Pending Receipt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-9 px-4 text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-9 px-5 text-xs bg-red-600 hover:bg-red-700 text-white cursor-pointer font-medium"
            >
              Save Walk-in Return
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

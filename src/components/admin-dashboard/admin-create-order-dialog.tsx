"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Trash2,
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

export function AdminCreateOrderDialog({
  open,
  onOpenChange,
  onOrderCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOrderCreated: (newOrder: any) => void
}) {
  const [orderId, setOrderId] = useState(() => "POS-2026-" + Math.floor(100 + Math.random() * 900))
  const [customerName, setCustomerName] = useState("Walk-in Customer")
  const [customerPhone, setCustomerPhone] = useState("")
  const [orderType, setOrderType] = useState<"Retail" | "Wholesale">("Retail")
  const [paymentMethod, setPaymentMethod] = useState("Cash")
  const [orderStatus, setOrderStatus] = useState("Delivered")
  const [discount, setDiscount] = useState("0")

  const [items, setItems] = useState<
    Array<{ id: string; name: string; price: number; qty: number }>
  >([
    {
      id: catalogueProducts[0].id,
      name: catalogueProducts[0].name,
      price: catalogueProducts[0].retailPrice,
      qty: 1,
    },
  ])

  const [productSearch, setProductSearch] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const filteredProducts = catalogueProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  )

  const handleAddItem = (prod: any) => {
    const itemPrice = orderType === "Wholesale" ? prod.wholesalePrice : prod.retailPrice
    setItems((prev) => {
      const existing = prev.find((i) => i.id === prod.id)
      if (existing) {
        return prev.map((i) =>
          i.id === prod.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { id: prod.id, name: prod.name, price: itemPrice, qty: 1 }]
    })
    setIsSearchOpen(false)
    setProductSearch("")
  }

  const handleUpdateQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i))
    )
  }

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const handleTypeChange = (newType: "Retail" | "Wholesale") => {
    setOrderType(newType)
    setItems((prev) =>
      prev.map((item) => {
        const prod = catalogueProducts.find((p) => p.id === item.id)
        const newPrice = prod
          ? newType === "Wholesale"
            ? prod.wholesalePrice
            : prod.retailPrice
          : item.price
        return { ...item, price: newPrice }
      })
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discountVal = Math.max(0, parseInt(discount) || 0)
  const grandTotal = Math.max(0, subtotal - discountVal)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    const productSummary = items
      .map((i) => `${i.name} x${i.qty}`)
      .join(", ")

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

    const newOrder = {
      id: orderId,
      dealer: customerName + (customerPhone ? ` (${customerPhone})` : ""),
      product: productSummary,
      type: orderType,
      amount: `Rs. ${grandTotal.toLocaleString()}`,
      status: orderStatus,
      date: today,
    }

    onOrderCreated(newOrder)
    onOpenChange(false)

    setOrderId("POS-2026-" + Math.floor(100 + Math.random() * 900))
    setCustomerName("Walk-in Customer")
    setCustomerPhone("")
    setDiscount("0")
    setItems([
      {
        id: catalogueProducts[0].id,
        name: catalogueProducts[0].name,
        price: catalogueProducts[0].retailPrice,
        qty: 1,
      },
    ])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto p-6 rounded-2xl bg-white shadow-xl">
        <DialogHeader className="pb-2 border-b border-neutral-100">
          <div className="flex items-center justify-between pr-6">
            <div>
              <DialogTitle className="text-base font-bold text-neutral-900">
                Create Walk-in / Shop Order
              </DialogTitle>
              <p className="text-xs text-neutral-500 mt-0.5">
                Record an in-store counter purchase for walk-in retail customers or visiting wholesale dealers.
              </p>
            </div>
            <Badge variant="outline" className="font-mono text-xs px-2.5 py-1 bg-neutral-50 text-neutral-700 border-neutral-200 shrink-0">
              {orderId}
            </Badge>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs font-medium text-neutral-700">Order Channel</Label>
              <Select
                value={orderType}
                onValueChange={(val: any) => handleTypeChange(val || "Retail")}
              >
                <SelectTrigger className="w-full h-9 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Retail">Walk-in (Retail)</SelectItem>
                  <SelectItem value="Wholesale">Walk-in (Wholesale)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium text-neutral-700">Payment Mode</Label>
              <Select value={paymentMethod} onValueChange={(val: any) => setPaymentMethod(val || "Cash")}>
                <SelectTrigger className="w-full h-9 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash (Naqd)</SelectItem>
                  <SelectItem value="Bank / Raast">Bank / Raast / JazzCash</SelectItem>
                  <SelectItem value="Credit (Udhaar)">Credit (Udhaar / Khata)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium text-neutral-700">Delivery Status</Label>
              <Select value={orderStatus} onValueChange={(val: any) => setOrderStatus(val || "Delivered")}>
                <SelectTrigger className="w-full h-9 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delivered">Delivered (Handed Over)</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="customerName" className="text-xs font-medium text-neutral-700">
                Customer / Dealer Name *
              </Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Walk-in Customer or Ahmed Auto"
                className="h-9 text-xs mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="customerPhone" className="text-xs font-medium text-neutral-700">
                Contact Number (Optional)
              </Label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g. 0300-1234567"
                className="h-9 text-xs mt-1"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-neutral-900">
                Products Purchased ({items.length})
              </Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="h-8 text-xs gap-1.5 cursor-pointer border-neutral-200 hover:bg-neutral-50"
                >
                  <Plus className="size-3.5 text-red-600" />
                  <span>Add Product</span>
                </Button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-72 sm:w-80 z-50 rounded-xl border border-neutral-200 bg-white shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95">
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
                          const pPrice = orderType === "Wholesale" ? p.wholesalePrice : p.retailPrice
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => handleAddItem(p)}
                              className="w-full flex items-center justify-between px-3 py-2 text-left text-xs hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <div className="flex flex-col min-w-0 pr-2">
                                <span className="font-medium text-neutral-900 truncate">{p.name}</span>
                                <span className="text-[11px] text-neutral-500">{p.category}</span>
                              </div>
                              <span className="font-mono text-xs font-semibold text-neutral-800 shrink-0">
                                Rs. {pPrice.toLocaleString()}
                              </span>
                            </button>
                          )
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-100 bg-neutral-50/50">
              {items.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-400">
                  No products added yet. Click &quot;Add Product&quot; above to search and select items.
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 gap-2 bg-white">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-medium text-neutral-900 truncate">{item.name}</span>
                      <span className="text-[11px] text-neutral-500">
                        Rs. {item.price.toLocaleString()} each
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-neutral-200 rounded-lg bg-white overflow-hidden h-7">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                          className="px-2 h-full text-xs hover:bg-neutral-100 text-neutral-600 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-neutral-900 min-w-[24px] text-center">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                          className="px-2 h-full text-xs hover:bg-neutral-100 text-neutral-600 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="w-24 text-right font-mono font-semibold text-xs text-neutral-900">
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 rounded text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items):</span>
              <span className="font-mono font-semibold text-neutral-900">Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>Discount (Rs.):</span>
              <div className="w-28">
                <Input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="h-7 text-xs bg-white text-right"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-sm font-bold text-neutral-900">
              <span>Grand Total Payable:</span>
              <span className="font-mono text-base text-red-600">Rs. {grandTotal.toLocaleString()}</span>
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
              disabled={items.length === 0}
              className="h-9 px-5 text-xs bg-red-600 hover:bg-red-700 text-white cursor-pointer font-medium"
            >
              Save & Print Receipt
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

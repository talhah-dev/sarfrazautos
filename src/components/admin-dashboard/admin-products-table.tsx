"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Pencil, Trash2, Eye } from "lucide-react"
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

export interface AdminProduct {
  id: string
  name: string
  category: string
  type: "Retail" | "Wholesale"
  price: string
  stock: "In Stock" | "Low Stock" | "Out of Stock"
  createdAt: string
}

const adminProducts: AdminProduct[] = [
  { id: "P-001", name: "CD70 Complete Cylinder Head", category: "Cylinders & Heads", type: "Wholesale", price: "Rs. 84,000", stock: "In Stock", createdAt: "01 Oct 2026" },
  { id: "P-002", name: "Crown Heavy Duty Clutch Plates", category: "Clutch Plates", type: "Wholesale", price: "Rs. 135,000", stock: "In Stock", createdAt: "01 Oct 2026" },
  { id: "P-003", name: "125cc Piston Kit", category: "Cylinders & Heads", type: "Retail", price: "Rs. 1,850", stock: "In Stock", createdAt: "28 Sep 2026" },
  { id: "P-004", name: "4-Stroke Engine Block", category: "Engine Blocks", type: "Wholesale", price: "Rs. 92,000", stock: "Low Stock", createdAt: "25 Sep 2026" },
  { id: "P-005", name: "Performance Crankshaft Assembly", category: "Crankshafts", type: "Wholesale", price: "Rs. 85,000", stock: "In Stock", createdAt: "22 Sep 2026" },
  { id: "P-006", name: "Japanese Standard Carburetor", category: "Carburetors", type: "Retail", price: "Rs. 2,400", stock: "In Stock", createdAt: "20 Sep 2026" },
  { id: "P-007", name: "Complete Overhaul Gasket Set", category: "Others", type: "Wholesale", price: "Rs. 145,000", stock: "In Stock", createdAt: "18 Sep 2026" },
  { id: "P-008", name: "Camshaft & Rocker Arm Set", category: "Cylinders & Heads", type: "Wholesale", price: "Rs. 92,000", stock: "Out of Stock", createdAt: "15 Sep 2026" },
]

export function AdminProductsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [products, setProducts] = useState(adminProducts)

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "All" ? true : p.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const getStockBadge = (stock: AdminProduct["stock"]) => {
    if (stock === "In Stock") return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">In Stock</Badge>
    if (stock === "Low Stock") return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">Low Stock</Badge>
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">Out of Stock</Badge>
  }

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">All Products</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Manage retail and wholesale product listings.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-56">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          <div className="flex items-center gap-1">
            {["All", "Retail", "Wholesale"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${typeFilter === t ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <Link href="/admin/products/upload">
            <Button size="sm" className="h-8 text-xs cursor-pointer">
              + Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="border border-neutral-200 rounded-xl bg-white shadow-xs overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-neutral-700">Product ID</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Name</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Category</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Type</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Price</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Stock</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Added</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => (
              <TableRow key={product.id} className="text-xs hover:bg-neutral-50/70">
                <TableCell className="font-mono text-neutral-600">{product.id}</TableCell>
                <TableCell className="font-medium text-neutral-900 max-w-[200px] truncate">{product.name}</TableCell>
                <TableCell className="text-neutral-600">{product.category}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={product.type === "Wholesale" ? "bg-blue-50 text-blue-700 border-blue-200 text-xs" : "bg-purple-50 text-purple-700 border-purple-200 text-xs"}>
                    {product.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-neutral-900 whitespace-nowrap">{product.price}</TableCell>
                <TableCell>{getStockBadge(product.stock)}</TableCell>
                <TableCell className="text-neutral-600 whitespace-nowrap">{product.createdAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href="/product-overview">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-pointer">
                        <Eye className="size-3.5 text-neutral-500" />
                      </Button>
                    </Link>
                    <Link href={`/admin/products/edit`}>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-pointer">
                        <Pencil className="size-3.5 text-blue-600" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 cursor-pointer"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="size-3.5 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ImageIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AdminEditProductSection() {
  const [imagePreview, setImagePreview] = useState<string | null>("/wholesale-bulk.png")
  const [isSaved, setIsSaved] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6 py-4 md:py-6">
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <Link href="/admin/dashboard" className="hover:text-neutral-900 transition-colors">Admin Panel</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/admin/products" className="hover:text-neutral-900 transition-colors">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-900 font-medium">Edit Product</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Edit Product</h2>
          <p className="text-sm text-neutral-500 mt-1">Update the product details below. Changes will reflect on the storefront immediately.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Card className="border-neutral-200 shadow-xs">
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-sm font-semibold text-neutral-900">Product Image</CardTitle>
                <CardDescription className="text-xs text-neutral-500">Replace or keep the existing product image.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="border-2 border-dashed border-neutral-200 rounded-xl aspect-square flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-neutral-400 transition-colors relative overflow-hidden">
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 size-6 rounded-full bg-white/90 shadow flex items-center justify-center z-10 cursor-pointer"
                      >
                        <X className="size-3.5 text-neutral-700" />
                      </button>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="size-10 text-neutral-300" />
                      <div className="text-center">
                        <p className="text-xs font-medium text-neutral-700">Click to replace image</p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">PNG, JPG up to 5MB</p>
                      </div>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-xs">
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-sm font-semibold text-neutral-900">Product Type</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex flex-col gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-neutral-700">Listing Type</Label>
                  <Select defaultValue="wholesale">
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail (Single Unit)</SelectItem>
                      <SelectItem value="wholesale">Wholesale (Bulk)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-neutral-700">Category</Label>
                  <Select defaultValue="cylinders">
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cylinders">Cylinders & Heads</SelectItem>
                      <SelectItem value="engine">Engine Blocks</SelectItem>
                      <SelectItem value="crankshafts">Crankshafts</SelectItem>
                      <SelectItem value="clutch">Clutch Plates</SelectItem>
                      <SelectItem value="carburetors">Carburetors</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-neutral-200 shadow-xs">
              <CardHeader className="p-5 pb-4 border-b border-neutral-100">
                <CardTitle className="text-base font-semibold text-neutral-900">Product Details</CardTitle>
                <CardDescription className="text-xs text-neutral-500">Editing: CD70 Complete Cylinder Head (P-001)</CardDescription>
              </CardHeader>

              <CardContent className="p-5 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="productName" className="text-xs font-medium text-neutral-700">Product Name *</Label>
                    <Input id="productName" defaultValue="CD70 Complete Cylinder Head" className="h-9 text-xs" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="brandName" className="text-xs font-medium text-neutral-700">Brand Name *</Label>
                    <Input id="brandName" defaultValue="Sarfraz Genuine / Crown" className="h-9 text-xs" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="sku" className="text-xs font-medium text-neutral-700">SKU / Part Number</Label>
                    <Input id="sku" defaultValue="CYL-CD70-001" className="h-9 text-xs" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="price" className="text-xs font-medium text-neutral-700">Selling Price (Rs.) *</Label>
                    <Input id="price" type="number" defaultValue="84000" className="h-9 text-xs" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="originalPrice" className="text-xs font-medium text-neutral-700">Original / Cut Price (Rs.)</Label>
                    <Input id="originalPrice" type="number" defaultValue="105000" className="h-9 text-xs" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="stock" className="text-xs font-medium text-neutral-700">Stock Status *</Label>
                    <Select defaultValue="instock">
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instock">In Stock</SelectItem>
                        <SelectItem value="lowstock">Low Stock</SelectItem>
                        <SelectItem value="outofstock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="compatibleBikes" className="text-xs font-medium text-neutral-700">Compatible Bikes</Label>
                    <Input id="compatibleBikes" defaultValue="Honda CD70, CG125" className="h-9 text-xs" />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="description" className="text-xs font-medium text-neutral-700">Product Description</Label>
                    <textarea
                      id="description"
                      rows={4}
                      defaultValue="Genuine Crown CD70 complete cylinder head assembly. Compatible with standard 70cc engines. Includes valves, springs, and rocker arms."
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-5 border-t border-neutral-100 flex items-center justify-end gap-3">
                <Link href="/admin/products">
                  <Button type="button" variant="outline" className="h-9 px-4 text-xs cursor-pointer">Cancel</Button>
                </Link>
                <Button type="submit" className="h-9 px-4 text-xs cursor-pointer">
                  {isSaved ? "✓ Changes Saved" : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

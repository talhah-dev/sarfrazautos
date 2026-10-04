"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  ShieldCheck,
  Check,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DealerAccountSection() {
  const [isSaved, setIsSaved] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "Tariq Auto Traders",
    contactPerson: "Muhammad Tariq",
    email: "dealer@sarfrazautos.com",
    phone: "+92 300 1234567",
    shopAddress: "Shop #14, Bilal Auto Market, Montgomery Road, Lahore",
    preferredCity: "Lahore",
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6 py-4 md:py-6">
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <Link href="/wholesale-dashboard" className="hover:text-neutral-900 transition-colors">
          Wholesale Portal
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-900 font-medium">Dealer Account</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Dealer Account Profile
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your registered auto parts business credentials and contact details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-5">
          <Card className="border-neutral-200 shadow-xs">
            <CardHeader className="p-5 text-center flex flex-col items-center">
              <Avatar className="size-20 rounded-2xl border-2 border-neutral-200 mb-3 shadow-xs">
                <AvatarImage src="/icon.png" alt="Tariq Auto Traders" />
                <AvatarFallback className="bg-neutral-900 text-white text-xl font-bold rounded-2xl">
                  TA
                </AvatarFallback>
              </Avatar>

              <CardTitle className="text-lg font-bold text-neutral-900">
                {formData.businessName}
              </CardTitle>
              <CardDescription className="text-xs text-neutral-500">
                Registered Wholesale Dealer
              </CardDescription>

              <div className="flex items-center gap-1.5 mt-3">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
                  <ShieldCheck className="size-3.5 mr-1" />
                  Verified Dealer
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 pt-0 border-t border-neutral-100 flex flex-col gap-3 text-xs">
              <div className="flex items-center justify-between pt-3">
                <span className="text-neutral-500">Member Since</span>
                <span className="font-semibold text-neutral-900">January 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Sales Officer</span>
                <span className="font-semibold text-neutral-900">Muhammad Rafiq</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-neutral-200 shadow-xs">
            <form onSubmit={handleSave}>
              <CardHeader className="p-5 pb-4 border-b border-neutral-100">
                <CardTitle className="text-base font-semibold text-neutral-900">
                  Business & Contact Details
                </CardTitle>
                <CardDescription className="text-xs text-neutral-500">
                  Keep your commercial auto parts billing and contact address up to date.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="businessName" className="text-xs font-medium text-neutral-700">
                      Dealership / Shop Name
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="h-9 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contactPerson" className="text-xs font-medium text-neutral-700">
                      Proprietor / Contact Person
                    </Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="h-9 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium text-neutral-700">
                      Mobile / WhatsApp Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-9 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium text-neutral-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-9 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="preferredCity" className="text-xs font-medium text-neutral-700">
                      Primary City
                    </Label>
                    <Input
                      id="preferredCity"
                      value={formData.preferredCity}
                      onChange={(e) => setFormData({ ...formData, preferredCity: e.target.value })}
                      className="h-9 text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="shopAddress" className="text-xs font-medium text-neutral-700">
                    Physical Shop / Market Address
                  </Label>
                  <Input
                    id="shopAddress"
                    value={formData.shopAddress}
                    onChange={(e) => setFormData({ ...formData, shopAddress: e.target.value })}
                    className="h-9 text-xs"
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="border-t border-neutral-100 flex items-end justify-end">
                <Button
                  type="submit"
                  className="h-9 px-4 cursor-pointer md:w-auto w-full"
                >
                  {isSaved ? (
                    <>
                      <Check className="size-3.5  mr-1.5 text-emerald-400" />
                      Changes Saved
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

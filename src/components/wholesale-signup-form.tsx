"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

export function WholesaleSignupForm({ className = "", ...props }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    email: "",
    whatsapp: "",
    city: "",
    address: "",
    password: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCityChange = (value: string | null) => {
    setFormData({
      ...formData,
      city: value || "",
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={cn("flex flex-col gap-6 text-center", className)}>
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Request Submitted</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Thank you, {formData.name || "Customer"}. Your wholesale registration for{" "}
            <span className="font-semibold text-foreground">
              {formData.shopName || "your shop"}
            </span>{" "}
            is pending admin approval. You will receive an update once approved.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Wholesale Registration</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Register your shop to access wholesale prices and schemes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Muhammad Sarfraz"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="shopName">Shop Name</FieldLabel>
            <Input
              id="shopName"
              name="shopName"
              type="text"
              placeholder="e.g. Al-Madina Auto Store"
              value={formData.shopName}
              onChange={handleChange}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="whatsapp">WhatsApp Number</FieldLabel>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="0333 1234567"
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="city">City / Province</FieldLabel>
            <Select
              value={formData.city}
              onValueChange={handleCityChange}
            >
              <SelectTrigger id="city" className="w-full">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sindh</SelectLabel>
                  <SelectItem value="Karachi">Karachi</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Sukkur">Sukkur</SelectItem>
                  <SelectItem value="Larkana">Larkana</SelectItem>
                  <SelectItem value="Mirpur Khas">Mirpur Khas</SelectItem>
                  <SelectItem value="Nawabshah">Nawabshah</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Punjab</SelectLabel>
                  <SelectItem value="Lahore">Lahore</SelectItem>
                  <SelectItem value="Faisalabad">Faisalabad</SelectItem>
                  <SelectItem value="Rawalpindi">Rawalpindi</SelectItem>
                  <SelectItem value="Multan">Multan</SelectItem>
                  <SelectItem value="Gujranwala">Gujranwala</SelectItem>
                  <SelectItem value="Sialkot">Sialkot</SelectItem>
                  <SelectItem value="Bahawalpur">Bahawalpur</SelectItem>
                  <SelectItem value="Sargodha">Sargodha</SelectItem>
                  <SelectItem value="Rahim Yar Khan">Rahim Yar Khan</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Federal Capital</SelectLabel>
                  <SelectItem value="Islamabad">Islamabad</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Khyber Pakhtunkhwa (KPK)</SelectLabel>
                  <SelectItem value="Peshawar">Peshawar</SelectItem>
                  <SelectItem value="Mardan">Mardan</SelectItem>
                  <SelectItem value="Abbottabad">Abbottabad</SelectItem>
                  <SelectItem value="Swat">Swat</SelectItem>
                  <SelectItem value="Dera Ismail Khan">Dera Ismail Khan</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Balochistan</SelectLabel>
                  <SelectItem value="Quetta">Quetta</SelectItem>
                  <SelectItem value="Hub">Hub</SelectItem>
                  <SelectItem value="Gwadar">Gwadar</SelectItem>
                  <SelectItem value="Turbat">Turbat</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Azad Kashmir & Gilgit-Baltistan</SelectLabel>
                  <SelectItem value="Muzaffarabad">Muzaffarabad</SelectItem>
                  <SelectItem value="Mirpur (AJK)">Mirpur (AJK)</SelectItem>
                  <SelectItem value="Gilgit">Gilgit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Create Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="address">Shop Address</FieldLabel>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="Shop #, Market, Area"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <Button type="submit" className="w-full">
            Submit Registration Request
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Already have an approved wholesale account?{" "}
          <Link href="/login" className="underline underline-offset-4 font-medium">
            Log in
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}

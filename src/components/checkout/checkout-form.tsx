"use client";

import { useState } from "react";
import { Store, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function CheckoutForm({ className = "" }: { className?: string }) {
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    apartment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={cn("space-y-8", className)}>
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground">
          Pick Delivery Method
        </Label>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Button
            type="button"
            variant={deliveryMethod === "delivery" ? "default" : "outline"}
            onClick={() => setDeliveryMethod("delivery")}
            className="h-14 rounded-xl flex items-center justify-center gap-2.5 text-sm font-medium cursor-pointer"
          >
            <Truck className="size-4 shrink-0" />
            <span>Delivery</span>
          </Button>

          <Button
            type="button"
            variant={deliveryMethod === "pickup" ? "default" : "outline"}
            onClick={() => setDeliveryMethod("pickup")}
            className="h-14 rounded-xl flex items-center justify-center gap-2.5 text-sm font-medium cursor-pointer"
          >
            <Store className="size-4 shrink-0" />
            <span>Pickup</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground">
          {deliveryMethod === "delivery" ? "Shipping Information" : "Pickup Contact Information"}
        </h2>

        <div className="space-y-2 mt-5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={handleChange}
            className="h-11 mt-1 mb-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="h-11 mt-1 mb-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex rounded-lg border border-input bg-transparent overflow-hidden focus-within:ring-3 focus-within:ring-ring/50 focus-within:border-ring">
            <span className="inline-flex items-center px-3.5 text-xs font-semibold text-muted-foreground bg-muted border-r border-input">
              +92
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="333 1285556"
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 h-11 px-3.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {deliveryMethod === "delivery" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                required
                placeholder="Street address"
                value={formData.address}
                onChange={handleChange}
                className="h-11 mt-1 mb-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                type="text"
                required
                placeholder="City (e.g. Karachi, Lahore, Rawalpindi)"
                value={formData.city}
                onChange={handleChange}
                className="h-11 mt-1 mb-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">
                Apartment, Suite, Flat etc.{" "}
                <span className="text-muted-foreground font-normal">(Optional)</span>
              </Label>
              <Input
                id="apartment"
                name="apartment"
                type="text"
                placeholder="Optional"
                value={formData.apartment}
                onChange={handleChange}
                className="h-11 mt-1 mb-2"
              />
            </div>
          </>
        )}

        {deliveryMethod === "pickup" && (
          <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-2 text-xs">
            <span className="font-semibold text-foreground block">Pickup Location</span>
            <p className="text-muted-foreground">
              Shop #23, Taj Mehal Qasim Auto Market, Near Aurangzeb Market, M.A. Jinnah Road, Saddar, Karachi.
            </p>
            <p className="text-muted-foreground">
              Counter timings: Mon - Sat: 9:00 AM - 8:00 PM
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutForm;

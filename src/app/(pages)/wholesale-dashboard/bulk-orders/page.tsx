import type { Metadata } from "next"
import { AppSidebar } from "@/components/wholesale-dashboard/app-sidebar"
import { SiteHeader } from "@/components/wholesale-dashboard/site-header"
import { BulkOrdersSection } from "@/components/bulk-orders/bulk-orders-section"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
  title: "Bulk Orders & Bilty Bookings | Sarfraz Autos Wholesale",
  description:
    "Track motorcycle spare parts master carton bookings, goods transport bilty numbers, and commercial wholesale invoices.",
}

export default function BulkOrdersPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <BulkOrdersSection />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

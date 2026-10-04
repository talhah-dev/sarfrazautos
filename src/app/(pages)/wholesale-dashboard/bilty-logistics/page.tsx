import type { Metadata } from "next"
import { AppSidebar } from "@/components/wholesale-dashboard/app-sidebar"
import { SiteHeader } from "@/components/wholesale-dashboard/site-header"
import { BiltySection } from "@/components/bilty-logistics/bilty-section"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
  title: "Bilty & Goods Logistics Tracker | Sarfraz Autos Wholesale",
  description:
    "Live goods transport Bilty tracking, dispatch status, goods transport terminal pickup addas, and consignment notes for wholesale auto parts.",
}

export default function BiltyLogisticsPage() {
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
          <BiltySection />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

import { AppSidebar } from "@/components/wholesale-dashboard/app-sidebar"
import { SiteHeader } from "@/components/wholesale-dashboard/site-header"
import { WholesaleOrderHistorySection } from "@/components/wholesale-dashboard/wholesale-order-history-section"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function WholesaleOrderHistoryPage() {
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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Order History</h2>
                <p className="text-sm text-neutral-500 mt-1">Your complete purchase history with Sarfraz Autos.</p>
              </div>
              <WholesaleOrderHistorySection />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

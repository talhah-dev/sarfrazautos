import { AdminSidebar } from "@/components/admin-dashboard/admin-sidebar"
import { AdminSiteHeader } from "@/components/admin-dashboard/admin-site-header"
import { AdminOverviewCards } from "@/components/admin-dashboard/admin-overview-cards"
import { AdminProductsTable } from "@/components/admin-dashboard/admin-products-table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function AdminDashboardPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AdminSidebar variant="inset" />
      <SidebarInset>
        <AdminSiteHeader title="Admin Panel" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <AdminOverviewCards />
              <AdminProductsTable />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

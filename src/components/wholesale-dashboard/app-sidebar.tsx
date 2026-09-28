"use client"

import * as React from "react"
import { NavDocuments } from "@/components/wholesale-dashboard/nav-documents"
import { NavMain } from "@/components/wholesale-dashboard/nav-main"
import { NavSecondary } from "@/components/wholesale-dashboard/nav-secondary"
import { NavUser } from "@/components/wholesale-dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  PackageIcon,
  ListOrderedIcon,
  PercentIcon,
  TruckIcon,
  FileTextIcon,
  BookOpenIcon,
  ReceiptTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  Home,
} from "lucide-react"
import Link from "next/link"

const data = {
  user: {
    name: "Tariq Auto Traders",
    email: "dealer@sarfrazautos.com",
    avatar: "/icon.png",
  },
  navMain: [
    {
      title: "Overview",
      url: "/wholesale-dashboard",
      icon: <LayoutDashboardIcon className="size-4" />,
    },
    {
      title: "Master Cartons",
      url: "/wholesale",
      icon: <PackageIcon className="size-4" />,
    },
    {
      title: "Bulk Orders",
      url: "/wholesale-dashboard/bulk-orders",
      icon: <ListOrderedIcon className="size-4" />,
    },
    {
      title: "Trade Schemes",
      url: "#",
      icon: <PercentIcon className="size-4" />,
    },
    {
      title: "Bilty & Logistics",
      url: "#",
      icon: <TruckIcon className="size-4" />,
    },
  ],
  documents: [
    {
      name: "Commercial Invoices",
      url: "#",
      icon: <FileTextIcon className="size-4" />,
    },
    {
      name: "Khata & Ledger",
      url: "#",
      icon: <BookOpenIcon className="size-4" />,
    },
    {
      name: "Payment History",
      url: "#",
      icon: <ReceiptTextIcon className="size-4" />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon className="size-4" />,
    },
    {
      title: "Dealer Support",
      url: "/contact",
      icon: <CircleHelpIcon className="size-4" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/wholesale-dashboard" />}
            >
              <Home className="size-5!" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-base font-semibold text-neutral-900">
                  Wholesale Dealer Hub
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} label="Ledger & Invoices" />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

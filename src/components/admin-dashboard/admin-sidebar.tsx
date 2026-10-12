"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  PackageIcon,
  UploadIcon,
  HistoryIcon,
  CreditCardIcon,
  UserCheckIcon,
  InboxIcon,
  ShieldIcon,
  CircleHelpIcon,
  LogOutIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navMain = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: <LayoutDashboardIcon className="size-4" />,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: <PackageIcon className="size-4" />,
  },
  {
    title: "Upload Product",
    url: "/admin/products/upload",
    icon: <UploadIcon className="size-4" />,
  },
  {
    title: "Order History",
    url: "/admin/orders",
    icon: <HistoryIcon className="size-4" />,
  },
  {
    title: "Payment Management",
    url: "/admin/payments",
    icon: <CreditCardIcon className="size-4" />,
  },
  {
    title: "Dealer Requests",
    url: "/admin/dealer-requests",
    icon: <UserCheckIcon className="size-4" />,
  },
  {
    title: "Contact Messages",
    url: "/admin/messages",
    icon: <InboxIcon className="size-4" />,
  },
]

const navSecondary = [
  {
    title: "Support",
    url: "/contact",
    icon: <CircleHelpIcon className="size-4" />,
  },
]

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/admin/dashboard" />}
            >
              <ShieldIcon className="size-5!" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-base font-semibold text-neutral-900">
                  Admin Panel
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navMain.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={<Link href={item.url} />}
                      className={`h-9.5 text-sm px-3 rounded-lg transition-colors ${
                        isActive
                          ? "!bg-neutral-300 !text-neutral-950 font-semibold"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm font-normal">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navSecondary.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={<Link href={item.url} />}
                      className={`h-9.5 text-sm px-3 rounded-lg transition-colors ${
                        isActive
                          ? "!bg-neutral-300 !text-neutral-950 font-semibold"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm font-normal">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-2">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src="/icon.png" alt="Admin" />
                <AvatarFallback className="rounded-lg bg-neutral-900 text-white text-xs font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-semibold text-neutral-900">Super Admin</span>
                <span className="truncate text-neutral-500">admin@sarfrazautos.com</span>
              </div>
              <Link href="/admin/login">
                <LogOutIcon className="size-4 text-neutral-500 hover:text-neutral-900 cursor-pointer" />
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

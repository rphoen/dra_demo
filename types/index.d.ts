import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export type DataRequest = {
  id: string;
  dataid: string;
  reason?: string;
  request: string;
  intention: string;
  duration: string;
  datacontrol: string;
  status: string;
  requestor: string;
  dataowner: string;
  reviewer: string;
}
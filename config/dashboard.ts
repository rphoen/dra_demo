import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Admin",
      href: "/admin",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    }
  ],
  sidebarNav: [
    {
      title: "Requests",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};

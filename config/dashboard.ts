import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Admin",
      href: "/admin",
    },
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

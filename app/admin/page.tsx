import { AdminPage } from "@/components/admin";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

export default async function DemoPage() {
  return (
    <div className="py-5 px-60">
      <DashboardHeader
        heading="Admin Menu"
        text="Manage users"
      ></DashboardHeader>
      <AdminPage />
    </div>
  );
}

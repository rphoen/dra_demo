import { auth } from "@/auth";
import { AdminPage } from "@/components/admin";
import { DashboardHeader } from "@/components/header";

export default async function DemoPage() {
  const session = await auth()
  return (
    <div className="py-5 px-60">
      <DashboardHeader
        heading="Admin Menu"
        text="Manage users"
      ></DashboardHeader>
      {session?.user.role === "ADMIN" ? (
        <AdminPage />
      ) : (
        <p className="py-5">Access denied</p>
      )}
    </div>
  );
}

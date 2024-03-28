import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { CommandMenu } from "@/components/CommandMenu";
import DataTableData from "../../components/getTable";
import { auth } from "@/auth";

export default async function DemoPage() {
  const session = await auth()
  console.log(session)
  return (
    <DashboardShell>
      <DashboardHeader heading="Requests" text="Create and manage requests.">
          {session && <p className="text-base text-muted-foreground">Role: {session.user.role}</p>}
          <CommandMenu />

      </DashboardHeader>
      <div className="divide-y ">
        <DataTableData />
      </div>
    </DashboardShell>
  );
}

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { CommandMenu } from "@/components/CommandMenu";
import { Catalog } from "@/components/catalog";
import DataTableData from "../../components/getTable";
import { auth } from "@/auth";

export default async function DemoPage() {
  const session = await auth()
  console.log(session)
  return (
    <DashboardShell>
      <DashboardHeader heading="Requests" text="Create and manage requests.">
          <CommandMenu />
          {/* <Catalog /> */}
      </DashboardHeader>
      <div className="divide-y ">
        <DataTableData />
      </div>
    </DashboardShell>
  );
}

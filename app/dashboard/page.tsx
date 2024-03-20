import { DashboardHeader } from "@/components/header";
import { Request, columns } from "./columns";
import { DataTable } from "./data-table";
import { PostCreateButton } from "@/components/post-create-button";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/shell";
import { CommandMenu } from "@/components/CommandMenu";
import { Catalog } from "@/components/catalog";
import DataTableData from "../../components/getTable";

export default async function DemoPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Requests" text="Create and manage requests.">
          <CommandMenu />
          <Catalog />
      </DashboardHeader>

      <div className="divide-y ">
        <DataTableData />
      </div>
    </DashboardShell>
  );
}

import { DashboardHeader } from "@/components/header";
import { Request, columns } from "./columns";
import { DataTable } from "./data-table";
import { PostCreateButton } from "@/components/post-create-button";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/shell";

async function getData(): Promise<Request[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      request: "Client data",
      title: "Requesting for client data...",
      status: "pending",
    },
    {
      id: "728ed44g",
      request: "API access",
      title: "I need API access",
      status: "pending",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Requests" text="Create and manage requests.">
        <Button>Add Request</Button>
      </DashboardHeader>

      <div className="container mx-auto py-10">
        Some kind of search function
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </DashboardShell>
  );
}

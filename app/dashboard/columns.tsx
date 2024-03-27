"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Request = {
  id: string;
  dataid: string;
  request: string;
  status: "pending" | "accepted" | "rejected";
  intention: string;
  duration: string;
  datacontrol: "masked" | "clear";
};

const deleteRequest = async (requestId: string) => {
  try {
    const response = await fetch(`/api/requests/${requestId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Request deleted');
      // router.refresh(); 
    } else {
      const error = await response.json();
      console.error('Error deleting request:', error.error);
    }
  } catch (error) {
    console.error('Error deleting request:', error);
  }
};

export const columns: ColumnDef<Request>[] = [
  {
    accessorKey: "request",
    header: "Access Mode",
  },
  {
    accessorKey: "intention",
    header: "Intention",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "datacontrol",
    header: "Data Control",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(request.id)}
              >
                Copy request ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteRequest(request.id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableHiding: false,
  },
  // ...
];

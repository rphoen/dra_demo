"use client";

import React, { use, useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { CommandLoading } from "cmdk";
import { useRouter } from "next/navigation";

interface TableData {
  data: {
    name: string;
    owner: string;
    table_id:string;
  };
}

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [catalog, setCatalog] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCatalog = async () => {
      try {
        const response = await fetch(`/api/databricks`);
        const catalog = await response.json();
        setCatalog(catalog);
      } catch (error) {
        console.error("Error searching data assets:", error);
      }
    };

    async function getData() {
      setLoading(true);
      const res = await fetch(`/api/sampledata`);
      const data = await res.json();
      setData(data);
      setLoading(false);
    }
    getCatalog();
    getData();
  }, []);

  const handleOpenCommandDialog = () => {
    setOpen(true);
  };

  const filterData = () => {
    if (!catalog || !catalog.data) {
      return null;
    }

    const { name, owner, table_id } = catalog.data;
    return { name, owner, table_id };
  };

  const filteredData = filterData();

  return (
    <div>
      <Button onClick={handleOpenCommandDialog}>Add Request</Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Enter a search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
            {loading && <CommandLoading>Fetching data...</CommandLoading>}
            {filteredData && (
              <CommandItem
                key={filteredData.table_id}
                // value={filteredData}
                onSelect={() => {
                  router.push(`/dashboard/requests/form/${filteredData.table_id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="flex flex-1 justify-between">
                  <p> {filteredData.name} </p>
                  <p> Owner: {filteredData.owner}</p>
                </div>
              </CommandItem>
            )}
            {data.map((item: any) => {
              return (
                <CommandItem
                  key={item.id}
                  value={item}
                  onSelect={() => {
                    router.push(`/dashboard/requests/form/${item.id}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="flex flex-1 justify-between">
                    <p> {item.data} </p>
                    <p> Owner: {item.owner}</p>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

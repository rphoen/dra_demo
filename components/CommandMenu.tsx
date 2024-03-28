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

interface Dataset {
  name: string;
  owner: string;
}

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCatalog = async () => {
      try {
        const response = await fetch(`/api/databricks`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error searching data assets:", error);
        setData([]);
      }
    };

    async function getData() {
      setLoading(true);
      const res = await fetch(`/api/sampledata`);
      const data = await res.json();
      setData(data);
      setLoading(false);
    }

    getData();
  }, []);

  const handleOpenCommandDialog = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpenCommandDialog}>Add Request</Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Enter a search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
            {loading && <CommandLoading>Fetching data...</CommandLoading>}
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
          {/* <CommandGroup heading="Results">
            <Button onClick={getCatalog}>Fetch Data</Button>
            {data && <pre>{JSON.stringify(data,null,2)}</pre>}
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </div>
  );
}

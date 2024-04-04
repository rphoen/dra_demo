"use client";
import React, { useEffect, useState } from "react";
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

interface Catalog {
  id: string;
  name: string;
  owner: string;
}

interface Data {
  catalogs: Catalog[];
}

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]); // Assuming the shape of the data is unknown
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
                    <p>{item.data}</p>
                    <p>Owner: {item.owner}</p>
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

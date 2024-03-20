"use client";

import React, { useState } from "react";
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

interface Dataset {
  name: string;
  owner: string;

}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

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

  const handleOpenCommandDialog = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpenCommandDialog}>Add Request</Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Enter a search..."
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value);
          }}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
            <Button onClick={getCatalog}>Fetch Data</Button>
            {data && <pre>{JSON.stringify(data,null,2)}</pre>}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

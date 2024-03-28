"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface TableData {
  data: {
    name: string;
    owner: string;
  };
}


export function Catalog() {
  const [data, setData] = useState<TableData | null>(null);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/databricks");
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (error) {
      setData(null);
    }
  };

  const filterData = () => {
    if (!data || !data.data) {
      return null;
    }

    const { name, owner } = data.data;
    return { name, owner };
  };

  const filteredData = filterData();

  return (
    <div>
      <Button onClick={fetchData}>Fetch Data</Button>
{/* 
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      {filteredData && (
        <div>
          <p>Table name: {filteredData.name}</p>
          <p>Owner: {filteredData.owner}</p>
          </div>
      )}
    </div>
  );
}

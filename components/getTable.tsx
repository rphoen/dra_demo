"use client";

import { useEffect, useState } from "react";
import { Request, columns } from "../app/dashboard/columns";
import { DataTable } from "../app/dashboard/data-table";

export default function DataTableData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/requests");
      const data = await response.json();
      setData(data);
    };

    getData();
  });

  return <DataTable columns={columns} data={data} />;
}

"use client";

import { useEffect, useState } from "react";
import { Request, columns } from "../app/dashboard/columns";
import { DataTable } from "../app/dashboard/data-table";
import requests from "../data/requests.json";

export default function DataTableData() {
  const [data, setData] = useState([]);

  const filterRequestsByRole = (role: string): any[] => {
    return requests.filter((request) => {
      return request.role === role || request.role === "all";
    })
  }

  useEffect(() => {
    const userRole = localStorage.getItem("role");

    const getData = async () => {
      const response = await fetch("/api/requests");
      const data = await response.json();
      setData(data);
    };

    getData();
  });

  return <DataTable columns={columns} data={data} />;
}

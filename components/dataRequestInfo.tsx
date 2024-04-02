"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "./header";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import type { DataRequest } from "@/types";

export default function DataRequestInfo(requestId: any) {
  const [data, setData] = useState<DataRequest | null>(null);

  useEffect(() => {
    const getRequest = async () => {
      const response = await fetch(`/api/requests/${requestId.requestId}`, {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    };
    getRequest();
  }, []);

  return (
    <div>
      <DashboardHeader
        heading="Data Request"
        text="View data request details."
      />
      {data && (
        <div className="px-2 py-5">
          <p className="scroll-m-20 font-semibold pb-2">
            Status: {data.status}
          </p>
          <div className="grid w-full grid-cols-2">
            <p className="leading-7">Data Access Mode: {data.request}</p>
            <p className="leading-7">Requestor name: {data.requestor}</p>
            <p className="leading-7">Intention: {data.intention}</p>
            <p className="leading-7">Data owner: {data.dataowner}</p>
            <p className="leading-7">Duration: {data.duration}</p>
            <p className="leading-7">Reviewer: {data.reviewer}</p>
            <p className="leading-7">Data Control: {data.datacontrol}</p>
          </div>
        </div>
      )}
      {data?.reason && (
        <div className="px-2 py-5">
          <p className="leading-7">Reason for rejection: {data.reason}</p>
        </div>
      )}
      {data?.comment && (
        <div className="px-2 py-2">
          <p className="leading-7">Comment: {data.comment}</p>
        </div>
      )}
    </div>
  );
}

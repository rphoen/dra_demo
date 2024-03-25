"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "./header";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { DataRequestGrant } from "./dataRequestGrant";
import { TabsContent } from "@radix-ui/react-tabs";
import { DataRequestDeny } from "./dataRequestDeny";

interface DataRequest {
  id: string;
  dataid: string;
  reason: string;
  request: string;
  intention: string;
  duration: string;
  datacontrol: string;
  status: string;
  rejection: string;
}

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
        <div className="px-2 py-10">
          <div className="grid w-full grid-cols-2">
            <p className="leading-7">Request: {data.request}</p>
            <p className="leading-7">Intention: {data.intention}</p>
            <p className="leading-7">Duration: {data.duration}</p>
            <p className="leading-7">Data Control: {data.datacontrol}</p>
            <p className="leading-7">Status: {data.status}</p>
            <p className="leading-7">Reason for rejection: {data.reason}</p>
          </div>
        </div>
      )}
    </div>
  );
}

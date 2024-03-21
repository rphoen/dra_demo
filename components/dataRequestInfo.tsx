"use client";

import { useEffect, useState } from "react";

interface DataRequest {
    id: string;
    dataid: string;
    request: string;
    intention: string;
    duration: string;
    datacontrol: string;
    status: string;
  }

export default function DataRequestInfo(requestId: any) {
  const [data, setData] = useState<DataRequest | null>(null);

  useEffect(() => {
    const getRequest = async () => {
      console.log("Data request info ", requestId.requestId);
      const response = await fetch(`/api/requests/${requestId}`);
      const data = await response.json();
      setData(data);
      console.log(data);
    };
    getRequest();
  }, []);

  return (
    <div>
      {data && (
        <div>
          <h2>Request Details</h2>
          <p>Request: {data.request}</p>
        </div>
      )}
    </div>
  );
}

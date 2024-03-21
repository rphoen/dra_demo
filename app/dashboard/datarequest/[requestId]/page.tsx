import { DataRequestForm } from "@/components/dataRequestForm";
import DataRequestInfo from "@/components/dataRequestInfo";
import React from "react";

interface PageProps {
  params: {
    requestId: string;
  };
}

export default function DataRequest({ params }: PageProps) {
  const { requestId } = params;
  return (
    <div>
      <h1>Data Request Page {requestId}</h1>
      <DataRequestInfo requestId={requestId}/>
    </div>
  );
}

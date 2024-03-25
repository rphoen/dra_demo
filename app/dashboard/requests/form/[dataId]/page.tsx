import { DataRequestForm } from "@/components/dataRequestForm";
import React from "react";

interface DataIdProps {
  params: {
    dataId: string;
  };
}

export default function DataRequest({ params }: DataIdProps) {
  const { dataId } = params;
  return (
    <div>
      <h1>Data Request Page {dataId}</h1>
      <DataRequestForm dataId={dataId} />
    </div>
  );
}

import { DataRequestDeny } from "@/components/dataRequestDeny";
import { DataRequestForm } from "@/components/dataRequestForm";
import { DataRequestGrant } from "@/components/dataRequestGrant";
import DataRequestInfo from "@/components/dataRequestInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <DataRequestInfo requestId={requestId}/>
      <div className="py-5">
            <Tabs defaultValue="accept" className="w-[350px]">
              <TabsList className="grid w-full grid-cols-2 mb-1">
                <TabsTrigger value="accept">Accept</TabsTrigger>
                <TabsTrigger value="reject">Reject</TabsTrigger>
              </TabsList>
              <TabsContent value="accept">
                <DataRequestGrant requestId={requestId}/>
              </TabsContent>
              <TabsContent value="reject">
                <DataRequestDeny />
              </TabsContent>
            </Tabs>
          </div>
    </div>
  );
}

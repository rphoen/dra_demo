import { auth } from "@/auth";
import { DataRequestDeny } from "@/components/dataRequestDeny";
import { DataRequestForm } from "@/components/dataRequestForm";
import { DataRequestGrant } from "@/components/dataRequestGrant";
import DataRequestInfo from "@/components/dataRequestInfo";
import { DataRequestReview } from "@/components/dataRequestReview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface PageProps {
  params: {
    requestId: string;
  };
}

export default async function DataRequest({ params }: PageProps) {
  const session = await auth();
  const { requestId } = params;
  return (
    <div>
      <DataRequestInfo requestId={requestId} />
      <div className="px-1 py-5">
        {session?.user.role === "dataowner" ? (
          <Tabs defaultValue="accept" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2 mb-1">
              <TabsTrigger value="accept">Accept</TabsTrigger>
              <TabsTrigger value="reject">Reject</TabsTrigger>
            </TabsList>
            <TabsContent value="accept">
              <DataRequestGrant requestId={requestId} />
            </TabsContent>
            <TabsContent value="reject">
              <DataRequestDeny requestId={requestId} />
            </TabsContent>
          </Tabs>
        ) : (
          <div></div>
        )}
        {session?.user.role === "reviewer" ? (
          <Tabs defaultValue="recommend" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2 mb-1">
              <TabsTrigger value="recommend">Recommend</TabsTrigger>
              <TabsTrigger value="reject">Reject</TabsTrigger>
            </TabsList>
            <TabsContent value="recommend">
              <DataRequestReview requestId={requestId} />
            </TabsContent>
            <TabsContent value="reject">
              <DataRequestDeny requestId={requestId} />
            </TabsContent>
          </Tabs>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

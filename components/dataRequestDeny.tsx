"use client";
import * as React from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

interface UpdateRequest {
  reason: string;
  status: string;
}

export function DataRequestDeny(requestId: any) {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<UpdateRequest>({
    reason: "",
    status: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const requestData = {
      reason: formData.reason,
      status: "Rejected",
    };

    const response = await fetch(`/api/requests/${requestId.requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    setIsLoading(false);
    if (response.ok) {
      setIsSubmitted(true);
      toast({
        title: "Request denied",
        description: "The data request has been denied",
      });
    } else {
      return console.error("Failed to save data request");
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Deny Data Request</CardTitle>
        <CardDescription>Choose the data to request</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="reason">Reason for denial</Label>
              <Input
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Reason"
              />
            </div>
          </div>
          <div className="flex justify-between py-6">
            {isSubmitted ? (
              <Button disabled>Submitted</Button>
            ) : (
              <Button type="submit" variant="destructive">
                Deny Access
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

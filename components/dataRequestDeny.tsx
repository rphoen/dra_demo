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

interface UpdateRequest {
  reason: string;
  status: string;
}

export function DataRequestDeny(requestId: any) {
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
      request: formData.reason,
      status: "Rejected",
    };

    const response = await fetch(`/api/requests/${requestId.requestId}/reject`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    setIsLoading(false);
    if (response.ok) {
      setIsSubmitted(true);
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
        <form>
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
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface UpdateRequest {
  request: string;
  duration: string;
  datacontrol: string;
  status: string;
}

export function DataRequestGrant(requestId: any) {
  const {toast } = useToast();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<UpdateRequest>({
    request: "",
    duration: "",
    datacontrol: "",
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
      request: formData.request,
      duration: formData.duration,
      datacontrol: formData.datacontrol,
      status: "Accepted",
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
        title: "Request granted",
        description: "Data request has been granted successfully",
      })
    } else {
      return console.error("Failed to save data request");
    }
    router.refresh();
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Grant Data Request</CardTitle>
        <CardDescription>Granting request for *placeholder*</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="duration">Access Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Access Duration"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="datacontrol">Data Controls</Label>
              <Select
                name="datacontrol"
                value={formData.datacontrol}
                onValueChange={(value) =>
                  setFormData({ ...formData, datacontrol: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Masked">Masked</SelectItem>
                  <SelectItem value="Clear">Clear</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="request">Data Access Mode</Label>
              <Input
                id="request"
                name="request"
                value={formData.request}
                onChange={handleChange}
                placeholder="Access Mode"
              />
            </div>
          </div>
          <div className="flex justify-between py-6">
            {isSubmitted? (
              <Button disabled>
                Access Granted
              </Button>
            ) : (
              <Button type="submit">Grant Access</Button>
            )}
            
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

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
import e from "cors";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import type { DataRequest as FormData} from "@/types";

export function DataRequestForm(dataId: any) {
  const {toast} = useToast();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    id: "",
    dataid: dataId.dataId,
    reason: "",
    request: "",
    intention: "",
    duration: "",
    datacontrol: "",
    status: "Pending",
    requestor: "Ryan",
    dataowner: "Bob",
    reviewer: "",
    comment: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setIsLoading(false);
    if (response.ok) {
      setIsSubmitted(true);
      setFormData({
        id: "",
        dataid: dataId.dataId,
        reason: "",
        request: "",
        intention: "",
        duration: "",
        datacontrol: "",
        status: "Pending",
        requestor: "Ryan",
        dataowner: "Bob",
        reviewer: "",
        comment: "",
      });
      toast({
        title: "Request submitted",
        description: "Your request has been submitted successfully",
      });
    } else {
      return console.error("Failed to save data request");
    }
    router.push(`/dashboard`);
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Request Data</CardTitle>
        <CardDescription>Choose the data to request</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="request">Access Mode</Label>
              <Input
                id="request"
                name="request"
                value={formData.request}
                placeholder="Access Mode"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="intention">Intention</Label>
              <Input
                id="intention"
                name="intention"
                placeholder="Intention"
                value={formData.intention}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="Duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Input
                id="reviewer"
                name="reviewer"
                placeholder="Reviewer"
                value={formData.reviewer}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="datacontrol">Data Control</Label>
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
          </div>
          <div className="flex justify-between py-6">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";
import * as React from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";

interface AddComment {
  comment: string;
}

export function DataRequestReview(requestId: any) {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<AddComment>({
    comment: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const requestData = {
      comment: formData.comment,
    };

    console.log(requestData);

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
        description: "Comment added.",
      });
    } else {
      return console.error("Failed to save data request");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="Comment">Comment</Label>
        <Textarea
          placeholder="Type your comment here."
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
}

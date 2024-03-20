"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { toast } from "./ui/use-toast"

export function UserAuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      setIsLoading(false);

      const data = await response.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
        setError("");
        router.push("/dashboard");
      } else {
        setIsAuthenticated(false);
        setError(data.message);
        return toast({
            title: "Something went wrong.",
            description: "Your sign in request failed. Please try again.",
            variant: "destructive",
          })
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during authentication");
    }
  };

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username:
            </Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="password">
              Password:
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

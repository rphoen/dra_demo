import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Data Request Access Workflow Demo
          </h1>
          <div className="py-5 ">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

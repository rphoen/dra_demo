import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";

export default function RootLayout() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="text-3xl md:text-6xl font-bold dark:text-white text-center">
      Data Request Access Workflow Demo
      </div>
      <div className="font-extralight text-base md:text-3xl dark:text-neutral-200 py-4">
        Use admin:admin to login
      </div>
      <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
        <Link href="/login">Login</Link>
      </button>
    </div>
  );
}

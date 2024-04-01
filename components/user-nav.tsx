"use client";

import Link from "next/link";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

export function UserAccountNav() {
  return (
    <form
      className="cursor-pointer font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
      action={async () => {
        await signOut({
          callbackUrl: `${window.location.origin}/login`,
        });
      }}
    >
      <button>Sign out</button>
    </form>
  );
}

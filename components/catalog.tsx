"use client";

import {auth} from "@/auth"

export async function Catalog() {
  const session = await auth();
  console.log(session)

  return <div>role</div>;
}

// api/databricks.ts (using TypeScript)
import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.DATABRICKS_HOST;

export async function GET() {
  const res = await fetch(`${apiUrl}/api/2.1/unity-catalog/catalogs`, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${process.env.DATABRICKS_TOKEN}`,
    }
  })
  const data = await res.json();

  return NextResponse.json({ data });
}

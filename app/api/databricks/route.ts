// api/databricks.ts (using TypeScript)
import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.DATABRICKS_HOST;

export async function GET() {
  const res = await fetch(
    `${apiUrl}/api/2.1/unity-catalog/tables/sla_demo_8523538292967739.default.table1`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.DATABRICKS_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch data" });
  }
  const data = await res.json();

  return Response.json({ data });
}

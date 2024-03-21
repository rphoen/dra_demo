import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";

export function GET() {
    const filePath = path.join(process.cwd(), "data", "sampledata.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const sampledata = JSON.parse(jsonData);
  
    return Response.json(sampledata);
  }
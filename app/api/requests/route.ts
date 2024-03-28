import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";
import type { DataRequest } from "@/types";

export function GET() {
  const filePath = path.join(process.cwd(), "data", "requests.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const requests = JSON.parse(jsonData);

  return Response.json(requests);
}

export async function POST(req: NextRequest) {
  try {
    const dataRequest: DataRequest = await req.json();

    // Get the full path to the data requests file
    const dataRequestsFilePath = path.join(
      process.cwd(),
      "data",
      "requests.json"
    );

    // Append the data request to the file
    let requests = [];
    if (fs.existsSync(dataRequestsFilePath)) {
      const jsonData = fs.readFileSync(dataRequestsFilePath, "utf8");
      requests = JSON.parse(jsonData);
    }
    const newId = (requests.length + 1).toString();

    const newRequest: DataRequest = {
      id: newId,
      dataid: dataRequest.dataid,
      request: dataRequest.request,
      intention: dataRequest.intention,
      duration: dataRequest.duration,
      datacontrol: dataRequest.datacontrol,
      status: dataRequest.status,
      requestor: dataRequest.requestor,
      dataowner: dataRequest.dataowner,
    };
    requests.push(newRequest);

    fs.writeFileSync(
      dataRequestsFilePath,
      JSON.stringify(requests, null, 2),
      "utf8"
    );

    return Response.json({ message: "Data request saved successfully" });
  } catch (error) {
    console.error("Error saving data request:", error);
    return Response.json(
      { error: "Failed to save data request" },
      { status: 500 }
    );
  }
}

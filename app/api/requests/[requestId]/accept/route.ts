import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";

interface Request {
  id: string;
  dataid: string;
  request: string;
  intention: string;
  duration: string;
  datacontrol: string;
  status: string;
}

interface UpdateRequest {
  request?: string;
  duration?: string;
  status?: string;
}

export async function PATCH(req: NextRequest) {
  try {
    const requestId = req.url?.split("/").pop();
    console.log(requestId);
    const updatedData: UpdateRequest = await req.json();

    if (!requestId) {
      return new Response(JSON.stringify({ error: "Missing request ID" }), {
        status: 400,
      });
    }

    const filePath = path.join(process.cwd(), "data", "requests.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const requests: Request[] = JSON.parse(jsonData);

    const requestIndex = requests.findIndex((req) => req.id === requestId);

    if (requestIndex === -1) {
      return new Response(JSON.stringify({ error: "Request not found" }), {
        status: 404,
      });
    }

    const updatedRequest = {
      ...requests[requestIndex],
      ...updatedData,
    };
    requests[requestIndex] = updatedRequest;

    fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

    return new Response(
      JSON.stringify({ message: "Request updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating request:", error);
    return new Response(JSON.stringify({ error: "Error updating request" }), {
      status: 500,
    });
  }
}

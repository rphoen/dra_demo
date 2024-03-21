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

export function GET(req: NextRequest) {
  try {
    const { requestId } = req.nextUrl.searchParams.get('id') as any;
    console.log(requestId);

    const filePath = path.join(process.cwd(), "data", "requests.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const requests: Request[] = JSON.parse(jsonData);

    const request = requests.find(
      (request: { id: any }) => request.id === requestId
    );

    if (request) {
      return Response.json(request);
    } else {
      return Response.json({ error: "Request not found" });
    }
  } catch (error) {
    console.error("Error getting request:", error);
    return Response.json({ error: "Error getting request" });
  }
}

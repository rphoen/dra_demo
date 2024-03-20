import fs from 'fs';
import path from 'path';

export function GET() {
  const filePath = path.join(process.cwd(), 'data', 'requests.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(jsonData);

  return Response.json(users);
}
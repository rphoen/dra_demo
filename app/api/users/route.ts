import fs from 'fs';
import path from 'path';

// Get users
export function GET() {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(jsonData);

  return Response.json(users);
}
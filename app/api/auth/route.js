import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const { username, password } = await request.json();

  // Read user credentials from the JSON file
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(jsonData);

  // Find the user with the provided username
  const user = users.find((user) => user.username === username);

  // Check if the user exists and the password matches
  if (user && user.password === password) {
    const { role } = user;
    return new Response(JSON.stringify({ authenticated: true, role }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `role=${role}; Path=/;`,
      },
    });
  } else {
    return new Response(
      JSON.stringify({ authenticated: false, message: 'Invalid credentials' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export function GET() {
  return new Response('Method not allowed', { status: 405 });
}
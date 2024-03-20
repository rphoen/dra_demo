import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
  try {
    const dataRequest = await req.json();

    // Get the full path to the data requests file
    const dataRequestsFilePath = path.join(process.cwd(), 'data', 'data-requests.txt');

    // Append the data request to the file
    fs.appendFileSync(
      dataRequestsFilePath,
      `${JSON.stringify(dataRequest)}\n`,
      'utf8'
    );

    return NextResponse.json({ message: 'Data request saved successfully' });
  } catch (error) {
    console.error('Error saving data request:', error);
    return NextResponse.json({ error: 'Failed to save data request' }, { status: 500 });
  }
}
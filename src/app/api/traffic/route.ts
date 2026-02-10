import { NextResponse } from 'next/server';
import data from '@/../db.json';

export async function GET() {
  return NextResponse.json(data.traffic);
}

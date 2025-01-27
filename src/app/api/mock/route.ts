import { NextResponse } from "next/server";
import mockData from "@/data/mockData.json";

export async function GET() {
  return NextResponse.json(mockData);
}

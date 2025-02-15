import { NextResponse } from "next/server";
import parseLogs from "@/data/parse-log.json";

export async function GET() {
  return NextResponse.json(parseLogs);
}

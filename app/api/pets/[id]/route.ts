import { Controllers } from "@server/infrastructure/factories";
import type { NextRequest, NextResponse } from "next/server";

const controller = Controllers.petsController;

export async function GET(request: NextRequest): Promise<NextResponse> {
  return controller.handleGet(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return controller.handlePost(request);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return controller.handlePut(request);
}

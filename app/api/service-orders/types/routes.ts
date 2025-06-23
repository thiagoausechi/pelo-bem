import { Controllers } from "@server/infrastructure/factories";
import type { NextRequest, NextResponse } from "next/server";

const controller = Controllers.serviceOrdersController;

export async function GET(request: NextRequest): Promise<NextResponse> {
  return controller.handleGetServiceType(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return controller.handlePostServiceType(request);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return controller.handlePutServiceType(request);
}

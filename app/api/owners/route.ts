import { NextJsOwnersController } from "@server/infrastructure/adapters/http/next/controllers";
import { type NextRequest, type NextResponse } from "next/server";

const controller = new NextJsOwnersController();

export async function GET(request: NextRequest): Promise<NextResponse> {
  return controller.handleGet(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return controller.handlePost(request);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return controller.handlePut(request);
}

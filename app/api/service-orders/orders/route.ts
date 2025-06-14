import { NextJsServiceOrdersController } from "@server/infrastructure/adapters/http/next/controllers";
import { type NextRequest, type NextResponse } from "next/server";

const controller = new NextJsServiceOrdersController();

export async function GET(request: NextRequest): Promise<NextResponse> {
  return controller.handleGetOrder(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return controller.handlePostOrder(request);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return controller.handlePutOrder(request);
}

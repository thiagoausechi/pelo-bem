import { Controllers } from "@server/infrastructure/factories";
import { type NextRequest, type NextResponse } from "next/server";

const controller = Controllers.serviceOrdersController;

export async function GET(request: NextRequest): Promise<NextResponse> {
  return controller.handleGetSatisfaction(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return controller.handlePostSatisfaction(request);
}

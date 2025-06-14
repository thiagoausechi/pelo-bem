import { HttpStatus } from "@core/http";
import type { NextRequest, NextResponse } from "next/server";

export class NextJsServiceOrdersController {
  async handleGetOrder(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED;
  }

  async handlePostOrder(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED;
  }

  async handlePutOrder(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED;
  }
}

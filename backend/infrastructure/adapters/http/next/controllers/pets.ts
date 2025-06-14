import { HttpStatus } from "@core/http";
import type { NextRequest, NextResponse } from "next/server";

export class NextJsPetsController {
  async handleGet(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED;
  }

  async handlePost(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED;
  }

  async handlePut(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED;
  }
}

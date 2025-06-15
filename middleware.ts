import { HttpStatus } from "@core/http";
import { ApplicationError } from "@server/application/errors";
import { NotFoundError } from "@server/application/errors/not-found";
import { UnexpectedError } from "@server/application/errors/unexpected";
import { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import { DomainError } from "@server/domain/errors";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(_: NextRequest): NextResponse {
  try {
    return NextResponse.next();
  } catch (error) {
    console.error("[API]", error);

    if (!(error instanceof Error))
      return HttpStatus.INTERNAL_SERVER_ERROR("Ocorreu um erro inesperado.")();

    if (error instanceof DomainError)
      return HttpStatus.BAD_REQUEST(error.message)();

    if (error instanceof ApplicationError) {
      if (error instanceof EntryAlreadyExistsError)
        return HttpStatus.CONFLICT(error)();

      if (error instanceof NotFoundError) return HttpStatus.NOT_FOUND(error)();
    }
    if (error instanceof UnexpectedError)
      return HttpStatus.INTERNAL_SERVER_ERROR(error)();

    return HttpStatus.UNHANDLED_ERROR(error)();
  }
}

export const config = {
  matcher: "/api/:path*",
};

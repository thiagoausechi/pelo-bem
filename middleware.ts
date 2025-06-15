import { type NextRequest, NextResponse } from "next/server";

export function middleware(_: NextRequest): NextResponse {
  // try {
  //   console.log("[API] Middleware executed");
  //   return NextResponse.next();
  // } catch (error) {
  //   console.error("[API]", error);

  //   if (!(error instanceof Error))
  //     return HttpStatus.INTERNAL_SERVER_ERROR("Ocorreu um erro inesperado.")();

  //   if (error instanceof DomainError)
  //     return HttpStatus.BAD_REQUEST(error.message)();

  //   if (error instanceof ApplicationError) {
  //     if (error instanceof EntryAlreadyExistsError)
  //       return HttpStatus.CONFLICT(error)();

  //     if (error instanceof NotFoundError) return HttpStatus.NOT_FOUND(error)();
  //   }
  //   if (error instanceof UnexpectedError)
  //     return HttpStatus.INTERNAL_SERVER_ERROR(error)();

  //   return HttpStatus.UNHANDLED_ERROR(error)();
  // }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};

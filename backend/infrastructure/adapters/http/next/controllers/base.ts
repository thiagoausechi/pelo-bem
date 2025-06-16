import { HttpStatus } from "@core/http";
import { ApplicationError } from "@server/application/errors";
import { NotFoundError } from "@server/application/errors/not-found";
import { UnexpectedError } from "@server/application/errors/unexpected";
import { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import { DomainError } from "@server/domain/errors";
import type { NextResponse } from "next/server";

export class NextJsController {
  private formatCause(cause?: unknown): string {
    if (!cause) return "";
    if (cause instanceof Error) return `\tCausa: ${cause.message}`;
    if (typeof cause === "string") return `\tCausa: ${cause}`;

    return "\tCausa: desconhecida.";
  }

  private formatError(error: unknown) {
    if (!(error instanceof Error)) return "Ocorreu um erro inesperado.";

    if (error instanceof Error)
      return [
        `${error.name}: ${error.message}`,
        this.formatCause(error.cause),
        "",
      ].join("\n");

    if (typeof error === "string") return error;
  }

  protected async handleRequest(handler: () => Promise<NextResponse>) {
    try {
      const response = await handler();
      return response;
    } catch (error) {
      console.error("[API] " + this.formatError(error));

      if (!(error instanceof Error))
        return HttpStatus.INTERNAL_SERVER_ERROR(
          "Ocorreu um erro inesperado.",
        )();

      if (error instanceof DomainError)
        return HttpStatus.BAD_REQUEST(error.message)();

      if (error instanceof ApplicationError) {
        if (error instanceof EntryAlreadyExistsError)
          return HttpStatus.CONFLICT(error)();

        if (error instanceof NotFoundError)
          return HttpStatus.NOT_FOUND(error)();
      }
      if (error instanceof UnexpectedError)
        return HttpStatus.INTERNAL_SERVER_ERROR(error)();

      return HttpStatus.UNHANDLED_ERROR(error)();
    }
  }
}

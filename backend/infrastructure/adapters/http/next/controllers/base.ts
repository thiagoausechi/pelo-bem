import { HttpStatus } from "@core/http";
import { ApplicationError } from "@server/application/errors";
import { NotFoundError } from "@server/application/errors/not-found";
import { UnexpectedError } from "@server/application/errors/unexpected";
import { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import { CreationFailedError } from "@server/application/usecases/errors/creation-failed";
import { DomainError } from "@server/domain/errors";
import type { NextRequest, NextResponse } from "next/server";
import type { z, ZodObject, ZodRawShape } from "zod";

export class NextJsController {
  /**
   * Extrai e sanitiza os parâmetros de busca (search params) de uma NextRequest.
   * Converte os searchParams em um objeto Record<string, string> simples.
   * Se uma chave (key) tiver múltiplos valores, apenas o último será considerado.
   *
   * @param request O objeto NextRequest que contém os parâmetros da URL.
   * @returns Um objeto no formato Record<string, string> com os parâmetros.
   */
  protected sanitizeSearchParams(
    request: NextRequest,
    allowedFilters: string[],
  ) {
    const safeFilters: Record<string, string> = {};

    for (const [key, value] of request.nextUrl.searchParams.entries())
      if (
        allowedFilters.includes(key) &&
        typeof value === "string" &&
        value.trim()
      )
        safeFilters[key] = value.trim();

    return safeFilters;
  }

  protected async parseRequest<TSchema extends ZodRawShape>(
    parser: ZodObject<TSchema>,
    request: NextRequest,
  ): Promise<z.infer<ZodObject<TSchema>>> {
    const formData = await request.formData();
    const parsedData = await parser.parseAsync(
      Object.fromEntries(formData.entries()),
    );
    return parsedData;
  }

  protected parsePath(request: NextRequest): string[] {
    return request.nextUrl.pathname // -> api/owners/[id]
      .split("/") // -> ["api", "owners", "[id]"]
      .filter((segment) => segment !== "api" && segment !== "") // -> ["owners", "[id]"]
      .slice(1); // -> ["[id]"] ou mais segmentos caso haja
  }

  protected async handleRequest<T = unknown>(
    handler: () => Promise<NextResponse<T>>,
  ) {
    try {
      const response = await handler();
      return response;
    } catch (error) {
      console.error("[API] " + this.formatError(error));

      if (!(error instanceof Error))
        return HttpStatus.INTERNAL_SERVER_ERROR("Ocorreu um erro inesperado.");

      if (error instanceof DomainError) return HttpStatus.BAD_REQUEST(error);

      if (error instanceof ApplicationError) {
        if (error instanceof CreationFailedError)
          return HttpStatus.BAD_REQUEST(error);

        if (error instanceof EntryAlreadyExistsError)
          return HttpStatus.CONFLICT(error);

        if (error instanceof NotFoundError) return HttpStatus.NOT_FOUND(error);

        if (error instanceof UnexpectedError)
          return HttpStatus.INTERNAL_SERVER_ERROR(error);

        return HttpStatus.BAD_REQUEST(error);
      }

      return HttpStatus.UNHANDLED_ERROR(error);
    }
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

  private formatCause(cause?: unknown): string {
    if (!cause) return "";
    if (cause instanceof Error) return `\tCausa: ${cause.message}`;
    if (typeof cause === "string") return `\tCausa: ${cause}`;

    return "\tCausa: desconhecida.";
  }
}

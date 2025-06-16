import { NextResponse } from "next/server";

export type HttpResponse<T> = { code: string } & (
  | { data: T }
  | { error: Error; code: string }
);

type Exception = Error | string;

function successResponse<T>(data: T, code: string, status: number) {
  return NextResponse.json<HttpResponse<T>>({ data, code }, { status });
}

function errorResponse(error: Exception, code: string, status: number) {
  return NextResponse.json<HttpResponse<never>>(
    {
      error: {
        // Omite propositalmente o nome específico do erro para evitar exposição de detalhes internos
        name: "Erro",
        message: error instanceof Error ? error.message : String(error),
        cause:
          error instanceof Error && error.cause instanceof Error
            ? error.cause.message
            : undefined,
      },
      code,
    },
    { status },
  );
}

const SUCCESS_CODES = {
  OK: <T>(data: T) => successResponse(data, "OK", 200),
  CREATED: <T>(data: T) => successResponse(data, "CREATED", 201),
  ACCEPTED: <T>(data: T) => successResponse(data, "ACCEPTED", 202),
  NO_CONTENT: <T>(data: T) => successResponse(data, "NO_CONTENT", 204),
};

const CLIENT_ERROR_CODES = {
  BAD_REQUEST: (e: Exception) => errorResponse(e, "BAD_REQUEST", 400),
  UNAUTHORIZED: () => errorResponse("Requisição não autorizada", "UNAUTHORIZED", 401), // prettier-ignore
  FORBIDDEN: () => errorResponse("Acesso negado", "FORBIDDEN", 403),
  NOT_FOUND: (e: Exception) => errorResponse(e, "NOT_FOUND", 404),
  CONFLICT: (e: Exception) => errorResponse(e, "CONFLICT", 409),
};

const SERVER_ERROR_CODES = {
  INTERNAL_SERVER_ERROR: (e: Exception) => errorResponse(e, "INTERNAL_SERVER_ERROR", 500), // prettier-ignore
  SERVICE_UNAVAILABLE: () => errorResponse("Serviço indisponível", "SERVICE_UNAVAILABLE", 503), // prettier-ignore
  UNHANDLED_ERROR: (e: Exception) => errorResponse(e, "UNHANDLED_ERROR", 500), // prettier-ignore
  NOT_IMPLEMENTED: () => errorResponse("Funcionalidade não implementada", "NOT_IMPLEMENTED", 501), // prettier-ignore
};

export const HttpStatus = {
  ...SUCCESS_CODES,
  ...CLIENT_ERROR_CODES,
  ...SERVER_ERROR_CODES,
};

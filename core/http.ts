import { NextResponse } from "next/server";

export type HttpResponse<T> = { code: string } & (
  | { data: T }
  | { error: Error; code: string }
);

const success =
  (code: string, status: number) =>
  <T>(data: T) =>
    NextResponse.json<HttpResponse<T>>({ data, code }, { status });

const error = (code: string, status: number) => (error: Error | string) => () =>
  NextResponse.json<HttpResponse<never>>(
    {
      error: new Error(typeof error === "string" ? error : error.message, {
        cause:
          error instanceof Error
            ? error.cause instanceof Error
              ? error.cause.message
              : undefined
            : undefined,
      }),
      code,
    },
    { status },
  );

const SUCCESS_CODES = {
  OK: success("OK", 200),
  CREATED: success("CREATED", 201),
  ACCEPTED: success("ACCEPTED", 202),
  NO_CONTENT: success("NO_CONTENT", 204),
};

const CLIENT_CODES = {
  BAD_REQUEST: error("BAD_REQUEST", 400),
  UNAUTHORIZED: error("UNAUTHORIZED", 401)("Requisição não autorizada"), // prettier-ignore
  FORBIDDEN: error("FORBIDDEN", 403)("Acesso negado"),
  NOT_FOUND: error("NOT_FOUND", 404),
  CONFLICT: error("CONFLICT", 409),
};

const SERVER_CODES = {
  INTERNAL_SERVER_ERROR: error("INTERNAL_SERVER_ERROR", 500),
  UNHANDLED_ERROR: error("UNHANDLED_ERROR", 500),
  NOT_IMPLEMENTED: error("NOT_IMPLEMENTED", 501)("Funcionalidade não implementada"), // prettier-ignore
};

export const HttpStatus = {
  ...SUCCESS_CODES,
  ...CLIENT_CODES,
  ...SERVER_CODES,
};

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly cause?: Error;

  constructor(message: string, statusCode: number, cause?: Error) {
    super(message);
    this.statusCode = statusCode;
    this.cause = cause;

    this.name = this.constructor.name;
  }
}

import { NextResponse } from "next/server";

const error = (code: string, status: number) =>
  NextResponse.json({ code }, { status });

const errorWithMessage = (code: string, status: number) => (message: string) =>
  NextResponse.json({ message, code }, { status });

const SUCCESS_CODES = {
  OK: { status: 200 },
  CREATED: { status: 201 },
  ACCEPTED: { status: 202 },
  NO_CONTENT: { status: 204 },
};

const CLIENT_CODES = {
  BAD_REQUEST: errorWithMessage("Requisição inválida", 400),
  UNAUTHORIZED: error("Requisição não autorizada", 401),
  FORBIDDEN: error("Acesso negado", 403),
  NOT_FOUND: errorWithMessage("Recurso não encontrado", 404),
};

const SERVER_CODES = {
  INTERNAL_SERVER_ERROR: errorWithMessage("Erro interno do servidor", 500),
  NOT_IMPLEMENTED: error("Funcionalidade não implementada", 501),
};

export const HttpStatus = {
  ...SUCCESS_CODES,
  ...CLIENT_CODES,
  ...SERVER_CODES,
};

import type { HttpResponse } from "@core/http";
import type { QueryFunction } from "@tanstack/react-query";
import { type z } from "zod";

export function makeQuery<TResponseData>(
  url: string,
  zodSchema: z.ZodSchema<TResponseData>,
): QueryFunction<TResponseData> {
  return async () => {
    const response = await fetch(`/api${url}`);

    const body = (await response.json()) as HttpResponse<unknown>;

    if ("error" in body) throw body.error;
    const isValid = zodSchema.safeParse(body.data);

    if (!isValid.success)
      throw new Error("Dados inválidos recebidos do servidor");

    return isValid.data;
  };
}

export function makeMutation<TRequestData, TResponseData>(
  url: string,
  options: {
    method?: "POST" | "PUT" | "DELETE";
    valuesToFormData: (values: TRequestData) => FormData;
  },
): (values: TRequestData) => Promise<TResponseData> {
  return async (values: TRequestData) => {
    const response = await fetch(`/api${url}`, {
      method: options.method ?? "POST",
      body: options.valuesToFormData(values),
    });

    const body = (await response.json()) as HttpResponse<TResponseData>;

    if ("error" in body) throw body.error;

    return body.data;
  };
}

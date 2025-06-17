import type { HttpResponse } from "@core/http";
import type { QueryFunction } from "@tanstack/react-query";

export function makeQuery<TResponseData>(
  url: string,
): QueryFunction<TResponseData> {
  return async () => {
    const response = await fetch(`/api${url}`);

    const body = (await response.json()) as HttpResponse<TResponseData>;

    if ("error" in body) throw body.error;

    return body.data;
  };
}

export function makeMutation<TRequestData, TResponseData>(
  url: string,
  options: {
    valuesToFormData: (values: TRequestData) => FormData;
  },
): (values: TRequestData) => Promise<TResponseData> {
  return async (values: TRequestData) => {
    const response = await fetch(`/api${url}`, {
      method: "POST",
      body: options.valuesToFormData(values),
    });

    const body = (await response.json()) as HttpResponse<TResponseData>;

    if ("error" in body) throw body.error;

    return body.data;
  };
}

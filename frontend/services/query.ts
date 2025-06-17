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

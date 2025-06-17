import type { OwnerDTO } from "@core/contracts/dtos/owners";
import type { HttpResponse } from "@core/http";
import type { QueryFunction } from "@tanstack/react-query";

export const ownersManagementListQueryKey = [
  "owners",
  "owners-list",
  "owners-management-list",
] as const;

export const fetchOwnersManagementList: QueryFunction<
  OwnerDTO[]
> = async () => {
  const response = await fetch("/api/owners");

  const body = (await response.json()) as HttpResponse<OwnerDTO[]>;

  if ("error" in body) throw body.error;

  return body.data;
};

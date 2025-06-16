"use client";

import { CreateOwnerAction } from "@client/components/layout/actions/owners/create";
import { DataTable } from "@client/components/ui/data-table";
import type { OwnerDTO } from "@core/contracts/dtos/owners";
import { useQuery } from "@tanstack/react-query";
import { columns, queryKey } from "./config";

export function OwnersManagementTable() {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => Promise.resolve([] as OwnerDTO[]), // TODO: Replace with actual API call
  });

  return (
    <DataTable
      data={data ?? ([] as OwnerDTO[])}
      columns={columns}
      actions={[<CreateOwnerAction key="new-owner" />]}
      search={{
        columnId: "name",
        placeholder: "Buscar por nome do cuidador",
      }}
      loadingMessage={(isLoading || isFetching) && "Carregando..."}
      errorMessage={isError && "Erro ao carregar dados."}
    />
  );
}

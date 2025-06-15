"use client";

import { Button } from "@client/components/ui/button";
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
      actions={[
        <Button key="new-owner" variant="default" size="sm">
          Novo Cuidador
        </Button>,
      ]}
      search={{
        columnId: "name",
        placeholder: "Buscar por nome do cuidador",
      }}
      loadingMessage={(isLoading || isFetching) && "Carregando..."}
      errorMessage={isError && "Erro ao carregar dados."}
    />
  );
}

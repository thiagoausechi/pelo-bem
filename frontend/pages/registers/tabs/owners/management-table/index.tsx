"use client";

import { CreateOwnerAction } from "@client/components/layout/actions/owners/create";
import { DataTable } from "@client/components/ui/data-table";
import {
  fetchOwnersManagementList,
  ownersManagementListQueryKey,
} from "@client/services/owners";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./config";

export function OwnersManagementTable() {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ownersManagementListQueryKey,
    queryFn: fetchOwnersManagementList,
  });

  return (
    <DataTable
      data={data ?? []}
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

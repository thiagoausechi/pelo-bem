"use client";

import { CreatePetAction } from "@client/components/layout/actions/pets/create";
import { DataTable } from "@client/components/ui/data-table";
import {
  fetchPetsManagementList,
  petsManagementListQueryKey,
} from "@client/services/pets";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./config";

export function PetsManagementTable() {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: petsManagementListQueryKey,
    queryFn: fetchPetsManagementList,
  });

  return (
    <DataTable
      data={data ?? []}
      columns={columns}
      actions={[<CreatePetAction key="new-pet" />]}
      search={{
        columnId: "name",
        placeholder: "Buscar por nome do pet",
      }}
      loadingMessage={(isLoading || isFetching) && "Carregando..."}
      errorMessage={isError && "Erro ao carregar dados."}
    />
  );
}

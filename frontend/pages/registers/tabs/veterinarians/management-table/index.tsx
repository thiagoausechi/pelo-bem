"use client";

import { CreateVeterinarianAction } from "@client/components/layout/actions/veterinarians/create";
import { DataTable } from "@client/components/ui/data-table";
import {
  fetchVeterinariansManagementList,
  veterinariansManagementListQueryKey,
} from "@client/services/veterinarians";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./config";

export function VeterinariansManagementTable() {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: veterinariansManagementListQueryKey,
    queryFn: fetchVeterinariansManagementList,
  });

  return (
    <DataTable
      data={data ?? []}
      columns={columns}
      actions={[<CreateVeterinarianAction key="new-veterinarian" />]}
      search={{
        columnId: "name",
        placeholder: "Buscar por nome do veterinário",
      }}
      loadingMessage={(isLoading || isFetching) && "Carregando..."}
      errorMessage={isError && "Erro ao carregar dados."}
    />
  );
}

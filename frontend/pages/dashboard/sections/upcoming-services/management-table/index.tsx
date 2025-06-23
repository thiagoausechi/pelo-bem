"use client";

import { SeedAction } from "@client/components/layout/actions/seed";
import { DataTable } from "@client/components/ui/data-table";
import {
  fetchUpcomingServicesList,
  upcomingServicesListQueryKey,
} from "@client/services/service-orders";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./config";

export function UpcomingServicesTable() {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: upcomingServicesListQueryKey,
    queryFn: fetchUpcomingServicesList,
  });

  return (
    <DataTable
      title={<h2 className="font-bold">Serviços Agendados</h2>}
      data={data ?? []}
      columns={columns}
      actions={[<SeedAction key="seed-action" />]}
      loadingMessage={(isLoading || isFetching) && "Carregando..."}
      errorMessage={isError && "Erro ao carregar dados."}
    />
  );
}

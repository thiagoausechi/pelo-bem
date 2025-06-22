"use client";

import { DataTable } from "@client/components/ui/data-table";
import { columns } from "./config";

export function UpcomingServicesTable() {
  // TODO: Carregar dados da API

  return (
    <DataTable
      title={<h2 className="font-bold">Serviços Agendados</h2>}
      data={[]}
      columns={columns}
      actions={[]}
      loadingMessage={false && "Carregando..."}
      errorMessage={false && "Erro ao carregar dados."}
    />
  );
}

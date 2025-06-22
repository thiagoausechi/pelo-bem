"use client";

import { DataTable } from "@client/components/ui/data-table";
import { columns } from "./config";

export function ServicesDoneTable() {
  // TODO: Carregar dados da API

  return (
    <DataTable
      title={<h2 className="font-bold">Serviços Concluídos</h2>}
      data={[]}
      columns={columns}
      actions={[]}
      loadingMessage={false && "Carregando..."}
      errorMessage={false && "Erro ao carregar dados."}
    />
  );
}

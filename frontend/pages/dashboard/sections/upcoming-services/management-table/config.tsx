"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@client/components/ui/avatar";
import { Checkbox } from "@client/components/ui/checkbox";
import {
  DataTableColumnHeader,
  type Column,
} from "@client/components/ui/data-table";
import { acronym } from "@core/acronym";
import type { ServiceOrderDTO } from "@core/contracts/dtos/service-orders";
import { SpeciesInfo } from "@core/contracts/enums/pets/species.info";
import React from "react";

export const columns: Column<ServiceOrderDTO>[] = [
  {
    id: "select",
    title: "Selecionar",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar tudo"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "owner",
    accessorFn: (row) => row.pet.owner,
    title: "Cuidador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cuidador" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Avatar className="border">
          {row.original.pet.owner.profile && (
            <AvatarImage
              src={row.original.pet.owner.profile}
              alt={`Avatar do cuidador ${row.original.pet.owner.name}`}
            />
          )}
          <AvatarFallback>
            {acronym(row.original.pet.owner.name, { maxWords: 2 })}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm leading-none font-medium">
            {row.original.pet.owner.name}
          </p>
          <p className="text-muted-foreground text-xs">
            {row.original.pet.owner.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "pet",
    accessorFn: (row) => row.pet,
    title: "Pet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pet" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Avatar className="border">
          {row.original.pet.picture && (
            <AvatarImage
              src={row.original.pet.picture}
              alt={`Retrato do ${row.original.pet.name}`}
            />
          )}
          <AvatarFallback>
            {React.createElement(SpeciesInfo[row.original.pet.specie].icon, {
              className: "size-4",
            })}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm leading-none font-medium">
            {row.original.pet.name}
          </p>
          <p className="text-muted-foreground text-xs">
            {row.original.pet.breed}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "appointmentDate",
    title: "Agendamento",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agendamento" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.original.appointmentDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
    ),
  },
  {
    id: "serviceType.name",
    accessorFn: (row) => row.serviceType.name,
    title: "Serviço",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serviço" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("serviceType.name")}
        </span>
      </div>
    ),
  },
  {
    id: "veterinarian",
    accessorFn: (row) => row.veterinarian,
    title: "Veterinário",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Veterinário" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Avatar className="border">
          {row.original.veterinarian.profile && (
            <AvatarImage
              src={row.original.veterinarian.profile}
              alt={`Avatar do veterinário ${row.original.veterinarian.name}`}
            />
          )}
          <AvatarFallback>
            {acronym(row.original.veterinarian.name, { maxWords: 2 })}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm leading-none font-medium">
            {row.original.veterinarian.name}
          </p>
          <p className="text-muted-foreground text-xs">
            {row.original.veterinarian.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "serviceType.price",
    accessorFn: (row) => row.serviceType.price,
    title: "Valor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <span className="max-w-[500px] truncate font-medium tabular-nums">
          {
            // TODO:: Formatar o valor no servidor
            row.original.serviceType.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }
        </span>
      </div>
    ),
  },
];

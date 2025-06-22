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
import { capitalize } from "@core/capitalize";
import type { PetDTO } from "@core/contracts/dtos/pets";
import { GendersInfo } from "@core/contracts/enums/pets/genders.info";
import { SpeciesInfo } from "@core/contracts/enums/pets/species.info";
import React from "react";

export const columns: Column<PetDTO>[] = [
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
    accessorKey: "name",
    title: "Pet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pet" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Avatar className="border">
          {row.original.picture && (
            <AvatarImage
              src={row.original.picture}
              alt={`Retrato do ${row.original.name}`}
            />
          )}
          <AvatarFallback>
            {React.createElement(SpeciesInfo[row.original.specie].icon, {
              className: "size-4",
            })}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm leading-none font-medium">
            {row.original.name}
          </p>
          <p className="text-muted-foreground text-xs">{row.original.breed}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "owner",
    title: "Dono(a)",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dono(a)" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Avatar className="border">
          {row.original.owner.profile && (
            <AvatarImage
              src={row.original.owner.profile}
              alt={`Avatar do cuidador ${row.original.owner.name}`}
            />
          )}
          <AvatarFallback>
            {acronym(row.original.owner.name, { maxWords: 2 })}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm leading-none font-medium">
          {row.original.owner.name}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "gender",
    title: "Gênero",
    filterFn: (row, id, filterValue) =>
      (filterValue as string).includes(row.getValue(id)),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gênero" />
    ),
    cell: ({ row }) => {
      const gender = GendersInfo[row.original.gender];

      return (
        <div className="flex w-[100px] items-center gap-2">
          <div className="text-muted-foreground">{gender.icon}</div>
          <span>{capitalize(gender.label)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "age",
    title: "Idade",
    sortingFn: (rowA, rowB) =>
      rowA.original.birthday.getDate() - rowB.original.birthday.getDate(),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Idade" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("age")}
        </span>
      </div>
    ),
  },
];

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
import type { VeterinarianDTO } from "@core/contracts/dtos/veterinarians";

export const columns: Column<VeterinarianDTO>[] = [
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
    title: "Veterinário",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Veterinário" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Avatar className="border">
          {row.original.profile && (
            <AvatarImage
              src={row.original.profile}
              alt={`Avatar do veterinário ${row.original.name}`}
            />
          )}
          <AvatarFallback>
            {acronym(row.original.name, { maxWords: 2 })}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm leading-none font-medium">
            {row.original.name}
          </p>
          <p className="text-muted-foreground text-xs">
            {row.original.license}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    title: "Telefone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefone" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("phone")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    title: "E-mail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("email")}
        </span>
      </div>
    ),
  },
];

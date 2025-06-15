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
import type { OwnerDTO } from "@core/contracts/dtos/owners";

export const queryKey = "list-owners";

export const columns: Column<OwnerDTO>[] = [
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
    title: "Cuidador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cuidador" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Avatar className="border">
          {row.original.profile && (
            <AvatarImage
              src={row.original.profile}
              alt={`Avatar do cuidador ${row.original.name}`}
            />
          )}
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm leading-none font-medium">
            {row.original.name}
          </p>
          <p className="text-muted-foreground text-xs">{row.original.email}</p>
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
    accessorKey: "pets",
    title: "Pets",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pets" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("pets")}
        </span>
      </div>
    ),
  },
];

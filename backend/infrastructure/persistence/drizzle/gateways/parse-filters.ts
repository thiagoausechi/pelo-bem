import type { FiltersFor } from "@server/application/gateways/base/gateway";
import {
  and,
  eq,
  gte,
  ilike,
  lte,
  or,
  type Column,
  type SQL,
} from "drizzle-orm";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";

export function parseFilters<TEntity extends object>(params: {
  filters?: FiltersFor<TEntity>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Não há impacto significativo no uso de 'any' aqui, pois é um tipo genérico para o modelo do banco de dados.
  table: PgTableWithColumns<any>;
  conjunctive?: boolean;
}): SQL | undefined {
  if (!params.filters || Object.keys(params.filters).length === 0)
    return undefined;

  const { filters, table, conjunctive = true } = params;
  const conditions: (SQL | undefined)[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    const column = table[key] as Column;

    if (typeof value === "number") return conditions.push(eq(column, value));

    if (typeof value === "string") {
      // UUID é tratado como string, mas deve ser comparado com eq
      if (value.length === 36 && value.includes("-"))
        return conditions.push(eq(column, value));

      return conditions.push(ilike(column, `%${value}%`));
    }

    if (value && typeof value === "object") {
      // Verifica se o valor tem um ID
      if ("id" in value) return conditions.push(eq(column, value.id));

      // Verifica se o valor é um Range com valor exato
      if ("exact" in value) return conditions.push(eq(column, value.exact));

      // Verifica se o valor é um Range com valores mínimo e/ou máximo
      const minValue =
        "min" in value && value.min !== undefined
          ? gte(column, value.min)
          : undefined;

      const maxValue =
        "max" in value && value.max !== undefined
          ? lte(column, value.max)
          : undefined;

      if (minValue !== undefined && maxValue !== undefined)
        return conditions.push(and(minValue, maxValue));

      if (minValue !== undefined) return conditions.push(minValue);
      if (maxValue !== undefined) return conditions.push(maxValue);
    }

    throw new Error("Valor de filtro inválido: " + JSON.stringify(value));
  });

  return conjunctive ? and(...conditions) : or(...conditions);
}

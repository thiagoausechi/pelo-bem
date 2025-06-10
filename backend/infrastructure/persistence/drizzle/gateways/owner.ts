import type { Result } from "@core/result";
import type { NotFoundError } from "@server/application/errors/not-found";
import type { OwnerGateway } from "@server/application/gateways";
import type { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import type {
  Entry,
  FiltersFor,
} from "@server/application/gateways/base/gateway";
import type { Owner } from "@server/domain/entities/owner";
import { count } from "drizzle-orm";
import { db } from "..";
import { owners } from "../models/owner";
import { parseFilters } from "./parse-filters";

export class PgOwnerGateway implements OwnerGateway {
  async create(
    entity: Owner,
  ): Promise<Result<Entry<Owner>, EntryAlreadyExistsError>> {
    throw new Error("Method not implemented.");
  }

  async update(
    entity: Partial<Owner> & { id: string },
  ): Promise<Result<Entry<Owner>, NotFoundError>> {
    throw new Error("Method not implemented.");
  }

  async listAll(filters?: FiltersFor<Owner>): Promise<Entry<Owner>[]> {
    throw new Error("Method not implemented.");
  }

  async findBy(
    filters: FiltersFor<Owner>,
  ): Promise<Result<Entry<Owner>, NotFoundError>> {
    throw new Error("Method not implemented.");
  }

  async count(filters?: FiltersFor<Owner>): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(owners)
      .where(parseFilters({ filters, table: owners }));

    return result[0]?.count ?? 0;
  }

  async existsBy(filters: FiltersFor<Owner>): Promise<boolean> {
    const result = await db
      .select({ id: owners.id })
      .from(owners)
      .where(parseFilters({ filters, table: owners }))
      .limit(1);

    return result.length > 0;
  }
}

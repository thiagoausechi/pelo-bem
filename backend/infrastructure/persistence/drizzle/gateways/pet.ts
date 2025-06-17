import type { Result } from "@core/result";
import type { NotFoundError } from "@server/application/errors/not-found";
import type { PetGateway } from "@server/application/gateways";
import type { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import type { Pet } from "@server/domain/entities/pet";
import { db } from "..";
import { owners } from "../models/owner";
import { pets } from "../models/pet";
import { parseFilters } from "./parse-filters";

export class PgPetGateway implements PetGateway {
  async create(
    entity: Pet,
  ): Promise<Result<Entry<Pet>, EntryAlreadyExistsError>> {
    throw new Error("Method not implemented.");
  }

  async update(
    entity: Partial<Pet> & { id: string },
  ): Promise<Result<Entry<Pet>, NotFoundError>> {
    throw new Error("Method not implemented.");
  }

  async listAll(
    filters?: FiltersFor<Pet>,
    options?: ListOptions<keyof Pet>,
  ): Promise<Entry<Pet>[]> {
    throw new Error("Method not implemented.");
  }

  async findBy(
    filters: FiltersFor<Pet>,
  ): Promise<Result<Entry<Pet>, NotFoundError>> {
    throw new Error("Method not implemented.");
  }

  async count(filters?: FiltersFor<Pet>): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async existsBy(filters: FiltersFor<Pet>): Promise<boolean> {
    const result = await db
      .select({ id: owners.id })
      .from(pets)
      .where(parseFilters({ filters, table: pets }))
      .limit(1);

    return result.length > 0;
  }
}

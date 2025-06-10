import type { Result } from "@core/result";
import type { NotFoundError } from "@server/application/errors/not-found";
import type { OwnerGateway } from "@server/application/gateways";
import type { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import type {
  Entry,
  FiltersFor,
} from "@server/application/gateways/base/gateway";
import type { Owner } from "@server/domain/entities/owner";

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
    throw new Error("Method not implemented.");
  }

  async existsBy(filters: FiltersFor<Owner>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

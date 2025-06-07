import type { Result } from "@core/result";
import type { NotFoundError } from "@server/application/errors/not-found";
import type { Entry, EntrySearchParams } from "./entry";
import type { EntryAlreadyExistsError } from "./entry-already-exists";

export interface Gateway<
  TEntity,
  TSearchParams extends Record<string, unknown>,
  TFilters extends
    EntrySearchParams<TSearchParams> = EntrySearchParams<TSearchParams>,
  TStoredEntity extends Entry<TEntity> = Entry<TEntity>,
> {
  create(
    entity: TEntity,
  ): Promise<Result<TStoredEntity, EntryAlreadyExistsError>>;
  update(
    entity: Partial<TStoredEntity> & { id: string },
  ): Promise<Result<TStoredEntity, NotFoundError>>;
  listAll(filters?: TFilters): Promise<TStoredEntity[]>;
  findBy(filters: TFilters): Promise<Result<TStoredEntity, NotFoundError>>;
  count(filters?: TFilters): Promise<number>;
  existsBy(filters: TFilters): Promise<boolean>;
}

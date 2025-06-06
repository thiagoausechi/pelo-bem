import type { Result } from "@core/result";
import type { NotFoundError } from "@server/application/errors/not-found";
import type { Entry } from "./entry";
import type { EntryAlreadyExistsError } from "./entry-already-exists";

export interface Gateway<
  TEntity,
  TSearchParams extends Record<string, unknown>,
  TStoredEntity extends Entry<TEntity> = Entry<TEntity>,
> {
  create(
    entity: TEntity,
  ): Promise<Result<TStoredEntity, EntryAlreadyExistsError>>;
  update(entity: TStoredEntity): Promise<Result<TStoredEntity, NotFoundError>>;
  listAll(params?: TSearchParams): Promise<TStoredEntity[]>;
  findBy(params: TSearchParams): Promise<Result<TStoredEntity, NotFoundError>>;
  count(params?: TSearchParams): Promise<number>;
  existsBy(params: TSearchParams): Promise<boolean>;
}

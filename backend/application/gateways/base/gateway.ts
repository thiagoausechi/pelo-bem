import type { DeepTransformToRange } from "@core/range";
import type { Result } from "@core/result";
import type { NotFoundError } from "@server/application/errors/not-found";
import type { EntryAlreadyExistsError } from "./entry-already-exists";

export interface BaseGateway<
  TEntity extends object,
  TFilters extends
    DeepTransformToRange<TEntity> = DeepTransformToRange<TEntity>,
> {
  create(entity: TEntity): Promise<Result<TEntity, EntryAlreadyExistsError>>;
  update(
    entity: Partial<TEntity> & { id: string },
  ): Promise<Result<TEntity, NotFoundError>>;
  listAll(filters?: TFilters): Promise<TEntity[]>;
  findBy(filters: TFilters): Promise<Result<TEntity, NotFoundError>>;
  count(filters?: TFilters): Promise<number>;
  existsBy(filters: TFilters): Promise<boolean>;
}

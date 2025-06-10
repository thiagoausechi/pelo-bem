import type { TransformToRange } from "@core/range";
import type { Result } from "@core/result";
import type { NotFoundError } from "@server/application/errors/not-found";
import type { EntryAlreadyExistsError } from "./entry-already-exists";

export type FiltersFor<TEntity extends object> = Partial<
  TransformToRange<TEntity>
>;

export interface BaseGateway<TEntity extends object> {
  create(entity: TEntity): Promise<Result<TEntity, EntryAlreadyExistsError>>;
  update(
    entity: Partial<TEntity> & { id: string },
  ): Promise<Result<TEntity, NotFoundError>>;
  listAll(filters?: FiltersFor<TEntity>): Promise<TEntity[]>;
  findBy(filters: FiltersFor<TEntity>): Promise<Result<TEntity, NotFoundError>>;
  count(filters?: FiltersFor<TEntity>): Promise<number>;
  existsBy(filters: FiltersFor<TEntity>): Promise<boolean>;
}

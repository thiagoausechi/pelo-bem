import type { TransformToRange } from "@core/range";
import type { Result } from "@core/result";
import type { NotFoundError } from "@server/application/errors/not-found";
import type { EntryAlreadyExistsError } from "./entry-already-exists";

export type FiltersFor<TEntity extends object> = Partial<
  TransformToRange<TEntity>
>;

/**
 * Representa um registro de uma entidade no sistema.
 * Inclui propriedades concretas comuns como `id`, `createdAt` e `updatedAt`.
 */
export type Entry<T extends object> = T & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface BaseGateway<TEntity extends object, TEntry = Entry<TEntity>> {
  create(entity: TEntity): Promise<Result<TEntry, EntryAlreadyExistsError>>;
  update(
    entity: Partial<TEntity> & { id: string },
  ): Promise<Result<TEntry, NotFoundError>>;
  listAll(filters?: FiltersFor<TEntity>): Promise<TEntry[]>;
  findBy(filters: FiltersFor<TEntity>): Promise<Result<TEntry, NotFoundError>>;
  count(filters?: FiltersFor<TEntity>): Promise<number>;
  existsBy(filters: FiltersFor<TEntity>): Promise<boolean>;
}

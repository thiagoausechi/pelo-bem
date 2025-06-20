import type { Range } from "@core/range";
import type { Result } from "@core/result";
import type { NotFoundError } from "@server/application/errors/not-found";
import type { UnexpectedError } from "@server/application/errors/unexpected";
import type { EntryAlreadyExistsError } from "./entry-already-exists";

export type FiltersFor<TEntity extends object> = {
  readonly [K in keyof TEntity]?: TEntity[K] extends number | Date | undefined
    ? Range<TEntity[K]>
    : TEntity[K] extends string | boolean
      ? TEntity[K]
      : TEntity[K] extends object
        ? string
        : never;
};

/**
 * Representa um registro de uma entidade no sistema.
 * Inclui propriedades concretas comuns como `id`, `createdAt` e `updatedAt`.
 */
export type Entry<T extends object> = T & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface ListOptions<TOrderByKey> {
  limit?: number;
  offset?: number;
  orderBy?: TOrderByKey;
  orderDirection?: "asc" | "desc";
}

export interface BaseGateway<TEntity extends object, TEntry = Entry<TEntity>> {
  create(
    entity: TEntity,
  ): Promise<Result<TEntry, EntryAlreadyExistsError | UnexpectedError>>;
  update(
    entity: Partial<TEntity> & { id: string },
  ): Promise<Result<TEntry, NotFoundError | UnexpectedError>>;
  listAll(
    filters?: FiltersFor<TEntity>,
    options?: ListOptions<keyof TEntity>,
  ): Promise<TEntry[]>;
  findBy(
    filters: FiltersFor<TEntity>,
  ): Promise<Result<TEntry, NotFoundError | UnexpectedError>>;
  count(filters?: FiltersFor<TEntity>): Promise<number>;
  existsBy(filters: FiltersFor<TEntity>): Promise<boolean>;
}

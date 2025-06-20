import { err, ok, type Result } from "@core/result";
import { NotFoundError } from "@server/application/errors/not-found";
import { UnexpectedError } from "@server/application/errors/unexpected";
import type { ServiceOrderGateway } from "@server/application/gateways";
import { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import { ServiceOrder } from "@server/domain/entities/service-order";
import { count, eq } from "drizzle-orm";
import { db } from "..";
import { PgServiceOrderMapper } from "../mappers/service-order";
import { serviceOrders } from "../models/service-order";
import { parseFilters, parseListOptions } from "./parse-filters";

export class PgServiceOrderGateway implements ServiceOrderGateway {
  private mapper: PgServiceOrderMapper;

  constructor() {
    this.mapper = new PgServiceOrderMapper();
  }

  async create(
    entity: ServiceOrder,
  ): Promise<
    Result<Entry<ServiceOrder>, EntryAlreadyExistsError | UnexpectedError>
  > {
    try {
      if (entity.id)
        if (await this.existsBy({ id: entity.id }))
          return err(new EntryAlreadyExistsError());

      const row = await db
        .insert(serviceOrders)
        .values(await this.mapper.toModel(entity))
        .returning();

      const createdServiceOrder = await this.mapper.toEntity(row[0]!);
      return ok(createdServiceOrder as Entry<ServiceOrder>);
    } catch (error) {
      return err(
        new UnexpectedError("Erro ao criar ordem de serviço.", error as Error),
      );
    }
  }

  async update(
    entity: Partial<ServiceOrder> & { id: string },
  ): Promise<Result<Entry<ServiceOrder>, UnexpectedError | NotFoundError>> {
    try {
      const row = await db
        .update(serviceOrders)
        .set(await this.mapper.toPartialModel(entity))
        .where(eq(serviceOrders.id, entity.id))
        .returning();

      if (row.length === 0)
        return err(new NotFoundError(ServiceOrder.ENTITY_NAME));

      const updatedServiceOrder = await this.mapper.toEntity(row[0]!);
      return ok(updatedServiceOrder as Entry<ServiceOrder>);
    } catch (error) {
      return err(
        new UnexpectedError(
          "Erro ao atualizar ordem de serviço.",
          error as Error,
        ),
      );
    }
  }

  async listAll(
    filters?: FiltersFor<ServiceOrder>,
    options?: ListOptions<keyof ServiceOrder>,
  ): Promise<Entry<ServiceOrder>[]> {
    try {
      const result = await db.query.serviceOrders.findMany(
        parseListOptions({ filters, options, table: serviceOrders }),
      );

      const entries = await Promise.all(
        result.map(
          async (row) =>
            this.mapper.toEntity(row) as Promise<Entry<ServiceOrder>>,
        ),
      );

      return entries;
    } catch (error) {
      console.error("Erro ao listar as ordens de serviço.", error);
      return [];
    }
  }

  async findBy(
    filters: FiltersFor<ServiceOrder>,
  ): Promise<Result<Entry<ServiceOrder>, UnexpectedError | NotFoundError>> {
    try {
      const result = await db
        .select()
        .from(serviceOrders)
        .where(parseFilters({ filters, table: serviceOrders }))
        .limit(1);

      if (result.length === 0)
        return err(new NotFoundError(ServiceOrder.ENTITY_NAME));
      const serviceOrder = await this.mapper.toEntity(result[0]!);

      return ok(serviceOrder as Entry<ServiceOrder>);
    } catch (error) {
      return err(
        new UnexpectedError(
          "Um erro inesperado ocorreu ao tentar encontrar a ordem de serviço.",
          error as Error,
        ),
      );
    }
  }

  async count(filters?: FiltersFor<ServiceOrder>): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(serviceOrders)
      .where(parseFilters({ filters, table: serviceOrders }));

    return result[0]?.count ?? 0;
  }

  async existsBy(filters: FiltersFor<ServiceOrder>): Promise<boolean> {
    const result = await db
      .select({ id: serviceOrders.id })
      .from(serviceOrders)
      .where(parseFilters({ filters, table: serviceOrders }))
      .limit(1);

    return result.length > 0;
  }
}

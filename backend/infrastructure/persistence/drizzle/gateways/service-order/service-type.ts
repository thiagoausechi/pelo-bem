import { err, ok, type Result } from "@core/result";
import { NotFoundError } from "@server/application/errors/not-found";
import { UnexpectedError } from "@server/application/errors/unexpected";
import type { ServiceTypeGateway } from "@server/application/gateways";
import { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import { ServiceType } from "@server/domain/entities/service-order";
import { PgServiceTypeMapper } from "@server/infrastructure/persistence/drizzle/mappers/service-type";
import { count, eq } from "drizzle-orm";
import { db } from "../..";
import { serviceTypes } from "../../models/service-type";
import { parseFilters, parseListOptions } from "../parse-filters";

export class PgServiceTypeGateway implements ServiceTypeGateway {
  private mapper: PgServiceTypeMapper;

  constructor() {
    this.mapper = new PgServiceTypeMapper();
  }

  async create(
    entity: ServiceType,
  ): Promise<
    Result<Entry<ServiceType>, EntryAlreadyExistsError | UnexpectedError>
  > {
    try {
      if (entity.id)
        if (await this.existsBy({ id: entity.id }))
          return err(new EntryAlreadyExistsError());

      const row = await db
        .insert(serviceTypes)
        .values(await this.mapper.toModel(entity))
        .returning();

      const createdServiceType = await this.mapper.toEntity(row[0]!);
      return ok(createdServiceType as Entry<ServiceType>);
    } catch (error) {
      return err(
        new UnexpectedError("Erro ao criar tipo de serviço.", error as Error),
      );
    }
  }

  async update(
    entity: Partial<ServiceType> & { id: string },
  ): Promise<Result<Entry<ServiceType>, UnexpectedError | NotFoundError>> {
    try {
      const row = await db
        .update(serviceTypes)
        .set(await this.mapper.toPartialModel(entity))
        .where(eq(serviceTypes.id, entity.id))
        .returning();

      if (row.length === 0)
        return err(new NotFoundError(ServiceType.ENTITY_NAME));

      const updatedServiceType = await this.mapper.toEntity(row[0]!);
      return ok(updatedServiceType as Entry<ServiceType>);
    } catch (error) {
      return err(
        new UnexpectedError(
          "Erro ao atualizar tipo de serviço.",
          error as Error,
        ),
      );
    }
  }

  async listAll(
    filters?: FiltersFor<ServiceType>,
    options?: ListOptions<keyof ServiceType>,
  ): Promise<Entry<ServiceType>[]> {
    try {
      const result = await db.query.serviceTypes.findMany(
        parseListOptions({ filters, options, table: serviceTypes }),
      );

      const entries = await Promise.all(
        result.map(
          async (row) =>
            this.mapper.toEntity(row) as Promise<Entry<ServiceType>>,
        ),
      );

      return entries;
    } catch (error) {
      console.error("Erro ao listar os tipos de serviço.", error);
      return [];
    }
  }

  async findBy(
    filters: FiltersFor<ServiceType>,
  ): Promise<Result<Entry<ServiceType>, UnexpectedError | NotFoundError>> {
    try {
      const result = await db
        .select()
        .from(serviceTypes)
        .where(parseFilters({ filters, table: serviceTypes }))
        .limit(1);

      if (result.length === 0)
        return err(new NotFoundError(ServiceType.ENTITY_NAME));
      const serviceType = await this.mapper.toEntity(result[0]!);

      return ok(serviceType as Entry<ServiceType>);
    } catch (error) {
      return err(
        new UnexpectedError(
          "Um erro inesperado ocorreu ao tentar encontrar o tipo de serviço.",
          error as Error,
        ),
      );
    }
  }

  async count(filters?: FiltersFor<ServiceType>): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(serviceTypes)
      .where(parseFilters({ filters, table: serviceTypes }));

    return result[0]?.count ?? 0;
  }

  async existsBy(filters: FiltersFor<ServiceType>): Promise<boolean> {
    const result = await db
      .select({ id: serviceTypes.id })
      .from(serviceTypes)
      .where(parseFilters({ filters, table: serviceTypes }))
      .limit(1);

    return result.length > 0;
  }
}

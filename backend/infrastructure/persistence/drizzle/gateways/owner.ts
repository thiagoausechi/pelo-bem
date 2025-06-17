import { err, ok, type Result } from "@core/result";
import { NotFoundError } from "@server/application/errors/not-found";
import { UnexpectedError } from "@server/application/errors/unexpected";
import type { OwnerGateway } from "@server/application/gateways";
import { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import { Owner } from "@server/domain/entities/owner";
import type { EmailValidator } from "@server/domain/value-objects/email";
import type { PhoneValidator } from "@server/domain/value-objects/phone";
import { count, eq } from "drizzle-orm";
import { db } from "..";
import { PgOwnerMapper } from "../mappers/owner";
import { owners } from "../models/owner";
import { parseFilters, parseListOptions } from "./parse-filters";

interface Dependencies {
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
}

export class PgOwnerGateway implements OwnerGateway {
  private mapper: PgOwnerMapper;

  constructor(deps: Dependencies) {
    this.mapper = new PgOwnerMapper({
      emailValidator: deps.emailValidator,
      phoneValidator: deps.phoneValidator,
    });
  }

  async create(
    entity: Owner,
  ): Promise<Result<Entry<Owner>, EntryAlreadyExistsError>> {
    try {
      if (entity.id)
        if (await this.existsBy({ id: entity.id }))
          // ^ Não fazemos uma query desnecessária se não houver ID
          return err(new EntryAlreadyExistsError());

      const row = await db
        .insert(owners)
        .values(await this.mapper.toModel(entity))
        .returning();

      const createdOwner = await this.mapper.toEntity(row[0]!);
      return ok(createdOwner as Entry<Owner>);
    } catch (error) {
      console.error("Erro ao criar o cuidador:", error);
      return err(
        new UnexpectedError("Erro ao criar o cuidador", error as Error),
      );
    }
  }

  async update(
    entity: Partial<Owner> & { id: string },
  ): Promise<Result<Entry<Owner>, NotFoundError>> {
    try {
      const row = await db
        .update(owners)
        .set(await this.mapper.toPartialModel(entity))
        .where(eq(owners.id, entity.id))
        .returning();

      if (row.length === 0) return err(new NotFoundError(Owner.ENTITY_NAME));

      const updatedOwner = await this.mapper.toEntity(row[0]!);
      return ok(updatedOwner as Entry<Owner>);
    } catch (error) {
      console.error("Erro ao atualizar o cuidador:", error);
      return err(
        new UnexpectedError("Erro ao atualizar o cuidador", error as Error),
      );
    }
  }

  async listAll(
    filters?: FiltersFor<Owner>,
    options?: ListOptions<keyof Owner>,
  ): Promise<Entry<Owner>[]> {
    try {
      const result = await db.query.owners.findMany(
        parseListOptions({ filters, options, table: owners }),
      );

      const entries = await Promise.all(
        result.map((row) => this.mapper.toEntity(row) as Promise<Entry<Owner>>),
      );

      return entries;
    } catch (error) {
      console.error("Erro ao listar cuidadores:", error);
      return [];
    }
  }

  async findBy(
    filters: FiltersFor<Owner>,
  ): Promise<Result<Entry<Owner>, NotFoundError | UnexpectedError>> {
    try {
      const result = await db
        .select()
        .from(owners)
        .where(parseFilters({ filters, table: owners }))
        .limit(1);

      if (result.length === 0) return err(new NotFoundError(Owner.ENTITY_NAME));
      const owner = await this.mapper.toEntity(result[0]!);

      return ok(owner as Entry<Owner>);
    } catch (error) {
      return err(
        new UnexpectedError(
          "Um erro inesperado ocorreu ao tentar encontrar o cuidador",
          error as Error,
        ),
      );
    }
  }

  async count(filters?: FiltersFor<Owner>): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(owners)
      .where(parseFilters({ filters, table: owners }));

    return result[0]?.count ?? 0;
  }

  async existsBy(filters: FiltersFor<Owner>): Promise<boolean> {
    const result = await db
      .select({ id: owners.id })
      .from(owners)
      .where(parseFilters({ filters, table: owners }))
      .limit(1);

    return result.length > 0;
  }
}

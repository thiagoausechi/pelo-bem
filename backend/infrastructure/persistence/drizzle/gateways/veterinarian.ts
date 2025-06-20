import { err, ok, type Result } from "@core/result";
import { NotFoundError } from "@server/application/errors/not-found";
import { UnexpectedError } from "@server/application/errors/unexpected";
import type { VeterinarianGateway } from "@server/application/gateways";
import { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import { Veterinarian } from "@server/domain/entities/veterinarian";
import type { EmailValidator } from "@server/domain/value-objects/email";
import type { LicenseValidator } from "@server/domain/value-objects/license";
import type { PhoneValidator } from "@server/domain/value-objects/phone";
import { count, eq } from "drizzle-orm";
import { db } from "..";
import { PgVeterinarianMapper } from "../mappers/veterinarian";
import { veterinarians } from "../models/veterinarian";
import { parseFilters, parseListOptions } from "./parse-filters";

interface Dependencies {
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
  licenseValidator: LicenseValidator;
}

export class PgVeterinarianGateway implements VeterinarianGateway {
  private mapper: PgVeterinarianMapper;

  constructor(deps: Dependencies) {
    this.mapper = new PgVeterinarianMapper({
      emailValidator: deps.emailValidator,
      phoneValidator: deps.phoneValidator,
      licenseValidator: deps.licenseValidator,
    });
  }

  async create(
    entity: Veterinarian,
  ): Promise<
    Result<Entry<Veterinarian>, EntryAlreadyExistsError | UnexpectedError>
  > {
    try {
      if (entity.id)
        if (await this.existsBy({ id: entity.id }))
          return err(new EntryAlreadyExistsError());

      const row = await db
        .insert(veterinarians)
        .values(await this.mapper.toModel(entity))
        .returning();

      const createdVeterinarian = await this.mapper.toEntity(row[0]!);
      return ok(createdVeterinarian as Entry<Veterinarian>);
    } catch (error) {
      return err(
        new UnexpectedError("Erro ao criar o veterinário", error as Error),
      );
    }
  }

  async update(
    entity: Partial<Veterinarian> & { id: string },
  ): Promise<Result<Entry<Veterinarian>, UnexpectedError | NotFoundError>> {
    try {
      const row = await db
        .update(veterinarians)
        .set(await this.mapper.toPartialModel(entity))
        .where(eq(veterinarians.id, entity.id))
        .returning();

      if (row.length === 0)
        return err(new NotFoundError(Veterinarian.ENTITY_NAME));

      const updatedVeterinarian = await this.mapper.toEntity(row[0]!);
      return ok(updatedVeterinarian as Entry<Veterinarian>);
    } catch (error) {
      return err(
        new UnexpectedError("Erro ao atualizar o veterinário", error as Error),
      );
    }
  }

  async listAll(
    filters?: FiltersFor<Veterinarian>,
    options?: ListOptions<keyof Veterinarian>,
  ): Promise<Entry<Veterinarian>[]> {
    try {
      const result = await db.query.veterinarians.findMany(
        parseListOptions({ filters, options, table: veterinarians }),
      );

      const entries = await Promise.all(
        result.map(
          (row) => this.mapper.toEntity(row) as Promise<Entry<Veterinarian>>,
        ),
      );

      return entries;
    } catch (error) {
      console.error("Erro ao listar cuidadores:", error);
      return [];
    }
  }

  async findBy(
    filters: FiltersFor<Veterinarian>,
  ): Promise<Result<Entry<Veterinarian>, UnexpectedError | NotFoundError>> {
    try {
      const result = await db
        .select()
        .from(veterinarians)
        .where(parseFilters({ filters, table: veterinarians }))
        .limit(1);

      if (result.length === 0)
        return err(new NotFoundError(Veterinarian.ENTITY_NAME));
      const veterinarian = await this.mapper.toEntity(result[0]!);

      return ok(veterinarian as Entry<Veterinarian>);
    } catch (error) {
      return err(
        new UnexpectedError(
          "Um erro inesperado ocorreu ao tentar encontrar o veterinário",
          error as Error,
        ),
      );
    }
  }

  async count(filters?: FiltersFor<Veterinarian>): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(veterinarians)
      .where(parseFilters({ filters, table: veterinarians }));

    return result[0]?.count ?? 0;
  }

  async existsBy(filters: FiltersFor<Veterinarian>): Promise<boolean> {
    const result = await db
      .select({ id: veterinarians.id })
      .from(veterinarians)
      .where(parseFilters({ filters, table: veterinarians }))
      .limit(1);

    return result.length > 0;
  }
}

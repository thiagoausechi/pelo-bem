import { err, ok, type Result } from "@core/result";
import { NotFoundError } from "@server/application/errors/not-found";
import { UnexpectedError } from "@server/application/errors/unexpected";
import type { PetGateway } from "@server/application/gateways";
import { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import { Pet } from "@server/domain/entities/pet";
import { count, eq } from "drizzle-orm";
import { db } from "..";
import { PgPetMapper } from "../mappers/pet";
import { owners } from "../models/owner";
import { pets } from "../models/pet";
import { parseFilters, parseListOptions } from "./parse-filters";

export class PgPetGateway implements PetGateway {
  private mapper: PgPetMapper;

  constructor() {
    this.mapper = new PgPetMapper();
  }

  async create(
    entity: Pet,
  ): Promise<Result<Entry<Pet>, EntryAlreadyExistsError | UnexpectedError>> {
    try {
      if (entity.id)
        if (await this.existsBy({ id: entity.id }))
          // ^ Não fazemos uma query desnecessária se não houver ID
          return err(new EntryAlreadyExistsError());

      const row = await db
        .insert(pets)
        .values(await this.mapper.toModel(entity))
        .returning();

      const createdPet = await this.mapper.toEntity(row[0]!);
      return ok(createdPet as Entry<Pet>);
    } catch (error) {
      return err(new UnexpectedError("Erro ao criar o pet", error as Error));
    }
  }

  async update(
    entity: Partial<Pet> & { id: string },
  ): Promise<Result<Entry<Pet>, NotFoundError | UnexpectedError>> {
    try {
      const row = await db
        .update(pets)
        .set(await this.mapper.toPartialModel(entity))
        .where(eq(pets.id, entity.id))
        .returning();

      if (row.length === 0) return err(new NotFoundError(Pet.ENTITY_NAME));

      const updatedPet = await this.mapper.toEntity(row[0]!);
      return ok(updatedPet as Entry<Pet>);
    } catch (error) {
      return err(
        new UnexpectedError("Erro ao atualizar o pet", error as Error),
      );
    }
  }

  async listAll(
    filters?: FiltersFor<Pet>,
    options?: ListOptions<keyof Pet>,
  ): Promise<Entry<Pet>[]> {
    try {
      const result = await db.query.pets.findMany(
        parseListOptions({ filters, options, table: pets }),
      );

      const entries = await Promise.all(
        result.map((row) => this.mapper.toEntity(row) as Promise<Entry<Pet>>),
      );

      return entries;
    } catch (error) {
      console.error("Erro ao listar os pets:", error);
      return [];
    }
  }

  async findBy(
    filters: FiltersFor<Pet>,
  ): Promise<Result<Entry<Pet>, NotFoundError | UnexpectedError>> {
    try {
      const result = await db
        .select()
        .from(pets)
        .where(parseFilters({ filters, table: pets }))
        .limit(1);

      if (result.length === 0) return err(new NotFoundError(Pet.ENTITY_NAME));
      const pet = await this.mapper.toEntity(result[0]!);

      return ok(pet as Entry<Pet>);
    } catch (error) {
      return err(
        new UnexpectedError(
          "Um erro inesperado ocorreu ao tentar encontrar o cuidador",
          error as Error,
        ),
      );
    }
  }

  async count(filters?: FiltersFor<Pet>): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(pets)
      .where(parseFilters({ filters, table: pets }));

    return result[0]?.count ?? 0;
  }

  async existsBy(filters: FiltersFor<Pet>): Promise<boolean> {
    const result = await db
      .select({ id: owners.id })
      .from(pets)
      .where(parseFilters({ filters, table: pets }))
      .limit(1);

    return result.length > 0;
  }
}

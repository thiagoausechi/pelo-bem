import { Pet } from "@server/domain/entities/pet";
import { type PgPetInsertModel, type PgPetModel } from "../models/pet";

export class PgPetMapper {
  async toModel(entity: Pet): Promise<PgPetInsertModel> {
    return {
      id: entity.id,
      ownerId: entity.ownerId,
      name: entity.name,
      specie: entity.specie,
      breed: entity.breed,
      birthday: entity.birthday,
      weightGrams: entity.weightKg * 1000,
      heightCm: entity.heightCm,
      gender: entity.gender,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toPartialModel(
    entity: Partial<Pet> & { id: string },
  ): Promise<Partial<PgPetInsertModel>> {
    return {
      id: entity.id,
      ownerId: entity.ownerId,
      name: entity.name,
      specie: entity.specie,
      breed: entity.breed,
      birthday: entity.birthday,
      weightGrams: entity.weightKg ? entity.weightKg * 1000 : undefined,
      heightCm: entity.heightCm,
      gender: entity.gender,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toEntity(model: PgPetModel): Promise<Pet> {
    const pet = Pet.create({
      id: model.id,
      ownerId: model.ownerId,
      name: model.name,
      specie: model.specie,
      breed: model.breed,
      birthday: model.birthday,
      weightKg: model.weightGrams / 1000,
      heightCm: model.heightCm,
      gender: model.gender,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });

    if (!pet.ok) throw pet.error;

    return pet.value;
  }
}

import { ServiceType } from "@server/domain/entities/service-order";
import type { PgServiceTypeInsertModel } from "../models/service-type";

export class PgServiceTypeMapper {
  async toModel(entity: ServiceType): Promise<PgServiceTypeInsertModel> {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toPartialModel(
    entity: Partial<ServiceType> & { id: string },
  ): Promise<Partial<PgServiceTypeInsertModel>> {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toEntity(model: PgServiceTypeInsertModel): Promise<ServiceType> {
    const serviceType = ServiceType.create({
      id: model.id,
      name: model.name,
      description: model.description,
      price: model.price,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });

    if (!serviceType.ok) throw serviceType.error;

    return serviceType.value;
  }
}

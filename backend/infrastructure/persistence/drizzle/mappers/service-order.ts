import {
  ServiceOrder,
  ServiceType,
} from "@server/domain/entities/service-order";
import { eq } from "drizzle-orm";
import { db } from "..";
import type {
  PgServiceOrderInsertModel,
  PgServiceOrderModel,
} from "../models/service-order";
import { serviceType } from "../models/service-type";

export class PgServiceOrderMapper {
  async toModel(entity: ServiceOrder): Promise<PgServiceOrderInsertModel> {
    return {
      id: entity.id,
      petId: entity.petId,
      veterinarianId: entity.veterinarianId,
      appointmentDate: entity.appointmentDate,
      status: entity.status,
      serviceTypeId: entity.serviceType.id!,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toPartialModel(
    entity: Partial<ServiceOrder> & { id: string },
  ): Promise<Partial<PgServiceOrderInsertModel>> {
    return {
      id: entity.id,
      petId: entity.petId,
      veterinarianId: entity.veterinarianId,
      appointmentDate: entity.appointmentDate,
      status: entity.status,
      serviceTypeId: entity.serviceType?.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toEntity(model: PgServiceOrderModel): Promise<ServiceOrder> {
    const serviceTypeModel = (
      await db
        .select()
        .from(serviceType)
        .where(eq(serviceType.id, model.serviceTypeId))
        .limit(1)
    )[0]!;

    const createdServiceType = ServiceType.create({
      id: serviceTypeModel.id,
      name: serviceTypeModel.name,
      description: serviceTypeModel.description,
      price: serviceTypeModel.price,
      createdAt: serviceTypeModel.createdAt,
      updatedAt: serviceTypeModel.updatedAt,
    });
    if (!createdServiceType.ok) throw createdServiceType.error;

    const serviceOrder = ServiceOrder.create({
      id: model.id,
      petId: model.petId,
      veterinarianId: model.veterinarianId,
      appointmentDate: model.appointmentDate,
      status: model.status,
      serviceType: createdServiceType.value,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });

    if (!serviceOrder.ok) throw serviceOrder.error;

    return serviceOrder.value;
  }
}

import { ServiceOrder } from "@server/domain/entities/service-order";
import type {
  PgServiceOrderInsertModel,
  PgServiceOrderModel,
} from "../models/service-order";

export class PgServiceOrderMapper {
  async toModel(entity: ServiceOrder): Promise<PgServiceOrderInsertModel> {
    return {
      id: entity.id,
      petId: entity.petId,
      veterinarianId: entity.veterinarianId,
      appointmentDate: entity.appointmentDate,
      status: entity.status,
      serviceTypeId: entity.serviceTypeId,
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
      serviceTypeId: entity.serviceTypeId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toEntity(model: PgServiceOrderModel): Promise<ServiceOrder> {
    const serviceOrder = ServiceOrder.create({
      id: model.id,
      petId: model.petId,
      veterinarianId: model.veterinarianId,
      appointmentDate: model.appointmentDate,
      status: model.status,
      serviceTypeId: model.serviceTypeId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });

    if (!serviceOrder.ok) throw serviceOrder.error;

    return serviceOrder.value;
  }
}

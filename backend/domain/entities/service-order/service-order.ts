import type { ServiceOrderStatus } from "@core/contracts/enums/service-orders";
import { err, ok, type Result } from "@core/result";
import { EmptyPropertyError } from "@server/domain/errors";
import { BaseEntity, type BaseEntityProps } from "../base";
import { Pet } from "../pet";
import { Veterinarian } from "../veterinarian";
import type { ServiceType } from "./service-type";

interface ServiceOrderProps extends BaseEntityProps {
  petId: string;
  veterinarianId: string;
  serviceType: ServiceType;
  appointmentDate: Date;
  status: ServiceOrderStatus;
}

export class ServiceOrder extends BaseEntity {
  public static readonly ENTITY_NAME = "ordem de serviço";

  public readonly petId: string;
  public readonly veterinarianId: string;
  public readonly serviceType: ServiceType;
  public readonly appointmentDate: Date;
  public readonly status: ServiceOrderStatus;

  private constructor(props: ServiceOrderProps) {
    super(ServiceOrder.ENTITY_NAME, props);

    this.petId = props.petId;
    this.veterinarianId = props.veterinarianId;
    this.serviceType = props.serviceType;
    this.appointmentDate = props.appointmentDate;
    this.status = props.status;
  }

  public static create(
    props: ServiceOrderProps,
  ): Result<ServiceOrder, EmptyPropertyError> {
    const { petId, veterinarianId } = props;

    if (petId.length === 0)
      return err(
        new EmptyPropertyError(
          "ID do " + Pet.ENTITY_NAME,
          ServiceOrder.ENTITY_NAME,
        ),
      );

    if (veterinarianId.length === 0)
      return err(
        new EmptyPropertyError(
          "ID do " + Veterinarian.ENTITY_NAME,
          ServiceOrder.ENTITY_NAME,
        ),
      );

    const serviceOrder = new ServiceOrder(props);
    return serviceOrder.validate() ?? ok(serviceOrder);
  }
}

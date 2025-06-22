import type { ServiceOrderStatus } from "@core/contracts/enums/service-orders";
import { err, ok, type Result } from "@core/result";
import { EmptyPropertyError } from "@server/domain/errors";
import { BaseEntity, type BaseEntityProps } from "../base";
import { Pet } from "../pet";
import { Veterinarian } from "../veterinarian";
import { ServiceType } from "./service-type";

interface ServiceOrderProps extends BaseEntityProps {
  petId: string;
  veterinarianId: string;
  serviceTypeId: string;
  appointmentDate: Date;
  status: ServiceOrderStatus;
}

export class ServiceOrder extends BaseEntity {
  public static readonly ENTITY_NAME = "ordem de serviço";

  public readonly petId: string;
  public readonly veterinarianId: string;
  public readonly serviceTypeId: string;
  public readonly appointmentDate: Date;
  public readonly status: ServiceOrderStatus;

  private constructor(props: ServiceOrderProps) {
    super(ServiceOrder.ENTITY_NAME, props);

    this.petId = props.petId;
    this.veterinarianId = props.veterinarianId;
    this.serviceTypeId = props.serviceTypeId;
    this.appointmentDate = props.appointmentDate;
    this.status = props.status;
  }

  public static create(
    props: ServiceOrderProps,
  ): Result<ServiceOrder, EmptyPropertyError> {
    const { serviceTypeId, petId, veterinarianId } = props;

    if (serviceTypeId.length === 0)
      return err(
        new EmptyPropertyError(
          "ID do " + ServiceType.ENTITY_NAME,
          ServiceOrder.ENTITY_NAME,
        ),
      );

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

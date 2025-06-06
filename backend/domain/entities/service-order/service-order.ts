import { err, ok, type Result } from "@core/result";
import { EmptyPropertyError } from "@server/domain/errors";
import { Pet } from "../pet";
import { Veterinarian } from "../veterinarian";
import type { ServiceType } from "./service-type";
import type { ServiceOrderStatus } from "./status.enum";

interface ServiceOrderProps {
  id?: string;
  petId: string;
  veterinarianId: string;
  serviceType: ServiceType;
  appointmentDate: Date;
  status: ServiceOrderStatus;
}

export class ServiceOrder {
  public static readonly ENTITY_NAME = "ordem de serviço";

  public readonly id?: string;
  public readonly petId: string;
  public readonly veterinarianId: string;
  public readonly serviceType: ServiceType;
  public readonly appointmentDate: Date;
  public readonly status: ServiceOrderStatus;

  private constructor(props: ServiceOrderProps) {
    this.id = props.id;
    this.petId = props.petId;
    this.veterinarianId = props.veterinarianId;
    this.serviceType = props.serviceType;
    this.appointmentDate = props.appointmentDate;
    this.status = props.status;
  }

  public static create(
    props: ServiceOrderProps,
  ): Result<ServiceOrder, EmptyPropertyError> {
    const { id, petId, veterinarianId } = props;

    if (id !== undefined && id.length === 0)
      return err(new EmptyPropertyError("ID", ServiceOrder.ENTITY_NAME));

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

    return ok(new ServiceOrder({ ...props }));
  }
}

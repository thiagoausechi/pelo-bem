import type { ServiceOrderStatus } from "@core/contracts/enums/service-orders";
import { err, ok, type Result } from "@core/result";
import { NotFoundError } from "@server/application/errors/not-found";
import type {
  PetGateway,
  ServiceOrderGateway,
  ServiceTypeGateway,
} from "@server/application/gateways";
import type { Entry } from "@server/application/gateways/base/gateway";
import { type VeterinarianGateway } from "@server/application/gateways/veterinarian";
import { Pet } from "@server/domain/entities/pet";
import {
  ServiceOrder,
  ServiceType,
} from "@server/domain/entities/service-order";
import { Veterinarian } from "@server/domain/entities/veterinarian";
import { CreationFailedError } from "../../errors/creation-failed";

interface Dependencies {
  serviceOrderGateway: ServiceOrderGateway;
  serviceTypeGateway: ServiceTypeGateway;
  petGateway: PetGateway;
  veterinarianGateway: VeterinarianGateway;
}

interface Request {
  petId: string;
  veterinarianId: string;
  serviceTypeId: string;
  appointmentDate: Date;
  status: ServiceOrderStatus;
}

export class CreateServiceOrderUseCase {
  private _request!: Request;

  constructor(private deps: Dependencies) {}

  async execute(
    request: Request,
  ): Promise<Result<Entry<ServiceOrder>, CreationFailedError>> {
    try {
      this._request = request;

      await this.checkServiceTypeExists();
      await this.checkPetExists();
      await this.checkVeterinarianExists();
      const createdServiceOrder = await this.performCreation();

      return ok(createdServiceOrder);
    } catch (error) {
      return err(
        new CreationFailedError(ServiceOrder.ENTITY_NAME, error as Error),
      );
    }
  }

  private async checkServiceTypeExists() {
    if (
      !(await this.deps.serviceTypeGateway.existsBy({
        id: this._request.serviceTypeId,
      }))
    )
      throw new NotFoundError(ServiceType.ENTITY_NAME);
  }

  private async checkPetExists() {
    if (!(await this.deps.petGateway.existsBy({ id: this._request.petId })))
      throw new NotFoundError(Pet.ENTITY_NAME);
  }

  private async checkVeterinarianExists() {
    if (
      !(await this.deps.veterinarianGateway.existsBy({
        id: this._request.veterinarianId,
      }))
    )
      throw new NotFoundError(Veterinarian.ENTITY_NAME);
  }

  private async performCreation() {
    const serviceOrder = ServiceOrder.create({
      ...this._request,
    });
    if (!serviceOrder.ok) throw serviceOrder.error;

    const createdServiceOrder = await this.deps.serviceOrderGateway.create(
      serviceOrder.value,
    );
    if (!createdServiceOrder.ok) throw createdServiceOrder.error;

    return createdServiceOrder.value;
  }
}

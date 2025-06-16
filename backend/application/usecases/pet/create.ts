import { err, ok, type Result } from "@core/result";
import { NotFoundError } from "@server/application/errors/not-found";
import type { OwnerGateway, PetGateway } from "@server/application/gateways";
import type { Entry } from "@server/application/gateways/base/gateway";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import { Owner } from "@server/domain/entities/owner";
import { type Gender, Pet, type Specie } from "@server/domain/entities/pet";
import { CreationFailedError } from "../errors/creation-failed";

interface Dependencies {
  ownerGateway: OwnerGateway;
  petGateway: PetGateway;
  fileStorage: FileStorageGateway;
}

interface Request {
  ownerId: string;
  name: string;
  specie: Specie;
  breed: string;
  birthday: Date;
  weightKg: number;
  heightCm: number;
  gender: Gender;
  picture?: File;
}

export class CreatePetUseCase {
  private _request!: Request;

  constructor(private deps: Dependencies) {}

  async execute(
    request: Request,
  ): Promise<Result<Entry<Pet>, CreationFailedError>> {
    try {
      this._request = request;

      await this.checkOwnerExists();
      const createdPet = await this.performCreation();

      void this.uploadPicture(createdPet.id);

      return ok(createdPet);
    } catch (error) {
      return err(new CreationFailedError(Pet.ENTITY_NAME, error as Error));
    }
  }

  private async checkOwnerExists() {
    if (!(await this.deps.ownerGateway.existsBy({ id: this._request.ownerId })))
      throw new NotFoundError(Owner.ENTITY_NAME);
  }

  private async performCreation() {
    const pet = Pet.create({ ...this._request });
    if (!pet.ok) throw pet.error;

    const createdPet = await this.deps.petGateway.create(pet.value);
    if (!createdPet.ok) throw createdPet.error;

    return createdPet.value;
  }

  private async uploadPicture(petId: string) {
    if (!this._request.picture) return;

    await this.deps.fileStorage.upload({
      file: this._request.picture,
      path: `pets/${petId}.png`,
    });
  }
}

import type { VeterinarianGateway } from "@server/application/gateways";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import type { Veterinarian } from "@server/domain/entities/veterinarian";

interface Dependencies {
  veterinarianGateway: VeterinarianGateway;
}

interface Request {
  filters?: FiltersFor<Veterinarian>;
  options?: ListOptions<keyof Veterinarian>;
}

interface Response {
  veterinarian: Entry<Veterinarian>;
}

export class ListVeterinarianUseCase {
  constructor(private deps: Dependencies) {}

  async execute(request: Request): Promise<Response[]> {
    const veterinarians = await this.deps.veterinarianGateway.listAll(
      request.filters,
      request.options,
    );

    return veterinarians.map((veterinarian) => ({
      veterinarian,
    }));
  }
}

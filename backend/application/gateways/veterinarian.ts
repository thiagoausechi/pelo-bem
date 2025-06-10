import type { Veterinarian } from "@server/domain/entities/veterinarian";
import type { BaseGateway } from "./base/gateway";

export type VeterinarianGateway = BaseGateway<Veterinarian>;

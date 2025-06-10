import type { Pet } from "@server/domain/entities/pet";
import type { BaseGateway } from "./base/gateway";

export type PetGateway = BaseGateway<Pet>;

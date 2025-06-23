import type { Rating, ServiceOrderStatus } from "../enums/service-orders";
import type { PetDTO } from "./pets";
import type { VeterinarianDTO } from "./veterinarians";

export interface ServiceTypeDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface SatisfactionDTO {
  rating: Rating;
  comment?: string;
}

export type ServiceOrderDTO = {
  id: string;
  pet: PetDTO;
  veterinarian: VeterinarianDTO;
  appointmentDate: Date;
  serviceType: ServiceTypeDTO;
  createdAt: Date;
  updatedAt: Date;
} & (
  | {
      status: "COMPLETED";
      satisfaction: SatisfactionDTO;
    }
  | {
      status: Omit<ServiceOrderStatus, "COMPLETED">;
      satisfaction?: never;
    }
);

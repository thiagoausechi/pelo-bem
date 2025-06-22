import type { ServiceOrderStatus } from "../enums/service-orders";
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

export interface ServiceOrderDTO {
  id: string;
  pet: PetDTO;
  veterinarian: VeterinarianDTO;
  appointmentDate: Date;
  serviceType: ServiceTypeDTO;
  status: ServiceOrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

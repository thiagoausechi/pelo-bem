import type { Veterinarian } from "@server/domain/entities/veterinarian";
import type { Gateway } from "./base/gateway";

export type SearchVeterinarianParams = {
  fullname: string;
  licenseNumber: string;
  email: string;
  phone: string;
};

export type VeterinarianGateway = Gateway<
  Veterinarian,
  SearchVeterinarianParams
>;

import { owners } from "./owner";
import { genderEnum, pets, petsRelations, specieEnum } from "./pet";
import {
  ratingEnum,
  satisfaction,
  satisfactionRelations,
} from "./satisfaction";
import {
  serviceOrders,
  serviceOrdersRelations,
  statusEnum,
} from "./service-order";
import { serviceType } from "./service-type";
import { veterinarians } from "./veterinarians";

export const schema = {
  // Owner related schemas
  owners,

  // Pet related schemas
  specieEnum,
  genderEnum,
  pets,
  petsRelations,

  // Veterinarian related schemas
  veterinarians,

  // Service Order related schemas
  serviceType,
  statusEnum,
  serviceOrders,
  serviceOrdersRelations,
  ratingEnum,
  satisfaction,
  satisfactionRelations,
};

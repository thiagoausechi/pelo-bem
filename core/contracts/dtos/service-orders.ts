import { z } from "zod";
import {
  ratings,
  serviceOrderStatus,
  type ServiceOrderStatus,
} from "../enums/service-orders";
import { petDtoSchema } from "./pets";
import { veterinarianDtoSchema } from "./veterinarians";

export const serviceTypeDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type ServiceTypeDTO = z.infer<typeof serviceTypeDtoSchema>;

export const satisfactionDtoSchema = z.object({
  rating: z.enum(ratings),
  comment: z.string().optional(),
});
export type SatisfactionDTO = z.infer<typeof satisfactionDtoSchema>;

export const serviceOrderDtoSchema = z.discriminatedUnion("status", [
  z.object({
    id: z.string(),
    status: z.literal("COMPLETED"),
    pet: petDtoSchema,
    veterinarian: veterinarianDtoSchema,
    serviceType: serviceTypeDtoSchema,
    appointmentDate: z.coerce.date(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    satisfaction: satisfactionDtoSchema,
  }),
  z.object({
    id: z.string(),
    status: z.enum(
      serviceOrderStatus.filter((s) => s !== "COMPLETED") as [
        Exclude<ServiceOrderStatus, "COMPLETED">,
        ...Exclude<ServiceOrderStatus, "COMPLETED">[],
      ],
    ),
    pet: petDtoSchema,
    veterinarian: veterinarianDtoSchema,
    serviceType: serviceTypeDtoSchema,
    appointmentDate: z.coerce.date(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    satisfaction: z.undefined(),
  }),
]);
export type ServiceOrderDTO = z.infer<typeof serviceOrderDtoSchema>;

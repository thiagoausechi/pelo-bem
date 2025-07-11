import { z } from "zod";
import { serviceOrderStatus } from "../enums/service-orders";

export const createServiceOrderForm = z.object({
  petId: z.string().min(1, "O pet é obrigatório."),
  veterinarianId: z.string().min(1, "O veterinário é obrigatório."),
  serviceTypeId: z.string().min(1, "O tipo de serviço é obrigatório."),
  appointmentDate: z.coerce.date(),
  status: z.enum(serviceOrderStatus),
});

export type CreateServiceOrderFormData = z.infer<typeof createServiceOrderForm>;

export const createServiceTypeForm = z.object({
  name: z.string().min(1, "O nome do serviço é obrigatório."),
  description: z.string().min(1, "A descrição do serviço é obrigatória."),
  price: z.coerce.number(),
});

export type CreateServiceTypeFormData = z.infer<typeof createServiceTypeForm>;

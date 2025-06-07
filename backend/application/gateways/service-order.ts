import type { Range } from "@core/range";
import type {
  ServiceOrder,
  ServiceOrderStatus,
  ServiceType,
} from "@server/domain/entities/service-order";
import type { Gateway } from "./base/gateway";

export type SearchServiceOrderParams = {
  petId: string;
  veterinarianId: string;
  serviceType: ServiceType;
  appointmentDate: Range<Date>;
  status: ServiceOrderStatus;
};

export type ServiceOrderGateway = Gateway<
  ServiceOrder,
  SearchServiceOrderParams
>;

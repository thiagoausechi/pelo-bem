import type {
  ServiceOrder,
  ServiceType,
} from "@server/domain/entities/service-order";
import type { BaseGateway } from "./base/gateway";

export type ServiceOrderGateway = BaseGateway<ServiceOrder>;

export type ServiceTypeGateway = BaseGateway<ServiceType>;

import type { ServiceOrder } from "@server/domain/entities/service-order";
import type { BaseGateway } from "./base/gateway";

export type ServiceOrderGateway = BaseGateway<ServiceOrder>;

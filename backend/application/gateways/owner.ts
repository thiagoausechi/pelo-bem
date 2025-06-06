import type { Owner } from "@server/domain/entities/owner";
import type { Gateway } from "./base/gateway";

export type SearchOwnerParams = {
  fullname: string;
  email: string;
  phone: string;
};

export type OwnerGateway = Gateway<Owner, SearchOwnerParams>;

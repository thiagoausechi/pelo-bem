import type { OwnerDTO } from "@core/contracts/dtos/owners";
import type { Entry } from "@server/application/gateways/base/gateway";
import type { Owner } from "@server/domain/entities/owner";
import { env } from "@server/infrastructure/configs/env";

export function mapOwnerToDTO(owner: Entry<Owner>): OwnerDTO {
  return {
    id: owner.id,
    profile: `${env.S3_PUBLIC_URL}/owners/${owner.id}.png`,
    name: owner.fullname,
    email: owner.email.get(),
    phone: owner.phone.get(),
    createdAt: owner.createdAt,
    updatedAt: owner.updatedAt,
  };
}

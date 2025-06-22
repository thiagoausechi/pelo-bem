import type { VeterinarianDTO } from "@core/contracts/dtos/veterinarians";
import type { Entry } from "@server/application/gateways/base/gateway";
import type { Veterinarian } from "@server/domain/entities/veterinarian";
import { env } from "@server/infrastructure/configs/env";

export function mapVeterinarianToDTO(
  veterinarian: Entry<Veterinarian>,
): VeterinarianDTO {
  return {
    id: veterinarian.id,
    name: veterinarian.fullname,
    email: veterinarian.email.get(),
    phone: veterinarian.phone.get(),
    license: veterinarian.license.get(),
    profile: `${env.S3_PUBLIC_URL}/veterinarians/${veterinarian.id}.png`,
    createdAt: veterinarian.createdAt,
    updatedAt: veterinarian.updatedAt,
  };
}

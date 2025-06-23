import { HttpStatus } from "@core/http";
import { Seeder } from "@server/infrastructure/persistence/drizzle/seed";
import type { NextRequest } from "next/server";

export async function POST(_: NextRequest) {
  try {
    await Seeder.seed();

    return HttpStatus.OK("Seed realizado com sucesso.");
  } catch (error) {
    console.error("❌ Erro durante o seeding:", error);
    return HttpStatus.INTERNAL_SERVER_ERROR(
      "Não foi possível realizar o seed.",
    );
  }
}

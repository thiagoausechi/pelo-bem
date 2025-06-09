import { env } from "@server/infrastructure/configs/env";
import { type Config } from "drizzle-kit";

const config: Config = {
  schema: "./backend/infrastructure/persistence/drizzle/models/schema.ts",
  dialect: "postgresql",
  out: "./database",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
};

export default config;

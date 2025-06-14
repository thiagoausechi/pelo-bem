import { env } from "./backend/infrastructure/configs/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: env.S3_PROTOCOL,
        hostname: env.S3_HOST,
        port: env.S3_PORT || "",
        pathname: "/**",
      },
    ],
  },
};

export default config;

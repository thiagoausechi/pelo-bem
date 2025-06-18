import { env } from "./backend/infrastructure/configs/env.js";

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    /**
     * Já rodamos o ESLint no CI, então podemos ignorar os erros durante a construção.
     * Isso nos da um ganho de performance durante a build, pois não precisamos verificar o código novamente.
     */
    ignoreDuringBuilds: true,
  },
  typescript: {
    /**
     * Já rodamos o checker do TypeScript no CI, então podemos ignorar os erros durante a construção.
     * Isso nos da um ganho de performance durante a build, pois não precisamos verificar o código novamente.
     */
    ignoreBuildErrors: true,
  },
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

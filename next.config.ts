import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

// Endereços deste computador na rede local. Sem liberá-los, o servidor de desenvolvimento bloqueia
// os recursos internos quando o site é aberto por IP (num celular no mesmo Wi-Fi) e o React não inicia.
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((net) => net?.family === "IPv4" && !net.internal)
  .map((net) => net!.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: lanAddresses,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

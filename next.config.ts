import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // <--- Añade esto
  images: {
    unoptimized: true, // Requerido para exportación estática
  },
};

export default nextConfig;

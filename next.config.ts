import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // <--- Añade esto
  images: {
    unoptimized: true, // Requerido para exportación estática
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com"}
    ]
  },
};

export default nextConfig;

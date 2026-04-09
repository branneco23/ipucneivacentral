import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Permite todas las imágenes de tu cuenta de Cloudinary
      },
    ],
  },
};

export default nextConfig;

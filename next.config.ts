/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // Permite generar la carpeta 'out'
  images: {
    unoptimized: true,   // Desactiva la optimización que causa el error
  },
};

export default nextConfig;
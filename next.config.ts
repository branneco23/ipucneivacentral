/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',    // <-- Al quitar las barras, ya generará la carpeta 'out'
  images: {
    unoptimized: true, // Esto está perfecto para Cloudflare Pages
  },
};

export default nextConfig;
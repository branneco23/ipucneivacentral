import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Se eliminó el prefijo /src si tus componentes están en la raíz
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Mantiene soporte si están dentro de /src
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Añadido soporte para Next.js App Router en la raíz
  ],
  theme: {
    extend: {
      keyframes: {
        equalizer: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        equalizer: "equalizer 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    typography, // Inyección limpia del plugin mediante ES Modules
  ],
};

export default config;
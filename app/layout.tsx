import type { Metadata } from "next";
import { Audiowide, Golos_Text } from "next/font/google"; // Cal_Sans no es una Google Font estándar
import "./globals.css";

// Importa los CSS de icons aquí
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";

// Componentes
import Nabvar from "./Components/Navbar/Nabvar";
import VideoPopup from "./Components/Popup/VideoPopup";
import Footer from "./Components/Footer/Footer";

// Configuración de fuentes
const audiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});

const golostext = Golos_Text({
  weight: ["400", "500", "600", "700"], // Agregamos más pesos para títulos y negritas
  variable: "--font-golostext",
  subsets: ["latin"],
});

// Nota: Si usas Cal_Sans, asegúrate de tenerla como Local Font. 
// Por ahora la comentamos para evitar errores de importación.

export const metadata: Metadata = {
  title: "IPUC | Central Neiva",
  description: "Iglesia Pentecostal Unida de Colombia - Sede Principal Neiva, Huila",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"> {/* Corregido a español para SEO y accesibilidad */}
      <body
        className={`${audiowide.variable} ${golostext.variable} antialiased`}
      >
        <Nabvar />
        
        {/* El Pop-up se renderiza aquí para estar sobre el contenido */}
        <VideoPopup /> 
        
        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
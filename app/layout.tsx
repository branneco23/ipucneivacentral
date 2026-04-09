import type { Metadata } from "next";
import { Audiowide, Golos_Text } from "next/font/google";
// @ts-ignore
import "./globals.css";

// Icons
// @ts-ignore
import "bootstrap-icons/font/bootstrap-icons.css";
// @ts-ignore
import "remixicon/fonts/remixicon.css";

// Componentes
import Nabvar from "./Components/Navbar/Nabvar";
import Footer from "./Components/Footer/Footer";

const audiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});

const golostext = Golos_Text({
  weight: ["400", "500", "600", "700"],
  variable: "--font-golostext",
  subsets: ["latin"],
});

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
    <html lang="es" suppressHydrationWarning>
      <body className={`${audiowide.variable} ${golostext.variable} antialiased`}>
        <Nabvar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Audiowide, Cal_Sans, Golos_Text } from "next/font/google";
import "./globals.css";

//Importa los CSS de icons aquí
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css"
import Nabvar from "./Components/Navbar/Nabvar";

const audiowide = Audiowide ({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
})

const golostext = Golos_Text ({
  weight: "400",
  variable: "--font-golostext",
  subsets: ["latin"],
})

const calsans = Cal_Sans ({
  weight: "400",
  variable: "--font-calsans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ipuc || Central Neiva",
  description: "Iglesia Pentecostal Unida de Colombia - Neiva, Huila",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${audiowide.variable} ${golostext.variable} ${calsans.variable}`}
      >
        <Nabvar/>
        {children}
      </body>
    </html>
  );
}

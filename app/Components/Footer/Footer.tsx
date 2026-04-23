"use client";

import Link from "next/link";
import { FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="px-[8%] lg:px-[12%] py-20 pb-0 footer relative bg-gradient-to-br from-blue-900 via-slate-900 to-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-15">

          {/* LOGO Y DIRECCIÓN */}
          <div className="footer-content">
            <Link
              href="/"
              className="text-3xl lg:text-5xl font-bold text-white"
            >
              IPUC <span className="text-blue-400">Central Neiva</span>
            </Link>

            <h2 className="text-white/80 text-lg my-5">
              Iglesia Pentecostal Unida de Colombia, Neiva.
            </h2>

            <p className="text-white/70">
              Sede central, barrio Altico; Calle 8 # 9-24
            </p>
          </div>

          {/* MENÚ PRINCIPAL */}
          <div className="footer-content py-3">
            <ul className="flex flex-col gap-2">
              <Link href="/" className="text-white hover:text-blue-400 transition text-lg">
                Inicio
              </Link>
              <Link href="/Pages/Services" className="text-white hover:text-blue-400 transition text-lg">
                Servicios
              </Link>
              <Link href="/Comites" className="text-white hover:text-blue-400 transition text-lg">
                Directivas
              </Link>
              <Link href="/Blogs" className="text-white hover:text-blue-400 transition text-lg">
                Doctrina IPUC
              </Link>
              <Link href="/transmision" className="text-white hover:text-blue-400 transition text-lg">
                Transmisiones
              </Link>
              <Link href="/Pages/Peticiones" className="text-white hover:text-blue-400 transition text-lg">
                Peticiones
              </Link>
            </ul>
          </div>

          {/* COMITÉS */}
          <div className="footer-content py-3">
            <ul className="flex flex-col gap-2">
              <Link href="/Comites/directiva-local" className="text-white hover:text-blue-400 transition">
                Directiva Local
              </Link>
              <Link href="/Comites/jovenes" className="text-white hover:text-blue-400 transition">
                Directiva de Jóvenes
              </Link>
              <Link href="/Comites/damas-dorcas" className="text-white hover:text-blue-400 transition">
                Directiva de Damas Dorcas
              </Link>
              <Link href="/Comites/escuela-dominical" className="text-white hover:text-blue-400 transition">
                Escuela Dominical
              </Link>
              <Link href="/Comites/misiones" className="text-white hover:text-blue-400 transition">
                Misiones y Evangelismo
              </Link>
              <Link href="/Comites/alabanza" className="text-white hover:text-blue-400 transition">
                Alabanza
              </Link>
              <Link href="/Comites/comunicaciones" className="text-white hover:text-blue-400 transition">
                Comunicaciones
              </Link>
              <Link href="/Comites/obra-social" className="text-white hover:text-blue-400 transition">
                Obra Social
              </Link>
              <Link href="/Comites/ujieres" className="text-white hover:text-blue-400 transition">
                Ujieres
              </Link>
              <Link href="/Comites/intercesion" className="text-white hover:text-blue-400 transition">
                Intercesión
              </Link>
              <Link href="/Comites/protemplo" className="text-white hover:text-blue-400 transition">
                Protemplo
              </Link>
              <Link href="/Comites/familia" className="text-white hover:text-blue-400 transition">
                Familia
              </Link>
            </ul>
          </div>

          {/* CONTACTO Y REDES */}
          <div className="footer-content py-3 flex flex-col">
            <h2 className="text-2xl text-blue-400 font-bold mb-3">
              +(57) 487-6492
            </h2>

            <h4 className="text-white/80 text-lg mb-4">
              comunicaciones@ipucneivacentral.org
            </h4>

            <div className="flex flex-col gap-4">

              <a
                href="https://www.facebook.com/ipucSedeCentralNeiva/?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-blue-400 transition font-semibold"
              >
                <FaFacebook size={20} />
                Facebook
              </a>

              <a
                href="https://www.youtube.com/@ipucsedecentralneiva739"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-blue-400 transition font-semibold"
              >
                <FaYoutube size={20} />
                YouTube
              </a>

            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="flex justify-center py-8 border-t border-white/20 mt-12">
          <p className="text-white/60 text-sm text-center">
            © Copyright 2026. Directiva de Comunicaciones, Central Neiva
          </p>
        </div>
      </div>
    </>
  );
}
"use client";

import Link from "next/link";
import { FaFacebook, FaYoutube, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden border-t border-white/5">
      {/* Destello de luz ambiental de fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">

          {/* COLUMNA 1: LOGO Y DIRECCIÓN (Ancho 4/12) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="text-3xl font-black tracking-tight block hover:opacity-90 transition-opacity"
              >
                IPUC <span className="text-blue-400 font-extrabold relative inline-block">Central Neiva</span>
              </Link>

              <p className="text-slate-300 text-base mt-4 leading-relaxed font-medium">
                Iglesia Pentecostal Unida de Colombia, Neiva.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <i className="ri-map-pin-2-line text-blue-400 text-xl mt-0.5"></i>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Ubicación principal</p>
                  <p className="text-slate-200 text-sm font-semibold mt-0.5">Sede central, barrio Altico; Calle 8 # 9-24</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: MENÚ PRINCIPAL (Ancho 2/12) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase font-black tracking-[0.2em] text-blue-400 mb-6">Navegación</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Inicio", href: "/" },
                { label: "Servicios", href: "/Pages/Services" },
                { label: "Directivas", href: "/Comites" },
                { label: "Doctrina IPUC", href: "/Blogs" },
                { label: "Transmisiones", href: "/transmision" },
                { label: "Peticiones", href: "/Pages/Peticiones" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="inline-block text-slate-300 hover:text-white hover:translate-x-1 font-medium transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: COMITÉS EN CUADRÍCULA OPTIMIZADA (Ancho 3/12) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase font-black tracking-[0.2em] text-blue-400 mb-6">Comités y Ministerios</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                { label: "Directiva Local", href: "/Comites/directiva-local" },
                { label: "Jóvenes", href: "/Comites/jovenes" },
                { label: "Damas Dorcas", href: "/Comites/damas-dorcas" },
                { label: "Escuela Dominical", href: "/Comites/escuela-dominical" },
                { label: "Misiones", href: "/Comites/misiones" },
                { label: "Alabanza", href: "/Comites/alabanza" },
                { label: "Comunicaciones", href: "/Comites/comunicaciones" },
                { label: "Obra Social", href: "/Comites/obra-social" },
                { label: "Ujieres", href: "/Comites/ujieres" },
                { label: "Brigadistas", href: "/Comites/brigadistas" },
                { label: "Intercesión", href: "/Comites/intercesion" },
                { label: "Protemplo", href: "/Comites/protemplo" },
                { label: "Familia", href: "/Comites/familia" },
              ].map((comite) => (
                <li key={comite.label}>
                  <Link 
                    href={comite.href} 
                    className="inline-block text-slate-400 hover:text-blue-300 hover:translate-x-0.5 transition-all duration-300 text-xs font-semibold truncate max-w-[130px]"
                    title={comite.label}
                  >
                    {comite.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO Y REDES SOCIALES (Ancho 3/12) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h3 className="text-xs uppercase font-black tracking-[0.2em] text-blue-400 mb-5">Contacto Oficial</h3>
              <a 
                href="tel:+574876492" 
                className="text-2xl font-black text-white hover:text-blue-400 transition-colors block tracking-tight"
              >
                +(57) 487-6492
              </a>
              <a 
                href="mailto:comunicaciones@ipucneivacentral.org" 
                className="text-slate-300 text-sm hover:text-blue-300 transition-colors block mt-2 break-all font-medium"
              >
                comunicaciones@ipucneivacentral.org
              </a>
            </div>

            <div className="flex flex-col gap-2.5 mt-8">
              <a
                href="https://www.facebook.com/ipucSedeCentralNeiva/?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-600/10 text-slate-300 hover:text-white transition-all duration-300 group font-bold text-sm"
              >
                <div className="flex items-center gap-3">
                  <FaFacebook size={18} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <span>Facebook Sede Central</span>
                </div>
                <i className="ri-arrow-right-up-line opacity-0 group-hover:opacity-100 transition-opacity text-blue-400"></i>
              </a>

              <a
                href="https://www.youtube.com/@ipucsedecentralneiva739"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/30 hover:bg-red-600/10 text-slate-300 hover:text-white transition-all duration-300 group font-bold text-sm"
              >
                <div className="flex items-center gap-3">
                  <FaYoutube size={18} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                  <span>YouTube Oficial</span>
                </div>
                <i className="ri-arrow-right-up-line opacity-0 group-hover:opacity-100 transition-opacity text-red-500"></i>
              </a>
            </div>
          </div>

        </div>

        {/* LÍNEA DIVISORIA Y COPYRIGHT */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-semibold text-center sm:text-left">
            © Copyright 2026. Directiva de Comunicaciones, Central Neiva
          </p>
          
          {/* Botón interactivo para regresar arriba */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white text-xs font-bold transition-all duration-300 group"
            aria-label="Volver al inicio de la página"
          >
            <span>Volver arriba</span>
            <FaArrowUp size={10} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
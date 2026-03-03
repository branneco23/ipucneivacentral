"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import CommitteeMembers from "@/app/Components/CommiteeMember/CommitteeMembers";
import { COMITES_MEMBERS } from '@/app/JsonData/ComitesData';

/**
 * Función auxiliar para formatear los IDs de los comités.
 * Se movió fuera del componente para evitar que se redeclare en cada render.
 */
const formatTitle = (slug: string): string => {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function ComitesPage() {
  // 1. Memorización de las llaves del objeto para optimizar el rendimiento
  const nombresComites = useMemo(() => Object.keys(COMITES_MEMBERS), []);

  return (
    <main className="min-h-screen bg-white selection:bg-blue-100">
      {/* BANNER DE ENCABEZADO */}
      <header className='section-bg text-white flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden'>
        {/* Overlay optimizado con gradiente para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 z-0" />
        
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <h1 className='text-6xl md:text-8xl GolosText font-black uppercase tracking-tighter drop-shadow-2xl'>
            Comités
          </h1>
          
          <nav aria-label="Breadcrumb" className='flex items-center text-sm md:text-base mt-8 bg-white/10 hover:bg-white/15 transition-all px-6 py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg'>
            <Link href="/" className="hover:text-blue-300 transition-colors font-medium">Inicio</Link>
            <i className="ri-arrow-right-s-line mx-2 opacity-40 text-xl" aria-hidden="true" />
            <span className="font-bold text-white uppercase tracking-wider">Directivas 2026</span>
          </nav>
        </div>
      </header>

      {/* SECCIONES POR COMITÉ */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-32">
          {nombresComites.map((idComite) => {
            const integrantes = COMITES_MEMBERS[idComite];
            
            // Validación defensiva
            if (!integrantes || integrantes.length === 0) return null;

            return (
              <article 
                key={idComite} 
                id={idComite} // Permite navegar mediante anchor links (ej. comites#comite-misiones)
                className="scroll-mt-32 transition-all duration-500"
              >
                <CommitteeMembers 
                  integrantes={integrantes} 
                  tituloComite={formatTitle(idComite)} 
                />
              </article>
            );
          })}
        </div>
      </section>

      {/* FOOTER DE SECCIÓN / CTA */}
      <footer className="py-20 bg-gray-50 text-center">
        <p className="text-gray-400 font-medium italic">
          "Trabajando unánimes por la obra del Señor"
        </p>
      </footer>
    </main>
  );
}
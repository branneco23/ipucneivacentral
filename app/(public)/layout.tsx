// src/app/(public)/layout.tsx
import React from 'react';
import Link from 'next/link';
// Importa aquí tu componente del botón flotante de la Radio que optimizamos
import BotonFlotanteRadio from '@/app/Components/public/BotonFlotanteRadio';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col justify-between relative selection:bg-[#00338d]/30">
      
      {/* NAVBAR PÚBLICA */}
      <header className="w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white">Sede Central</span>
            <span className="text-[10px] text-white/40 tracking-widest uppercase font-semibold">IPUC</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <Link href="/en-vivo" className="hover:text-white transition-colors flex items-center gap-1.5 text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> En Vivo
            </Link>
            <Link href="/eventos" className="hover:text-white transition-colors">Calendario</Link>
          </nav>
        </div>
      </header>

      {/* CONTENIDO DINÁMICO DE LAS PÁGINAS PÚBLICAS */}
      <main className="flex-grow">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/5 py-8 bg-[#090d16]/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; 2026 Seven Creative Development. Todos los derechos reservados.</p>
          <Link href="/admin" className="hover:text-white transition-colors font-semibold">
            Acceso Administrativo
          </Link>
        </div>
      </footer>

      {/* COMPONENTE GLOBAL: BOTÓN DE LA RADIO FLOTANTE */}
      <div className="fixed bottom-6 right-6 z-50">
        <BotonFlotanteRadio />
      </div>

    </div>
  );
}
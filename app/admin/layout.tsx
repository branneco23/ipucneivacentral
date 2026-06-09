// src/app/admin/layout.tsx
import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#020617] text-white font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#090d16] border-r border-white/5 flex flex-col justify-between p-6">
        <div className="space-y-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#00338d]">Seven Creative</h1>
            <p className="text-xs text-white/40 font-medium">Panel de Control v1.0</p>
          </div>

          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-white/5 text-white transition-all">
              <i className="ri-dashboard-line text-lg text-[#00338d]"></i> Dashboard
            </Link>
            <Link href="/admin/anuncios" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all">
              <i className="ri-notification-badge-line text-lg"></i> Anuncios Slider
            </Link>
            <Link href="/admin/cultos" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all">
              <i className="ri-calendar-event-line text-lg"></i> Cultos de la Semana
            </Link>
            <Link href="/admin/transmisiones" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all">
              <i className="ri-live-line text-lg"></i> Transmisiones / Live
            </Link>
          </nav>
        </div>

        {/* Perfil / Cerrar Sesión */}
        <div className="border-t border-white/5 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#00338d] flex items-center justify-center font-bold text-sm">A</div>
            <div>
              <p className="text-xs font-bold leading-none">Administrador</p>
              <p className="text-[10px] text-white/40 mt-0.5">Sede Central</p>
            </div>
          </div>
          <button className="text-white/40 hover:text-red-400 transition-colors p-1" aria-label="Cerrar sesión">
            <i className="ri-logout-box-r-line text-lg"></i>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
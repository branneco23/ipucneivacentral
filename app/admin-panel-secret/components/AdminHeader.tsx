"use client";

import React from "react";

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Panel de Administración
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Gestiona el contenido de la plataforma de forma centralizada.
        </p>
      </div>
      <button
        onClick={onLogout}
        className="px-4 py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl transition-all text-sm font-medium flex items-center gap-2 cursor-pointer"
      >
        <span>Cerrar Sesión</span>
      </button>
    </header>
  );
}
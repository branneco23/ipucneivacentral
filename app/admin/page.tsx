// src/app/admin/page.tsx
"use client";

import React, { useState } from 'react';

export default function AdminDashboard() {
  // Estados simulados (en producción vendrían de tu BD o API)
  const [isLive, setIsLive] = useState(false);

  return (
    <div className="space-y-10">
      
      {/* BIENVENIDA */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight CalSans">
          ¡Bienvenido de nuevo, <span className="text-[#00338d]">Admin</span>!
        </h2>
        <p className="text-white/40 mt-1.5 text-sm md:text-base">
          Aquí tienes el resumen operativo de las plataformas digitales para hoy.
        </p>
      </div>

      {/* TARJETAS DE MÉTRICAS RÁPIDAS (STATS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat 1: Estado del Streaming */}
        <div className="bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Transmisión</span>
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-sans">{isLive ? "En Vivo" : "Apagado"}</h3>
            <p className="text-[11px] text-white/30 mt-1">Detección automática de YouTube</p>
          </div>
        </div>

        {/* Stat 2: Anuncios Activos */}
        <div className="bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Slider Anuncios</span>
            <i className="ri-notification-badge-line text-white/30 text-lg"></i>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-sans">8 Activos</h3>
            <p className="text-[11px] text-white/30 mt-1">Visibles en el carrusel principal</p>
          </div>
        </div>

        {/* Stat 3: Cultos de la Semana */}
        <div className="bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Cronograma</span>
            <i className="ri-calendar-todo-line text-white/30 text-lg"></i>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-sans">4 Eventos</h3>
            <p className="text-[11px] text-white/30 mt-1">Programados de Domingo a Sábado</p>
          </div>
        </div>

        {/* Stat 4: Estado de la Radio */}
        <div className="bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Streaming Radio</span>
            <i className="ri-radio-2-line text-white/30 text-lg"></i>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-emerald-400 font-sans">En Línea</h3>
            <p className="text-[11px] text-white/30 mt-1">Servidor VPS operando normal</p>
          </div>
        </div>

      </div>

      {/* SECCIÓN INTERMEDIA: ACCIONES RÁPIDAS Y MONITOREO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: Switche de Control Rápido (5 Columnas) */}
        <div className="lg:col-span-5 bg-[#090d16] border border-white/5 rounded-[2rem] p-6 md:p-8 space-y-6">
          <div>
            <h4 className="text-lg font-bold font-sans">Controles Críticos</h4>
            <p className="text-xs text-white/40 mt-1">Acciones de anulación manual inmediata</p>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Forzar "Modo En Vivo"</p>
              <p className="text-[11px] text-white/40 mt-0.5">Ignora la API e inicia la interfaz live</p>
            </div>
            <button 
              onClick={() => setIsLive(!isLive)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${isLive ? 'bg-[#00338d]' : 'bg-white/10'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform shadow-md ${isLive ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="text-[11px] text-white/30 bg-white/[0.02] p-4 rounded-xl border border-white/[0.02] leading-relaxed">
            <i className="ri-information-line text-[#00338d] mr-1.5 text-xs"></i> 
            El botón de forzado es útil si los proveedores de datos móviles en Colombia presentan latencia leyendo los servidores de YouTube.
          </div>
        </div>

        {/* COLUMNA DERECHA: Últimos Cultos Registrados (7 Columnas) */}
        <div className="lg:col-span-7 bg-[#090d16] border border-white/5 rounded-[2rem] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold font-sans">Próximos Cultos en Lista</h4>
              <p className="text-xs text-white/40 mt-1">Validación de asignación automática de imágenes</p>
            </div>
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-white/60">
              Semana Actual
            </span>
          </div>

          {/* LISTA SIMULADA */}
          <div className="space-y-3">
            {[
              { id: 1, titulo: "Culto de Escuela Dominical", info: "Domingo - Imagen Infantil Asignada" },
              { id: 2, titulo: "Culto de Alabanza y Adoración", info: "Martes - Imagen Alabanza Asignada" },
              { id: 3, titulo: "Culto de Damas (Dorcas)", info: "Jueves - Imagen Ministerio de Damas" },
            ].map((culto) => (
              <div key={culto.id} className="flex items-center justify-between p-3.5 bg-white/[0.02] hover:bg-white/5 rounded-xl border border-white/5 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00338d]" />
                  <div>
                    <p className="text-sm font-semibold group-hover:text-white transition-colors">{culto.titulo}</p>
                    <p className="text-[11px] text-white/40 mt-0.5">{culto.info}</p>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-white/30 group-hover:text-white transition-colors"></i>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
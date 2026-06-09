// src/app/admin/transmisiones/page.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminTransmisiones() {
  // Estados para controlar el formulario y los toggles
  const [channelId, setChannelId] = useState('UCr5SX280UbD1R2fNDsFIUdg');
  const [streamPlatform, setStreamPlatform] = useState('youtube');
  const [isLiveManual, setIsLiveManual] = useState(false);
  const [isOptimizedFallback, setIsOptimizedFallback] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulación de guardado en API / Base de datos
    setTimeout(() => {
      setIsSaving(false);
      alert('Configuración de transmisión actualizada correctamente.');
    }, 1000);
  };

  return (
    <div className="space-y-10">
      
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight CalSans">
          Control de <span className="text-[#00338d]">Transmisiones</span>
        </h2>
        <p className="text-white/40 mt-1.5 text-sm md:text-base">
          Gestiona los identificadores de streaming, plataformas activas y optimizaciones de ancho de banda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO DE CONFIGURACIÓN (7 Columnas) */}
        <form onSubmit={handleSaveConfig} className="lg:col-span-7 bg-[#090d16] border border-white/5 rounded-[2rem] p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold font-sans">Origen del Streaming</h3>
            <p className="text-xs text-white/40 mt-1">Define de dónde la web tomará la señal en vivo.</p>
          </div>

          {/* Selector de Plataforma */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Plataforma Principal</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStreamPlatform('youtube')}
                className={`p-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  streamPlatform === 'youtube' 
                    ? 'bg-red-500/10 border-red-500 text-red-500' 
                    : 'bg-white/[0.02] border-white/5 text-white/60 hover:bg-white/5'
                }`}
              >
                <i className="ri-youtube-fill text-lg"></i> YouTube Live
              </button>
              <button
                type="button"
                onClick={() => setStreamPlatform('facebook')}
                className={`p-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  streamPlatform === 'facebook' 
                    ? 'bg-blue-500/10 border-blue-500 text-blue-500' 
                    : 'bg-white/[0.02] border-white/5 text-white/60 hover:bg-white/5'
                }`}
              >
                <i className="ri-facebook-box-fill text-lg"></i> Facebook Live
              </button>
            </div>
          </div>

          {/* Input del ID del Canal */}
          <div className="space-y-2">
            <label htmlFor="channelId" className="text-xs font-bold text-white/60 uppercase tracking-wider">
              ID del Canal o Transmisión
            </label>
            <div className="relative">
              <input
                id="channelId"
                type="text"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00338d] font-mono transition-all"
                placeholder="Ej: UCr5SX280UbD1R2fNDsFIUdg"
                required
              />
            </div>
            <p className="text-[11px] text-white/30">
              Este ID se usará en el backend para realizar el scraping automatizado del estado "Live".
            </p>
          </div>

          {/* Botón de Guardar */}
          <div className="pt-4 border-t border-white/5">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-[#00338d] hover:bg-[#002260] disabled:bg-[#00338d]/50 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-[#00338d]/10 uppercase tracking-wide"
            >
              {isSaving ? 'Guardando cambios...' : 'Actualizar Señal En Vivo'}
            </button>
          </div>
        </form>

        {/* COLUMNA DERECHA: MONITOREO Y ACCIONES DE RED (5 Columnas) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Tarjeta 1: Interruptores de Contingencia */}
          <div className="bg-[#090d16] border border-white/5 rounded-[2rem] p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold font-sans">Anulación Manual</h3>
              <p className="text-xs text-white/40 mt-1">Fuerza comportamientos sin esperar a las APIs.</p>
            </div>

            {/* Switch 1: Forzar Live */}
            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div>
                <p className="text-sm font-semibold">Forzar Estado "En Vivo"</p>
                <p className="text-[11px] text-white/40 mt-0.5">Muestra el reproductor inmediatamente.</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsLiveManual(!isLiveManual)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${isLiveManual ? 'bg-red-500' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform shadow-md ${isLiveManual ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Switch 2: Optimización de Datos */}
            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div>
                <p className="text-sm font-semibold">Bajo Ancho de Banda</p>
                <p className="text-[11px] text-white/40 mt-0.5">Inyecta un placeholder liviano para redes móviles.</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsOptimizedFallback(!isOptimizedFallback)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${isOptimizedFallback ? 'bg-[#00338d]' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform shadow-md ${isOptimizedFallback ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Tarjeta 2: Panel de Datos e Impacto Técnico */}
          <div className="bg-[#090d16] border border-white/5 rounded-[2rem] p-6 md:p-8 space-y-4">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider">Métricas de Consumo Estimado</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Calidad Estándar (480p)</span>
                <span className="font-mono text-emerald-400">~500 MB / hora</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[35%]" />
              </div>

              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-white/60">Alta Definición (720p HD)</span>
                <span className="font-mono text-yellow-400">~1.2 GB / hora</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full w-[70%]" />
              </div>
            </div>

            <p className="text-[10px] text-white/30 pt-2 border-t border-white/5 leading-relaxed">
              * Datos calculados en base al comportamiento estándar de planes móviles prepago/postpago en Colombia. La optimización reduce las peticiones innecesarias de reconexión.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
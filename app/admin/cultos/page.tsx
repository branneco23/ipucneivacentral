// src/app/admin/cultos/page.tsx
"use client";

import React, { useState } from 'react';

interface CultoEvento {
  id: string;
  titulo: string;
  fecha: string;
  categoria: string;
}

interface ReglaImagen {
  id: number;
  palabraClave: string;
  urlCloudinary: string;
}

export default function AdminCultos() {
  // Estado simulado de los cultos filtrados para la semana actual
  const [cultos, setCultos] = useState<CultoEvento[]>([
    { id: "1", titulo: "Culto de Escuela Dominical", fecha: "2026-06-07", categoria: "Educación" },
    { id: "2", titulo: "Culto de Alabanza y Adoración", fecha: "2026-06-09", categoria: "General" },
    { id: "3", titulo: "Culto de Damas (Dorcas)", fecha: "2026-06-11", categoria: "Ministerios" },
    { id: "4", titulo: "Culto de Jóvenes (Conquistadores)", fecha: "2026-06-13", categoria: "Jóvenes" },
  ]);

  // Estado de las reglas de asignación automática de imágenes
  const [reglas, setReglas] = useState<ReglaImagen[]>([
    { id: 1, palabraClave: "dominical", urlCloudinary: ".../v1773782341/ChatGPT_Image_17_mar_2026_15_59_31_upcbzh.png" },
    { id: 2, palabraClave: "familia", urlCloudinary: ".../v1773782341/ChatGPT_Image_17_mar_2026_16_18_06_erwfkk.png" },
    { id: 3, palabraClave: "misiones", urlCloudinary: ".../v1773782342/ChatGPT_Image_17_mar_2026_16_01_31_me1n1h.png" },
    { id: 4, palabraClave: "damas", urlCloudinary: ".../v1773782342/ChatGPT_Image_17_mar_2026_15_55_52_tntorq.png" },
  ]);

  const [nuevaPalabra, setNuevaPalabra] = useState('');
  const [nuevaUrl, setNuevaUrl] = useState('');

  const handleAddRegla = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaPalabra || !nuevaUrl) return;

    const nueva: ReglaImagen = {
      id: Date.now(),
      palabraClave: nuevaPalabra.toLowerCase().trim(),
      urlCloudinary: nuevaUrl.trim()
    };

    setReglas([...reglas, nueva]);
    setNuevaPalabra('');
    setNuevaUrl('');
  };

  return (
    <div className="space-y-10">
      
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight CalSans">
          Cronograma de <span className="text-[#00338d]">Cultos &amp; Banners</span>
        </h2>
        <p className="text-white/40 mt-1.5 text-sm md:text-base">
          Monitorea los cultos de la semana y gestiona el algoritmo inteligente de asignación de imágenes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: CULTOS DE LA SEMANA (5 Columnas) */}
        <div className="lg:col-span-5 bg-[#090d16] border border-white/5 rounded-[2rem] p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-sans">Semana en Curso</h3>
              <p className="text-xs text-white/40 mt-1">Ordenados automáticamente de Domingo a Sábado.</p>
            </div>
            <i className="ri-calendar-check-line text-white/30 text-xl"></i>
          </div>

          <div className="space-y-3">
            {cultos.map((culto) => {
              // Formateador rápido de fecha local para la UI del administrador
              const fechaFormateada = new Date(culto.fecha + "T00:00:00").toLocaleDateString('es-ES', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
              });

              return (
                <div key={culto.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center hover:bg-white/5 transition-all">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">{culto.titulo}</p>
                    <span className="inline-block text-[10px] bg-[#00338d]/20 text-[#00338d] border border-[#00338d]/30 font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                      {culto.categoria}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-xs font-bold text-white/80 capitalize">{fechaFormateada}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">Asignado</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl text-xs transition-all tracking-wide uppercase">
            Sincronizar con EventsData.ts
          </button>
        </div>

        {/* COLUMNA DERECHA: ASIGNACIÓN DE IMÁGENES AUTOMÁTICAS (7 Columnas) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Formulario para añadir nueva regla */}
          <form onSubmit={handleAddRegla} className="bg-[#090d16] border border-white/5 rounded-[2rem] p-6 md:p-8 space-y-4">
            <div>
              <h3 className="text-lg font-bold font-sans">Nueva Regla de Banner</h3>
              <p className="text-xs text-white/40 mt-1">Vincula palabras clave del título del culto con un diseño gráfico.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <input
                  type="text"
                  placeholder="Ej: jóvenes"
                  value={nuevaPalabra}
                  onChange={(e) => setNuevaPalabra(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00338d] transition-all"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="url"
                  placeholder="URL de Imagen (Cloudinary / CDN)"
                  value={nuevaUrl}
                  onChange={(e) => setNuevaUrl(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00338d] transition-all font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00338d] hover:bg-[#002260] text-white font-bold py-3 rounded-xl text-xs transition-all uppercase tracking-wide"
            >
              Agregar Condición de Mapeo
            </button>
          </form>

          {/* Tabla / Lista de Reglas Existentes */}
          <div className="bg-[#090d16] border border-white/5 rounded-[2rem] p-6 md:p-8 space-y-4">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider">Reglas Activas en el Algoritmo</h4>
            
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden space-y-2">
                  {reglas.map((regla) => (
                    <div key={regla.id} className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.03] rounded-xl text-xs">
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-yellow-400 font-semibold">
                          {regla.palabraClave}
                        </span>
                        <p className="text-white/40 font-mono truncate max-w-[200px] sm:max-w-[320px]">
                          {regla.urlCloudinary}
                        </p>
                      </div>
                      <button 
                        onClick={() => setReglas(reglas.filter(r => r.id !== regla.id))}
                        className="text-white/30 hover:text-red-400 transition-colors pl-2"
                        title="Eliminar regla"
                      >
                        <i className="ri-delete-bin-6-line text-sm"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
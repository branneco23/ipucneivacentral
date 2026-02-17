"use client";
import React from 'react';
import { DEVOCIONALES_SEMANALES } from "@/app/JsonData/DevocionalesData";

export default function DevocionalesBanner() {
  // 1. Obtenemos el día actual (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
  const hoyNum = new Date().getDay();

  // 2. Intentamos buscar el devocional de hoy. 
  // Si es sábado (6) o domingo (0), no encontrará nada en tu lista actual.
  const devocionalHoy = DEVOCIONALES_SEMANALES.find(d => d.diaSemana === hoyNum);

  // 3. Lógica de CORRECCIÓN: Si no hay devocional hoy, usamos el primero de la lista (Lunes)
  // Esto evita que el componente devuelva null y desaparezca.
  const devocionalAMostrar = devocionalHoy || DEVOCIONALES_SEMANALES[0];

  // Si por alguna razón la lista está vacía, aquí sí protegemos
  if (!devocionalAMostrar) return null;

  return (
    <section className="relative overflow-hidden bg-[#00338d] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20 my-8">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">
              {devocionalHoy ? `Devocional de Hoy: ${devocionalAMostrar.nombreDia}` : `Próximo Devocional: Lunes`}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black italic uppercase leading-none">
            Unidos en <br /> Oración
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#00338d] flex items-center justify-center shadow-lg">
                <i className="ri-time-line text-2xl"></i>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-60">Hora de inicio</p>
                <p className="text-xl font-black italic">{devocionalAMostrar.hora}</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-white/20" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg">
                <i className="ri-group-line text-2xl"></i>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-60">Dirigido por</p>
                <p className="text-xl font-black italic uppercase">{devocionalAMostrar.grupo}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <a 
            href={devocionalAMostrar.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-5 bg-white text-[#00338d] rounded-2xl font-black text-lg uppercase italic transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95"
          >
            Unirme al Google Meet
          </a>
          <p className="text-xs font-bold opacity-60 uppercase tracking-tighter">
            * Conexión exclusiva para miembros y amigos
          </p>
        </div>
      </div>
    </section>
  );
}
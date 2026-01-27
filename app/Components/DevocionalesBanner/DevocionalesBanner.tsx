"use client";
import React, { useMemo } from 'react';
// IMPORTACIÓN CORREGIDA: Sin el .json al final
import { DEVOCIONALES_SEMANALES } from "@/app/JsonData/DevocionalesData";

export default function DevocionalBanner() {
  const devocionalHoy = useMemo(() => {
    const hoyIdx = new Date().getDay(); // 0: Dom, 1: Lun...
    return DEVOCIONALES_SEMANALES.find(d => d.diaSemana === hoyIdx);
  }, []);

  if (!devocionalHoy) return null;

  return (
    <div className="px-[8%] mb-12">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#00338d] to-[#4D27F5] rounded-[2.5rem] p-8 shadow-2xl border border-white/10">
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-5 rounded-3xl backdrop-blur-md border border-white/30 text-4xl">🙏</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-red-500 w-2 h-2 rounded-full animate-ping"></span>
                <p className="text-white text-[10px] font-black uppercase tracking-widest">En Vivo</p>
              </div>
              <h2 className="text-white text-3xl font-black leading-tight uppercase tracking-tighter">
                Devocional: {devocionalHoy.nombreDia}
              </h2>
              <p className="text-blue-100 font-medium">
                Responsable: <span className="text-white font-bold">{devocionalHoy.grupo}</span> • {devocionalHoy.hora}
              </p>
            </div>
          </div>

          <a 
            href={devocionalHoy.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-[#00338d] px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-lg active:scale-95"
          >
            ENTRAR AL MEET →
          </a>
        </div>
      </div>
    </div>
  );
}
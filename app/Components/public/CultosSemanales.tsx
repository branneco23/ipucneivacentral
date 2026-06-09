// src/components/public/CultosSemanales.tsx
'use client';

import React from 'react';
import { EXPERTISE_DATA } from '@/app/JsonData/ExpertiseData';
import { Calendar, ArrowRight } from 'lucide-react';

export default function CultosSemanales() {
  // EXPERTISE_DATA ya viene filtrado y ordenado de Domingo a Sábado desde tu archivo de configuración
  const cultosDeLaSemana = EXPERTISE_DATA;

  if (cultosDeLaSemana.length === 0) {
    return (
      <div className="w-full p-12 bg-[#090d16] border border-white/5 rounded-[2rem] text-center">
        <p className="text-white/40 text-sm font-medium">No hay cultos programados para la semana actual.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cultosDeLaSemana.map((culto) => (
        <div 
          key={culto.id}
          className="group relative bg-[#090d16] border border-white/5 rounded-[2rem] overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-white/10 flex flex-col justify-between h-[380px]"
        >
          {/* Contenedor del Banner Automático de Cloudinary */}
          <div className="relative h-44 w-full overflow-hidden bg-slate-900 border-b border-white/5">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${culto.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent" />
          </div>

          {/* Información del Culto */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] bg-[#00338d]/10 text-blue-400 border border-[#00338d]/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Calendar size={12} /> Oficial
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                {culto.title}
              </h3>
            </div>

            {/* Fecha formateada en español (Ej: Domingo, 7 de Junio) */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">Programación</p>
                <p className="text-xs font-semibold text-white/70 mt-0.5">{culto.desc}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#00338d] group-hover:text-white transition-all">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
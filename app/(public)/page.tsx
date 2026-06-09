// src/app/(public)/page.tsx
import React from 'react';
// Importa tus componentes del cliente
import AnunciosSlider from '@/app/Components/public/AnunciosSlider';
import CultosSemanales from '@/app/Components/public/CultosSemanales';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* SECCIÓN 1: CARRUSEL DE ANUNCIOS (HÉROE) */}
      <section className="w-full">
        <AnunciosSlider />
      </section>

      {/* SECCIÓN 2: CULTOS CRONOLÓGICOS DE LA SEMANA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <span className="text-xs font-bold text-[#00338d] uppercase tracking-widest">Servicios</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">Reuniones de esta Semana</h2>
          <p className="text-white/40 text-sm mt-1">Acompáñanos en nuestras actividades presenciales y transmisiones virtuales.</p>
        </div>
        
        {/* Renderiza las tarjetas de cultos con su lógica de fechas e imágenes */}
        <CultosSemanales />
      </section>

    </div>
  );
}
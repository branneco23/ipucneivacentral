"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// --- INTERFACES ---
interface ParalexItem {
  id: number;
  tag: string;
  number: string;
  title: React.ReactNode;
  hours: string;
  year: string;
  bg: string;
}

const PARALEX_DATA: ParalexItem[] = [
  { id: 1, tag: "Próximos Eventos", number: "01", title: <>Devocional <br /> un clamor por nuestros hijos</>, hours: "04:30AM", year: "2026", bg: "/img/Paralex-1.jpg" },
  { id: 2, tag: "Anuncios Local", number: "02", title: <>Campaña <br /> Evangelistica</>, hours: "06:30AM", year: "2026", bg: "/img/Paralex-2.jpg" },
  { id: 3, tag: "Comite de Protemplo", number: "03", title: <>Culto de <br />Protemplo</>, hours: "19:00PM", year: "2026", bg: "/img/Paralex-3.jpg" },
  { id: 4, tag: "Comite de Obra Social", number: "04", title: <>Culto dirigido por <br />Obra Social</>, hours: "19:00PM", year: "2026", bg: "/img/Paralex-4.jpg" },
  { id: 5, tag: "Comite de Misiones", number: "05", title: <>Día <br />Misionero</>, hours: "09:30AM", year: "2026", bg: "/img/Paralex-5.jpg" },
];

export default function AnunciosSlider() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const selectedItem = PARALEX_DATA.find(item => item.id === selectedId);

  // Función para desplazar el slider
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 bg-neutral-900 overflow-hidden group">
      <div className="px-6 md:px-16 mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-white text-4xl md:text-5xl font-bold">Anuncios</h2>
          <p className="text-white/40 mt-2">Explora nuestras próximas actividades</p>
        </div>

        {/* --- BOTONES DE NAVEGACIÓN (Desktop & Mobile) --- */}
        <div className="flex gap-3">
          <button 
            onClick={() => scroll('left')}
            className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-90"
            aria-label="Anterior"
          >
            ←
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-90"
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </div>

      {/* --- SLIDER CONTENEDOR --- */}
      <div className="relative">
        <motion.div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-10 px-6 md:px-16 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PARALEX_DATA.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className="relative min-w-[85vw] md:min-w-[400px] h-[550px] rounded-[2.5rem] overflow-hidden cursor-pointer snap-center shadow-2xl"
              whileHover={{ scale: 0.98 }}
            >
              <motion.div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.bg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="relative h-full p-8 flex flex-col justify-between">
                <span className="self-start text-[10px] font-bold text-white border border-white/30 px-4 py-2 rounded-full backdrop-blur-md uppercase tracking-widest">
                  {item.tag}
                </span>
                <div>
                  <h3 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">{item.title}</h3>
                  <div className="flex items-center gap-2 text-white/70">
                    <span className="text-sm">📍 {item.hours}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- POPUP --- */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            <motion.div 
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-4xl bg-neutral-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <div 
                className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedItem.bg})` }}
              />
              
              <div className="p-8 md:p-12 flex flex-col justify-center flex-1 overflow-y-auto">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
                >
                  ✕
                </button>
                <span className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4">
                  {selectedItem.tag}
                </span>
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
                  {selectedItem.title}
                </h2>
                <div className="space-y-4 text-white/60">
                  <p>📍 {selectedItem.hours}</p>
                  <p>📅 {selectedItem.year}</p>
                  <p className="mt-4 text-sm leading-relaxed">
                    Únete a nosotros en este evento especial. Haz clic abajo para recibir más información o registrar tu asistencia.
                  </p>
                </div>
                
                <button className="mt-8 bg-white text-black font-bold py-4 px-8 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
                  Más Información
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
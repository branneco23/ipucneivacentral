"use client";

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { PARALEX_DATA } from '@/app/JsonData/AnunciosData';

// Definición de interfaz para mejor soporte de TS
interface AnuncioItem {
  id: number;
  bg: string;
  tag: string;
  title: string;
  hours: string;
  year: string;
}

export default function AnunciosSlider() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Memoizamos la búsqueda para evitar cálculos innecesarios en cada render
  const selectedItem = useMemo(() => 
    PARALEX_DATA.find(item => item.id === selectedId), 
  [selectedId]);

  const handleScroll = (direction: 'left' | 'right') => {
    const { current } = sliderRef;
    if (current) {
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-20 bg-neutral-900 overflow-hidden group">
      {/* HEADER SECTION */}
      <div className="px-6 md:px-16 mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-white text-4xl md:text-5xl font-bold italic uppercase tracking-tighter">
            Anuncios
          </h2>
          <p className="text-white/40 mt-2 font-medium">Explora nuestras próximas actividades</p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => handleScroll('left')}
            aria-label="Deslizar izquierda"
            className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i className="ri-arrow-left-line text-xl"></i> {/* Asumiendo Remix Icon como en tu Hero */}
            <span className="sr-only">Anterior</span>
          </button>
          <button 
            onClick={() => handleScroll('right')}
            aria-label="Deslizar derecha"
            className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i className="ri-arrow-right-line text-xl"></i>
            <span className="sr-only">Siguiente</span>
          </button>
        </div>
      </div>

      {/* SLIDER CONTAINER */}
      <div className="relative">
        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-10 px-6 md:px-16 snap-x snap-mandatory scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {PARALEX_DATA.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className="relative min-w-[85vw] md:min-w-[400px] h-[550px] rounded-[2.5rem] overflow-hidden cursor-pointer snap-center shadow-2xl flex-shrink-0"
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background con optimización visual */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url(${item.bg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="relative h-full p-8 flex flex-col justify-between">
                <span className="self-start text-[10px] font-bold text-white border border-white/30 px-4 py-2 rounded-full backdrop-blur-md uppercase tracking-widest">
                  {item.tag}
                </span>
                <div className="space-y-2">
                  <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight drop-shadow-lg">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80">
                    <span className="text-sm font-semibold flex items-center gap-1">
                      <i className="ri-map-pin-2-fill text-blue-500"></i> {item.hours}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* POPUP DETALLE */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div 
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-5xl bg-neutral-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:row max-h-[90vh] z-10"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Imagen del Modal */}
                <div 
                  className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedItem.bg})` }}
                />
                
                {/* Contenido del Modal */}
                <div className="p-8 md:p-14 flex flex-col justify-center flex-1 overflow-y-auto">
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white hover:text-black transition-colors"
                  >
                    ✕
                  </button>
                  
                  <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    {selectedItem.tag}
                  </span>
                  
                  <h2 className="text-white text-3xl md:text-5xl font-black mb-6 leading-tight">
                    {selectedItem.title}
                  </h2>
                  
                  <div className="space-y-5 text-white/70">
                    <div className="flex flex-wrap gap-6">
                      <p className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg text-sm">
                        <span className="text-blue-400">HORA:</span> {selectedItem.hours}
                      </p>
                      <p className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg text-sm">
                        <span className="text-blue-400">GESTIÓN:</span> {selectedItem.year}
                      </p>
                    </div>
                    
                    <p className="text-base md:text-lg leading-relaxed border-l-2 border-blue-600 pl-4 italic">
                      "Acompáñanos en este tiempo especial. Estamos preparando lo mejor para que tu experiencia en la casa del Señor sea inolvidable."
                    </p>
                  </div>
                  
                  <button className="mt-10 bg-blue-700 hover:bg-blue-600 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-[0_10px_40px_rgba(29,78,216,0.3)] active:scale-95">
                    AGENDAR EVENTO
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
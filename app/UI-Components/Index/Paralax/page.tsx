"use client";

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { PARALEX_DATA } from '@/app/JsonData/AnunciosData';

// Definición de interfaz para los anuncios
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
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // CORRECCIÓN AQUÍ: Pasamos por unknown para evitar el error de solapamiento de tipos
  const data = useMemo(() => (PARALEX_DATA as unknown) as AnuncioItem[], []);

  const selectedItem = useMemo(() =>
    data.find(item => item.id === selectedId),
    [selectedId, data]);

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

  if (!mounted) return null;

  return (
    <section className="relative py-20 overflow-hidden group bg-gradient-to-br from-[#0f172a] via-[#020617] to-black">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

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
            className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-95"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-95"
          >
            <i className="ri-arrow-right-line text-xl"></i>
          </button>
        </div>
      </div>

      {/* SLIDER CONTAINER */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-10 px-6 md:px-16 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className="relative min-w-[85vw] md:min-w-[400px] h-[550px] rounded-[2.5rem] overflow-hidden cursor-pointer snap-center shadow-2xl flex-shrink-0"
              whileHover={{ scale: 0.98 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url(${item.bg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

              <div className="relative h-full p-8 flex flex-col justify-between">
                <span className="self-start text-[10px] font-bold text-white border border-white/30 px-4 py-2 rounded-full backdrop-blur-md uppercase tracking-widest">
                  {item.tag}
                </span>
                <div className="space-y-3">
                  <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 font-semibold text-sm">
                    <i className="ri-time-line text-blue-500"></i> {item.hours}
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
              className="relative w-full max-w-5xl bg-neutral-900 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl z-10"
            >
              <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden">
                <div
                  className="w-full md:w-1/2 h-72 md:h-auto bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedItem.bg})` }}
                />

                <div className="p-8 md:p-14 flex flex-col justify-center flex-1 relative">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 text-white hover:text-blue-500 transition-colors"
                  >
                    <i className="ri-close-circle-line text-4xl"></i>
                  </button>

                  <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    {selectedItem.tag}
                  </span>

                  <h2 className="text-white text-3xl md:text-5xl font-black mb-6 leading-tight">
                    {selectedItem.title}
                  </h2>

                  <div className="space-y-5 text-white/70">
                    <div className="flex flex-wrap gap-4">
                      <p className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg text-sm">
                        <span className="text-blue-400 font-bold">HORA:</span> {selectedItem.hours}
                      </p>
                      <p className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg text-sm">
                        <span className="text-blue-400 font-bold">GESTIÓN:</span> {selectedItem.year}
                      </p>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed border-l-2 border-blue-600 pl-4 italic">
                      "Acompáñanos en este tiempo especial. Estamos preparando lo mejor para que tu experiencia en la casa del Señor sea inolvidable."
                    </p>
                  </div>

                  <button className="mt-10 bg-blue-700 hover:bg-blue-600 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-lg active:scale-95">
                    AGENDAR EVENTO
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
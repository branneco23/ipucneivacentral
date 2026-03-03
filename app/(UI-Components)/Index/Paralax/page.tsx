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

  // Conversión de datos segura
  const data = useMemo(() => (PARALEX_DATA as unknown) as AnuncioItem[], []);

  // Buscamos el item seleccionado de forma segura
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

      {/* DECORACIÓN DE FONDO */}
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

      {/* SLIDER DE TARJETAS */}
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

      {/* MODAL DE DETALLE (POPUP) */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

            {/* FONDO OSCURO */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* CONTENEDOR QUE SE ADAPTA A LA IMAGEN */}
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative z-10 inline-block"
            >
              {/* IMAGEN DEFINE EL TAMAÑO */}
              <img
                src={selectedItem.bg}
                alt={selectedItem.title}
                className="max-h-[90vh] max-w-[95vw] object-contain rounded-[2rem] shadow-2xl"
              />

              {/* CONTENIDO SUPERPUESTO */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-[2rem]" />

              <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white w-full">

                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 text-white hover:text-blue-500 transition-colors"
                >
                  <i className="ri-close-circle-line text-4xl"></i>
                </button>

                <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
                  {selectedItem.tag}
                </span>

                <h2 className="text-3xl md:text-5xl font-black mt-3 mb-4">
                  {selectedItem.title}
                </h2>

                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <p className="bg-white/10 px-4 py-2 rounded-lg">
                    <span className="text-blue-400 font-bold">HORA:</span> {selectedItem.hours}
                  </p>
                  <p className="bg-white/10 px-4 py-2 rounded-lg">
                    <span className="text-blue-400 font-bold">GESTIÓN:</span> {selectedItem.year}
                  </p>
                </div>

                <button className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all active:scale-95">
                  AGENDAR EVENTO
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
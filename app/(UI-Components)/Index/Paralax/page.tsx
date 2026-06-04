"use client";

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { PARALEX_DATA } from '@/app/JsonData/AnunciosData';

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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(() => (PARALEX_DATA as unknown) as AnuncioItem[], []);

  const selectedItem = useMemo(() =>
    data.find(item => item.id === selectedId),
    [selectedId, data]);

  // Función para redirigir al calendario de forma universal
  const handleAddToCalendar = (item: AnuncioItem) => {
    const title = encodeURIComponent(item.title);
    const details = encodeURIComponent(`Actividad: ${item.tag}. Transmisión en vivo y evento oficial. Sede Central Neiva.`);
    const location = encodeURIComponent("Sede Central Neiva / Canales Digitales");
    
    // Al no tener una fecha exacta en el JSON (solo horas/año), usamos la fecha actual como base
    // Puedes ajustar esto si en tu JSON agregas un campo 'date' (ej: YYYYMMDD)
    const now = new Date();
    const year = item.year || now.getFullYear().toString();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // Formato básico de fecha para Google Calendar (YYYYMMDDTHHMMSSZ)
    const dateParam = `${year}${month}${day}T190000Z/${year}${month}${day}T210000Z`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateParam}&details=${details}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const updateProgress = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const totalScroll = scrollWidth - clientWidth;
      setScrollProgress(totalScroll > 0 ? (scrollLeft / totalScroll) * 100 : 0);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const { current } = sliderRef;
    if (current) {
      const scrollAmount = current.clientWidth * 0.75;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#020617] to-black">
      
      {/* DECORACIÓN AMBIENTAL DE FONDO */}
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#00338d]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      {/* HEADER SECTION */}
      <div className="px-6 md:px-16 lg:px-[12%] mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 relative z-10">
        <div>
          <span className="text-[#00338d] font-bold text-xs uppercase tracking-[0.25em] block mb-2">
            Cronograma Activo
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight CalSans">
            Anuncios <span className="text-gray-400 font-normal italic font-serif">&amp;</span> Actividades
          </h2>
          <p className="text-white/40 mt-1.5 font-medium text-sm md:text-base">Explora nuestras próximas transmisiones y eventos oficiales</p>
        </div>

        {/* Controles de Navegación del Slider */}
        <div className="flex gap-3 self-end sm:self-auto">
          <button
            onClick={() => handleScroll('left')}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black hover:scale-105 transition-all active:scale-95"
            aria-label="Anuncios anteriores"
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black hover:scale-105 transition-all active:scale-95"
            aria-label="Siguientes anuncios"
          >
            <i className="ri-arrow-right-line text-lg"></i>
          </button>
        </div>
      </div>

      {/* SLIDER DE TARJETAS */}
      <div className="relative z-10">
        <div
          ref={sliderRef}
          onScroll={updateProgress}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 px-6 md:px-16 lg:px-[12%] snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-container-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className="relative min-w-[85vw] sm:min-w-[360px] md:min-w-[400px] h-[500px] rounded-[2rem] overflow-hidden cursor-pointer snap-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex-shrink-0 group/card"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <motion.div
                layoutId={`card-bg-${item.id}`}
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${item.bg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20 transition-opacity duration-300 group-hover/card:via-black/40" />

              <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
                <motion.span 
                  layoutId={`card-tag-${item.id}`}
                  className="self-start text-[10px] font-bold text-white border border-white/20 bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md uppercase tracking-wider"
                >
                  {item.tag}
                </motion.span>
                
                <div className="space-y-3">
                  <motion.h3 
                    layoutId={`card-title-${item.id}`}
                    className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight CalSans"
                  >
                    {item.title}
                  </motion.h3>
                  
                  <motion.div 
                    layoutId={`card-meta-${item.id}`}
                    className="flex items-center gap-2 text-white/60 font-medium text-xs md:text-sm"
                  >
                    <i className="ri-time-line text-[#00338d] text-base"></i> {item.hours}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BARRA DE PROGRESO DE SCROLL INTERACTIVA */}
      <div className="px-6 md:px-16 lg:px-[12%] mt-4">
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#00338d]"
            style={{ width: `${scrollProgress}%` }}
            transition={{ type: "tween", ease: "easeOut" }}
          />
        </div>
      </div>

      {/* MODAL DETALLADO INMERSIVO */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-10 select-none">

            {/* Backdrop de desenfoque cinematográfico */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Contenedor Adaptable en Grid Responsivo */}
            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="relative z-10 w-full max-w-5xl bg-[#090d16] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[80vh]"
            >
              {/* COLUMNA IZQUIERDA */}
              <div className="relative md:col-span-5 h-[35vh] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                <motion.div
                  layoutId={`card-bg-${selectedId}`}
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${selectedItem.bg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 md:hidden w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 flex items-center justify-center active:scale-95 transition-transform"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* COLUMNA DERECHA */}
              <div className="md:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col justify-between overflow-y-auto h-[50vh] md:h-full">
                
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 hidden md:flex w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/70 items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all active:scale-95"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>

                <div className="space-y-6">
                  <motion.span 
                    layoutId={`card-tag-${selectedId}`}
                    className="inline-block text-[10px] font-bold text-[#00338d] border border-[#00338d]/30 bg-[#00338d]/10 px-4 py-1.5 rounded-full uppercase tracking-widest"
                  >
                    {selectedItem.tag}
                  </motion.span>

                  <div className="space-y-3">
                    <motion.h2 
                      layoutId={`card-title-${selectedId}`}
                      className="text-white text-2xl md:text-4xl font-bold tracking-tight CalSans leading-[1.15]"
                    >
                      {selectedItem.title}
                    </motion.h2>
                    
                    <motion.div 
                      layoutId={`card-meta-${selectedId}`}
                      className="flex items-center gap-2 text-white/50 font-medium text-sm"
                    >
                      <i className="ri-calendar-line text-[#00338d]"></i> Sede Central Neiva
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                      <p className="text-white/40 text-2xs font-bold uppercase tracking-wider mb-1">Horario Oficial</p>
                      <p className="text-white font-semibold text-sm sm:text-base flex items-center gap-1.5">
                        <i className="ri-time-fill text-blue-400"></i> {selectedItem.hours}
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                      <p className="text-white/40 text-2xs font-bold uppercase tracking-wider mb-1">Año de Gestión</p>
                      <p className="text-white font-semibold text-sm sm:text-base flex items-center gap-1.5">
                        <i className="ri-archive-stack-fill text-indigo-400"></i> {selectedItem.year}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 text-white/70 text-sm md:text-base leading-relaxed font-normal GolosText">
                    <p>
                      Acompáñanos en esta actividad presencial en nuestras instalaciones centrales o conéctate en tiempo real a través de nuestros canales y plataformas digitales embebidas. Guarda la fecha y prepárate.
                    </p>
                  </div>
                </div>

                {/* Bloque de Acción Principal */}
                <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => handleAddToCalendar(selectedItem)}
                    className="flex-1 bg-[#00338d] hover:bg-[#002260] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all active:scale-98 shadow-lg shadow-[#00338d]/20 tracking-wide uppercase GolosText"
                  >
                    Agendar Evento
                  </button>
                  <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all active:scale-98 tracking-wide uppercase GolosText">
                    Compartir Actividad
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
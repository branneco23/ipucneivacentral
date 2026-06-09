// src/components/public/AnunciosSlider.tsx
'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PARALEX_DATA } from '@/app/JsonData/AnunciosData';
import { Clock, Calendar, X, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

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

  useEffect(() => { setMounted(true); }, []);

  const data = useMemo(() => (PARALEX_DATA as unknown) as AnuncioItem[], []);
  const selectedItem = useMemo(() => data.find(item => item.id === selectedId), [selectedId, data]);

  const handleAddToCalendar = (item: AnuncioItem) => {
    const title = encodeURIComponent(item.title);
    const details = encodeURIComponent(`Actividad: ${item.tag}. Transmisión oficial Sede Central.`);
    const location = encodeURIComponent("Sede Central / Plataforma Digital");
    
    const now = new Date();
    const year = item.year || now.getFullYear().toString();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
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
    if (sliderRef.current) {
      const amount = sliderRef.current.clientWidth * 0.75;
      sliderRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#020617] to-black rounded-[3rem] border border-white/5 mx-6">
      {/* HEADER CONTROLS */}
      <div className="px-6 md:px-12 mb-8 flex justify-between items-end gap-6 relative z-10">
        <div>
          <span className="text-[#00338d] font-bold text-xs uppercase tracking-[0.2em] block mb-1">Cronograma Activo</span>
          <h2 className="text-white text-2xl md:text-4xl font-bold tracking-tight">Anuncios &amp; Novedades</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleScroll('left')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => handleScroll('right')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* SLIDER CARDS */}
      <div className="relative z-10">
        <div ref={sliderRef} onScroll={updateProgress} className="flex gap-6 overflow-x-auto pb-6 px-6 md:px-12 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {data.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-container-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className="relative min-w-[280px] sm:min-w-[340px] h-[420px] rounded-[2rem] overflow-hidden cursor-pointer snap-center shadow-2xl flex-shrink-0 group"
              whileHover={{ y: -4 }}
            >
              <motion.div layoutId={`card-bg-${item.id}`} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.bg})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative h-full p-6 flex flex-col justify-between z-10">
                <motion.span layoutId={`card-tag-${item.id}`} className="self-start text-[9px] font-bold text-white border border-white/20 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">{item.tag}</motion.span>
                <div className="space-y-2">
                  <motion.h3 layoutId={`card-title-${item.id}`} className="text-white text-xl font-bold leading-tight tracking-tight">{item.title}</motion.h3>
                  <motion.div layoutId={`card-meta-${item.id}`} className="flex items-center gap-1.5 text-white/60 font-medium text-xs">
                    <Clock size={13} className="text-[#00338d]" /> {item.hours}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="px-6 md:px-12 mt-2">
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-[#00338d]" style={{ width: `${scrollProgress}%` }} />
        </div>
      </div>

      {/* DETAILED MODAL */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div layoutId={`card-container-${selectedId}`} className="relative z-10 w-full max-w-3xl bg-[#090d16] rounded-[2.5rem] overflow-hidden border border-white/5 grid grid-cols-1 md:grid-cols-12 max-h-[85vh]">
              <div className="relative md:col-span-5 h-48 md:h-full">
                <motion.div layoutId={`card-bg-${selectedId}`} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedItem.bg})` }} />
              </div>
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 text-white/70 flex items-center justify-center hover:bg-white hover:text-black transition-all"><X size={16} /></button>
                <div className="space-y-4">
                  <motion.span layoutId={`card-tag-${selectedId}`} className="inline-block text-[9px] font-bold text-[#00338d] border border-[#00338d]/30 bg-[#00338d]/10 px-3 py-1 rounded-full uppercase tracking-widest">{selectedItem.tag}</motion.span>
                  <motion.h2 layoutId={`card-title-${selectedId}`} className="text-white text-xl md:text-2xl font-bold tracking-tight">{selectedItem.title}</motion.h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 text-xs">
                      <p className="text-white/40 font-bold uppercase tracking-wider mb-0.5">Horario</p>
                      <p className="text-white font-semibold flex items-center gap-1"><Clock size={12} className="text-blue-400" /> {selectedItem.hours}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-xs">
                      <p className="text-white/40 font-bold uppercase tracking-wider mb-0.5">Gestión</p>
                      <p className="text-white font-semibold flex items-center gap-1"><Calendar size={12} className="text-indigo-400" /> {selectedItem.year}</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">Acompáñanos de manera presencial o conéctate en tiempo real desde nuestras plataformas digitales.</p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 flex gap-3">
                  <button onClick={() => handleAddToCalendar(selectedItem)} className="flex-1 bg-[#00338d] hover:bg-[#002260] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all uppercase tracking-wider">Agendar Evento</button>
                  <button className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-xl transition-all"><Share2 size={16} /></button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
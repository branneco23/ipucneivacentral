"use client";

import React, { useState, useEffect } from 'react';
import CountUp from "react-countup";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Configuración de Datos y Tipos
import historyData from "../../../JsonData/HistoryData.json";
import AboutImg1 from "@/public/img/AboutImg1.jpg";
import AboutImg2 from "@/public/img/AboutImg2.jpg";
import AboutImg3 from "@/public/img/AboutImg3.jpg";

interface Pastor { id: number; nombre: string; detalle: string; periodo: string; }
interface Hito { id: number; evento: string; ubicación: string; fecha: string; }

const GALLERY_IMAGES = [
  { src: AboutImg1, alt: "Interior de la congregación IPUC" },
  { src: AboutImg2, alt: "Fachada principal sede Central" },
  { src: AboutImg3, alt: "Comunidad reunida en Neiva" },
];

const STATS_DATA = [
  { startValue: 1956, value: 2026, suffix: "", title: "Años de trayectoria", desc: "Trayectoria del evangelio a los hogares durante décadas." },
  { startValue: 0, value: 70, suffix: "+", title: "Años predicando", desc: "Trabajando activamente en la formación espiritual." },
  { startValue: 0, value: 200, suffix: "+", title: "Hermanos asistentes", desc: "Hermanos que se congregan en la sede Central." },
  { startValue: 0, value: 50, suffix: "+", title: "Amigos asistentes", desc: "Amigos que asisten a los servicios." },
];

export default function About() {
  const [toggleState, setToggleState] = useState<number>(1);
  const [selectedImg, setSelectedImg] = useState<{src: StaticImageData, alt: string} | null>(null);

  return (
    <main className="about-page bg-[#f6f6f6]">
      {/* SECTION 1: HERO & GALLERY */}
      <section className="px-[8%] lg:px-[12%] py-20">
        <div className="flex flex-col lg:flex-row gap-10 mb-20">
          <header className="w-full lg:w-1/3 pt-8">
            <span className="rounded-full border border-gray-400 px-6 py-2 uppercase font-bold text-[10px] tracking-widest text-gray-600">
              Sobre la IPUC
            </span>
          </header>
          <h1 className="w-full lg:w-2/3 CalSans text-4xl md:text-7xl leading-[1.1] text-gray-900">
            Nosotros Predicamos Lo Que <span className="text-[#00338d]">La Palabra de Jesucristo</span> Nos Enseña
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_IMAGES.map((img, idx) => (
            <figure 
              key={idx} 
              onClick={() => setSelectedImg(img)}
              className={`transition-transform duration-500 cursor-zoom-in hover:-translate-y-3 
                ${idx === 1 ? 'lg:pt-10' : idx === 2 ? 'lg:pt-20' : ''}`}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                placeholder="blur"
                className="rounded-3xl shadow-2xl aspect-[4/5] object-cover"
                priority={idx === 0}
              />
            </figure>
          ))}
        </div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="px-[8%] lg:px-[12%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
        {STATS_DATA.map((item, index) => (
          <article key={index} className="group">
            <h2 className="text-5xl CalSans font-bold mb-6 text-gray-900">
              <CountUp start={item.startValue} end={item.value} duration={3} enableScrollSpy scrollSpyOnce />
              {item.suffix}
            </h2>
            <div className="py-6 border-t border-gray-300 group-hover:border-[#00338d] transition-colors duration-300">
              <h3 className="mb-3 text-2xl CalSans text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </article>
        ))}
      </section>

      {/* SECTION 3: TIMELINE */}
      <section className="py-24 bg-white" id="historia">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl CalSans font-bold mb-4 text-gray-900">Nuestra Historia</h2>
            <p className="italic text-gray-500 text-lg">Trayectoria de fe en IPUC Neiva Central</p>
          </div>

          <nav className="flex justify-center gap-8 mb-20" role="tablist">
            <TabButton active={toggleState === 1} onClick={() => setToggleState(1)} icon="ri-user-follow-line" label="Pastores" />
            <TabButton active={toggleState === 2} onClick={() => setToggleState(2)} icon="ri-map-pin-time-line" label="Hitos" />
          </nav>

          <div className="relative">
            {toggleState === 1 ? (
              historyData.pastores.map((p: Pastor, idx: number) => (
                <TimelineCard key={`pastor-${p.id}`} title={p.nombre} sub={p.detalle} date={p.periodo} isLeft={idx % 2 === 0} icon="bi-calendar3" />
              ))
            ) : (
              historyData.hitos.map((h: Hito, idx: number) => (
                <TimelineCard key={`hito-${h.id}`} title={h.evento} sub={h.ubicación} date={h.fecha} isLeft={idx % 2 === 0} icon="bi-calendar-event" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* MODAL DE IMAGEN */}
      <AnimatePresence>
        {selectedImg && (
          <ImageModal 
            img={selectedImg} 
            onClose={() => setSelectedImg(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/** * COMPONENTES DE APOYO */

function ImageModal({ img, onClose }: { img: {src: StaticImageData, alt: string}, onClose: () => void }) {
  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Cierra al hacer click fuera
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-10"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Evita que el click en la imagen cierre el modal
        className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center bg-transparent"
      >
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors"
          aria-label="Cerrar"
        >
          <i className="ri-close-line"></i>
        </button>
        
        <Image 
          src={img.src} 
          alt={img.alt}
          className="rounded-2xl object-contain w-auto h-auto max-h-[85vh] shadow-2xl"
          placeholder="blur"
        />
      </motion.div>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: string, label: string }) {
  return (
    <button 
      className={`flex items-center gap-2 pb-2 text-xl font-semibold transition-all duration-300 border-b-2
        ${active ? "text-[#00338d] border-[#00338d]" : "text-gray-400 border-transparent hover:text-gray-600"}`}
      onClick={onClick}
      role="tab"
    >
      <i className={icon}></i> {label}
    </button>
  );
}

function TimelineCard({ title, sub, date, isLeft, icon }: { title: string, sub: string, date: string, isLeft: boolean, icon: string }) {
  const contentAlignment = isLeft ? "text-right" : "text-left";
  return (
    <div className="grid grid-cols-[1fr_max-content_1fr] column-gap-6 md:column-gap-10">
      {isLeft ? (
        <div className={`${contentAlignment} mb-12`}>
          <h3 className="text-xl font-bold CalSans text-gray-900 leading-tight">{title}</h3>
          <span className="text-gray-500 text-sm block my-1">{sub}</span>
          <div className="flex items-center gap-2 text-[#00338d] text-[11px] font-bold uppercase tracking-wider mt-2 justify-end">
            <i className={`bi ${icon} order-last ml-1`}></i> {date}
          </div>
        </div>
      ) : <div />}
      
      <div className="flex flex-col items-center px-4">
        <span className="w-4 h-4 bg-[#00338d] rounded-full ring-4 ring-blue-50"></span>
        <span className="w-[2px] h-full bg-[#00338d] opacity-20 transform translate-y-[-2px]"></span>
      </div>

      {!isLeft ? (
        <div className={`${contentAlignment} mb-12`}>
          <h3 className="text-xl font-bold CalSans text-gray-900 leading-tight">{title}</h3>
          <span className="text-gray-500 text-sm block my-1">{sub}</span>
          <div className="flex items-center gap-2 text-[#00338d] text-[11px] font-bold uppercase tracking-wider mt-2 justify-start">
            <i className={`bi ${icon} mr-1`}></i> {date}
          </div>
        </div>
      ) : <div />}
    </div>
  );
}
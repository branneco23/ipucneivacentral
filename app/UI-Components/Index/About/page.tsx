"use client";

import React, { useState, useEffect, useCallback } from 'react';
import CountUp from "react-countup";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// --- DATOS Y TIPOS ---
import { HISTORY_DATA, PastorHistory, HitoHistory } from "@/app/JsonData/HistoryData";
import AboutImg1 from "@/public/img/AboutImg1.jpg";
import AboutImg2 from "@/public/img/AboutImg2.jpg";
import AboutImg3 from "@/public/img/AboutImg3.jpg";

// --- CONSTANTES DE CONFIGURACIÓN ---
const VIDEO_SRC = "/img/videoipucneiva.mp4";

// Tipos para el estado de navegación de la historia
type HistoryTab = "PASTORES" | "HITOS";

const GALLERY_IMAGES = [
  { src: AboutImg1, alt: "Interior de la congregación IPUC", priority: true },
  { src: AboutImg2, alt: "Fachada principal sede Central", priority: false },
  { src: AboutImg3, alt: "Comunidad reunida en Neiva", priority: false },
];

const STATS_DATA = [
  { start: 1956, end: 2026, suffix: "", title: "Años de trayectoria", desc: "Trayectoria del evangelio a los hogares durante décadas." },
  { start: 0, end: 70, suffix: "+", title: "Años predicando", desc: "Trabajando activamente en la formación espiritual." },
  { start: 0, end: 200, endVal: 200, suffix: "+", title: "Hermanos asistentes", desc: "Hermanos que se congregan en la sede Central." },
  { start: 0, end: 50, suffix: "+", title: "Amigos asistentes", desc: "Amigos que asisten a los servicios." },
];

// Variantes de animación reutilizables
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  const [activeTab, setActiveTab] = useState<HistoryTab>("PASTORES");
  const [selectedImg, setSelectedImg] = useState<{src: StaticImageData, alt: string} | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handlers memorizados
  const openImage = useCallback((img: {src: StaticImageData, alt: string}) => setSelectedImg(img), []);
  const closeImage = useCallback(() => setSelectedImg(null), []);

  if (!isMounted) return null;

  return (
    <main className="about-page bg-[#f6f6f6] selection:bg-[#00338d] selection:text-white">

      {/* SECTION 1: HERO & GALLERY */}
      <section className="px-[8%] lg:px-[12%] py-20">
        <header className="flex flex-col lg:flex-row gap-10 mb-20">
          <div className="w-full lg:w-1/3 pt-8">
            <span className="rounded-full border border-gray-400 px-6 py-2 uppercase font-bold text-[10px] tracking-widest text-gray-600">
              Sobre la IPUC
            </span>
          </div>
          <h1 className="w-full lg:w-2/3 CalSans text-4xl md:text-7xl leading-[1.1] text-gray-900">
            Nosotros Predicamos Lo Que <span className="text-[#00338d]">La Palabra de Jesucristo</span> Nos Enseña
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.figure 
              key={idx} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              onClick={() => openImage(img)}
              className={`relative transition-transform duration-500 cursor-zoom-in hover:-translate-y-3 
                ${idx === 1 ? 'lg:pt-10' : idx === 2 ? 'lg:pt-20' : ''}`}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                placeholder="blur"
                className="rounded-3xl shadow-2xl aspect-[4/5] object-cover"
                priority={img.priority}
              />
            </motion.figure>
          ))}
        </div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="px-[8%] lg:px-[12%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
        {STATS_DATA.map((item, index) => (
          <article key={index} className="group">
            <h2 className="text-5xl CalSans font-bold mb-6 text-gray-900">
              <CountUp start={item.start} end={item.end} duration={2.5} enableScrollSpy scrollSpyOnce />
              {item.suffix}
            </h2>
            <div className="py-6 border-t border-gray-300 group-hover:border-[#00338d] transition-colors duration-300">
              <h3 className="mb-3 text-2xl CalSans text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </article>
        ))}
      </section>

      {/* SECTION VIDEO PRESENTACIÓN */}
      <section className="px-[8%] lg:px-[12%] pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          onClick={() => setIsVideoOpen(true)}
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer group bg-black"
        >
          <video
            src={VIDEO_SRC}
            autoPlay muted loop playsInline
            className="w-full h-[70vh] object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
          />

          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-[#00338d] transition-all duration-300">
                <i className="ri-play-fill text-white text-4xl ml-1"></i>
             </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pointer-events-none">
            <span className="text-white/70 text-xs uppercase tracking-widest mb-3">IPUC Neiva Central</span>
            <h2 className="text-white text-3xl md:text-5xl CalSans max-w-2xl leading-tight">
              Una historia de fe que sigue transformando vidas
            </h2>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: TIMELINE */}
      <section className="py-24 bg-white" id="historia">
        <div className="max-w-4xl mx-auto px-6">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl CalSans font-bold mb-4 text-gray-900">Nuestra Historia</h2>
            <p className="italic text-gray-500 text-lg">Trayectoria de fe en IPUC Neiva Central</p>
          </header>

          <nav className="flex justify-center gap-8 mb-20" aria-label="Navegación de historia">
            <TabButton 
              active={activeTab === "PASTORES"} 
              onClick={() => setActiveTab("PASTORES")} 
              icon="ri-user-follow-line" 
              label="Pastores" 
            />
            <TabButton 
              active={activeTab === "HITOS"} 
              onClick={() => setActiveTab("HITOS")} 
              icon="ri-map-pin-time-line" 
              label="Hitos" 
            />
          </nav>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === "PASTORES"
                  ? HISTORY_DATA.pastores.map((p, idx) => (
                      <TimelineCard key={p.id} title={p.nombre} sub={p.detalle} date={p.periodo} isLeft={idx % 2 === 0} />
                    ))
                  : HISTORY_DATA.hitos.map((h, idx) => (
                      <TimelineCard key={h.id} title={h.evento} sub={h.ubicación} date={h.fecha} isLeft={idx % 2 === 0} />
                    ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* MODALES */}
      <AnimatePresence>
        {selectedImg && <ImageModal img={selectedImg} onClose={closeImage} />}
        {isVideoOpen && <VideoModal src={VIDEO_SRC} onClose={() => setIsVideoOpen(false)} />}
      </AnimatePresence>

    </main>
  );
}

// --- COMPONENTES DE APOYO (DESACOPLADOS) ---

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-[#00338d] transition-colors"
          aria-label="Cerrar video"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>
        <video src={src} controls autoPlay className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
}

function ImageModal({ img, onClose }: { img: {src: StaticImageData, alt: string}, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-sm p-6"
    >
      <motion.div
        initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full flex flex-col items-center"
      >
        <button 
          onClick={onClose} 
          className="absolute -top-14 right-0 text-white text-4xl hover:text-[#00338d] transition-colors"
          aria-label="Cerrar imagen"
        >
          <i className="ri-close-line"></i>
        </button>
        <Image src={img.src} alt={img.alt} className="rounded-3xl object-contain max-h-[85vh] w-auto shadow-2xl" />
        <p className="text-white/60 mt-4 text-sm tracking-wide">{img.alt}</p>
      </motion.div>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 pb-2 text-xl font-bold border-b-2 transition-all duration-300
        ${active ? "text-[#00338d] border-[#00338d]" : "text-gray-400 border-transparent hover:text-gray-600"}`}
    >
      <i className={icon}></i> {label}
    </button>
  );
}

function TimelineCard({ title, sub, date, isLeft }: { title: string; sub: string; date: string; isLeft: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_max-content_1fr] gap-4 md:gap-10">
      {isLeft ? <TimelineContent title={title} sub={sub} date={date} align="right" /> : <div />}
      
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-[#00338d] rounded-full ring-4 ring-blue-50"></div>
        <div className="w-[2px] h-full bg-gradient-to-b from-[#00338d] to-transparent opacity-20"></div>
      </div>

      {!isLeft ? <TimelineContent title={title} sub={sub} date={date} align="left" /> : <div />}
    </div>
  );
}

function TimelineContent({ title, sub, date, align }: { title: string; sub: string; date: string; align: "left" | "right" }) {
  return (
    <div className={`pb-12 ${align === "right" ? "text-right" : "text-left"}`}>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm mb-1">{sub}</p>
      <span className="text-[#00338d] font-bold text-xs px-2 py-1 bg-blue-50 rounded-md italic">
        {date}
      </span>
    </div>
  );
}
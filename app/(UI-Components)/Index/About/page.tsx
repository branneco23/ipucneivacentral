"use client";

import React, { useState, useEffect, useCallback } from 'react';
import CountUp from "react-countup";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";

// --- DATOS Y TIPOS ---
import { HISTORY_DATA } from "@/app/JsonData/HistoryData";
import AboutImg1 from "@/public/img/AboutImg1.jpg";
import AboutImg2 from "@/public/img/AboutImg2.jpg";
import AboutImg3 from "@/public/img/AboutImg3.jpg";

const VIDEO_SRC = "/img/videoipucneiva.mp4";

type HistoryTab = "PASTORES" | "HITOS";

const GALLERY_IMAGES = [
  { src: AboutImg1, alt: "Interior de la congregación IPUC", priority: true },
  { src: AboutImg2, alt: "Campañas de Evangelismo De Nuestros Jóvenes", priority: false },
  { src: AboutImg3, alt: "Comunidad reunida en Neiva", priority: false },
];

const STATS_DATA = [
  { start: 1956, end: 2026, suffix: "", title: "Años de trayectoria", desc: "Trayectoria del evangelio a los hogares durante décadas." },
  { start: 0, end: 70, suffix: "+", title: "Años predicando", desc: "Trabajando activamente en la formación espiritual." },
  { start: 0, end: 200, suffix: "+", title: "Hermanos asistentes", desc: "Hermanos que se congregan en la sede Central." },
  { start: 0, end: 50, suffix: "+", title: "Amigos asistentes", desc: "Amigos que asisten a los servicios." },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 60, damping: 15 } 
  }
};

export default function About() {
  const [activeTab, setActiveTab] = useState<HistoryTab>("PASTORES");
  const [selectedImg, setSelectedImg] = useState<{ src: StaticImageData, alt: string } | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openImage = useCallback((img: { src: StaticImageData, alt: string }) => setSelectedImg(img), []);
  const closeImage = useCallback(() => setSelectedImg(null), []);

  if (!isMounted) return null;

  return (
    <main className="about-page bg-slate-50 selection:bg-[#00338d] selection:text-white overflow-hidden">

      {/* SECTION 1: HERO & GALLERY */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <header className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-24">
          <div className="w-full lg:w-1/4">
            <span className="inline-block bg-[#00338d]/10 backdrop-blur-xs text-[#00338d] rounded-full border border-[#00338d]/20 px-5 py-2 uppercase font-black text-[10px] tracking-widest">
              Sobre la IPUC
            </span>
          </div>
          <h1 className="w-full lg:w-3/4 text-4xl md:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.05]">
            Nosotros Predicamos Lo Que <span className="text-[#00338d] relative inline-block">La Palabra de Jesucristo<span className="absolute bottom-1 left-0 w-full h-[6px] bg-yellow-400 rounded-full -z-10" /></span> Nos Enseña
          </h1>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.figure
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => openImage(img)}
              className={`relative cursor-zoom-in group overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-slate-200
                ${idx === 1 ? 'lg:translate-y-6' : idx === 2 ? 'lg:translate-y-12' : ''}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                placeholder="blur"
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                priority={img.priority}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-sm font-medium tracking-wide">{img.alt}</p>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32 pt-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS_DATA.map((item, index) => (
            <motion.article 
              variants={cardVariants}
              whileHover={{ y: -4 }}
              key={index} 
              className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.02)] group hover:shadow-[0_20px_40px_rgba(0,33,141,0.04)] hover:border-[#00338d]/20 transition-all duration-300"
            >
              <h2 className="text-5xl font-black mb-4 text-slate-950 tracking-tight flex items-center gap-0.5">
                {/* 🛠️ CORRECCIÓN: Usamos la función callback de renderizado para evitar targets nulos */}
                <CountUp start={item.start} end={item.end} duration={2.5} enableScrollSpy scrollSpyOnce>
                  {({ countUpRef }) => <span ref={countUpRef} />}
                </CountUp>
                <span className="text-[#00338d]">{item.suffix}</span>
              </h2>
              <div className="pt-4 border-t border-slate-100 group-hover:border-[#00338d]/30 transition-colors duration-300">
                <h3 className="mb-2 text-lg font-bold text-slate-800 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* SECTION VIDEO PRESENTACIÓN */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          onClick={() => setIsVideoOpen(true)}
          className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] cursor-pointer group bg-slate-950"
        >
          <video
            src={VIDEO_SRC}
            autoPlay muted loop playsInline
            className="w-full h-[65vh] object-cover opacity-75 transition-transform duration-1000 group-hover:scale-102 group-hover:opacity-85"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-110 group-hover:bg-[#00338d] group-hover:border-transparent transition-all duration-500">
              <i className="ri-play-fill text-white text-5xl ml-1"></i>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pointer-events-none">
            <span className="text-yellow-400 font-bold text-xs uppercase tracking-widest mb-3">IPUC Neiva Central</span>
            <h2 className="text-white text-3xl md:text-5xl font-black max-w-3xl leading-tight tracking-tight">
              Una historia de fe que sigue transformando vidas
            </h2>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: TIMELINE */}
      <section className="py-32 bg-white border-t border-slate-100" id="historia">
        <div className="max-w-4xl mx-auto px-6">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-950 tracking-tight">Nuestra Historia</h2>
            <p className="text-slate-500 text-base font-medium tracking-wide">Trayectoria de fe en IPUC Neiva Central</p>
          </header>

          <nav className="flex justify-center bg-slate-100 p-1.5 rounded-2xl max-w-xs mx-auto mb-24" aria-label="Navegación de historia">
            <TabButton active={activeTab === "PASTORES"} onClick={() => setActiveTab("PASTORES")} label="Pastores" />
            <TabButton active={activeTab === "HITOS"} onClick={() => setActiveTab("HITOS")} label="Hitos" />
          </nav>

          <div className="relative border-l-2 border-slate-100 ml-4 md:ml-0 md:absolute-center-line">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col gap-12 relative w-full"
              >
                {activeTab === "PASTORES"
                  ? HISTORY_DATA.pastores.map((p, idx) => (
                      <TimelineCard key={p.id} title={p.nombre} sub={p.detalle} date={p.periodo} isLeft={idx % 2 === 0} />
                    ))
                  : HISTORY_DATA.hitos.map((h, idx) => (
                      <TimelineCard
                        key={h.id}
                        title={h.evento}
                        sub={h.ubicacion ?? ""}
                        date={h.fecha}
                        isLeft={idx % 2 === 0}
                      />
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

// --- COMPONENTES AUXILIARES ---

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[210] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-red-500 transition-colors flex items-center justify-center"
          aria-label="Cerrar video"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>
        <video src={src} controls autoPlay className="w-full h-full object-contain" />
      </motion.div>
    </motion.div>
  );
}

function ImageModal({ img, onClose }: { img: { src: StaticImageData, alt: string }, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[210] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-6"
    >
      <motion.div
        initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full flex flex-col items-center"
      >
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 text-white/80 hover:text-white text-4xl transition-colors"
          aria-label="Cerrar imagen"
        >
          <i className="ri-close-line"></i>
        </button>
        <Image src={img.src} alt={img.alt} className="rounded-2xl object-contain max-h-[80vh] w-auto shadow-2xl" />
        <p className="text-white/70 mt-4 text-sm font-medium tracking-wide bg-white/5 px-4 py-2 rounded-full border border-white/10">{img.alt}</p>
      </motion.div>
    </motion.div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2.5 text-sm font-black rounded-xl transition-all duration-300
        ${active ? "bg-white text-[#00338d] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
    >
      {label}
    </button>
  );
}

function TimelineCard({ title, sub, date, isLeft }: { title: string; sub?: string; date: string; isLeft: boolean }) {
  return (
    <motion.div 
      variants={cardVariants}
      className="relative grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-16 pl-8 md:pl-0"
    >
      <div className="absolute left-0 md:left-1/2 top-2 w-5 h-5 bg-white border-4 border-[#00338d] rounded-full shadow-xs -translate-x-2.5 z-10" />

      <div className={`w-full ${isLeft ? "md:text-right order-2 md:order-1" : "md:opacity-0 order-2 md:pointer-events-none hidden md:block"}`}>
        {isLeft && <TimelineContent title={title} sub={sub} date={date} />}
      </div>

      <div className={`w-full ${!isLeft ? "md:text-left order-2" : "md:opacity-0 order-2 md:pointer-events-none hidden md:block"}`}>
        {!isLeft && <TimelineContent title={title} sub={sub} date={date} />}
      </div>
    </motion.div>
  );
}

function TimelineContent({ title, sub, date }: { title: string; sub?: string; date: string }) {
  return (
    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:bg-white hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all duration-300">
      <span className="inline-block text-[#00338d] font-black text-[11px] px-2.5 py-1 bg-blue-50 border border-blue-100/50 rounded-md tracking-wider mb-3">
        {date}
      </span>
      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug mb-1">{title}</h3>
      {sub && <p className="text-slate-500 text-sm font-medium leading-relaxed">{sub}</p>}
    </div>
  );
}
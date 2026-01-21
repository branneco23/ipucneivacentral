"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// --- INTERFACES ---
interface ParalexItem {
  id: number;
  tag: string;
  number: string;
  title: React.ReactNode;
  location: string;
  year: string;
  bg: string;
}

// --- CONFIGURACIÓN DE DATOS ---
const PARALEX_DATA: ParalexItem[] = [
  {
    id: 1,
    tag: "Próximos Eventos",
    number: "01",
    title: <>Convención Nacional <br /> de Jóvenes</>,
    location: "Movistar Arena, Bogotá",
    year: "2026",
    bg: "/img/Paralex1.jpg" // Asegura que la ruta empiece con / si está en public
  },
  {
    id: 2,
    tag: "Anuncios Local",
    number: "02",
    title: <>Escuela Dominical <br /> Especial</>,
    location: "Sede Central, Neiva",
    year: "2026",
    bg: "/img/Paralex2.jpg" 
  },
  {
    id: 3,
    tag: "Misiones",
    number: "03",
    title: <>Impacto Evangelístico <br /> Huila</>,
    location: "Zonas Rurales",
    year: "2026",
    bg: "/img/Paralex3.jpg"
  },
];

export default function Paralex() {
  return (
    <section className="relative mt-20 pb-32">
      {PARALEX_DATA.map((item) => (
        <ParalexSection key={item.id} item={item} />
      ))}
    </section>
  );
}

// --- SUB-COMPONENTE ---
function ParalexSection({ item }: { item: ParalexItem }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start start": cuando el inicio del elemento llega al inicio de la pantalla
    // "end start": cuando el final del elemento llega al inicio de la pantalla
    offset: ["start start", "end start"],
  });

  // Optimizamos las transformaciones para que se sientan naturales
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.6]);

  return (
    <div 
      ref={containerRef} 
      className="h-screen sticky top-0 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="Paralex-wrap relative w-[95%] h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url(${item.bg})`,
          scale,
          opacity,
          zIndex: item.id,
        }}
      >
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-black/40 z-0" aria-hidden="true" />

        <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-20">
          <header className="flex justify-between items-start w-full">
            <span className="text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase border border-white/30 px-6 py-2 rounded-full backdrop-blur-md">
              {item.tag}
            </span>
            <span className="GolosText text-7xl md:text-9xl font-black text-white/20 leading-none">
              {item.number}
            </span>
          </header>

          <footer className="text-white">
            <h2 className="CalSans text-5xl md:text-8xl leading-tight mb-6">
              {item.title}
            </h2>
            <div className="flex items-center gap-4 text-lg md:text-2xl font-light text-white/80">
              <i className="ri-map-pin-2-line text-[#00338d]"></i>
              <p>
                {item.location} <span className="mx-2 opacity-30">|</span> {item.year}
              </p>
            </div>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
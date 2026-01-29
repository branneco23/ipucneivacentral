"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Constantes de estilo para evitar repetición y facilitar el mantenimiento
 */
const BUTTON_BASE = "px-8 py-3 font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center";

export default function Banner() {
  return (
    <section 
      className="relative banner h-[60vh] md:h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      aria-labelledby="banner-title"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto flex flex-col items-center space-y-6 z-10"
      >
        
        {/* Badge superior con animación de pulso sutil */}
        <span className="inline-block px-4 py-1.5 border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs md:text-sm tracking-[0.2em] uppercase font-bold rounded-full animate-pulse">
          IPUC Neiva Central
        </span>

        {/* Título Principal - H1 único para SEO */}
        <h1 
          id="banner-title"
          className="text-white text-4xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight italic uppercase"
        >
          Donde la <span className="text-blue-500 drop-shadow-xl">Bendición</span> <br /> 
          se hace Familia
        </h1>

        {/* Cita Bíblica con semántica correcta */}
        <blockquote 
          className="text-gray-200 text-lg md:text-xl max-w-2xl font-light leading-relaxed tracking-wide"
          cite="https://www.bible.com/bible/149/PSA.133.1.RVR1960"
        >
          <p>
            &quot;Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía.&quot;
          </p>
          <footer className="text-sm mt-2 opacity-80">— Salmos 133:1</footer>
        </blockquote>

        {/* Botones de acción (Call to Action) */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          
          <Link 
            href="/servicios" 
            className={`${BUTTON_BASE} bg-blue-600 hover:bg-blue-700 text-white`}
            aria-label="Ver nuestros horarios de servicios"
          >
            Nuestros Servicios
          </Link>

          <Link 
            href="/transmision" 
            className={`${BUTTON_BASE} bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/50 text-white`}
            aria-label="Ver transmisión en vivo por redes sociales"
          >
            <i className="ri-live-line mr-2"></i> Ver Transmisión
          </Link>
          
        </div>

      </motion.div>

      {/* Overlay opcional para mejorar contraste si el fondo es muy claro */}
      <div className="absolute inset-0 bg-black/40 -z-10" aria-hidden="true" />
    </section>
  );
}
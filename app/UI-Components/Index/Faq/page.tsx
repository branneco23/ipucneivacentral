"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FAQ_DATA } from "@/app/JsonData/FaqData"; 
import faqBanner from "@/public/img/faq-banner.jpg";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memorizamos la función toggle para evitar recrearla en cada render
  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  }, []);

  if (!mounted) return null;

  return (
    <section className="px-[8%] lg:px-[12%] py-24 bg-[#f6f6f6]" aria-labelledby="faq-title">
      {/* ENCABEZADO */}
      <header className="mb-20 text-center lg:text-left">
        <span className="text-[#00338d] font-bold uppercase tracking-[0.3em] text-xs">
          Centro de Ayuda
        </span>
        <h2 id="faq-title" className="text-4xl md:text-6xl CalSans mt-4 text-gray-900">
          Preguntas <span className="text-gray-400 italic">Frecuentes</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* COLUMNA IMAGEN (Visual) */}
        <div className="lg:col-span-5 relative group h-full hidden lg:block">
          <div className="sticky top-10">
            <Image
              src={faqBanner}
              alt="Persona consultando información sobre la iglesia"
              placeholder="blur"
              className="rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl max-w-[200px] border border-gray-100">
               <p className="text-[#00338d] font-bold text-3xl">24/7</p>
               <p className="text-gray-500 text-xs uppercase font-bold tracking-tighter">Soporte Espiritual para tu vida</p>
            </div>
          </div>
        </div>

        {/* COLUMNA FAQ (Contenido) */}
        <div className="lg:col-span-7 w-full">
          <div className="divide-y divide-gray-300 border-t border-gray-300">
            {FAQ_DATA.map((item, index) => (
              <FAQItem 
                key={item.id}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          {/* FOOTER DE SECCIÓN */}
          <footer className="mt-12 p-8 rounded-3xl bg-white/50 border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="GolosText text-gray-600 italic">
              ¿No encuentras lo que buscas?
            </p>
            <button className="px-8 py-3 bg-[#00338d] text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95">
              Contáctanos directamente
            </button>
          </footer>
        </div>

      </div>
    </section>
  );
}

/**
 * Subcomponente FAQItem: Encapsula la lógica de cada pregunta
 * para mantener el archivo principal limpio.
 */
function FAQItem({ item, isOpen, onToggle }: { item: any, isOpen: boolean, onToggle: () => void }) {
  return (
    <article className="transition-all duration-300">
      <button
        className="w-full flex justify-between items-center py-8 text-left focus:outline-none group focus-visible:ring-2 focus-visible:ring-[#00338d] rounded-lg"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <div className="flex items-center gap-6">
          <h3 className={`text-2xl font-bold transition-colors duration-300 ${isOpen ? "text-[#00338d]" : "text-[#00338d]/20"}`}>
            {item.id < 10 ? `0${item.id}` : item.id}
          </h3>
          <span className={`text-lg md:text-xl GolosText font-semibold transition-colors duration-300 ${isOpen ? "text-[#00338d]" : "text-gray-800"}`}>
            {item.question}
          </span>
        </div>
        
        {/* ICONO DE ESTADO */}
        <div 
          className={`text-2xl transition-all duration-500 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 ${
            isOpen ? "rotate-45 bg-[#00338d] text-white" : "text-gray-400 group-hover:text-gray-600 group-hover:bg-gray-200"
          }`}
          aria-hidden="true"
        >
          <i className="ri-add-line"></i>
        </div>
      </button>

      {/* CONTENEDOR DE RESPUESTA: Usamos Grid para animar el height de 0 a auto */}
      <div 
        id={`faq-answer-${item.id}`}
        role="region"
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-10" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pl-14 md:pl-16">
            <p className="GolosText text-gray-600 text-lg leading-relaxed border-l-4 border-[#00338d]/20 pl-6 italic">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
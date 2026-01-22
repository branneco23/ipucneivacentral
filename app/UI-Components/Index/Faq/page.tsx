"use client";

import { useState, useEffect } from "react";
import faqData from "@/app/JsonData/FaqData.json";
import Image from "next/image";
import faqBanner from "@/public/img/faq-banner.jpg";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!mounted) return null;

  return (
    <section className="px-[8%] lg:px-[12%] py-24 bg-[#f6f6f6]">
      {/* --- ENCABEZADO --- */}
      <div className="flex flex-col lg:flex-row gap-10 mb-20">
        <div className="w-full lg:w-1/3 title">
          <span className="rounded-full border border-gray-400/50 px-6 py-2 GolosText uppercase font-bold text-[10px] tracking-widest text-gray-600">
            Preguntas Frecuentes
          </span>
        </div>
        <div className="w-full lg:w-2/3">
          <h1 className="CalSans text-4xl md:text-7xl leading-tight text-gray-900">
            Respuestas claras sobre <br />
            <span className="text-[#00338d]">Nuestra Doctrina</span>
          </h1>
        </div>
      </div>

      {/* --- CONTENIDO EN DOS COLUMNAS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* COLUMNA IZQUIERDA: IMAGEN (Ocupa 5 columnas en desktop) */}
        <div className="lg:col-span-5 w-full lg:sticky lg:top-32">
          <div className="relative group">
            {/* Elemento decorativo detrás de la imagen */}
            <div className="absolute -inset-4 bg-[#00338d]/5 rounded-[2.5rem] -z-10 transition-transform group-hover:scale-105 duration-500"></div>

            <Image
              src={faqBanner}
              alt="Estudio Bíblico Doctrina"
              // h-[250px] es un poco más amigable en pantallas pequeñas
              className="rounded-[2rem] shadow-2xl object-cover w-full h-[250px] md:h-[500px] lg:h-[600px] transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Badge flotante sobre la imagen */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[200px]">
              <i className="ri-double-quotes-l text-[#00338d] text-3xl mb-2"></i>
              <p className="GolosText text-sm font-medium text-gray-800 italic">
                "Oye, Israel: Jehová nuestro Dios, Jehová uno es."
              </p>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: ACORDEÓN (Ocupa 7 columnas en desktop) */}
        <div className="lg:col-span-7 w-full">
          <div className="divide-y divide-gray-300 border-t border-gray-300">
            {faqData.faqs.map((item, index) => (
              <div key={item.id} className="transition-all duration-300">
                <button
                  className="w-full flex justify-between items-center py-8 text-left focus:outline-none group"
                  onClick={() => toggle(index)}
                >
                  <div className="flex items-center gap-6">
                    <h3 className={`text-2xl font-bold transition-colors duration-300 ${openIndex === index ? "text-[#00338d]" : "text-[#00338d]/30"}`}>
                      {item.id}
                    </h3>
                    <span className={`text-lg md:text-xl GolosText font-semibold transition-colors duration-300 ${openIndex === index ? "text-[#00338d]" : "text-gray-800"}`}>
                      {item.question}
                    </span>
                  </div>
                  <div className={`text-2xl transition-all duration-300 ${openIndex === index ? "rotate-45 text-[#00338d]" : "text-gray-400 group-hover:text-gray-600"}`}>
                    <i className="ri-add-line"></i>
                  </div>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden
                    ${openIndex === index
                      ? "max-h-[500px] opacity-100 pb-10"
                      : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="pl-14 md:pl-16">
                    <p className="GolosText text-gray-600 text-lg leading-relaxed border-l-4 border-[#00338d]/20 pl-6 italic">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- FOOTER DE LA SECCIÓN --- */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-gray-400 GolosText text-sm italic">
              <div className="flex items-center gap-2">
                <i className="ri-book-2-line text-lg text-[#00338d]/60"></i>
                <p>
                  Basado en los <span className="font-bold text-gray-500">Artículos de Fe</span> de la IPUC.
                </p>
              </div>
              <a
                href="https://ipuc.org.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00338d] font-bold not-italic hover:underline flex items-center gap-1 transition-colors"
              >
                Fuente oficial
                <i className="ri-external-link-line"></i>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
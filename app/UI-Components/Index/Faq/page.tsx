"use client";

import { useState, useEffect } from "react";
// Ajusta la ruta de importación según tu estructura de carpetas
import faqData from "@/app/JsonData/FaqData.json";

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
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
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

      {/* --- LISTA DE ACORDEÓN --- */}
      <div className="max-w-5xl ml-auto">
        <div className="divide-y divide-gray-300 border-t border-gray-300">
          {faqData.faqs.map((item, index) => (
            <div key={item.id} className="py-2 transition-all duration-300">
              <button 
                className="w-full flex justify-between items-center py-8 text-left focus:outline-none group" 
                onClick={() => toggle(index)}
              >
                <div className="flex items-center gap-6">
                  <h3 className="text-3xl font-bold text-[#00338d]/40 group-hover:text-[#00338d] transition-colors">
                    {item.id}
                  </h3>
                  <span className="text-xl md:text-2xl GolosText font-semibold text-gray-800">
                    {item.question}
                  </span>
                </div>
                <div className={`text-3xl transition-transform duration-300 ${openIndex === index ? "rotate-45 text-[#00338d]" : "text-gray-400"}`}>
                  <i className="ri-add-line"></i>
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden
                  ${openIndex === index 
                    ? "max-h-[500px] opacity-100 pb-8" 
                    : "max-h-0 opacity-0 py-0"
                  }`}
              >
                <div className="pl-16 pr-8">
                  <p className="GolosText text-gray-600 text-lg leading-relaxed border-l-4 border-[#00338d]/20 pl-6 italic">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- REFERENCIA BIBLIOGRÁFICA --- */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-gray-400 GolosText text-sm italic">
            <div className="flex items-center gap-2">
              <i className="ri-book-2-line text-lg"></i>
              <p>
                Basado en los <span className="font-bold text-gray-500">Artículos de Fe</span> de la Iglesia Pentecostal Unida de Colombia.
              </p>
            </div>
            <a 
              href="https://ipuc.org.co/articulosdefe/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00338d] font-bold not-italic hover:underline flex items-center gap-1"
            >
              Consultar fuente oficial
              <i className="ri-external-link-line"></i>
            </a>
          </div>
        </footer>
      </div>
      <div className="w-full lg:w-1/3 pt-5">

      </div>
    </section>
  );
}
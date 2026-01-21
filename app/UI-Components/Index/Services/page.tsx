"use client";

import { useState, useEffect } from "react";
import doctrinaData from "../../../JsonData/DoctrinaData.json";

interface DoctrinaItem {
  id: string;
  title: string;
  content: string;
}

export default function Doctrina() {
  // ID abierto o null
  const [openId, setOpenId] = useState<string | null>(null);

  // Evita problemas de hidratación
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (!mounted) return null;

  return (
    <section className="px-[8%] lg:px-[12%] pt-16 pb-20 relative bg-[#f6f6f6] overflow-hidden">
      {/* ---------- ENCABEZADO ---------- */}
      <header className="flex flex-col lg:flex-row gap-10 mb-16 relative z-10">
        <div className="w-full lg:w-1/3 pt-2">
          <span className="rounded-full border border-gray-400/50 px-6 py-2 GolosText uppercase font-bold text-[10px] tracking-[0.2em] text-gray-600">
            Nuestra Doctrina
          </span>
        </div>

        <div className="w-full lg:w-2/3">
          <h2 className="CalSans text-4xl md:text-6xl mb-6 leading-tight text-gray-900">
            Nosotros Predicamos Lo Que <br />
            <span className="text-[#00338d]">
              La Palabra de Jesucristo
            </span>{" "}
            Nos Enseña
          </h2>
        </div>
      </header>

      {/* ---------- ACORDEÓN ---------- */}
      <div className="flex flex-col border-t border-gray-300 relative z-10">
        {doctrinaData.map((item: DoctrinaItem) => {
          const isOpen = openId === item.id;

          return (
            <article
              key={item.id}
              className={`border-b border-gray-300 transition-colors ${
                isOpen ? "bg-white" : ""
              }`}
            >
              {/* BOTÓN */}
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                className="w-full py-10 px-4 flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-6">
                  <span
                    className={`text-4xl CalSans transition-colors ${
                      isOpen ? "text-[#00338d]" : "text-gray-300"
                    }`}
                  >
                    {item.id.padStart(2, "0")}
                  </span>

                  <h3
                    className={`text-2xl md:text-3xl CalSans transition-colors ${
                      isOpen ? "text-[#00338d]" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                <span
                  className={`text-3xl transition-transform duration-300 ${
                    isOpen
                      ? "rotate-45 text-[#00338d]"
                      : "text-gray-400"
                  }`}
                >
                  <i className="ri-add-line"></i>
                </span>
              </button>

              {/* CONTENIDO (NO SE CORTA) */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 pb-16"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-4 lg:pl-36 lg:pr-[15%]">
                  <div
                    className="GolosText text-gray-600 leading-[1.8] text-lg whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ---------- FOOTER ---------- */}
      <footer className="mt-12 pt-8 border-t border-gray-200 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-4 text-gray-400 GolosText text-sm italic">
          <div className="flex items-center gap-2">
            <i className="ri-book-read-line text-lg"></i>
            <p>
              Contenido basado en los{" "}
              <span className="font-bold text-gray-500">
                Artículos de Fe
              </span>{" "}
              de la Iglesia Pentecostal Unida de Colombia.
            </p>
          </div>

          <a
            href="https://ipuc.org.co/articulosdefe/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00338d] font-bold not-italic hover:underline flex items-center gap-1"
          >
            Ver fuente original
            <i className="ri-external-link-line"></i>
          </a>
        </div>
      </footer>
    </section>
  );
}

"use client"; // Importante para usar useState en Next.js

import { useState } from "react";
import Image from "next/image";
import Service1 from "@/public/img/service-1.jpg";
import Service2 from "@/public/img/service-2.jpg";
import Service3 from "@/public/img/service-3.jpg";
import Service4 from "@/public/img/service-4.jpg";

// Importación de la data (usa la ruta relativa que te funcionó)
import doctrinaData from "../../../JsonData/DoctrinaData.json";

const imageMap: any = {
  Service1,
  Service2,
  Service3,
  Service4,
};

export default function Services() {
  // Estado para rastrear qué punto está abierto (null = todos cerrados)
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="px-[8%] lg:px-[12%] pt-20 pb-60 service relative bg-[#f6f6f6]">
      {/* --- ENCABEZADO --- */}
      <div className="flex flex-col lg:flex-row gap-10 mb-20">
        <div className="w-full lg:w-1/3 title pt-8">
          <span className="rounded-full title-span border border-gray-400 px-6 py-2 GolosText uppercase font-bold text-xs tracking-widest">
            Nuestra Doctrina
          </span>
        </div>
        <div className="w-full lg:w-2/3">
          <h1 className="CalSans text-4xl md:text-6xl mb-6 leading-tight">
            Nosotros Predicamos Lo Que <br />
            <span className="text-(--prim)">La Palabra de Jesucristo</span> Nos
            Enseña
          </h1>
          <div className="text-gray-500 GolosText space-y-4 text-lg">
            <p>
              Toda la Escritura es inspirada por Dios, y útil para enseñar, para
              redargüir, para corregir, para instruir en justicia...
            </p>
            <span className="text-(--prim) font-bold block">
              2 Timoteo 3: 16-17
            </span>
          </div>
        </div>
      </div>

      {/* --- LISTA TIPO ACORDEÓN --- */}
      <div className="flex flex-col border-t border-gray-300">
        {doctrinaData.map((item: any) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="border-b border-gray-400 transition-all duration-500 hover:bg-white/40"
            >
              {/* CABECERA DEL ACORDEÓN (Clickable) */}
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full py-10 px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 w-full">
                  <span
                    className={`text-4xl CalSans transition-colors duration-300 ${
                      isOpen ? "text-(--prim)" : "text-gray-300"
                    }`}
                  >
                    {item.id}
                  </span>
                  <h2 className="text-3xl md:text-4xl CalSans">{item.title}</h2>
                </div>

                {/* Icono + o - */}
                <div
                  className={`text-3xl transition-transform duration-500 ${
                    isOpen ? "rotate-45 text-(--prim)" : "rotate-0"
                  }`}
                >
                  <i className="bi bi-plus-lg"></i>
                </div>
              </button>

              {/* CONTENIDO DESPLEGABLE */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  isOpen
                    ? "max-h-[1000px] opacity-100 pb-12"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 flex flex-col lg:flex-row justify-between items-start gap-10">
                  <div className="w-full lg:w-[70%] lg:pl-24">
                    <p
                      className="GolosText text-gray-500 leading-relaxed text-lg text-justify whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>

                  {/* Imagen que solo se ve al abrir */}
                  <div className="relative overflow-hidden shrink-0 h-[240px] w-full lg:w-[320px] rounded-2xl border-2 border-black shadow-xl">
                    <Image
                      src={imageMap[item.image] || Service1}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

"use client";
import React, { useRef } from "react";

export default function RevistaLibro({ historia }: { historia: any }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!historia) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // En PC movemos el ancho completo del contenedor (que equivale a 2 páginas)
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-slate-100 py-10 md:py-16 px-2">
      <div className="max-w-6xl mx-auto">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-serif font-black text-slate-900 uppercase">
            {historia.titulo}
          </h1>
          <div className="w-16 h-1 bg-orange-600 mx-auto mt-4"></div>
        </div>

        {/* CONTENEDOR MAESTRO DEL LIBRO */}
        <div className="relative max-w-5xl mx-auto group">
          
          {/* Lomo central (Solo Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10 z-20 shadow-[0_0_10px_rgba(0,0,0,0.1)]"></div>

          {/* Carrusel con Snap */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-hidden snap-x snap-mandatory bg-[#fdfbf7] shadow-2xl rounded-lg border border-slate-200"
          >
            {/* 1. PORTADA INTERNA */}
            <div className="flex-none w-full md:w-1/2 snap-start h-[550px] md:h-[650px] p-10 flex flex-col justify-center items-center text-center border-r border-slate-100">
              <i className="ri-book-read-fill text-5xl text-orange-600 mb-6"></i>
              <p className="text-xl italic text-slate-700 font-serif leading-relaxed">
                "{historia.introduccion}"
              </p>
            </div>

            {/* 2. GENERACIÓN DE PÁGINAS DINÁMICAS */}
            {historia.capitulos.map((cap: any, capIdx: number) => {
              // Separamos por saltos de línea dobles o sencillos para estructurar párrafos limpios
              const parrafos = cap.contenido.split('\n').filter((p: string) => p.trim() !== "");
              
              // Agrupamos los párrafos en bloques de 2 o 3 para que quepan bien por página sin desbordar
              const TAMANO_PAGINA = 2; 
              const paginasAgrupadas = [];
              for (let i = 0; i < parrafos.length; i += TAMANO_PAGINA) {
                paginasAgrupadas.push(parrafos.slice(i, i + TAMANO_PAGINA));
              }

              return paginasAgrupadas.map((bloqueParrafos: string[], pIdx: number) => {
                const esUltimaPaginaDelCapitulo = pIdx === paginasAgrupadas.length - 1;

                return (
                  <div 
                    key={`${capIdx}-${pIdx}`}
                    className="flex-none w-full md:w-1/2 snap-start h-[550px] md:h-[650px] p-6 md:p-12 border-r border-slate-100 flex flex-col justify-between"
                  >
                    {/* Encabezado de la página */}
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                      <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block max-w-[70%] truncate">
                        {cap.rango || `Capítulo ${capIdx + 1}`}
                      </span>
                      <span className="text-slate-300 font-serif text-sm whitespace-nowrap">
                        pág. {capIdx + 1}.{pIdx + 1}
                      </span>
                    </div>

                    {/* Contenido con scroll interno sutil por si el texto es muy largo */}
                    <div className="flex-grow overflow-y-auto pr-1 custom-scrollbar space-y-4 text-justify">
                      {bloqueParrafos.map((parrafo: string, index: number) => {
                        // Detectar si el párrafo es un título interno destacado (como los que pusiste con **)
                        if (parrafo.startsWith("**") && parrafo.endsWith("**")) {
                          return (
                            <h3 key={index} className="text-lg font-bold text-slate-900 font-serif pt-2 text-left text-orange-700">
                              {parrafo.replace(/\*\*/g, "")}
                            </h3>
                          );
                        }
                        return (
                          <p key={index} className="text-slate-800 text-base md:text-lg leading-relaxed font-serif">
                            {parrafo}
                          </p>
                        );
                      })}
                    </div>

                    {/* Caja de desafío e información del capítulo al final */}
                    {esUltimaPaginaDelCapitulo && (
                      <div className="mt-4 space-y-2 flex-none">
                        {cap.cita && (
                          <p className="text-xs text-slate-400 italic font-serif">
                            📖 Citas: {cap.cita}
                          </p>
                        )}
                        {cap.reto && (
                          <div className="bg-orange-50 p-3 rounded-xl border-l-4 border-orange-500">
                            <p className="text-[10px] font-black text-orange-800 uppercase mb-0.5">⚔️ El Desafío</p>
                            <p className="text-xs italic text-slate-600 leading-snug">{cap.reto}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              });
            })}

            {/* 3. PÁGINA FINAL */}
            <div className="flex-none w-full md:w-1/2 snap-start h-[550px] md:h-[650px] p-10 flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center mb-6">
                <i className="ri-check-line text-4xl"></i>
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-800 uppercase tracking-widest">Fin</h3>
              <p className="text-slate-400 mt-2 text-xs uppercase tracking-widest">Ministerio Infantil</p>
            </div>
          </div>

          {/* BOTONES DE NAVEGACIÓN */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-[-25px] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-xl hover:bg-orange-600 hover:text-white transition-all z-30"
          >
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </button>

          <button 
            onClick={() => scroll("right")}
            className="absolute right-[-25px] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-xl hover:bg-orange-600 hover:text-white transition-all z-30"
          >
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </button>
        </div>

        <p className="text-center text-slate-400 font-serif italic text-sm mt-8">
          Usa las flechas para pasar las hojas
        </p>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar {
          display: block;
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Importación de datos
import { EXPERTISE_DATA, SLIDE_IMAGES } from "@/app/JsonData/ExpertiseData";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

export default function Expertise() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#f6f6f6]">
      
      {/* SECCIÓN AZUL: INFORMACIÓN DE CULTOS */}
      <article className="bg-[#00338d] px-[6%] md:px-[8%] lg:px-[12%] pt-20 pb-44 md:pb-60">
        <header className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-16 relative z-10">
          <div className="w-full lg:w-1/3 pt-1">
            <span className="inline-block rounded-full border border-white/20 bg-white/5 px-5 py-1.5 text-white text-[10px] uppercase font-bold tracking-[0.2em] backdrop-blur-md">
              Nuestros Cultos
            </span>
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="CalSans text-3xl md:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
              Construyendo el lugar perfecto <br />
              <span className="text-white/40 italic font-serif font-normal">donde tu alma encuentra</span> su verdadera paz
            </h2>
          </div>
        </header>

        {/* Grilla con imágenes totalmente contenidas y centradas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {EXPERTISE_DATA.map((item, idx) => (
            <div
              key={item.id}
              className="group flex flex-col transition-all duration-500 ease-out lg:translate-y-[calc(30px*var(--idx))]"
              style={{ "--idx": idx } as React.CSSProperties}
            >
              {/* Contenedor Blanco de la Imagen */}
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-white p-6 shadow-xl flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* Textos del Culto */}
              <div className="mt-5 px-2">
                <h3 className="text-lg md:text-xl CalSans text-white mb-1 group-hover:text-blue-200 transition-colors tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/60 text-xs font-normal GolosText">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* SECCIÓN ASIDE: SLIDER CORREGIDO (CENTRADO VERTICAL Y HORIZONTAL SIN CORTES) */}
      <aside className="relative px-[6%] md:px-[8%] lg:px-[12%] -mt-16 md:-mt-28 z-20 pb-16">
        <div className="expertise-main-slider rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.3)] bg-black w-full relative">
          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Autoplay, Navigation, Pagination]}
            speed={1000}
            grabCursor={true}
            // Definimos alturas fijas por pantalla para que el contenedor controle el espacio
            className="w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[560px]"
          >
            {SLIDE_IMAGES.map((slide, index) => (
              <SwiperSlide key={index} className="w-full h-full relative flex items-center justify-center overflow-hidden bg-black">
                
                {/* 1. CAPA DE FONDO DIFUMINADA: Evita laterales vacíos si la foto es muy vertical */}
                <div className="absolute inset-0 w-full h-full opacity-35 blur-2xl scale-110 pointer-events-none z-0">
                  <Image
                    src={slide}
                    alt="Atmósfera de fondo"
                    fill
                    sizes="10vw"
                    className="object-cover"
                  />
                </div>

                {/* 2. IMAGEN PRINCIPAL: Centrada arriba/abajo/lados y 100% COMPLETA sin cortes */}
                <div className="relative w-full h-full flex items-center justify-center z-10 p-2 md:p-4">
                  <Image
                    src={slide}
                    alt={`Vista de la congregación ${index + 1}`}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1400px"
                    // object-contain rescata las dimensiones completas arriba/abajo y centra todo
                    className="object-contain max-w-full max-h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                    priority={index === 0}
                  />
                </div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="flex justify-center mt-5">
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.25em] font-bold GolosText">
            Desliza para ver más • IPUC Central Neiva
          </p>
        </div>
      </aside>

      {/* Estilos UI personalizados para los controles de Swiper */}
      <style jsx global>{`
        .expertise-main-slider .swiper-button-next,
        .expertise-main-slider .swiper-button-prev {
          color: #ffffff !important;
          background: rgba(0, 51, 141, 0.6);
          backdrop-filter: blur(4px);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .expertise-main-slider .swiper-button-next:after,
        .expertise-main-slider .swiper-button-prev:after {
          font-size: 15px !important;
          font-weight: bold;
        }
        .expertise-main-slider .swiper-pagination-bullet-active {
          background: #ffffff !important;
          width: 18px !important;
          border-radius: 4px !important;
        }
        .expertise-main-slider .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
}
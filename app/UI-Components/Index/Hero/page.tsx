"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Estilos de Swiper
import "swiper/css";

// Importación de assets
const PARTNERS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/img/partner${i + 1}.svg`,
  alt: `Logo institucional ${i + 1}`
}));

export default function Hero() {
  return (
    <>
      <section className="hero relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="hero-hg-elm absolute inset-0 pointer-events-none select-none" aria-hidden="true" />
        <div className="hero-hg-elm2 absolute inset-0 pointer-events-none select-none" aria-hidden="true" />

        <div className="container-fluid w-full px-[8%] lg:px-[12%] py-20 z-10">
          <header className="hero-content max-w-5xl">
            <span className="hero-span inline-block mb-6 px-4 py-2 rounded-md bg-[#00338d] text-white font-black text-sm tracking-[0.2em] uppercase shadow-lg">
              IPUC Neiva Central
            </span>

            <h1 className="CalSans text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-white mb-8 tracking-tight">
              ENCUÉNTRATE <br />
              <span className="text-outline">CON </span> <br />
              <span className="text-blue-500">JESUCRISTO...</span>
            </h1>

            <blockquote className="mb-12 border-l-4 border-blue-500/50 pl-6 py-2">
              <p className="text-white/95 text-xl md:text-3xl lg:text-4xl GolosText font-medium leading-relaxed max-w-3xl drop-shadow-md">
                &ldquo;No temas, porque yo te{" "}
                <span className="text-blue-400 font-bold">redimí</span>; te puse nombre, mío
                eres tú.&rdquo;
              </p>
              <footer className="mt-4 text-lg lg:text-xl font-bold text-white/60">
                — <cite className="not-italic">Isaías 43:1</cite>
              </footer>
            </blockquote>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="https://www.biblegateway.com/passage/?search=Isa%C3%ADas%2043%3A1&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-blue-700 hover:bg-blue-600 text-white px-10 py-5 rounded-full font-black text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(29,78,216,0.4)] flex items-center gap-3 w-fit"
              >
                <i className="ri-book-open-line text-2xl group-hover:scale-110 transition-transform" aria-hidden="true"></i>
                <span>Leer en RV1960</span>
              </Link>
            </div>
          </header>
        </div>
      </section>

      {/* SECCIÓN DE LOGOS (PARTNERS) CON ICONOS MÁS GRANDES */}
      <section className="px-[8%] lg:px-[12%] py-24 bg-[#fcfcfc] border-y border-gray-100" aria-label="Nuestras alianzas">
        <Swiper
          spaceBetween={40} // Más espacio entre logos
          loop={true}
          centeredSlides={true}
          autoplay={{ 
            delay: 2500, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          modules={[Autoplay]}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="partner-swiper"
        >
          {PARTNERS.map((partner) => (
            <SwiperSlide key={partner.id}>
              <div className="flex justify-center items-center py-6">
                {/* Contenedor más grande y con mejor padding */}
                <div className="bg-white border border-gray-100 w-full max-w-[220px] aspect-[3/2] flex items-center justify-center rounded-[2rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 group">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={200} // Aumentado
                    height={100} // Aumentado
                    className="grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100 object-contain w-[75%] h-auto transform group-hover:scale-110"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
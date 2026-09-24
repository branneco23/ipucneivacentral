"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const PARTNERS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/img/partner${i + 1}.svg`,
  alt: `Logo institucional ${i + 1}`
}));

export default function Hero() {
  return (
    <>
      {/* SECCIÓN HERO - Eliminado min-h-screen rígido; ahora es dinámico y usa h-auto si el alto colapsa */}
      <section className="hero relative min-h-screen lg:min-h-0 lg:h-auto flex flex-col justify-center overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="hero-hg-elm absolute inset-0 pointer-events-none select-none" aria-hidden="true" />
        <div className="hero-hg-elm2 absolute inset-0 pointer-events-none select-none" aria-hidden="true" />

        <div className="container-fluid w-full px-[6%] md:px-[8%] lg:px-[12%] z-10 my-auto">
          <header className="hero-content max-w-4xl mx-auto lg:mx-0">
            
            {/* Tag superior optimizado */}
            <span
              style={{ fontFamily: "var(--GolosText)" }}
              className="hero-span inline-block mb-3 md:mb-4 px-3.5 py-1.5 rounded-md bg-[#00338d] text-white font-black text-xs tracking-[0.2em] uppercase shadow-lg"
            >
              IPUC Neiva Central
            </span>

            {/* Títulos controlados por altura de pantalla (si el alto es menor a 768px por el zoom, el texto encoge) */}
            <h1 className="CalSans text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] text-white mb-4 md:mb-5 tracking-tight [screen_and_(max-height:740px)]:text-5xl [screen_and_(max-height:740px)]:leading-[0.90]">
              ENCUÉNTRATE <br />
              <span className="text-outline">CON </span> <br />
              <span className="text-blue-500">JESUCRISTO...</span>
            </h1>

            {/* Cita bíblica con espaciados y tamaños adaptables al colapso vertical */}
            <blockquote className="mb-5 md:mb-6 border-l-4 border-blue-500/50 pl-4 md:pl-6 py-0.5 [screen_and_(max-height:740px)]:mb-4">
              <p className="text-white/95 text-lg md:text-2xl lg:text-2xl xl:text-3xl GolosText font-medium leading-relaxed max-w-2xl drop-shadow-md [screen_and_(max-height:740px)]:text-xl [screen_and_(max-height:740px)]:leading-normal">
                &ldquo;No temas, porque yo te{" "}
                <span className="text-blue-400 font-bold">redimí</span>; te puse nombre, mío
                eres tú.&rdquo;
              </p>
              <footer className="mt-1.5 text-xs md:text-sm font-bold text-white/60">
                — <cite className="not-italic">Isaías 43:1</cite>
              </footer>
            </blockquote>

            {/* Botón de acción con padding equilibrado */}
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="https://www.biblegateway.com/passage/?search=Isa%C3%ADas%2043%3A1&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--GolosText)" }}
                className="group bg-blue-700 hover:bg-blue-600 text-white px-7 py-3.5 md:px-8 md:py-4 rounded-full font-black text-sm md:text-base transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(29,78,216,0.4)] flex items-center gap-2.5 w-fit [screen_and_(max-height:740px)]:py-3"
              >
                <i className="ri-book-open-line text-lg md:text-xl group-hover:scale-110 transition-transform" aria-hidden="true"></i>
                <span>Leer en RV1960</span>
              </Link>
            </div>
          </header>
        </div>
      </section>

      {/* SECCIÓN DE LOGOS (PARTNERS) */}
      <section
        style={{ fontFamily: "var(--GolosText)" }}
        className="relative px-[6%] lg:px-[10%] py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100/80 overflow-hidden"
        aria-label="Nuestras alianzas e instituciones"
      >
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00338d]/60 bg-blue-50 px-3 py-1 rounded-full">
            Alianzas y Redes
          </span>
          <h2 className="text-xs md:text-sm font-semibold text-slate-400 mt-2 tracking-wide">
            Entidades e instituciones vinculadas a nuestro trabajo espiritual
          </h2>
        </div>

        <div className="max-w-7xl mx-auto">
          <Swiper
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            modules={[Autoplay]}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 16 },
              480: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 24 },
              1280: { slidesPerView: 5, spaceBetween: 28 },
            }}
            className="partner-swiper !overflow-visible"
          >
            {PARTNERS.map((partner) => (
              <SwiperSlide key={partner.id} className="!h-auto py-4">
                <div className="flex justify-center items-center h-full">
                  <div className="bg-white border border-slate-100/70 w-full max-w-[200px] aspect-[16/10] flex items-center justify-center rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_35px_rgba(0,51,141,0.08)] hover:border-blue-200/60 transition-all duration-500 ease-out group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={160}
                      height={80}
                      className="grayscale opacity-40 contrast-75 transition-all duration-500 ease-out will-change-transform md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:contrast-100 md:group-hover:scale-105 group-active:grayscale-0 group-active:opacity-100 group-active:scale-102 object-contain w-[68%] h-auto"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
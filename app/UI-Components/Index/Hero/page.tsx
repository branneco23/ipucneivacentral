"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Estilos de Swiper
import "swiper/css";

// Importación optimizada de Assets
import partner1 from "@/public/img/partner1.svg";
import partner2 from "@/public/img/partner2.svg";
import partner3 from "@/public/img/partner3.svg";
import partner4 from "@/public/img/partner4.svg";
import partner5 from "@/public/img/partner5.svg";
import partner6 from "@/public/img/partner6.svg";
import partner7 from "@/public/img/partner7.svg";
import partner8 from "@/public/img/partner8.svg";
import partner9 from "@/public/img/partner9.svg";

const PARTNERS_LOGOS = [
  partner1, partner2, partner3, partner4, partner5, 
  partner6, partner7, partner8, partner9
];

export default function Hero() {
  return (
    <>
      <section className="hero relative min-h-screen flex items-center overflow-hidden">
        {/* Elementos decorativos de fondo (HG Elms) */}
        <div className="hero-hg-elm absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="hero-hg-elm2 absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="container-fluid w-full px-[8%] lg:px-[12%] py-10 z-10">
          <header className="hero-content max-w-5xl">
            <span className="hero-span inline-block mb-6 px-4 py-2 rounded-md bg-[#00338d] text-white font-black text-sm tracking-widest uppercase">
              IPUC Neiva Central
            </span>

            <h1 className="CalSans text-5xl md:text-7xl lg:text-9xl leading-[0.9] text-white mb-8">
              ENCUÉNTRATE <br />
              <span className="text-outline">CON </span> <br />
              <span className="text-blue-500">JESUCRISTO...</span>
            </h1>

            <blockquote className="mb-10 space-y-4">
              <p className="text-white/90 text-xl md:text-3xl lg:text-4xl GolosText font-medium leading-relaxed max-w-3xl drop-shadow-lg">
                &ldquo;No temas, porque yo te{" "}
                <span className="text-blue-400">redimí</span>; te puse nombre, mío
                eres tú.&rdquo;
              </p>
              <footer className="text-lg lg:text-xl font-bold text-white/70 italic">
                — Isaías 43:1
              </footer>
            </blockquote>

            <div className="flex flex-wrap items-center gap-6 mt-12">
              <Link
                href="https://www.biblegateway.com/passage/?search=Isa%C3%ADas%2043%3A1&version=RVR1960"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-blue-700 hover:bg-blue-600 text-white px-10 py-5 rounded-full font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 w-fit"
              >
                <i className="ri-book-open-line text-2xl group-hover:rotate-12 transition-transform"></i>
                Leer en RV1960
              </Link>
            </div>
          </header>
        </div>
      </section>

      {/* SECCIÓN DE LOGOS (PARTNERS) */}
      <section className="px-[10%] lg:px-[14%] py-16 bg-white" aria-label="Nuestras alianzas">
        <Swiper
          spaceBetween={40}
          loop={true}
          autoplay={{ 
            delay: 2500, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          modules={[Autoplay]}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: { slidesPerView: 3 },
            991: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
          }}
          className="partner-swiper"
        >
          {PARTNERS_LOGOS.map((logo, index) => (
            <SwiperSlide key={`partner-${index}`}>
              <div className="partner-item flex justify-center items-center">
                <div className="partner-card bg-gray-50 p-6 rounded-2xl hover:bg-white transition-colors duration-300">
                  <Image
                    src={logo}
                    alt={`Logo institucional ${index + 1}`}
                    width={180}
                    height={80}
                    className="partner-img grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 object-contain"
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
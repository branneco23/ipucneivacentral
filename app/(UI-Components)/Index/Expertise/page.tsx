"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Importación de datos y estilos
import { EXPERTISE_DATA, SLIDE_IMAGES } from "@/app/JsonData/ExpertiseData";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-fade";

const CASCADE_OFFSET = 40; 

export default function Expertise() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#f6f6f6]">
      {/* SECCIÓN AZUL: INFORMACIÓN DE CULTOS */}
      <article className="bg-[#00338d] px-[8%] lg:px-[12%] pt-20 pb-52 md:pb-72">
        <header className="flex flex-col lg:flex-row gap-10 mb-24">
          <div className="w-full lg:w-1/3">
            <span className="inline-block rounded-full border border-white/30 bg-white/5 px-6 py-2 text-white text-[10px] uppercase font-bold tracking-[0.2em] backdrop-blur-sm">
              Nuestros Cultos
            </span>
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="CalSans text-4xl md:text-7xl text-white leading-[1.1]">
              Construyendo el lugar perfecto <br />
              <span className="text-white/40 italic">donde tu alma encuentra</span> su verdadera paz
            </h2>
          </div>
        </header>

        {/* Grilla de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXPERTISE_DATA.map((item, idx) => (
            <div
              key={item.id}
              className="group transition-all duration-700 ease-out"
              style={{
                transform: isMounted 
                  ? `translateY(calc(${CASCADE_OFFSET}px * ${idx}))` 
                  : "translateY(0px)",
              }}
            >
              {/* Contenedor de Imagen: Quitamos h-[400px] para que dependa de la imagen */}
              <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-blue-900/20">
                <Image
                  src={item.image}
                  alt={item.title}
                  // Usamos estas propiedades para ajuste automático de ancho/alto
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }} 
                  className="transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00338d]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="mt-8 px-2">
                <h3 className="text-2xl CalSans text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <hr className="border-white/10 mb-4 w-12 group-hover:w-full transition-all duration-500" />
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* SECCIÓN ASIDE: SLIDER DE GALERÍA */}
      <aside className="relative px-[8%] lg:px-[12%] -mt-12 md:-mt-24 z-20 pb-20">
        <div className="expertise-main-slider rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white">
          <Swiper
            slidesPerView={1}
            loop={true}
            autoHeight={true} // Swiper se ajusta a la altura de la imagen actual
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, EffectFade]}
            speed={1500}
            grabCursor={true}
            className="w-full"
          >
            {SLIDE_IMAGES.map((slide, index) => (
              <SwiperSlide key={index} className="relative">
                <Image
                  src={slide}
                  alt={`Vista de la congregación ${index + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  className="block"
                  priority={index === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="flex justify-center mt-8">
          <p className="text-gray-400 text-xs uppercase tracking-[0.3em] font-medium">
            Desliza para ver más • IPUC Central
          </p>
        </div>
      </aside>
    </section>
  );
}
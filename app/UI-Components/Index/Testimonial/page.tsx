"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

// Importación de datos y estilos
import data from "@/app/JsonData/TestimonialsData.json";
import "swiper/css";
import "swiper/css/pagination";

const SWIPER_CONFIG = {
  modules: [Autoplay, Pagination],
  pagination: { clickable: true },
  autoplay: { delay: 5000, disableOnInteraction: false },
  speed: 1000,
  className: "pb-16 testimonial-swiper"
};

export default function Testimoniales() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const googleMapsUrl = "https://maps.google.com/?q=IPUC+Neiva+Central+Calle+8+9-24";

  return (
    <section className="relative flex flex-col-reverse lg:flex-row bg-[#f6f6f6] min-h-[750px] overflow-hidden">
      
      {/* --- LADO IZQUIERDO: MAPA --- */}
      <div className="relative w-full lg:w-1/2 h-[550px] lg:h-auto group px-4 py-4 lg:px-8 lg:py-8">
        <div className="relative w-full h-full overflow-hidden rounded-[40px] shadow-2xl bg-gray-200 border border-gray-100">
          <div className="absolute inset-0 bg-[#00338d]/5 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />

          {isClient && (
            <iframe
              width="100%"
              height="100%"
              title="Ubicación de IPUC Neiva Central en el mapa"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-75.2870%2C2.9265%2C-75.2820%2C2.9305&layer=mapnik&marker=2.92858%2C-75.28457"
              className="w-full h-full grayscale group-hover:grayscale-0 contrast-[1.1] transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
              style={{ border: 0 }}
              loading="lazy"
            />
          )}

          {/* Card Flotante */}
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-8 left-8 z-20 hidden md:block hover:translate-y-[-5px] transition-transform duration-300"
          >
            <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00338d] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <i className="ri-map-pin-2-fill text-2xl" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">Ubicación</p>
                  <p className="text-gray-900 font-bold leading-none">Barrio El Altico</p>
                </div>
              </div>
            </div>
          </a>

          {/* Botón CTA */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full px-10 max-w-md">
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#00338d] hover:bg-neutral-900 text-white py-5 rounded-2xl font-bold transition-all duration-500 shadow-2xl uppercase tracking-[0.15em] text-xs"
            >
              <i className="ri-navigation-fill text-xl" />
              Obtener indicaciones
            </a>
          </div>
        </div>
      </div>

      {/* --- LADO DERECHO: CONTENIDO --- */}
      <div className="w-full lg:w-1/2 px-[8%] lg:px-[10%] py-24 bg-white flex flex-col justify-center">
        <div className="max-w-xl">
          <span className="inline-block px-5 py-2 rounded-full border border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">
            Comunidad & Testimonios
          </span>
          
          <h2 className="CalSans text-5xl md:text-7xl text-gray-900 leading-[1.05] mb-6 tracking-tight">
            Lo que nuestra <br />
            <span className="text-[#00338d]">comunidad</span> comparte
          </h2>

          {/* Rating Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 py-8 border-b border-gray-50">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-gray-900 tracking-tighter">4.7</span>
              <div className="space-y-1">
                <div className="flex text-yellow-400 text-lg">
                  {[...Array(4)].map((_, i) => <i key={i} className="ri-star-fill" />)}
                  <i className="ri-star-half-fill" />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Google Maps Score</p>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-gray-100" />

            <div className="text-gray-500 max-w-[240px]">
              <p className="font-bold text-sm italic leading-snug">
                Calle 8 # 9-24, Neiva. <br />
                <span className="text-xs font-medium not-italic text-blue-600">Puertas abiertas todos los días.</span>
              </p>
            </div>
          </div>

          {/* Swiper Testimonials */}
          <div className="pt-4 min-h-[300px]">
            <Swiper {...SWIPER_CONFIG}>
              {data.testimonios.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="flex flex-col gap-8">
                    <p className="GolosText text-2xl md:text-3xl font-medium text-gray-700 leading-relaxed italic">
                      &ldquo;{item.desc}&rdquo;
                    </p>
                    
                    <div className="flex items-center gap-5">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-md ring-4 ring-gray-50">
                        <Image 
                          src={item.image} 
                          alt={`Foto de ${item.name}`} 
                          fill 
                          className="object-cover"
                          sizes="56px" 
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900 leading-none mb-1">{item.name}</h4>
                        <p className="text-[#00338d] text-[10px] font-black uppercase tracking-widest">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
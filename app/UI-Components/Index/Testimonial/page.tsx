"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

// Importación del JSON
import data from "@/app/JsonData/TestimonialsData.json";

// Estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";

export default function Testimoniales() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // URL Real de Google Maps para IPUC Neiva Central
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=IPUC+Neiva+Central+Calle+8+9-24";

  if (!mounted) return null;

  return (
    <section className="relative flex flex-col-reverse lg:flex-row bg-[#f6f6f6] min-h-[750px] overflow-hidden">
      
      {/* --- LADO IZQUIERDO: MAPA PREMIUM --- */}
      <div className="relative w-full lg:w-1/2 h-[550px] lg:h-auto group px-4 py-4 lg:px-8 lg:py-8">
        <div className="relative w-full h-full overflow-hidden rounded-[40px] shadow-2xl bg-gray-200">
          <div className="absolute inset-0 bg-[#00338d]/10 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-700"></div>

          <iframe
            width="100%"
            height="100%"
            title="Ubicación IPUC Neiva"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-75.2917%2C2.9285%2C-75.2867%2C2.9325&layer=mapnik&marker=2.9306%2C-75.2891"
            className="w-full h-full grayscale group-hover:grayscale-0 contrast-125 transition-all duration-1000 ease-in-out scale-110 group-hover:scale-100"
            style={{ border: 0 }}
          ></iframe>

          {/* Card Flotante (Clickable) */}
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-8 left-8 z-20 hidden md:block hover:scale-105 transition-transform"
          >
            <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/50 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00338d] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <i className="ri-map-pin-2-fill text-2xl"></i>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ubicación</p>
                  <p className="text-gray-900 font-bold">Barrio El Altico</p>
                </div>
              </div>
            </div>
          </a>

          {/* Botón CTA Principal */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full px-10 max-w-md">
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#00338d] hover:bg-black text-white py-5 rounded-2xl font-bold transition-all duration-500 shadow-2xl uppercase tracking-widest text-xs"
            >
              <i className="ri-navigation-fill text-xl"></i>
              ¿Cómo llegar ahora?
            </a>
          </div>
        </div>
      </div>

      {/* --- LADO DERECHO: CONTENIDO --- */}
      <div className="w-full lg:w-1/2 px-[8%] lg:px-[10%] py-24 bg-white flex flex-col justify-center">
        <div className="max-w-xl">
          <span className="inline-block px-5 py-2 rounded-full border border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8">
            Comunidad & Testimonios
          </span>
          
          <h2 className="CalSans text-5xl md:text-7xl text-gray-900 leading-[1.1] mb-6">
            Lo que nuestra <br />
            <span className="text-[#00338d]">comunidad</span> comparte
          </h2>

          {/* Calificación 4.7 con Estrellas */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 py-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold text-gray-900">4.7</span>
              <div>
                <div className="flex text-yellow-400 text-xl">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-half-fill"></i>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Google Maps Score</p>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-gray-200"></div>

            <div className="text-gray-500">
              <p className="font-bold text-sm italic leading-tight">
                Calle 8 # 9-24, Barrio El Altico, Neiva. <br />
                <span className="text-xs font-medium not-italic underline decoration-[#00338d] underline-offset-4">Una comunidad de puertas abiertas.</span>
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              speed={1000}
              className="pb-16 testimonial-swiper"
            >
              {data.testimonios.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="flex flex-col gap-8">
                    <p className="GolosText text-2xl md:text-3xl font-medium text-gray-600 leading-relaxed italic">
                      "{item.desc}"
                    </p>
                    
                    <div className="flex items-center gap-5">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-50 flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900 leading-none mb-2">{item.name}</h4>
                        <p className="text-[#00338d] text-xs font-black uppercase tracking-widest">{item.role}</p>
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
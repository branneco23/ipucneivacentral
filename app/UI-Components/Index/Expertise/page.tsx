"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Estilos
import "swiper/css";

// Assets (Idealmente movidos a una constante de configuración)
import expertise1 from "@/public/img/expertise1.jpg";
import expertise2 from "@/public/img/expertise2.jpg";
import expertise3 from "@/public/img/expertise3.jpg";
import expertise4 from "@/public/img/expertise4.jpg";
import expertiseSlide1 from "@/public/img/banner-slide-1.jpg";
import expertiseSlide2 from "@/public/img/banner-slide-2.jpg";

interface ExpertiseItem {
  id: string;
  title: string;
  desc: string;
  image: StaticImageData;
}

const EXPERTISE_DATA: ExpertiseItem[] = [
  { id: "1", title: "Culto dirigido por Jóvenes", desc: "Martes, 13 de Enero 2026.", image: expertise2 },
  { id: "2", title: "Culto Oración y Enseñanza", desc: "Juevés, 15 de Enero 2026.", image: expertise3 },
  { id: "3", title: "Culto de Escuela Dominical", desc: "Sábado, 17 de Enero 2026.", image: expertise4 },
  { id: "4", title: "Culto de Escuela Dominical", desc: "Domingo, 18 de Enero 2026.", image: expertise4 }
];

const SLIDE_IMAGES = [expertiseSlide1, expertiseSlide2];

export default function Expertise() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* SECCIÓN AZUL PRINCIPAL */}
      <article className="bg-[#00338d] px-[8%] lg:px-[12%] pt-20 pb-40 md:pb-60">
        <header className="flex flex-col lg:flex-row gap-10 mb-16">
          <div className="w-full lg:w-1/3">
            <span className="inline-block rounded-full border border-white/30 px-6 py-2 text-white text-[10px] uppercase font-bold tracking-[0.2em]">
              Nuestros Cultos
            </span>
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="CalSans text-4xl md:text-7xl text-white leading-tight">
              Construyendo el lugar perfecto <br />
              <span className="text-white/40">donde tu alma encuentra</span> su verdadera paz
            </h2>
          </div>
        </header>

        {/* GRID DE TARJETAS CON EFECTO STAGGER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {EXPERTISE_DATA.map((item, idx) => (
            <div 
              key={item.id} 
              className="group transition-all duration-500"
              style={{ 
                // Evitamos el error de hidratación usando una variable CSS 
                // que solo se activa si el componente está montado
                transform: isMounted ? `translateY(calc(var(--stagger-offset, 0px) * ${idx}))` : 'none',
                '--stagger-offset': '40px' 
              } as React.CSSProperties}
            >
              <div className="relative h-[400px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="mt-8">
                <h3 className="text-2xl CalSans text-white mb-3 group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>
                <hr className="border-white/10 mb-4" />
                <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* SECCIÓN DEL SLIDER (SOLAPAMIENTO) */}
      <aside className="relative px-[8%] lg:px-[12%] -mt-20 md:-mt-32 z-20">
        <div className="expertise-main-slider rounded-[3rem] overflow-hidden border-[6px] border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <Swiper 
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[Autoplay]}
            speed={1200}
            className="w-full h-[350px] md:h-[500px]"
          >
            {SLIDE_IMAGES.map((slide, index) => (
              <SwiperSlide key={index}>
                <Image 
                  src={slide} 
                  alt={`Banner de actividades ${index + 1}`} 
                  fill 
                  className="object-cover"
                  sizes="90vw"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </aside>
    </section>
  );
}
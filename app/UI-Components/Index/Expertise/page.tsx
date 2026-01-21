"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

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
  { id: "1", title: "Culto Oración y Enseñanza", desc: "Jueves, 15 de Enero 2026.", image: expertise2 },
  { id: "2", title: "Culto de Escuela Dominical", desc: "Sábado, 17 de Enero 2026.", image: expertise3 },
  { id: "3", title: "Culto de Escuela Dominical", desc: "Domingo, 18 de Enero 2026 ", image: expertise4 },
  { id: "4", title: "Culto de Ujieres", desc: "Martes, 20 de Enero 2026.", image: expertise4 },
];

const SLIDE_IMAGES = [expertiseSlide1, expertiseSlide2];

export default function Expertise() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* SECCIÓN AZUL */}
      <article className="bg-[#00338d] px-[8%] lg:px-[12%] pt-20 pb-52 md:pb-72">
        <header className="flex flex-col lg:flex-row gap-10 mb-16">
          <div className="w-full lg:w-1/3">
            <span className="inline-block rounded-full border border-white/30 px-6 py-2 text-white text-[10px] uppercase font-bold tracking-[0.2em]">
              Nuestros Cultos
            </span>
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="CalSans text-4xl md:text-7xl text-white leading-tight">
              Construyendo el lugar perfecto <br />
              <span className="text-white/40">
                donde tu alma encuentra
              </span>{" "}
              su verdadera paz
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXPERTISE_DATA.map((item, idx) => (
            <div
              key={item.id}
              className="group transition-all duration-500"
              style={{
                transform: isMounted
                  ? `translateY(calc(40px * ${idx}))`
                  : "none",
              }}
            >
              <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="mt-8">
                <h3 className="text-2xl CalSans text-white mb-3">
                  {item.title}
                </h3>
                <hr className="border-white/10 mb-4" />
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* SLIDER (BAJADO) */}
      <aside className="relative px-[8%] lg:px-[12%] -mt-8 md:-mt-16 z-20">
        <div className="expertise-main-slider">
          <Swiper
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000 }}
            modules={[Autoplay]}
            speed={1200}
            className="w-full h-[350px] md:h-[500px]"
          >
            {SLIDE_IMAGES.map((slide, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={slide}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </aside>
    </section>
  );
}

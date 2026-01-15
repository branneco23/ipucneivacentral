"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import partner1 from "@/public/img/partner1.svg";
import partner2 from "@/public/img/partner2.svg";
import partner3 from "@/public/img/partner3.svg";
import partner4 from "@/public/img/partner4.svg";
import partner5 from "@/public/img/partner5.svg";
import partner6 from "@/public/img/partner6.svg";
import partner7 from "@/public/img/partner7.svg";
import partner8 from "@/public/img/partner8.svg";
import partner9 from "@/public/img/partner9.svg";

import Image from "next/image";

const Partners = [
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
  partner8,
  partner9,
];

export default function Hero() {
  return (
    <>
      <div className="hero">
        <div className="hero-hg-elm"></div>
        <div className="hero-hg-elm2"></div>

        <div className="w-full px-[8%] lg:px-[12%] py-10 z-10">
          <div className="hero-content max-w-4xl">
            <span className="hero-span GolosText font-black px-4 py-2 rounded-md inline-block mb-6">
              IPUC Neiva Central
            </span>

            <h1 className="text-2xl lg:text-9xl CalSans leading-[0.9] text-white">
              ENCUÉNTRATE <br />
              <span className="text-outline">CON </span> <br />
              <span className="text-blue-500">JESUCRISTO...</span>
            </h1>

            <p className="text-white/90 text-2xl lg:text-4xl GolosText font-medium leading-relaxed w-full md:w-[70%] drop-shadow-md">
              "No temas, porque yo te{" "}
              <span className="text-blue-400">redimí</span>; te puse nombre, mío
              eres tú."
              <br />
              <span className="text-lg lg:text-xl font-bold opacity-70">
                — Isaías 43:1
              </span>
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="https://www.biblegateway.com/passage/?search=Isa%C3%ADas%2043%3A1&version=RVR1960"
                target="_blank"
                className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-xl flex items-center gap-3 w-fit"
              >
                <i className="ri-book-open-line text-2xl"></i>
                Leer en RV1960
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="px-[10%] lg:px-[14%] pb-12">
        <Swiper
          spaceBetween={30}
          loop
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            1200: { slidesPerView: 5 },
            991: { slidesPerView: 4 },
            575: { slidesPerView: 2 },
            0: { slidesPerView: 2 },
          }}
          className="partner-swiper"
        >
          {Partners.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="partner-item">
                <div className="partner-card">
                  <Image
                    src={img}
                    alt="Partner logo"
                    width={660}
                    height={660}
                    className="partner-img"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

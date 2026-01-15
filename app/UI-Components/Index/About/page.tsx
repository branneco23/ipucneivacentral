"use client";

import CountUp from "react-countup";
import Image from "next/image";

// Importación corregida apuntando a la carpeta img dentro de public
import AboutImg1 from "@/public/img/AboutImg1.jpg";
import AboutImg2 from "@/public/img/AboutImg2.jpg";
import AboutImg3 from "@/public/img/AboutImg3.jpg";

const statsData = [
  {
    startValue: 1956, // Año inicial
    value: 2026,      // Año final (2026 según el contexto actual)
    suffix: "",
    title: "Años de trayectoria",
    desc: "Trayectoria del evangelio de Jesucristo a los hogares durante décadas."
  },
  {
    startValue: 0,
    value: 60, 
    suffix: "+",
    title: "Años predicando el evangelio",
    desc: "Trabajando activamente en la formación espiritual y social."
  },
  {
    startValue: 0,
    value: 400,
    suffix: "+",
    title: "Hermanos asistentes de la congregación",
    desc: "Hermonos que se congregan a la sede Central."
  },
  {
    startValue: 0,
    value: 100,
    suffix: "+",
    title: "Amigos asistiendo a los servicios de la congregación",
    desc: "Amigos que se congregan a la sede Central."
  },
];

export default function About() {
  return (
    <>
      <div className="px-[8%] lg:px-[12%] py-20 about">
        {/* Cabecera de la sección */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/3 title pt-8">
            <span className="rounded-full title-span border border-gray-400 px-6 GolosText uppercase font-bold">
              Sobre la IPUC
            </span>
          </div>
          <div className="w-full lg:w-2/3">
            <h1 className="CalSans text-4xl md:text-7xl">
              Nosotros Predicamos Lo Que <span className="text-(--prim)">La Palabra de Jesucristo</span> Nos Enseña
            </h1>
          </div>
        </div>

        {/* Galería de imágenes con efecto escalonado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-20">
          <div className="about-image">
            <Image src={AboutImg1} alt="About-img" className="rounded-3xl transition-all duration-300 hover:-translate-y-1.5" />
          </div>
          <div className="about-image lg:pt-10">
            <Image src={AboutImg2} alt="About-img" className="rounded-3xl transition-all duration-300 hover:-translate-y-1.5" />
          </div>
          <div className="about-image lg:pt-20">
            <Image src={AboutImg3} alt="About-img" className="rounded-3xl transition-all duration-300 hover:-translate-y-1.5" />
          </div>
        </div>
      </div>

      {/* Sección de Estadísticas / Contadores */}
      <div className="px-[8%] lg:px-[12%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
        {statsData.map((item, index) => (
          <div key={index} className="about-card">
            <h2 className="text-5xl tracking-wider CalSans font-bold mb-6">
              <CountUp
                start={item.startValue} // Comienza en el año definido
                end={item.value}        // Termina en el año actual
                duration={3}
                separator=""            // Evita que ponga comas en los años (ej: 2,026)
                enableScrollSpy
                scrollSpyOnce={true}
              />
              {item.suffix}
            </h2>
            <div className="about-content py-6 border-t border-gray-400">
              <h3 className="mb-3 text-2xl CalSans">{item.title}</h3>
              <p className="text-gray-400 GolosText">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
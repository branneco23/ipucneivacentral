"use client";

import React from "react";

// --- DATOS REALES (Misión y Visión de la IPUC) ---
const PHILOSOPHY_DATA = [
  {
    id: "mision",
    title: "Misión",
    desc: "Predicar el evangelio de nuestro Señor Jesucristo, estableciendo iglesias y formando discípulos que glorifiquen a Dios en toda su manera de vivir.",
    icon: "ri- direction-line",
  },
  {
    id: "vision",
    title: "Visión",
    desc: "Ser una iglesia unida, en constante crecimiento espiritual y numérico, impactando a la sociedad con el poder transformador de la Palabra.",
    icon: "ri-eye-line",
  },
];

export default function Philosophy() {
  return (
    <section className="px-[8%] lg:px-[12%] py-20 bg-white">
      {/* HEADER DE SECCIÓN */}
      <header className="title mb-12">
        <span className="inline-block rounded-full title-span border border-gray-300 px-6 py-1 GolosText uppercase text-xs font-bold tracking-widest text-gray-500">
          El sentido de nuestra fe
        </span>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 items-stretch">
        {/* COLUMNA IZQUIERDA: IMAGEN Y TÍTULO */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div className="pricing-wrap relative min-h-[400px] flex-grow rounded-3xl overflow-hidden shadow-xl">
            {/* El estilo viene del CSS: .pricing-wrap:after para el overlay */}
          </div>
        </div>

        {/* COLUMNA DERECHA: TARJETAS DE MISIÓN/VISIÓN */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-6">
            {PHILOSOPHY_DATA.map((item) => (
              <article
                key={item.id}
                className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-start gap-4 mb-4">
                   <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-[#00338d] text-2xl group-hover:bg-[#00338d] group-hover:text-white transition-colors duration-300">
                     <i className={item.icon}></i>
                   </div>
                   <h3 className="GolosText font-bold text-3xl text-gray-800">
                    {item.title}
                  </h3>
                </div>
                
                <p className="GolosText text-lg leading-relaxed text-gray-600">
                  {item.desc}
                </p>
                
                {/* Línea decorativa */}
                <div className="mt-6 h-1 w-12 bg-[#00338d] rounded-full opacity-20 group-hover:w-full group-hover:opacity-100 transition-all duration-700"></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
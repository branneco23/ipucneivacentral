"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHILOSOPHY_DATA = [
  {
    id: "mision",
    title: "Misión",
    badge: "Nuestra Labor",
    desc: "Cumplir el mandamiento del Señor Jesucristo de predicar las verdades del Evangelio a todas las personas: familias, niños, jóvenes y ancianos que El Señor Jesucristo nos permita llegar.",
    icon: "ri-direction-line", // Corregido espacio en blanco que rompía RemixIcon
    bgGradient: "linear-gradient(135deg, rgba(0, 51, 141, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
  },
  {
    id: "vision",
    title: "Visión",
    badge: "Nuestro Futuro",
    desc: "Convertirnos en una sede de la IPUC en Neiva Huila donde fomentamos el crecimiento espiritual. Incentivar la visión de todos sus asistentes para cumplir la gran comisión, propendiendo la unidad de la fe, para crecimiento de todos en la sana doctrina, generando ambientes y principios en el desarrollo del ser humano en todas las áreas de su vida.",
    icon: "ri-eye-line",
    bgGradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(0, 51, 141, 0.95) 100%)",
  },
];

export default function Philosophy() {
  // Estado para saber cuál tarjeta tiene el foco/hover activo (por defecto la primera)
  const [activeTab, setActiveTab] = useState<string>("mision");

  return (
    <section className="px-[6%] md:px-[8%] lg:px-[12%] py-16 md:py-24 bg-white relative overflow-hidden">
      
      {/* ---------- HEADER DE SECCIÓN ---------- */}
      <header className="title mb-14 relative z-10">
        <span className="inline-block rounded-full title-span border border-gray-300 px-5 py-1.5 GolosText uppercase text-[10px] font-bold tracking-[0.2em] text-gray-500 bg-gray-50/50">
          El sentido de nuestra fe
        </span>
      </header>

      {/* ---------- GRID CONTENEDOR PRINCIPAL ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
        
        {/* COLUMNA IZQUIERDA: Tarjeta Visual Mutante Dinámica (Ocupa 5 de 12 columnas) */}
        <div className="w-full lg:col-span-5 flex flex-col min-h-[320px] md:min-h-[450px]">
          <div className="pricing-wrap relative w-full h-full flex-grow rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col justify-end p-8 md:p-10">
            
            {/* CAPA DE GRADIENTE DINÁMICO QUE CAMBIA SEGÚN EL HOVER */}
            <AnimatePresence mode="wait">
              {PHILOSOPHY_DATA.map((item) => item.id === activeTab && (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none mix-blend-multiply"
                  style={{ background: item.bgGradient, zIndex: 1 }}
                />
              ))}
            </AnimatePresence>

            {/* TEXTO EMERGENTE DENTRO DEL BANNER */}
            <div className="relative z-10 text-white space-y-2">
              <AnimatePresence mode="wait">
                {PHILOSOPHY_DATA.map((item) => item.id === activeTab && (
                  <motion.div
                    key={item.id}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  >
                    <span className="text-white/60 GolosText uppercase font-bold text-xs tracking-widest block mb-1">
                      {item.badge}
                    </span>
                    <h4 className="CalSans text-3xl md:text-4xl tracking-tight">
                      IPUC Neiva Central
                    </h4>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Bloques Interactivos (Ocupa 7 de 12 columnas) */}
        <div className="w-full lg:col-span-7 flex flex-col justify-center gap-5">
          {PHILOSOPHY_DATA.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <motion.article
                key={item.id}
                onMouseEnter={() => setActiveTab(item.id)}
                onClick={() => setActiveTab(item.id)} // Funcionalidad táctil para móviles
                layout
                animate={{
                  backgroundColor: isActive ? "#ffffff" : "#f8fafc",
                  borderColor: isActive ? "#00338d" : "rgba(241, 245, 249, 1)",
                  boxShadow: isActive 
                    ? "0 25px 45px -12px rgba(0, 51, 141, 0.08)" 
                    : "0 2px 4px rgba(0,0,0,0.01)"
                }}
                transition={{ type: "spring", stiffness: 140, damping: 22 }}
                className="group p-6 md:p-8 rounded-3xl border cursor-pointer select-none relative"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    {/* Contenedor del Icono */}
                    <motion.div 
                      animate={{
                        backgroundColor: isActive ? "#00338d" : "rgba(0, 51, 141, 0.06)",
                        color: isActive ? "#ffffff" : "#00338d"
                      }}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                    >
                      <i className={`${item.icon} flex items-center justify-center`}></i>
                    </motion.div>

                    <h3 className={`GolosText font-bold text-2xl md:text-3xl tracking-tight transition-colors duration-300
                      ${isActive ? "text-[#00338d]" : "text-slate-800"}`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Micro-indicador de estado activo */}
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <i className={`ri-arrow-right-s-line text-slate-400 transition-transform duration-300 ${isActive ? "rotate-90 text-[#00338d]" : ""}`}></i>
                  </div>
                </div>
                
                {/* Texto descriptivo */}
                <p className="GolosText text-sm md:text-base leading-relaxed text-slate-600 max-w-[95%]">
                  {item.desc}
                </p>
                
                {/* Barra de progreso de lectura elástica */}
                <div className="mt-5 relative h-[3px] w-full bg-slate-200/60 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: isActive ? "100%" : "12%" }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="absolute top-0 left-0 h-full bg-[#00338d] rounded-full"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
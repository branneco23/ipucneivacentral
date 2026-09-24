"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { DOCTRINA_DATA as doctrinaData } from "../../../JsonData/DoctrinaData";

interface DoctrinaItem {
  id: string;
  title: string;
  content: string;
}

function DoctrinaCard({ 
  item, 
  isOpen, 
  onToggle 
}: { 
  item: DoctrinaItem; 
  isOpen: boolean; 
  onToggle: () => void; 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Coordenadas base del mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Valores de rotación para el efecto Tilt 3D
  const rotateXBase = useMotionValue(0);
  const rotateYBase = useMotionValue(0);

  // Suavizado dinámico de las físicas elásticas para que la inclinación sea fluida
  const rotateX = useSpring(rotateXBase, { stiffness: 150, damping: 25 });
  const rotateY = useSpring(rotateYBase, { stiffness: 150, damping: 25 });

  function handleMouseMove(event: MouseEvent) {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    const x = event.clientX - left;
    const y = event.clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);

    // Cálculos de inclinación basados en la distancia al centro de la tarjeta
    const calculatedX = ((y / height) - 0.5) * -7; // Inclinación max 7 grados en X
    const calculatedY = ((x / width) - 0.5) * 7;   // Inclinación max 7 grados en Y

    rotateXBase.set(calculatedX);
    rotateYBase.set(calculatedY);
  }

  function handleMouseLeave() {
    // Al salir, el acordeón regresa elásticamente a su posición plana original
    rotateXBase.set(0);
    rotateYBase.set(0);
  }

  // Brillo radial magnético de alta intensidad (18% de opacidad)
  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(0, 51, 141, 0.18), transparent 80%)`
  );

  return (
    <div 
      style={{ perspective: "1000px" }} // Necesario para habilitar el espacio tridimensional
      className="relative"
    >
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        layout="position"
        style={{
          rotateX: isOpen ? 0 : rotateX,
          rotateY: isOpen ? 0 : rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: isOpen ? "#ffffff" : "rgba(255, 255, 255, 0)",
          boxShadow: isOpen ? "0 30px 60px -15px rgba(0, 51, 141, 0.18)" : "0 4px 6px -1px rgba(0, 0, 0, 0.01)"
        }}
        animate={{ 
          scale: isOpen ? 1.02 : 1,
          zIndex: isOpen ? 30 : 10
        }}
        whileHover={{ scale: isOpen ? 1.02 : 1.008 }}
        className={`border-b border-gray-300 relative group transition-colors duration-300
          ${isOpen ? "z-20" : "z-10"}`}
      >
        {/* EFECTO LINTERNA MAGNÉTICA */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{ background: spotlightBg }}
        />

        {/* BOTÓN DE APERTURA */}
        <button
          type="button"
          onClick={onToggle}
          className="w-full py-10 px-4 md:px-8 flex justify-between items-center text-left focus:outline-none relative z-10 select-none bg-transparent border-none"
          style={{ transition: "none", transform: "translateZ(30px)" }} // Empuja el contenido hacia el frente en el espacio 3D
        >
          <div className="flex items-center gap-5 md:gap-10 pointer-events-none">
            {/* Número Dinámico con Paraleje */}
            <motion.span
              animate={{ color: isOpen ? "#00338d" : "#cbd5e1" }}
              className="text-4xl md:text-6xl CalSans tracking-tighter shrink-0 block"
              style={{ transform: "translateZ(40px)" }}
            >
              {item.id.padStart(2, "0")}
            </motion.span>

            {/* Título de la Doctrina */}
            <h3
              className={`text-xl md:text-3.5xl CalSans tracking-tight transition-colors duration-300 pr-4
                ${isOpen ? "text-[#00338d]" : "text-gray-800 group-hover:text-black group-hover:translate-x-1"}`}
              style={{ transform: "translateZ(20px)", transition: "color 0.3s, transform 0.2s" }}
            >
              {item.title}
            </h3>
          </div>

          {/* Botón Circular + / x con Micro-Interacciones */}
          <motion.div
            animate={{ 
              rotate: isOpen ? 135 : 0,
              color: isOpen ? "#ffffff" : "#00338d",
              backgroundColor: isOpen ? "#00338d" : "rgba(0, 51, 141, 0.06)",
              scale: isOpen ? 1.1 : 1
            }}
            whileHover={{ scale: 1.25, rotate: isOpen ? 225 : 90 }}
            whileTap={{ scale: 0.85 }}
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 shadow-sm"
            style={{ transform: "translateZ(50px)" }}
          >
            <i className="ri-add-line flex items-center justify-center"></i>
          </motion.div>
        </button>

        {/* CONTENIDO DESPLEGABLE LÍQUIDO */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: {
                  height: { type: "spring", stiffness: 160, damping: 22 },
                  opacity: { duration: 0.25 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  height: { duration: 0.2, ease: "easeInOut" },
                  opacity: { duration: 0.15 }
                }
              }}
              className="overflow-hidden relative z-10"
            >
              <div className="px-4 pb-14 lg:pl-44 lg:pr-[15%]">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className="doctrina-html-content GolosText text-gray-600 leading-[1.9] text-base md:text-lg whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </div>
  );
}

export default function Doctrina() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (!mounted) return null;

  return (
    <section className="px-[6%] md:px-[8%] lg:px-[12%] pt-20 pb-24 relative bg-[#f6f6f6] overflow-hidden">
      {/* Estilos inyectados doctrinales */}
      <style jsx global>{`
        .doctrina-html-content ul {
          list-style-type: disc !important;
          margin-left: 1.5rem !important;
          margin-top: 1rem !important;
          margin-bottom: 1rem !important;
        }
        .doctrina-html-content li {
          margin-bottom: 0.6rem !important;
        }
        .doctrina-html-content b {
          font-weight: 700 !important;
          color: #111827;
        }
      `}</style>

      {/* ---------- ENCABEZADO ---------- */}
      <header className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-20 relative z-10">
        <div className="w-full lg:w-1/3 pt-2">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full border border-gray-400/40 px-6 py-2 GolosText uppercase font-bold text-[10px] tracking-[0.2em] text-gray-500 bg-white/60 shadow-2xs inline-block"
          >
            Nuestra Doctrina
          </motion.span>
        </div>

        <div className="w-full lg:w-2/3">
          <h2 className="CalSans text-3.5xl md:text-5xl lg:text-6xl mb-6 leading-[1.12] text-gray-900 tracking-tight">
            Nosotros Predicamos Lo Que <br className="hidden md:inline" />
            <span className="text-[#00338d]">La Palabra de Jesucristo</span> Nos Enseña
          </h2>
        </div>
      </header>

      {/* ---------- CONTENEDOR DE ACORDEONES ---------- */}
      <motion.div 
        layout="position"
        className="flex flex-col border-t border-gray-300 relative z-10"
      >
        {doctrinaData.map((item: DoctrinaItem) => (
          <DoctrinaCard
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggleAccordion(item.id)}
          />
        ))}
      </motion.div>

      {/* ---------- FOOTER ---------- */}
      <footer className="mt-16 pt-8 border-t border-gray-200 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-4 text-gray-400 GolosText text-sm italic">
          <div className="flex items-center gap-2 not-italic">
            <i className="ri-book-read-line text-lg text-gray-400"></i>
            <p className="text-gray-500">
              Contenido basado en los{" "}
              <span className="font-bold text-gray-700">Artículos de Fe</span> de la Iglesia Pentecostal Unida de Colombia.
            </p>
          </div>

          <a
            href="https://ipuc.org.co/en-que-creemos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00338d] font-bold not-italic hover:underline flex items-center gap-1 w-fit transition-colors"
          >
            Ver fuente original
            <i className="ri-external-link-line"></i>
          </a>
        </div>
      </footer>
    </section>
  );
}
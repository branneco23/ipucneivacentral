"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

interface AccordionProps {
  titulo: string;
  contenido: string[];
}

export default function Accordion({ titulo, contenido }: AccordionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Controladores de posición del mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: MouseEvent) {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }

  // Spotlight dinámico ultra-visible (Incrementado a 12% de opacidad para que resalte sobre tu fondo #f6f6f6)
  const backgroundStyle = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(0, 51, 141, 0.12), transparent 80%)`
  );

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      layout
      // Eliminamos overflow-hidden permanente para que se vean las sombras y escalas ampliadas
      className={`group border rounded-2xl mb-5 bg-white relative select-none transition-colors duration-300
        ${open 
          ? "border-[#00338d] z-20" 
          : "border-slate-200 hover:border-slate-400 z-10"
        }`}
      style={{
        // Forzamos la escala y la sombra por Framer Motion anulando conflictos de transiciones del CSS global
        boxShadow: open ? "0 25px 50px -12px rgba(0, 51, 141, 0.15)" : "0 4px 6px -1px rgba(0, 0, 0, 0.01)",
        scale: open ? 1.015 : 1
      }}
      whileHover={{ scale: open ? 1.015 : 1.005 }}
    >
      {/* CAPA LINTERNA: Ahora usa la clase 'group-hover' correctamente vinculada al padre */}
      <motion.div 
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: backgroundStyle }}
      />

      {/* BOTÓN PRINCIPAL */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center px-6 py-5 relative z-10 text-left gap-4 outline-none border-none bg-transparent"
        style={{ transition: "none" }} // Rompe el "transition: all" de hojas de estilo externas
      >
        <span className="text-base md:text-lg font-bold text-slate-800 group-hover:text-[#00338d] transition-colors duration-200 tracking-tight">
          {titulo}
        </span>
        
        {/* BOTÓN INTERACTIVO + / x */}
        <motion.div 
          animate={{ 
            rotate: open ? 45 : 0,
            backgroundColor: open ? "#00338d" : "rgba(241, 245, 249, 1)",
            color: open ? "#ffffff" : "#64748b"
          }}
          whileHover={{ scale: 1.25, rotate: open ? 135 : 90 }}
          whileTap={{ scale: 0.85 }}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      {/* CONTENIDO DESPLEGABLE CON OVERFLOW DINÁMICO */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: { height: { type: "spring", stiffness: 180, damping: 24 }, opacity: { duration: 0.2 } }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { height: { duration: 0.2, ease: "easeInOut" }, opacity: { duration: 0.1 } }
            }}
            className="overflow-hidden" // El overflow solo se aplica estrictamente durante la animación de apertura
          >
            <div className="px-6 pb-6 pt-2 space-y-2.5 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/60 relative z-10">
              {contenido.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22, delay: index * 0.04 }}
                  
                  // Desplazamiento reactivo al tacto del puntero
                  whileHover={{ 
                    x: 10, 
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="p-3 rounded-xl text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200/60 transition-all duration-150 cursor-default font-medium text-sm md:text-base flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00338d] opacity-50 mt-2 shrink-0" />
                  <p className="leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
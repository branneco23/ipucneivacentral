"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function VideoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Eliminamos la lógica de localStorage para que se ejecute siempre
    const timer = setTimeout(() => setIsOpen(true), 1500); // 1.5 segundos de delay

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-3xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Botón Cerrar */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-50 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full transition-all"
            >
              <X size={20} />
            </button>

            {/* Contenedor de Video */}
            <div className="aspect-video w-full bg-black">
              <video
                autoPlay
                muted
                controls
                playsInline
                className="w-full h-full object-contain"
                src="https://res.cloudinary.com/dbbzk99pj/video/upload/v1773631431/WhatsApp_Video_2026-03-11_at_9.20.16_PM_xuwutg.mp4"
              />
            </div>

            {/* Texto Inferior */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">¡Bienvenidos a IPUC Neiva Central!</h3>
              <p className="text-gray-500 text-sm mt-1">La Caravana Por La Vida.</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
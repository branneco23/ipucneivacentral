"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function VideoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState<any>(null);

  useEffect(() => {
    // Consultar en Firebase si hay un video pop-up activo
    const fetchActivePopup = async () => {
      try {
        const q = query(
          collection(db, "anuncios"),
          where("esPopup", "==", true),
          where("activoPopup", "==", true)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // Tomamos el primer anuncio pop-up activo encontrado
          const docData = querySnapshot.docs[0].data();
          setPopupData(docData);

          // Mostrar el popup después de 1.5 segundos
          const timer = setTimeout(() => setIsOpen(true), 1500);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Error al cargar el video pop-up:", error);
      }
    };

    fetchActivePopup();
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  // Si no hay datos o no está activo, no renderiza nada
  if (!popupData || !popupData.mediaUrl) return null;

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
              className="absolute top-4 right-4 z-50 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Contenedor de Video Dinámico */}
            <div className="aspect-video w-full bg-black">
              <video
                autoPlay
                muted
                controls
                playsInline
                className="w-full h-full object-contain"
                src={popupData.mediaUrl}
              />
            </div>

            {/* Texto Inferior Dinámico */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">
                {popupData.titulo || "¡Bienvenidos a IPUC Neiva Central!"}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {popupData.tag || "Anuncio Oficial"}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
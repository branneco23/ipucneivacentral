"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function VideoPopupCarousel() {
  const [popups, setPopups] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const q = query(
          collection(db, "anuncios"),
          where("esPopup", "==", true),
          where("activoPopup", "==", true)
        );
        const querySnapshot = await getDocs(q);
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        if (items.length > 0) {
          setPopups(items);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Error al cargar los pop-ups:", err);
      }
    };

    fetchPopups();
  }, []);

  if (!isOpen || popups.length === 0) return null;

  const currentPopup = popups[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % popups.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + popups.length) % popups.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 md:p-8">
      {/* Contenedor principal mucho más grande (max-w-5xl) */}
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col">
        
        {/* Cabecera del Pop-up */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-800 bg-slate-950/40">
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold block mb-1">
              Aviso Especial
            </span>
            <h3 className="font-bold text-white text-lg md:text-xl">
              {currentPopup.titulo || "Comunicado Oficial"}
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xl w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Reproductor de Video con mayor altura (max-h-[72vh]) */}
        <div className="relative w-full bg-black flex items-center justify-center max-h-[72vh] overflow-hidden">
          {currentPopup.mediaUrl ? (
            <video
              src={currentPopup.mediaUrl}
              controls
              autoPlay
              className="w-full h-auto max-h-[72vh] object-contain shadow-inner"
            />
          ) : (
            <p className="text-sm text-slate-500 py-24">No hay video disponible</p>
          )}
        </div>

        {/* Controles de Navegación y Paginación */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-slate-800 bg-slate-950/80">
          {popups.length > 1 ? (
            <button
              onClick={handlePrev}
              className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-6 py-3 rounded-2xl transition cursor-pointer shadow-md flex items-center gap-2"
            >
              ← Anterior
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {popups.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-indigo-500" : "w-2 bg-slate-700"
                }`}
              />
            ))}
            <span className="text-xs text-slate-400 font-semibold ml-3 tracking-wider">
              {currentIndex + 1} / {popups.length}
            </span>
          </div>

          {popups.length > 1 ? (
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-6 py-3 rounded-2xl transition cursor-pointer shadow-md shadow-indigo-600/30 flex items-center gap-2"
            >
              Siguiente →
            </button>
          ) : (
            <div />
          )}
        </div>

      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Ajusta esta ruta según tu estructura

interface AnuncioItem {
  id: string;
  bg: string;
  tag: string;
  title: string;
  fecha: string;
  hora: string;
  createdAt?: any;
}

export default function AnunciosSlider() {
  const [anuncios, setAnuncios] = useState<AnuncioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const collectionRef = collection(db, "anuncios");
    const qAnuncios = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(qAnuncios, (snapshot) => {
      const docs: AnuncioItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          bg: data.imagenUrl || data.imagen || data.bg || "/img/default-anuncio.jpg",
          tag: data.tag || "ANUNCIO",
          title: data.titulo || data.title || "Sin título",
          fecha: data.fecha || "Próximamente",
          hora: data.hora || "Por confirmar",
          createdAt: data.createdAt,
        };
      });

      setAnuncios(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!mounted) return null;

  const selectedAnuncio = anuncios.find((item) => item.id === selectedId);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-slate-950">
      <div className="px-6 md:px-16 lg:px-[12%] mb-12">
        <h2 className="text-white text-3xl md:text-5xl font-bold">
          Anuncios <span className="text-gray-400 font-normal italic font-serif">&amp;</span> Actividades
        </h2>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-16 lg:px-[12%] scrollbar-thin scrollbar-thumb-slate-800">
        {loading ? (
          <div className="text-slate-400 text-sm">Cargando anuncios...</div>
        ) : anuncios.length === 0 ? (
          <div className="text-slate-400 text-sm">No hay anuncios publicados por el momento.</div>
        ) : (
          anuncios.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative min-w-[320px] md:min-w-[400px] h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl bg-gray-900 border border-white/10 flex-shrink-0"
            >
              <img
                src={item.bg}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative h-full p-6 flex flex-col justify-between z-10">
                <span className="self-start text-xs font-bold text-white bg-blue-600/80 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                  {item.tag}
                </span>
                <div>
                  <h3 className="text-white text-2xl font-bold mb-2 leading-tight">{item.title}</h3>
                  <p className="text-white/70 text-sm font-medium">{item.fecha} — {item.hora}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* MODAL / VISTA AMPLIADA CON FRAMER MOTION */}
      <AnimatePresence>
        {selectedAnuncio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition font-bold"
              >
                ✕
              </button>

              <div className="relative h-72 md:h-96 w-full">
                <img
                  src={selectedAnuncio.bg}
                  alt={selectedAnuncio.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedAnuncio.tag}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-bold">{selectedAnuncio.title}</h3>
                <p className="text-slate-300 text-sm md:text-base font-medium">
                  Fecha y Hora: <span className="text-white font-bold">{selectedAnuncio.fecha} — {selectedAnuncio.hora}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
"use client";
import React, { useState, useEffect } from 'react';
import { db } from "@/lib/firebase"; 
import { collection, query, limit, onSnapshot } from "firebase/firestore";

interface DevocionalItem {
  id: string;
  titulo?: string;
  linkMeet?: string;
  link?: string;
  hora?: string;
  grupo?: string;
}

export default function DevocionalBanner() {
  const [devocional, setDevocional] = useState<DevocionalItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Quitamos orderBy temporalmente para evitar que falle si algún documento no tiene createdAt
    const q = query(
      collection(db, "devocionales"), 
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0];
        const data = docData.data();
        setDevocional({
          id: docData.id,
          titulo: data.titulo || "Unidos en Oración",
          link: data.linkMeet || data.link || "https://meet.google.com", 
          hora: data.hora || "4:30 AM",
          grupo: data.grupo || "Central",
        });
      } else {
        // Si no hay datos en Firebase, asignamos un objeto por defecto para que el banner SÍ se vea
        setDevocional({
          id: "default",
          titulo: "Mañana de Oración",
          link: "https://meet.google.com",
          hora: "4:30 AM",
          grupo: "Iglesia Central",
        });
      }
      setLoading(false);
    }, (error) => {
      console.error("Error al cargar devocional:", error);
      // Fallback seguro en caso de error de permisos o conexión
      setDevocional({
        id: "error",
        titulo: "Mañana de Oración",
        link: "https://meet.google.com",
        hora: "4:30 AM",
        grupo: "Iglesia Central",
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Si está cargando mostramos un estado sutil o mantenemos la estructura
  if (loading) {
    return (
      <div className="bg-[#00338d]/15 rounded-[2rem] p-8 text-center my-8 animate-pulse text-[#00338d] font-bold text-sm">
        Cargando espacio de devocionales...
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#00338d] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20 my-8">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">
              Devocional en Vivo: {devocional?.titulo}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black italic uppercase leading-none">
            Unidos en <br /> Oración
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#00338d] flex items-center justify-center shadow-lg">
                <span className="font-bold text-xl">🕒</span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-60">Hora de inicio</p>
                <p className="text-xl font-black italic">{devocional?.hora}</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-white/20" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg">
                <span className="font-bold text-xl">👥</span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-60">Dirigido por</p>
                <p className="text-xl font-black italic uppercase">{devocional?.grupo}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <a 
            href={devocional?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-5 bg-white text-[#00338d] rounded-2xl font-black text-lg uppercase italic transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95"
          >
            Unirme al Google Meet
          </a>
          <p className="text-xs font-bold opacity-60 uppercase tracking-tighter">
            * Conexión exclusiva para miembros y amigos
          </p>
        </div>
      </div>
    </section>
  );
}
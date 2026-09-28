"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Accordion from "@/app/Components/Accordion/Accordion";
import DevocionalBanner from "@/app/Components/DevocionalesBanner/DevocionalesBanner";
import { CULTOS_ACORDEON } from "@/app/JsonData/EventsData";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function MainLanding() {
  const [fechaReferencia, setFechaReferencia] = useState<Date | null>(null);
  const [eventosFirebase, setEventosFirebase] = useState<any[]>([]);

  useEffect(() => {
    // Sincronizar eventos desde Firebase en tiempo real
    const unsubscribe = onSnapshot(
      collection(db, "eventosCalendario"),
      (snapshot) => {
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("EVENTOS RECIBIDOS DE FIREBASE:", lista);
        setEventosFirebase(lista);
      },
      (error) => {
        console.error("ERROR AL CONECTAR CON FIREBASE (¿Problema de reglas o permisos?):", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const ahora = new Date();
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());
    setFechaReferencia(inicioSemana);
  }, []);

  const diasDeLaSemana = useMemo(() => {
    if (!fechaReferencia) return [];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(fechaReferencia);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [fechaReferencia]);

  const cambiarSemana = (offset: number) => {
    if (!fechaReferencia) return;
    const nuevaFecha = new Date(fechaReferencia);
    nuevaFecha.setDate(nuevaFecha.getDate() + offset * 7);
    setFechaReferencia(nuevaFecha);
  };

  const esHoy = (date: Date) => {
    const hoy = new Date();
    return date.getDate() === hoy.getDate() &&
      date.getMonth() === hoy.getMonth() &&
      date.getFullYear() === hoy.getFullYear();
  };

  const formatFechaLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!fechaReferencia) return null;

  return (
    <main className="relative bg-[#F8FAFC] pt-[calc(var(--navbar-height)+1rem)] md:pt-[calc(var(--navbar-height)+2rem)] overflow-x-hidden">

      {/* Hero Section */}
      <section className="px-5 sm:px-10 md:px-[8%] py-10 md:py-16 grid lg:grid-cols-12 gap-10 md:gap-16 items-center max-w-screen-2xl mx-auto">
        <div className="lg:col-span-5 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-[#00338d] mb-4 md:mb-6 uppercase tracking-tighter italic leading-tight">
            IPUC <br className="hidden md:block" /> Neiva Central
          </h1>
          <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg shadow-blue-200">
            <p className="text-xs font-bold tracking-widest uppercase">Agenda 2026</p>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-3 md:space-y-4 w-full">
          {CULTOS_ACORDEON.map((culto) => (
            <Accordion key={culto.id} titulo={culto.titulo} contenido={culto.contenido} />
          ))}
        </div>
      </section>

      {/* SECCIÓN DE DEVOCIONALES */}
      <div className="px-4 sm:px-10 md:px-[8%] max-w-screen-2xl mx-auto">
        <DevocionalBanner />
      </div>

      {/* CALENDARIO SEMANAL */}
      <section className="px-4 sm:px-10 md:px-[8%] py-12 max-w-screen-2xl mx-auto">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-tight">
              {diasDeLaSemana[0].toLocaleDateString('es-ES', { month: 'long' })}
              <span className="text-blue-600 ml-2">2026</span>
            </h2>
            <div className="flex w-full md:w-auto p-1.5 bg-white rounded-2xl shadow-xl border border-slate-100">
              <button onClick={() => cambiarSemana(-1)} className="flex-1 md:flex-none px-6 py-3 hover:bg-slate-50 rounded-xl font-bold text-slate-500 transition-all text-sm uppercase cursor-pointer">
                Anterior
              </button>
              <button onClick={() => cambiarSemana(1)} className="flex-1 md:flex-none px-6 py-3 bg-[#00338d] text-white rounded-xl font-bold transition-all text-sm uppercase cursor-pointer">
                Siguiente
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto md:overflow-x-visible">
              <div className="min-w-full md:min-w-[900px]">

                {/* Cabecera Días */}
                <div className="hidden md:grid grid-cols-7 bg-slate-50/50 border-b border-slate-100">
                  {diasDeLaSemana.map((dia, idx) => {
                    const checkHoy = esHoy(dia);
                    return (
                      <div key={idx} className={`p-6 text-center border-r border-slate-100 last:border-0 ${checkHoy ? 'bg-blue-50/50' : ''}`}>
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${checkHoy ? 'text-blue-600' : 'text-slate-400'}`}>
                          {dia.toLocaleDateString('es-ES', { weekday: 'short' })}
                        </p>
                        <p className={`text-3xl font-black inline-flex items-center justify-center w-12 h-12 rounded-xl ${checkHoy ? 'bg-[#00338d] text-white shadow-lg' : 'text-slate-800'
                          }`}>
                          {dia.getDate()}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Cuerpo de Eventos */}
                <div className="grid grid-cols-1 md:grid-cols-7">
                  {diasDeLaSemana.map((dia, idx) => {
                    const fechaStr = formatFechaLocal(dia); // Formato YYYY-MM-DD
                    const checkHoy = esHoy(dia);

                    // Filtramos los eventos de Firebase de manera ultra segura
                    const eventosDelDia = eventosFirebase.filter(e => {
                      const rawFecha = e.fecha ? String(e.fecha).trim() : "";
                      if (!rawFecha) return false;

                      const fechaEventoStr = rawFecha.split("T")[0];
                      return fechaEventoStr === fechaStr;
                    });

                    return (
                      <div key={idx} className={`p-4 md:p-6 border-b md:border-b-0 md:border-r border-slate-100 last:border-0 ${checkHoy ? 'bg-blue-50/20' : ''}`}>
                        <div className="flex md:hidden items-center justify-between mb-4">
                          <span className={`font-black uppercase text-sm tracking-widest ${checkHoy ? 'text-blue-600' : 'text-slate-400'}`}>
                            {dia.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}
                          </span>
                          {checkHoy && <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>}
                        </div>

                        <div className="space-y-3">
                          {eventosDelDia.map((evento) => (
                            <div key={evento.id}
                              className="p-4 rounded-2xl text-white shadow-sm border border-black/5 bg-[#00338d]">
                              <p className="text-[9px] font-black opacity-80 uppercase mb-1">
                                {evento.hora || "Todo el día"}
                              </p>
                              <p className="text-[12px] font-bold leading-tight uppercase italic">
                                {evento.titulo}
                              </p>
                              {evento.lugar && (
                                <p className="text-[10px] opacity-90 mt-1">📍 {evento.lugar}</p>
                              )}
                            </div>
                          ))}
                          {eventosDelDia.length === 0 && (
                            <div className="hidden md:block py-10 opacity-0 italic">Sin eventos</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
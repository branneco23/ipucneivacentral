"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Accordion from "@/app/Components/Accordion/Accordion";
import DevocionalBanner from "@/app/Components/DevocionalesBanner/DevocionalesBanner";
import { CULTOS_ACORDEON, EVENTOS_ANUALES_2026 } from "@/app/JsonData/EventsData";
import { db } from "@/lib/firebase"; // <--- Asegúrate de que esta ruta sea la correcta a tu configuración de Firebase
import { collection, onSnapshot } from "firebase/firestore";

export default function MainLanding() {
  const [fechaReferencia, setFechaReferencia] = useState<Date | null>(null);

  // Estado que combinará los eventos fijos del JSON + los de Firebase
  const [listaEventos, setListaEventos] = useState(EVENTOS_ANUALES_2026);

  useEffect(() => {
    // CORRECCIÓN DE FECHA: Crear hoy sin horas para evitar saltos de día en producción
    const ahora = new Date();
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());

    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());
    setFechaReferencia(inicioSemana);

    // CONEXIÓN A FIREBASE FIRESTORE EN TIEMPO REAL
    // CONEXIÓN A FIREBASE FIRESTORE EN TIEMPO REAL
    const unsubscribe = onSnapshot(collection(db, "eventosCalendario"), (snapshot) => {
      const eventosFirebase = snapshot.docs.map(doc => {
        const data = doc.data();

        // Asignamos un color por defecto (ej. azul #2563eb) si el documento no tiene el campo color
        let colorHex = '#2563eb';
        const colorText = (data.color || '').toLowerCase();

        if (colorText.includes('emerald')) colorHex = '#059669';
        else if (colorText.includes('purple') || colorText.includes('púrpura')) colorHex = '#7c3aed';
        else if (colorText.includes('blue') || colorText.includes('azul')) colorHex = '#2563eb';
        else if (colorText.includes('red') || colorText.includes('rojo')) colorHex = '#dc2626';
        else if (colorText.includes('green') || colorText.includes('verde')) colorHex = '#16a34a';
        else if (colorText.includes('yellow') || colorText.includes('amarillo')) colorHex = '#ca8a04';
        else if (colorText.includes('orange') || colorText.includes('naranja')) colorHex = '#ea580c';
        else if (colorText.includes('pink') || colorText.includes('rosa')) colorHex = '#db2777';
        else if (colorText.includes('indigo') || colorText.includes('índigo')) colorHex = '#4f46e5';
        else if (colorText.includes('teal') || colorText.includes('turquesa')) colorHex = '#0d9488';
        else if (colorText.includes('cyan') || colorText.includes('cian')) colorHex = '#0891b2';
        else if (colorText.includes('rose') || colorText.includes('rosado')) colorHex = '#e11d48';

        return {
          id: doc.id,
          titulo: data.titulo,
          fecha: data.fecha,
          inicio: data.hora || '00:00',
          fin: '',
          color: colorHex
        };
      });

      setListaEventos([...EVENTOS_ANUALES_2026, ...eventosFirebase]);
    }, (error) => {
      console.error("Error al cargar eventos de Firebase:", error);
    });

    return () => unsubscribe();
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
              <button onClick={() => cambiarSemana(-1)} className="flex-1 md:flex-none px-6 py-3 hover:bg-slate-50 rounded-xl font-bold text-slate-500 transition-all text-sm uppercase">
                Anterior
              </button>
              <button onClick={() => cambiarSemana(1)} className="flex-1 md:flex-none px-6 py-3 bg-[#00338d] text-white rounded-xl font-bold transition-all text-sm uppercase">
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
                    const fechaStr = formatFechaLocal(dia);
                    const checkHoy = esHoy(dia);
                    const eventosDelDia = listaEventos.filter(e => {
                      if (e.fechaFin) return fechaStr >= e.fecha && fechaStr <= e.fechaFin;
                      return e.fecha === fechaStr;
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
                              className="p-4 rounded-2xl text-white shadow-sm border border-black/5"
                              style={{ backgroundColor: evento.color || '#00338d' }}>
                              <p className="text-[9px] font-black opacity-80 uppercase mb-1">
                                {evento.inicio} {evento.fin && evento.fin !== evento.inicio ? `- ${evento.fin}` : ''}
                              </p>
                              <p className="text-[12px] font-bold leading-tight uppercase italic">
                                {evento.titulo}
                              </p>
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
"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Accordion from "@/app/Components/Accordion/Accordion";
import { CULTOS_ACORDEON, EVENTOS_ANUALES_2026 } from "@/app/JsonData/EventsData";

export default function MainLanding() {
  // 1. Calculamos el inicio de la semana actual al cargar
  // Inicializamos con una fecha nula para evitar errores de hidratación (SSR)
  const [fechaReferencia, setFechaReferencia] = useState<Date | null>(null);

  useEffect(() => {
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    // Ajustamos para que empiece en el domingo de la semana actual
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

  const formatearMes = (date: Date) => 
    date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase();

  // Función para saber si una fecha es HOY
  const esHoy = (date: Date) => {
    const hoy = new Date();
    return date.getDate() === hoy.getDate() &&
           date.getMonth() === hoy.getMonth() &&
           date.getFullYear() === hoy.getFullYear();
  };

  if (!fechaReferencia) return null; // Evita parpadeos mientras carga la fecha

  return (
    <main className="relative bg-white pt-[calc(var(--navbar-height)+2rem)]">
      <section className="px-[8%] py-16 grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5">
          <h1 className="heading-primary mb-8">IPUC Neiva Central</h1>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <p className="text-sm text-blue-800 font-bold">Agenda de Actividades 2026</p>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-4">
          {CULTOS_ACORDEON.map((culto) => (
            <Accordion key={culto.id} titulo={culto.titulo} contenido={culto.contenido} />
          ))}
        </div>
      </section>

      <section className="px-[8%] py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="heading-primary text-3xl">{formatearMes(diasDeLaSemana[0])}</h2>
            <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-200">
              <button onClick={() => cambiarSemana(-1)} className="p-3 hover:bg-gray-100 rounded-xl transition-colors font-bold text-gray-600">Anterior</button>
              <button onClick={() => cambiarSemana(1)} className="p-3 hover:bg-gray-100 rounded-xl transition-colors font-bold text-gray-600">Siguiente</button>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-[2.5rem] bg-white shadow-xl">
            <div className="min-w-[900px]">
              {/* Cabecera Días */}
              <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
                {diasDeLaSemana.map((dia, idx) => {
                  const checkHoy = esHoy(dia);
                  return (
                    <div key={idx} className={`p-6 text-center border-r border-gray-100 last:border-0 ${checkHoy ? 'bg-gray-100/50' : ''}`}>
                      <p className={`text-[10px] font-black uppercase ${checkHoy ? 'text-[#00338d]' : 'text-gray-400'}`}>
                        {dia.toLocaleDateString('es-ES', { weekday: 'short' })}
                      </p>
                      <p className={`text-3xl CalSans mt-2 inline-flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                        checkHoy ? 'bg-[#00338d] text-white' : 'text-gray-800'
                      }`}>
                        {dia.getDate()}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Cuerpo de Eventos */}
              <div className="grid grid-cols-7 min-h-[400px]">
                {diasDeLaSemana.map((dia, idx) => {
                  const anio = dia.getFullYear();
                  const mes = String(dia.getMonth() + 1).padStart(2, '0');
                  const diaNum = String(dia.getDate()).padStart(2, '0');
                  const fechaStr = `${anio}-${mes}-${diaNum}`;
                  const checkHoy = esHoy(dia);

                  const eventosDelDia = EVENTOS_ANUALES_2026.filter(e => {
                    if (e.fechaFin) {
                      return fechaStr >= e.fecha && fechaStr <= e.fechaFin;
                    }
                    return e.fecha === fechaStr;
                  });

                  return (
                    <div key={idx} className={`p-4 border-r border-gray-50 last:border-0 transition-colors ${
                      checkHoy ? 'bg-gray-50' : 'hover:bg-gray-50/30'
                    }`}>
                      <div className="space-y-3">
                        {eventosDelDia.map((evento) => (
                          <div 
                            key={evento.id}
                            className="p-3 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform cursor-default"
                            style={{ backgroundColor: evento.color || '#2563eb' }}
                          >
                            <p className="text-[9px] font-bold opacity-90 uppercase tracking-tighter">
                              {evento.inicio} - {evento.fin}
                            </p>
                            <p className="text-[11px] font-bold leading-tight mt-1">{evento.titulo}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
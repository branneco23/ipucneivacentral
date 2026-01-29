"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ComitesData } from '@/app/JsonData/InfoComitesData';

interface ProjectDetailsProps {
  id: string;
}

export default function ProjectDetailsClient({ id }: ProjectDetailsProps) {
  // 1. Acceso a datos con validación
  const data = ComitesData[id];

  // 2. Estado de error (No encontrado) con mejor semántica
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6" role="alert">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-center">¡Comité no encontrado!</h1>
        <p className="mb-10 opacity-60 text-center max-w-md">
          Lo sentimos, no hemos podido encontrar información configurada para el comité: <span className="text-blue-400 font-mono">{id}</span>
        </p>
        <Link 
          href="/" 
          className="bg-blue-600 px-10 py-4 rounded-full hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] font-bold"
        >
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen selection:bg-blue-100">
      {/* 3. Banner Principal Optimizado */}
      <section className="relative h-[50vh] min-h-[400px] bg-blue-950 flex items-center justify-center overflow-hidden">
        {data.fotoGrupal && (
          <Image 
            src={data.fotoGrupal} 
            alt={`Banner de ${data.nombre}`}
            fill
            priority
            className="absolute inset-0 object-cover opacity-40 select-none"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-blue-950/80" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
            {data.nombre}
          </h1>
          <div className="mt-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
             <p className="text-blue-100 italic text-xl md:text-2xl leading-relaxed">
              &ldquo;{data.versiculo}&rdquo;
             </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-[8%] py-20">
        {/* 4. Misión y Visión con grid responsivo */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-28">
          <article className="bg-slate-50 p-10 rounded-[3rem] border-b-[12px] border-blue-600 shadow-sm hover:shadow-xl transition-shadow duration-500">
            <h2 className="text-2xl font-black text-slate-800 uppercase mb-5 italic flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-600 rounded-full" /> Nuestra Misión
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">{data.mision}</p>
          </article>
          
          <article className="bg-slate-50 p-10 rounded-[3rem] border-b-[12px] border-orange-500 shadow-sm hover:shadow-xl transition-shadow duration-500">
            <h2 className="text-2xl font-black text-slate-800 uppercase mb-5 italic flex items-center gap-3">
              <span className="w-8 h-1 bg-orange-500 rounded-full" /> Nuestra Visión
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">{data.vision}</p>
          </article>
        </div>

        {/* 5. Directiva con Image Optimization */}
        <section aria-label="Directiva">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 text-center uppercase mb-16 italic tracking-tight">
            Directiva Actual
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
            {data.integrantes.map((persona) => (
              <div key={persona.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-50 group hover:-translate-y-2 transition-all duration-500">
                <div className="h-80 relative overflow-hidden">
                  <Image 
                    src={persona.foto} 
                    alt={persona.nombre}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-6 left-6 bg-blue-600 text-white text-xs px-4 py-1.5 rounded-full font-black uppercase shadow-lg z-10">
                     {persona.cargo}
                  </div>
                </div>
                <div className="p-8 text-center bg-white">
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{persona.nombre}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Galería de Eventos Condicional */}
        {data.eventos && data.eventos.length > 0 && (
          <section className="pt-10 border-t border-slate-100">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 text-center uppercase mb-16 italic tracking-tight">
              Galería de Eventos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.eventos.map((ev) => (
                <div key={ev.id} className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                  <Image 
                    src={ev.imagen} 
                    alt={ev.titulo} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-10">
                    <p className="text-white font-black text-2xl uppercase tracking-tighter transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {ev.titulo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
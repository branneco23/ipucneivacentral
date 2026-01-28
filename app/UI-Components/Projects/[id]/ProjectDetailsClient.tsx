"use client"

import Link from 'next/link';
import { ComitesData } from '@/app/JsonData/InfoComitesData';

export default function ProjectDetailsClient({ id }: { id: string }) {
  // Buscamos el comité en nuestro objeto TS
  const data = ComitesData[id];

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6">
        <h1 className="text-4xl font-bold mb-4">¡Comité no encontrado!</h1>
        <p className="mb-8 opacity-60 text-center">No existe información configurada para la ruta: /Projects/{id}</p>
        <Link href="/" className="bg-blue-600 px-8 py-3 rounded-full hover:bg-blue-500 transition shadow-lg">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Banner Principal con Imagen y Versículo */}
      <div className="relative h-[45vh] bg-blue-900 flex items-center justify-center overflow-hidden">
        {data.fotoGrupal && (
          <img src={data.fotoGrupal} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Banner" />
        )}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">{data.nombre}</h1>
          <div className="mt-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
             <p className="text-blue-100 italic text-xl">"{data.versiculo}"</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-[6%] py-16">
        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="bg-slate-50 p-10 rounded-[2.5rem] border-b-8 border-blue-600 shadow-xl">
            <h2 className="text-2xl font-black text-slate-800 uppercase mb-4 italic">Nuestra Misión</h2>
            <p className="text-slate-600 text-lg leading-relaxed">{data.mision}</p>
          </div>
          <div className="bg-slate-50 p-10 rounded-[2.5rem] border-b-8 border-orange-500 shadow-xl">
            <h2 className="text-2xl font-black text-slate-800 uppercase mb-4 italic">Nuestra Visión</h2>
            <p className="text-slate-600 text-lg leading-relaxed">{data.vision}</p>
          </div>
        </div>

        {/* Galería de Directiva */}
        <h2 className="text-4xl font-black text-slate-900 text-center uppercase mb-12 italic">Directiva Actual</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {data.integrantes.map((persona) => (
            <div key={persona.id} className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
              <div className="h-80 overflow-hidden relative">
                <img src={persona.foto} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={persona.nombre} />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                   {persona.cargo}
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-slate-800">{persona.nombre}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Galería de Eventos (si existen) */}
        {data.eventos && data.eventos.length > 0 && (
          <div>
            <h2 className="text-4xl font-black text-slate-900 text-center uppercase mb-12 italic">Galería de Eventos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.eventos.map((ev) => (
                <div key={ev.id} className="rounded-3xl overflow-hidden shadow-2xl relative group">
                  <img src={ev.imagen} alt={ev.titulo} className="w-full h-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-70 transition-opacity flex items-end p-8">
                    <p className="text-white font-bold text-xl uppercase">{ev.titulo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ComitesData } from '@/app/JsonData/InfoComitesData';

interface ProjectDetailsProps {
  id: string;
}

export default function ProjectDetailsClient({ id }: ProjectDetailsProps) {
  const data = ComitesData[id];
  // Estado para controlar el video en el Modal
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6">
        <h1 className="text-4xl font-black mb-4">¡Comité no encontrado!</h1>
        <Link href="/comites" className="bg-blue-600 px-10 py-4 rounded-full font-bold">Volver</Link>
      </div>
    );
  }

  const tieneVideos = data.youtubeIds && data.youtubeIds.length > 0;
  const videoPrincipal = tieneVideos ? data.youtubeIds![0] : null;
  const videosSecundarios = tieneVideos ? data.youtubeIds!.slice(1) : [];

  return (
    <main className="bg-white min-h-screen selection:bg-blue-100 pt-[90px] lg:pt-[120px]">

      {/* MODAL / POPUP DE VIDEO */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Fondo oscuro con desenfoque */}
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          />

          {/* Contenedor del Video */}
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-red-600 text-white rounded-full transition-colors flex items-center justify-center"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            <iframe
              width="100%" height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.split('&')[0]}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* BANNER PRINCIPAL */}
      <section className="relative h-[40vh] min-h-[350px] bg-blue-950 flex items-center justify-center overflow-hidden">
        {data.fotoGrupal && (
          <Image src={data.fotoGrupal} alt={data.nombre} fill priority className="absolute inset-0 object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 to-blue-950/90" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">{data.nombre}</h1>
          <p className="text-blue-100 italic text-lg max-w-2xl mx-auto">&ldquo;{data.versiculo}&rdquo;</p>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-[10%] py-20">

        {/* SECCIÓN DE VIDEOS */}
        {tieneVideos && (
          <section className="mb-28">
            <h2 className="text-3xl font-black text-slate-900 uppercase mb-12 flex items-center gap-4">
              <i className="ri-video-line text-red-600"></i> Transmisiones y Media
            </h2>

            <div className="grid grid-cols-1 gap-8">
              {/* 1. VIDEO PRINCIPAL */}
              <div className="w-full">
                <p className="text-xs font-black text-red-600 mb-3 tracking-widest uppercase">● Video Principal / En Vivo</p>
                <VideoThumbnail
                  videoId={videoPrincipal!}
                  isMain={true}
                  onClick={() => setSelectedVideo(videoPrincipal)}
                />
              </div>

              {/* 2. VIDEOS SECUNDARIOS */}
              {videosSecundarios.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs font-black text-slate-400 mb-6 tracking-widest uppercase italic">Contenido Anterior</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videosSecundarios.map((vId, index) => (
                      <VideoThumbnail
                        key={index}
                        videoId={vId}
                        isMain={false}
                        onClick={() => setSelectedVideo(vId)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* MISIÓN Y VISIÓN */}
        <div className="grid md:grid-cols-2 gap-8 mb-28">
          <div className="bg-slate-50 p-10 rounded-[2.5rem] border-b-[10px] border-blue-600">
            <h3 className="font-black uppercase mb-4 text-slate-800">Misión</h3>
            <p className="text-slate-600 leading-relaxed">{data.mision}</p>
          </div>
          <div className="bg-slate-50 p-10 rounded-[2.5rem] border-b-[10px] border-orange-500">
            <h3 className="font-black uppercase mb-4 text-slate-800">Visión</h3>
            <p className="text-slate-600 leading-relaxed">{data.vision}</p>
          </div>
        </div>

        {/* DIRECTIVA */}
        {/* DIRECTIVA */}
        <section className="mb-32">
          <h2 className="text-4xl font-black text-center uppercase mb-16 italic">Directiva Actual</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.integrantes.map((persona) => (
              <div key={persona.id} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all relative h-[450px]">

                {/* Contenedor de la Imagen */}
                <div className="absolute inset-0 w-full h-full bg-slate-50">
                  <Image
                    src={persona.foto}
                    alt={persona.nombre}
                    fill
                    className="object-contain p-2" // "object-contain" evita que la persona se corte
                  />
                </div>

                {/* Capa de Gradiente para legibilidad (Opcional pero recomendado) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Contenedor de Texto superpuesto al frente */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <p className="text-[10px] font-black text-blue-400 uppercase mb-1 drop-shadow-md">
                    {persona.cargo}
                  </p>
                  <h4 className="text-xl font-bold text-white drop-shadow-lg">
                    {persona.nombre}
                  </h4>
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

// COMPONENTE DE MINIATURA (Refactorizado)
function VideoThumbnail({ videoId, isMain, onClick }: { videoId: string, isMain: boolean, onClick: () => void }) {
  const cleanId = videoId.split('&')[0];

  return (
    <div
      onClick={onClick}
      className={`relative aspect-video w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-lg border border-slate-100 bg-slate-200`}
    >
      <img
        src={`https://img.youtube.com/vi/${cleanId}/maxresdefault.jpg`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        alt="Thumbnail"
        onError={(e) => {
          // Fallback si la imagen maxres no existe
          e.currentTarget.src = `https://img.youtube.com/vi/${cleanId}/mqdefault.jpg`;
        }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all flex items-center justify-center">
        <div className={`${isMain ? 'w-20 h-20' : 'w-14 h-14'} bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}>
          <i className={`ri-play-fill text-white ${isMain ? 'text-5xl' : 'text-3xl'}`}></i>
        </div>
      </div>
    </div>
  );
}
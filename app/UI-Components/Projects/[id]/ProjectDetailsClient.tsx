"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ComitesData } from '@/app/JsonData/InfoComitesData';

interface ProjectDetailsProps {
  id: string;
}

export default function ProjectDetailsClient({ id }: ProjectDetailsProps) {
  const data = ComitesData[id];

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const nextImage = () => {
    if (data?.eventos && selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % data.eventos.length);
    }
  };

  const prevImage = () => {
    if (data?.eventos && selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + data.eventos.length) % data.eventos.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
        setSelectedImageIndex(null);
      }
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  if (!data) return null;

  // --- LÓGICA DE VIDEOS FILTRADA POR POSICIÓN ---

  // 1. Buscamos el índice del primer ID que NO sea vacío
  const idPrincipalIndex = data.youtubeIds?.findIndex(id => id.trim() !== "") ?? -1;

  // 2. El video grande es ese ID encontrado
  const videoPrincipal = idPrincipalIndex !== -1 ? data.youtubeIds![idPrincipalIndex].split('&')[0] : null;

  // 3. Los videos secundarios son TODOS los que están DESPUÉS de ese índice y que no estén vacíos
  const videosSecundarios = data.youtubeIds
    ? data.youtubeIds
      .slice(idPrincipalIndex + 1) // Empezamos a contar después del grande
      .map(id => id.split('&')[0].trim())
      .filter(id => id !== "") // Quitamos posibles vacíos al final
    : [];

  return (
    <main className="bg-white min-h-screen selection:bg-blue-100 pt-[90px] lg:pt-[120px]">

      {/* MODAL DE VIDEO */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setSelectedVideo(null)} />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors">
              <i className="ri-close-line text-2xl"></i>
            </button>
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}

      {/* MODAL DE GALERÍA (POP-UP) */}
      {selectedImageIndex !== null && data.eventos && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 text-white">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={() => setSelectedImageIndex(null)} />
          <button onClick={() => setSelectedImageIndex(null)} className="absolute top-6 right-6 z-[110] hover:text-red-500 transition-colors">
            <i className="ri-close-circle-fill text-5xl"></i>
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 md:left-10 z-[110] text-white/50 hover:text-white transition-all">
            <i className="ri-arrow-left-s-line text-6xl md:text-8xl"></i>
          </button>
          <div className="relative w-full max-w-4xl h-[70vh] flex flex-col items-center justify-center animate-in zoom-in-95">
            <div className="relative w-full h-full flex items-center justify-center">
              {data.eventos[selectedImageIndex].imagen.endsWith('.mp4') ? (
                <video src={data.eventos[selectedImageIndex].imagen} controls className="max-h-full rounded-2xl shadow-2xl" autoPlay />
              ) : (
                <Image src={data.eventos[selectedImageIndex].imagen} alt="Evidencia" fill className="object-contain" />
              )}
            </div>
            <div className="mt-6 text-center">
              <h4 className="text-2xl font-bold uppercase tracking-widest">{data.eventos[selectedImageIndex].titulo}</h4>
              <p className="text-white/50 mt-2 font-mono">{selectedImageIndex + 1} / {data.eventos.length}</p>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 md:right-10 z-[110] text-white/50 hover:text-white transition-all">
            <i className="ri-arrow-right-s-line text-6xl md:text-8xl"></i>
          </button>
        </div>
      )}

      {/* BANNER PRINCIPAL */}
      <section className="relative h-[40vh] min-h-[350px] bg-blue-950 flex items-center justify-center overflow-hidden">
        {data.fotoGrupal && <Image src={data.fotoGrupal} alt={data.nombre} fill priority className="absolute inset-0 object-cover opacity-30" />}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 to-blue-950/90" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">{data.nombre}</h1>
          <p className="text-blue-100 italic text-lg max-w-2xl mx-auto">&ldquo;{data.versiculo}&rdquo;</p>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-[10%] py-20">

        {/* SECCIÓN DE VIDEOS (SOLO SE MUESTRA SI HAY UN ID REAL) */}
        {videoPrincipal && (
          <section className="mb-28">
            <h2 className="text-3xl font-black text-slate-900 uppercase mb-12 flex items-center gap-4">
              <i className="ri-video-line text-red-600"></i> Transmisiones y Media
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {/* VIDEO GRANDE (EL PRIMER ID NO VACÍO) */}
              <VideoThumbnail videoId={videoPrincipal} isMain={true} onClick={() => setSelectedVideo(videoPrincipal)} />

              {/* VIDEOS PEQUEÑOS (TODOS LOS SIGUIENTES) */}
              {videosSecundarios.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {videosSecundarios.map((vId, index) => (
                    <VideoThumbnail key={index} videoId={vId} isMain={false} onClick={() => setSelectedVideo(vId)} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* MISIÓN Y VISIÓN */}
        <div className="grid md:grid-cols-2 gap-8 mb-28">
          <div className="bg-slate-50 p-10 rounded-[2.5rem] border-b-[10px] border-blue-600 shadow-sm">
            <h3 className="font-black uppercase mb-4 text-slate-800">Misión</h3>
            <p className="text-slate-600 leading-relaxed">{data.mision}</p>
          </div>
          <div className="bg-slate-50 p-10 rounded-[2.5rem] border-b-[10px] border-orange-500 shadow-sm">
            <h3 className="font-black uppercase mb-4 text-slate-800">Visión</h3>
            <p className="text-slate-600 leading-relaxed">{data.vision}</p>
          </div>
        </div>

        {/* SECCIÓN DIRECTIVA */}
        <section className="mb-32">
          <h2 className="text-4xl font-black text-center uppercase mb-16 italic text-slate-900">Directiva Actual</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.integrantes.map((persona) => (
              <div key={persona.id} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all relative h-[450px]">
                <div className="absolute inset-0 w-full h-full bg-slate-50">
                  <Image src={persona.foto} alt={persona.nombre} fill className="object-contain p-2" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <p className="text-[10px] font-black text-blue-400 uppercase mb-1 drop-shadow-md">{persona.cargo}</p>
                  <h4 className="text-xl font-bold text-white drop-shadow-lg">{persona.nombre}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALERÍA DE EVENTOS */}
        {/* SECCIÓN DE GALERÍA DINÁMICA */}
        {data.eventos && data.eventos.length > 0 && (
          <section className="mb-32">
            <div className="mb-12">
              <p className="text-blue-600 font-black tracking-widest uppercase text-sm mb-2">Multimedia</p>
              <h2 className="text-4xl font-black text-slate-900 uppercase italic">Galería de Impacto</h2>
            </div>

            {/* Grid con alturas variables para efecto collage */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {data.eventos.map((evento, index) => (
                <div
                  key={evento.id}
                  onClick={() => {
                    if (evento.tipo === 'youtube') setSelectedVideo(evento.imagen);
                    else setSelectedImageIndex(index);
                  }}
                  className="relative break-inside-avoid overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                >
                  {/* Lógica de Renderizado según el tipo */}
                  {evento.tipo === 'youtube' ? (
                    <div className="relative aspect-video sm:aspect-square">
                      <img
                        src={`https://img.youtube.com/vi/${evento.imagen}/hqdefault.jpg`}
                        className="w-full h-full object-cover"
                        alt={evento.titulo}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <i className="ri-play-fill text-white text-3xl"></i>
                        </div>
                      </div>
                    </div>
                  ) : evento.tipo === 'video' ? (
                    <div className="relative aspect-square bg-slate-900 flex items-center justify-center">
                      <video src={evento.imagen} className="w-full h-full object-cover opacity-60" muted />
                      <i className="ri-movie-fill text-white/50 text-5xl absolute"></i>
                    </div>
                  ) : (
                    <Image
                      src={evento.imagen}
                      alt={evento.titulo}
                      width={500}
                      height={500}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}

                  {/* Overlay con Título */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <span className="text-blue-400 text-[10px] font-bold uppercase">{evento.tipo}</span>
                    <h4 className="text-white font-bold">{evento.titulo}</h4>
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

function VideoThumbnail({ videoId, isMain, onClick }: { videoId: string, isMain: boolean, onClick: () => void }) {
  return (
    <div onClick={onClick} className="relative aspect-video w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-lg border border-slate-100 bg-slate-200">
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        alt="Thumbnail"
        onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`; }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all flex items-center justify-center">
        <div className={`${isMain ? 'w-20 h-20' : 'w-14 h-14'} bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}>
          <i className={`ri-play-fill text-white ${isMain ? 'text-5xl' : 'text-3xl'}`}></i>
        </div>
      </div>
    </div>
  );
}
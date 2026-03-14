"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ComitesData } from '@/app/JsonData/InfoComitesData';
import RevistaLibro from '@/app/Components/MagazineBook/MagazineBook';

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

  const idPrincipalIndex = data.youtubeIds?.findIndex(id => id.trim() !== "xyz" && id.trim() !== "") ?? -1;
  const videoPrincipal = idPrincipalIndex !== -1 ? data.youtubeIds![idPrincipalIndex].split('&')[0] : null;
  const videosSecundarios = data.youtubeIds
    ? data.youtubeIds
      .filter(id => id !== "xyz" && id !== videoPrincipal)
      .map(id => id.split('&')[0].trim())
    : [];

  return (
    <main className="bg-white min-h-screen selection:bg-blue-100 pt-[90px] lg:pt-[120px]">

      {/* ... (MODALES DE VIDEO Y GALERIA SE MANTIENEN IGUAL) ... */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setSelectedVideo(null)} />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-red-600 text-white rounded-full flex items-center justify-center">
              <i className="ri-close-line text-2xl"></i>
            </button>
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}

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
              {data.eventos[selectedImageIndex].tipo === 'video' ? (
                <video src={data.eventos[selectedImageIndex].imagen} controls className="max-h-full rounded-2xl shadow-2xl" autoPlay />
              ) : (
                <div className="relative w-full h-full">
                  <Image src={data.eventos[selectedImageIndex].imagen} alt="Evidencia" fill className="object-contain" />
                </div>
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

      {/* BANNER DE IDENTIDAD */}
      <section className="relative h-[45vh] min-h-[400px] bg-blue-950 flex items-center justify-center overflow-hidden">
        {data.fotoGrupal && <Image src={data.fotoGrupal} alt={data.nombre} fill priority className="absolute inset-0 object-cover opacity-30" />}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 to-blue-950/90" />
        <div className="relative z-10 text-center px-6">
          <p className="text-orange-400 font-black uppercase tracking-[0.4em] text-sm mb-4">Comité Oficial</p>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6">{data.nombre}</h1>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 inline-block px-8 py-3 rounded-full">
            <p className="text-blue-100 italic text-lg">&ldquo;{data.versiculo}&rdquo;</p>
          </div>
        </div>
      </section>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full py-20"> {/* Quitamos container mx-auto de aquí para manejarlo por secciones */}

        {/* MISIÓN Y VISIÓN (Aquí sí usamos ancho controlado) */}
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-8 mb-32">
          <div className="bg-slate-50 p-12 rounded-[3rem] border-b-[12px] border-blue-600 shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <i className="ri-flag-2-fill text-2xl"></i>
            </div>
            <h3 className="font-black uppercase mb-4 text-slate-800 tracking-widest text-sm">Nuestra Misión</h3>
            <p className="text-slate-600 leading-relaxed text-lg">{data.mision}</p>
          </div>
          <div className="bg-slate-50 p-12 rounded-[3rem] border-b-[12px] border-orange-500 shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <i className="ri-eye-fill text-2xl"></i>
            </div>
            <h3 className="font-black uppercase mb-4 text-slate-800 tracking-widest text-sm">Nuestra Visión</h3>
            <p className="text-slate-600 leading-relaxed text-lg">{data.vision}</p>
          </div>
        </div>

        {/* MEDIA Y TRANSMISIONES (Ancho controlado) */}
        {videoPrincipal && (
          <section className="max-w-[1400px] mx-auto px-6 mb-40">
            <div className="flex items-end justify-between mb-12 border-b border-slate-100 pb-8">
              <div>
                <p className="text-red-600 font-black uppercase text-sm tracking-widest mb-2 underline decoration-2 underline-offset-4">YouTube Chanel</p>
                <h2 className="text-4xl font-black text-slate-900 uppercase">Contenido Multimedia</h2>
              </div>
              <i className="ri-youtube-fill text-6xl text-slate-100"></i>
            </div>
            <div className="grid grid-cols-1 gap-10">
              <VideoThumbnail videoId={videoPrincipal} isMain={true} onClick={() => setSelectedVideo(videoPrincipal)} />
              {videosSecundarios.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                  {videosSecundarios.map((vId, index) => (
                    <VideoThumbnail key={index} videoId={vId} isMain={false} onClick={() => setSelectedVideo(vId)} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* DIRECTIVA ACTUAL (Ancho controlado) */}
        <section className="max-w-[1600px] mx-auto px-6 mb-40">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black uppercase italic text-slate-900">Liderazgo y Servicio</h2>
            <p className="text-slate-400 font-medium mt-2">Equipo encargado de la obra en este periodo</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.integrantes.map((persona) => (
              <div key={persona.id} className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all relative h-[480px]">
                <div className="absolute inset-0 w-full h-full bg-slate-100">
                  <Image src={persona.foto} alt={persona.nombre} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <span className="inline-block bg-orange-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-md mb-3 tracking-widest shadow-lg">
                    {persona.cargo}
                  </span>
                  <h4 className="text-2xl font-bold text-white leading-tight">{persona.nombre}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALERÍA MASONRY (Ancho controlado) */}
        {data.eventos && data.eventos.length > 0 && (
          <section className="max-w-[1600px] mx-auto px-6 mb-20">
            <div className="mb-16 flex flex-col items-center">
              <h2 className="text-5xl font-black text-slate-900 uppercase italic text-center">Galería de Impacto</h2>
              <div className="w-20 h-1.5 bg-blue-600 mt-4"></div>
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              {data.eventos.map((evento, index) => (
                <div
                  key={evento.id}
                  onClick={() => {
                    if (evento.tipo === 'youtube') setSelectedVideo(evento.imagen);
                    else setSelectedImageIndex(index);
                  }}
                  className="relative break-inside-avoid overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer group border-4 border-white"
                >
                  {evento.tipo === 'video' ? (
                    <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
                      <video src={evento.imagen} className="w-full h-full object-cover opacity-60" muted />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-125 transition-transform">
                          <i className="ri-play-fill text-white text-4xl"></i>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={evento.imagen}
                      alt={evento.titulo}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all p-8 flex flex-col justify-end">
                    <span className="text-orange-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{evento.tipo}</span>
                    <h4 className="text-white font-bold text-xl leading-tight">{evento.titulo}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- SECCIÓN DE LA REVISTA INTERACTIVA --- */}
        {data.historietas && data.historietas.length > 0 && (
          <section className="mb-40 w-full overflow-x-hidden">
            <div className="text-center mb-16 px-4">
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic">
                BIBLIOTECA DE CRECIMIENTO
              </h2>
              <div className="w-24 md:w-32 h-2 bg-orange-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Eliminamos cualquier padding lateral forzado aquí para que el componente maneje su propio espacio */}
            <div className="w-full">
              <RevistaLibro historia={data.historietas[0]} />
            </div>
            <div className="w-full">
              <RevistaLibro historia={data.historietas[1]} />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

// Subcomponente de Miniatura de Video (Se mantiene igual)
function VideoThumbnail({ videoId, isMain, onClick }: { videoId: string, isMain: boolean, onClick: () => void }) {
  return (
    <div onClick={onClick} className={`relative ${isMain ? 'h-[500px]' : 'aspect-video'} w-full rounded-[3rem] overflow-hidden cursor-pointer group shadow-2xl border-4 border-white bg-slate-900`}>
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
        alt="YouTube Preview"
        onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`; }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`${isMain ? 'w-24 h-24' : 'w-16 h-16'} bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)] group-hover:scale-110 group-hover:bg-red-500 transition-all duration-500`}>
          <i className={`ri-play-mini-fill text-white ${isMain ? 'text-6xl' : 'text-4xl'}`}></i>
        </div>
        {isMain && <p className="text-white font-black uppercase tracking-[0.5em] mt-6 text-sm bg-black/40 backdrop-blur-md px-6 py-2 rounded-full">Ver Transmisión</p>}
      </div>
    </div>
  );
}
// src/components/public/BotonFlotanteRadio.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Radio, Square, X } from 'lucide-react';

export default function BotonFlotanteRadio() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // URL de tu streaming en el VPS (Shoutcast / Icecast / Zenoradio, etc.)
  const STREAM_URL = "https://tu-servidor-vps.com/radio.mp3"; 
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar el objeto de audio del lado del cliente de forma segura
  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    // Habilitar precarga nula para no consumir datos móviles innecesariamente al cargar la web
    audioRef.current.preload = "none"; 

    // Eventos nativos para controlar el estado de carga y buffer
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    const audio = audioRef.current;
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('waiting', handleWaiting);
        audio.removeEventListener('playing', handlePlaying);
        audioRef.current = null;
      }
    };
  }, [STREAM_URL]);

  const togglePlayback = (e: React.MouseEvent) => {
    // Evita que el click expanda o colapse el contenedor padre si se presiona el botón interno
    e.stopPropagation(); 
    
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      // Crucial: Forzar la descarga del buffer para detener por completo el consumo de megas en móviles
      audioRef.current.src = ""; 
      audioRef.current.load();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      // Recargar la URL original para conectarse al "en vivo" actual sin retraso acumulado
      audioRef.current.src = STREAM_URL;
      audioRef.current.play()
        .catch((err) => {
          console.error("Error al reproducir audio:", err);
          setIsLoading(false);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      
      {/* BOTÓN FLOTANTE MINIMIZADO (UI Ampliada a w-20 h-20) */}
      <button
        onClick={() => setIsExpanded(true)}
        className={`absolute bottom-0 right-0 w-20 h-20 rounded-full bg-[#00338d] text-white flex flex-col items-center justify-center shadow-[0_12px_35px_rgba(0,51,141,0.4)] transition-all duration-500 ease-out origin-bottom-right hover:scale-105 active:scale-95 z-10 ${
          isExpanded ? "opacity-0 pointer-events-none scale-75 rotate-45" : "opacity-100 pointer-events-auto scale-100"
        }`}
        aria-label="Abrir reproductor de radio"
      >
        {/* Ícono dinámico según estado */}
        <Radio size={38} className={`${isPlaying && !isLoading ? 'animate-pulse text-yellow-400' : 'text-white'}`} />
        
        {/* Micro ecualizador o texto */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 mt-1 justify-center">
            {isLoading ? (
              <span className="text-[9px] text-white/50 animate-pulse">...</span>
            ) : (
              [...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-0.5 bg-yellow-400 rounded-full animate-equalizer"
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    height: '100%',
                  }}
                />
              ))
            )}
          </div>
        ) : (
          <span className="text-[10px] font-bold tracking-wider mt-0.5 uppercase opacity-80">Radio</span>
        )}
      </button>

      {/* MINI-REPRODUCTOR EXPANDIDO (UI Moderna al hacer click) */}
      <div 
        className={`bg-[#090d16] border border-white/10 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 transition-all duration-500 ease-out origin-bottom-right w-64 ${
          isExpanded 
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0" 
            : "opacity-0 scale-75 pointer-events-none translate-y-4"
        }`}
      >
        {/* Botón de Play/Stop interno */}
        <button 
          onClick={togglePlayback}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 ${
            isPlaying ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-[#00338d] text-white'
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <Square size={18} fill="currentColor" />
          ) : (
            <Radio size={20} />
          )}
        </button>

        {/* Info de la estación */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Sede Central</p>
          <p className="text-sm font-bold text-white truncate">Señal en Vivo</p>
          <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isPlaying && !isLoading ? 'animate-ping' : ''}`} />
            {isLoading ? 'Cargando buffer...' : isPlaying ? 'Transmitiendo' : 'En Línea'}
          </p>
        </div>

        {/* Botón para volver a minimizar */}
        <button 
          onClick={() => setIsExpanded(false)}
          className="text-white/40 hover:text-white transition-colors p-1 flex-shrink-0"
          aria-label="Minimizar reproductor"
        >
          <X size={18} />
        </button>
      </div>

    </div>
  );
}
"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Youtube, Radio as RadioIcon } from "lucide-react";

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Link oficial de Radio IPUC (ZenoMedia)
  const audioUrl = "https://play14.tikast.com:22038/stream"; 

  // Lógica para detener la radio si otros videos/audios comienzan a sonar
  useEffect(() => {
    const handleOtherMediaPlay = (event: Event) => {
      // Si el elemento que empezó a sonar NO es nuestra radio, pausamos la radio
      if (isPlaying && event.target !== audioRef.current) {
        pauseRadio();
      }
    };

    // Escuchamos el evento 'play' en todo el documento
    document.addEventListener("play", handleOtherMediaPlay, true);
    
    return () => {
      document.removeEventListener("play", handleOtherMediaPlay, true);
    };
  }, [isPlaying]);

  const pauseRadio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      pauseRadio();
    } else {
      // Antes de sonar la radio, buscamos y pausamos cualquier video abierto en la página
      const allVideos = document.querySelectorAll("video");
      allVideos.forEach((video) => video.pause());

      // Cargamos y reproducimos la radio
      audioRef.current.load(); 
      audioRef.current.play().catch((error) => {
        console.error("Error al reproducir radio:", error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-72 md:w-80 transition-all duration-500 ease-in-out">
      {/* Contenedor Principal con estilo oscuro (Imagen 4) */}
      <div className="bg-[#0f172a] text-white p-5 rounded-2xl shadow-2xl border border-gray-800 backdrop-blur-sm">
        
        {/* Cabecera: Logo y Estado */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <RadioIcon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight tracking-wide">RADIO IPUC</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`relative flex h-2 w-2 ${isPlaying ? 'flex' : 'hidden'}`}>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <p className="text-[10px] text-gray-400 uppercase font-medium tracking-widest">
                  {isPlaying ? 'En Directo' : 'En Pausa'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Barras de ecualizador animadas (Imagen 4) */}
        <div className="flex items-end gap-1 h-10 mb-5 justify-center px-4">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 bg-yellow-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-equalizer' : 'h-1.5'}`}
              style={{ 
                animationDelay: `${i * 0.08}s`,
                height: isPlaying ? '100%' : '6px'
              }}
            />
          ))}
        </div>

        {/* Información de la transmisión */}
        <div className="text-center mb-5">
          <p className="text-[10px] text-gray-500 font-bold tracking-widest mb-1">TRANSMISIÓN EN VIVO</p>
          <p className="text-xs font-semibold text-gray-200 uppercase tracking-tight">Programación Especial IPUC</p>
        </div>

        {/* Botón de Control Principal */}
        <button 
          onClick={togglePlay}
          className={`w-full flex items-center justify-center gap-3 font-bold py-3.5 rounded-xl transition-all active:scale-[0.97] shadow-lg ${
            isPlaying 
            ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20' 
            : 'bg-white text-[#0f172a] hover:bg-gray-100'
          }`}
        >
          {isPlaying ? (
            <><Pause size={18} fill="currentColor" /> DETENER</>
          ) : (
            <><Play size={18} fill="currentColor" /> ESCUCHAR EN VIVO</>
          )}
        </button>

        {/* Enlace secundario (YouTube) */}
        <a 
          href="https://youtube.com/@IPUCoficial" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-gray-500 text-[11px] mt-4 hover:text-red-500 transition-colors font-medium"
        >
          <Youtube size={14} /> VER EN YOUTUBE
        </a>

        {/* Elemento de Audio Oculto */}
        <audio ref={audioRef} src={audioUrl} preload="none" />
      </div>
    </div>
  );
}
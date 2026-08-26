"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Youtube, Radio as RadioIcon, Minus, Loader2, AlertCircle } from "lucide-react";

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // URL del stream en vivo de Radio IPUC (Servidor HTTPS sin bloqueo CORS)
  const audioUrl = "https://radiohd4.streaminghd.co:8190/stream";

  useEffect(() => {
    const handleOtherMediaPlay = (event: Event) => {
      if (isPlaying && event.target !== audioRef.current) {
        pauseRadio();
      }
    };

    document.addEventListener("play", handleOtherMediaPlay, true);
    return () => {
      document.removeEventListener("play", handleOtherMediaPlay, true);
    };
  }, [isPlaying]);

  const pauseRadio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const togglePlay = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      pauseRadio();
    } else {
      try {
        setIsLoading(true);
        setHasError(false);

        // Pausar videos activos en pantalla
        const allVideos = document.querySelectorAll("video");
        allVideos.forEach((video) => video.pause());

        // Forzar recarga del buffer del stream para evitar cachés viejas
        audioRef.current.src = `${audioUrl}?t=${Date.now()}`;
        audioRef.current.load();
        
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error al reproducir la radio:", error);
        setHasError(true);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {/* 1. VISTA COMPACTA */}
      <button
        onClick={() => setIsExpanded(true)}
        className={`absolute bottom-0 right-0 w-20 h-20 rounded-full bg-[#00338d] text-white flex flex-col items-center justify-center shadow-[0_12px_35px_rgba(0,51,141,0.4)] transition-all duration-500 ease-out origin-bottom-right hover:scale-105 active:scale-95 z-10 ${
          isExpanded ? "opacity-0 pointer-events-none scale-75" : "opacity-100 pointer-events-auto scale-100"
        }`}
        aria-label="Abrir reproductor de radio"
      >
        <RadioIcon size={38} className={`${isPlaying ? 'animate-pulse' : ''}`} />

        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 mt-1 justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 bg-yellow-400 rounded-full animate-equalizer"
                style={{ animationDelay: `${i * 0.15}s`, height: '100%' }}
              />
            ))}
          </div>
        ) : (
          <span className="text-[10px] font-bold tracking-wider mt-0.5 uppercase opacity-80">Radio</span>
        )}
      </button>

      {/* 2. VISTA EXTENDIDA */}
      <div
        className={`bg-[#0f172a] text-white p-5 rounded-2xl shadow-2xl border border-gray-800 backdrop-blur-sm w-72 md:w-80 transition-all duration-500 ease-out origin-bottom-right ${
          isExpanded ? "opacity-100 scale-100 pointer-events-auto relative" : "opacity-0 scale-75 pointer-events-none absolute bottom-0 right-0"
        }`}
      >
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
                  {isLoading ? 'Conectando...' : isPlaying ? 'En Directo' : hasError ? 'Error de señal' : 'En Pausa'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(false)}
            className="p-1.5 rounded-lg bg-gray-800/60 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
            title="Minimizar reproductor"
          >
            <Minus size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Ecualizador */}
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

        <div className="text-center mb-5">
          <p className="text-[10px] text-gray-500 font-bold tracking-widest mb-1">TRANSMISIÓN EN VIVO</p>
          <p className="text-xs font-semibold text-gray-200 uppercase tracking-tight">Programación Especial IPUC</p>
        </div>

        {hasError && (
          <div className="mb-3 flex items-center gap-2 text-red-400 text-xs bg-red-950/50 p-2.5 rounded-lg border border-red-800/50">
            <AlertCircle size={16} className="shrink-0" />
            <span>El servidor de radio está temporalmente fuera de línea.</span>
          </div>
        )}

        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-3 font-bold py-3.5 rounded-xl transition-all active:scale-[0.97] shadow-lg ${
            isPlaying
              ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20'
              : 'bg-white text-[#0f172a] hover:bg-gray-100'
          }`}
        >
          {isLoading ? (
            <><Loader2 size={18} className="animate-spin" /> CONECTANDO...</>
          ) : isPlaying ? (
            <><Pause size={18} fill="currentColor" /> DETENER</>
          ) : (
            <><Play size={18} fill="currentColor" /> ESCUCHAR EN VIVO</>
          )}
        </button>

        <a
          href="https://youtube.com/@IPUCoficial"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-gray-500 text-[11px] mt-4 hover:text-red-500 transition-colors font-medium"
        >
          <Youtube size={14} /> VER EN YOUTUBE
        </a>

        {/* Tag de audio estándar sin 'crossOrigin' para prevenir fallos de CORS cuando el servidor responde con 502 */}
        <audio 
          ref={audioRef} 
          preload="none"
          onError={() => {
            setHasError(true);
            setIsPlaying(false);
            setIsLoading(false);
          }}
        />
      </div>
    </div>
  );
}
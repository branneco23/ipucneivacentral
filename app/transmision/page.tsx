"use client";

import { useEffect, useState } from 'react';
import { db } from '@/services/firebase';
import { ref, onValue } from 'firebase/database';
import { UsernameModal } from '../(UI-Components)/Live/UsernameModal';
import { ReactionSystem, FloatingReactions } from '../(UI-Components)/Live/ReactionSystem';
import { LiveContainer } from '../(UI-Components)/Live/LiveContainer';
import { ChatSection } from '../(UI-Components)/Live/ChatSection';
import { CounterReactions } from '../(UI-Components)/Live/CounterReactions';

/**
 * Página principal de Transmisión.
 * El fondo ha sido ajustado a un Gris Pastel Suave para reducir la fatiga visual.
 */
export default function TransmisionPage() {
  const [user, setUser] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  // El videoId es el "ID de Sala". Si cambia en Firebase, todo el chat se reinicia automáticamente.
  const [videoId, setVideoId] = useState<string>("x8zpIYrknOY"); // ******SOLO CAMBIAR ESTE ID ******

  useEffect(() => {
    // 1. Cargar usuario del almacenamiento local
    const saved = localStorage.getItem('live_user');
    if (saved) setUser(saved);
    setIsReady(true);

    // 2. Escuchar en tiempo real qué video debe estar activo
    const videoRef = ref(db, 'current_live/videoId');
    const unsubscribe = onValue(videoRef, (snap) => {
      if (snap.exists()) {
        setVideoId(snap.val());
      }
    });

    return () => unsubscribe();
  }, []);

  // Pantalla de carga con el mismo tono gris pastel
  if (!isReady) return <div className="min-h-screen bg-[#f4f4f5]" />;

  return (
    <main className="min-h-screen bg-[#f4f4f5] pt-40 pb-20 px-[4%]">
      
      {/* Sistema de emojis voladores (Vinculado al ID del video) */}
      <FloatingReactions liveId={videoId} />

      {/* Modal de registro si el usuario no tiene nombre */}
      {!user && (
        <UsernameModal 
          onJoined={(name) => {
            localStorage.setItem('live_user', name);
            setUser(name);
          }} 
        />
      )}

      {/* Contenedor principal: Divide el video (izquierda) y chat (derecha) */}
      <LiveContainer 
        chat={<ChatSection user={user} liveId={videoId} />}
      >
        <div className="space-y-8">
          
          {/* REPRODUCTOR DE YOUTUBE */}
          <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-200">
            <iframe
              loading='lazy'
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&vq=small&autoplay=1`}
              title="IPUC Live"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* TARJETA DE INFORMACIÓN Y REACCIONES (Gris suave pastel) */}
          <div className="bg-[#f8fafc] p-8 rounded-[2.5rem] border border-gray-200 shadow-sm transition-all">
            
            <div className="flex flex-col gap-6">
              
              {/* Contador de reacciones agrupadas (Vinculado al ID del video) */}
              <CounterReactions liveId={videoId} /> 

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Títulos y Estado en Vivo */}
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 tracking-tight">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    Transmisión en Vivo
                  </h2>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                    IPUC Neiva Central • Sede Principal
                  </p>
                </div>

                {/* BOTONES DE REACCIÓN (ReactionSystem recibe el liveId para guardar los clics) */}
                <div className="flex-1 max-w-md bg-white/40 rounded-3xl p-1 border border-gray-100">
                  <ReactionSystem liveId={videoId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LiveContainer>
    </main>
  );
}
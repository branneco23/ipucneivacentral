"use client";

import { useEffect, useState } from 'react';
import { db } from '@/services/firebase';
import { ref, onValue } from 'firebase/database';
import { UsernameModal } from '../UI-Components/Live/UsernameModal';
import { ReactionSystem, FloatingReactions } from '../UI-Components/Live/ReactionSystem';
import { LiveContainer } from '../UI-Components/Live/LiveContainer';
import { ChatSection } from '../UI-Components/Live/ChatSection';
import { CounterReactions } from '../UI-Components/Live/CounterReactions'; // Nuevo componente

export default function TransmisionPage() {
  const [user, setUser] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [videoId, setVideoId] = useState<string>("jfKfPfyJRdk"); 

  useEffect(() => {
    const saved = localStorage.getItem('live_user');
    if (saved) setUser(saved);
    setIsReady(true);

    const videoRef = ref(db, 'current_live/videoId');
    return onValue(videoRef, (snap) => {
      if (snap.exists()) setVideoId(snap.val());
    });
  }, []);

  if (!isReady) return <div className="min-h-screen bg-slate-900" />;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 pt-40 pb-20 px-[4%]">
      <FloatingReactions />

      {!user && (
        <UsernameModal 
          onJoined={(name) => {
            localStorage.setItem('live_user', name);
            setUser(name);
          }} 
        />
      )}

      <LiveContainer 
        chat={<ChatSection user={user} />}
      >
        <div className="space-y-8">
          {/* REPRODUCTOR */}
          <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border border-white/10">
            <iframe
              loading='lazy'
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&vq=small`}
              title="IPUC Live"
              frameBorder="0"
              allowFullScreen
            />
          </div>

          {/* INFO Y REACCIONES ESTILO FACEBOOK */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 shadow-lg">
            <div className="flex flex-col gap-6">
              
              {/* Contador de Reacciones Únicas */}
              <CounterReactions /> 

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    Transmisión en Vivo
                  </h2>
                  <p className="text-blue-200/60 text-sm font-medium">
                    IPUC Neiva Central • Sede Principal
                  </p>
                </div>

                {/* Botones para reaccionar */}
                <div className="flex-1 max-w-md">
                  <ReactionSystem />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LiveContainer>
    </main>
  );
}
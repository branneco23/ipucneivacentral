"use client";

import { useEffect, useState, useCallback } from 'react';
import { db } from '@/services/firebase';
import { ref, onValue } from 'firebase/database';
// ... tus otros imports

export default function TransmisionPage() {
  const [user, setUser] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [videoId, setVideoId] = useState<string>("Zi9DgSXIjgA"); // ID de respaldo

  const YOUTUBE_CHANNEL_ID = "UCr5SX280UbD1R2fNDsFIUdg"; 
  const API_KEY = "TU_API_KEY_AQUI";

  const checkYouTubeLive = useCallback(async () => {
    try {
      // Consultamos la API de YouTube buscando contenido "live" para ese canal
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`
      );
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const currentLiveId = data.items[0].id.videoId;
        setVideoId(currentLiveId);
        console.log("En vivo detectado:", currentLiveId);
      } else {
        console.log("No hay en vivo activo, usando ID de respaldo.");
      }
    } catch (error) {
      console.error("Error detectando en vivo de YouTube:", error);
    }
  }, []);

  useEffect(() => {
    // 1. Cargar usuario
    const saved = localStorage.getItem('live_user');
    if (saved) setUser(saved);
    setIsReady(true);

    // 2. Ejecutar detección automática de YouTube al cargar
    checkYouTubeLive();

    // 3. Opcional: Mantener la escucha de Firebase por si quieres forzar un ID manualmente
    const videoRef = ref(db, 'current_live/videoId');
    const unsubscribe = onValue(videoRef, (snap) => {
      if (snap.exists() && snap.val() !== "") {
        setVideoId(snap.val());
      }
    });

    return () => unsubscribe();
  }, [checkYouTubeLive]);

  if (!isReady) return <div className="min-h-screen bg-[#f4f4f5]" />;

  return (
    <main className="min-h-screen bg-[#f4f4f5] pt-40 pb-20 px-[4%]">
      {/* Resto de tu código igual... */}
      <FloatingReactions liveId={videoId} />
      {/* ... */}
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function TransmisionPage() {
  const [isReady, setIsReady] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [domain, setDomain] = useState<string>("");

  const YOUTUBE_CHANNEL_ID = "UCr5SX280UbD1R2fNDsFIUdg";
  const FALLBACK_VIDEO_ID = "XGNJoRzIMV0";

  const extractYouTubeId = (input: any): string | null => {
    if (!input) return null;
    const cleanInput = String(input).trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanInput)) {
      return cleanInput;
    }
    const match = cleanInput.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }

    const liveDocRef = doc(db, "envivos", "main");

    const unsubscribe = onSnapshot(liveDocRef, async (docSnap) => {
      let foundValidVideo = false;
      let manualActiveState = true;

      if (docSnap.exists()) {
        const data = docSnap.data();
        manualActiveState = Boolean(data.activo);
        const extractedId = extractYouTubeId(data.url);

        if (extractedId) {
          setActiveVideoId(extractedId);
          setIsLiveActive(manualActiveState);
          foundValidVideo = true;
        }
      }

      // Si no hay video manual o queremos asegurar que consulte el directo real del canal si está activo
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`)}`);
        const rssData = await response.json();

        if (rssData && rssData.items && rssData.items.length > 0) {
          const latestItem = rssData.items[0];
          const videoId = extractYouTubeId(latestItem.link);
          const titleLower = latestItem.title.toLowerCase();
          
          // Detectamos si el video más reciente del canal es un directo activo
          const isRssLive = titleLower.includes("en vivo") || titleLower.includes("directo") || titleLower.includes("live");

          if (isRssLive && videoId) {
            setActiveVideoId(videoId);
            setIsLiveActive(true);
            foundValidVideo = true;
          }
        }
      } catch (e) {
        console.error("Error al consultar RSS de YouTube", e);
      }

      if (!foundValidVideo) {
        setActiveVideoId(FALLBACK_VIDEO_ID);
        setIsLiveActive(false);
      }

      setIsReady(true);
    });

    return () => unsubscribe();
  }, []);

  if (!isReady) return <div className="min-h-screen bg-[#f4f4f5]" />;

  const videoToShow = activeVideoId || FALLBACK_VIDEO_ID;
  
  // Parámetros agregados para forzar el menor consumo de datos posibles:
  // -vq=small o calidad baja por defecto (manejado mediante suggestQuality o controles embebidos)
  // - autoplay=1, playsinline=1, controls=1
  const embedUrl = `https://www.youtube.com/embed/${videoToShow}?autoplay=1&enablejsapi=1&playsinline=1&vq=small`;

  // El chat se habilita correctamente si la transmisión está activa y el dominio está detectado
  const chatUrl =
    isLiveActive && domain
      ? `https://www.youtube.com/live_chat?v=${videoToShow}&embed_domain=${domain}`
      : null;

  return (
    <main className="min-h-screen bg-[#f4f4f5] pt-40 pb-20 px-[4%]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {isLiveActive ? "Transmisión en Vivo" : "Última Transmisión / Culto Grabado"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Reproductor de Video */}
          <div className="lg:col-span-2">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src={embedUrl}
                title="Transmisión IPUC Central Neiva"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Chat en Vivo */}
          <div className="lg:col-span-1">
            <div className="w-full h-[500px] lg:h-[calc(100vh-250px)] max-h-[600px] rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-200">
              {chatUrl ? (
                <iframe
                  src={chatUrl}
                  title="Chat en vivo de YouTube"
                  className="w-full h-full border-0"
                ></iframe>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm p-6 text-center">
                  <p className="font-bold text-gray-800 text-base mb-2">Chat no activo</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Estás viendo la <strong>última grabación disponible</strong> del canal. El chat en vivo se activará automáticamente cuando comience la próxima transmisión.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-6 text-center">
          {isLiveActive
            ? "Inicia sesión con tu cuenta de Google dentro del chat para comentar y reaccionar en tiempo real."
            : "Conéctate en los horarios de culto para participar en la transmisión en directo."}
        </p>
      </div>
    </main>
  );
}
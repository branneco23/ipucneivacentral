"use client";

import { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { ref, onValue } from "firebase/database";

export default function TransmisionPage() {
  const [isReady, setIsReady] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);
  const [domain, setDomain] = useState<string>("");

  const YOUTUBE_CHANNEL_ID = "UCr5SX280UbD1R2fNDsFIUdg";
  const FALLBACK_VIDEO_ID = "XGNJoRzIMV0";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }

    const fetchLatestChannelVideo = async () => {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const data = await res.json();

        if (data && data.items && data.items.length > 0) {
          const latestItem = data.items[0];
          const videoIdMatch = latestItem.link.match(/v=([a-zA-Z0-9_-]{11})/);
          const videoId = videoIdMatch ? videoIdMatch[1] : null;

          if (videoId) {
            setActiveVideoId(videoId);
            const titleLower = latestItem.title.toLowerCase();
            const isLive = titleLower.includes("en vivo") || 
                           titleLower.includes("directo") || 
                           titleLower.includes("live");

            setIsLiveActive(isLive);
            return;
          }
        }
      } catch (error) {
        console.error("Error al obtener video RSS:", error);
      }

      setActiveVideoId(FALLBACK_VIDEO_ID);
      setIsLiveActive(false);
    };

    // 1. Escucha activa de Firebase Realtime Database
    const liveRef = ref(db, "current_live");
    const unsubscribe = onValue(liveRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.videoId && data.videoId.trim().length > 5) {
          // Prioridad: ID ingresado desde el Panel
          setActiveVideoId(data.videoId.trim());
          setIsLiveActive(Boolean(data.isLive));
          setIsReady(true);
          return;
        }
      }
      // 2. Si no hay ID manual activo, buscar por RSS
      fetchLatestChannelVideo().then(() => setIsReady(true));
    });

    return () => unsubscribe();
  }, []);

  if (!isReady) return <div className="min-h-screen bg-[#f4f4f5]" />;

  const videoToShow = activeVideoId || FALLBACK_VIDEO_ID;
  const embedUrl = `https://www.youtube.com/embed/${videoToShow}?autoplay=1&enablejsapi=1`;

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
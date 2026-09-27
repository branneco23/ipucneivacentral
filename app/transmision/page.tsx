"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

export default function TransmisionPage() {
  const [isReady, setIsReady] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>("Transmisión en Vivo");
  const [domain, setDomain] = useState<string>("");

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

    // Consultar la transmisión más reciente de la colección "envivos" en tiempo real
    const q = query(collection(db, "envivos"), orderBy("createdAt", "desc"), limit(1));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        const extractedId = extractYouTubeId(docData.url);

        if (extractedId) {
          setActiveVideoId(extractedId);
          setActiveTitle(docData.titulo || "Transmisión en Vivo");
        } else {
          setActiveVideoId(FALLBACK_VIDEO_ID);
        }
      } else {
        setActiveVideoId(FALLBACK_VIDEO_ID);
      }
      setIsReady(true);
    }, (error) => {
      console.error("Error al escuchar transmisiones:", error);
      setActiveVideoId(FALLBACK_VIDEO_ID);
      setIsReady(true);
    });

    return () => unsubscribe();
  }, []);

  if (!isReady) return <div className="min-h-screen bg-[#f4f4f5]" />;

  const videoToShow = activeVideoId || FALLBACK_VIDEO_ID;
  const embedUrl = `https://www.youtube.com/embed/${videoToShow}?autoplay=1&enablejsapi=1&playsinline=1&vq=small`;

  // El chat se habilita automáticamente con el video actual si el dominio está detectado
  const chatUrl = domain ? `https://www.youtube.com/live_chat?v=${videoToShow}&embed_domain=${domain}` : null;

  return (
    <main className="min-h-screen bg-[#f4f4f5] pt-40 pb-20 px-[4%]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {activeTitle}
        </h1>
        <p className="text-sm text-gray-500 mb-6">Disfruta de la programación en directo desde nuestra plataforma.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Reproductor de Video */}
          <div className="lg:col-span-2">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src={embedUrl}
                title={activeTitle}
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
                  <p className="font-bold text-gray-800 text-base mb-2">Chat no disponible</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    El chat se conectará en cuanto cargue el reproductor.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-6 text-center">
          Inicia sesión con tu cuenta de Google dentro del chat para comentar y reaccionar en tiempo real.
        </p>
      </div>
    </main>
  );
}
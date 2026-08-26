'use client';

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EnVivoPage() {
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const consultarTransmision = async () => {
      try {
        const liveDoc = await getDoc(doc(db, 'configuracion', 'transmision'));
        if (liveDoc.exists() && liveDoc.data().youtubeId) {
          setYoutubeId(liveDoc.data().youtubeId);
        }
      } catch (error) {
        console.error("Error al conectar con la transmisión:", error);
      } finally {
        setLoading(false);
      }
    };
    consultarTransmision();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#020617]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
          <span className={`w-3 h-3 rounded-full bg-red-500 ${youtubeId ? 'animate-pulse' : ''}`}></span>
          Transmisión Oficial en Vivo
        </h1>
        <p className="text-sm text-white/40 mt-2">Conéctate a nuestras reuniones y eventos desde cualquier lugar</p>
      </div>

      {youtubeId ? (
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-blue-900/10">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title="Señal en Vivo - IPUC Sede Central"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="w-full aspect-video bg-[#090d16] border border-white/5 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-white/20 text-2xl font-bold">
            !
          </div>
          <h3 className="text-xl font-semibold text-white/80">Sin transmisión activa</h3>
          <p className="text-sm text-white/40 max-w-sm mt-2">
            En este momento no nos encontramos transmitiendo en vivo. Te invitamos a estar atento a los horarios de nuestros cultos y actividades especiales.
          </p>
        </div>
      )}
    </div>
  );
}
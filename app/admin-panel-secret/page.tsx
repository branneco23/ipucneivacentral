"use client";

import { useState } from "react";
import { db } from "@/services/firebase";
import { ref, set } from "firebase/database";

export default function AdminPanelPage() {
  const [youtubeInput, setYoutubeInput] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  // Extrae el ID de 11 caracteres incluso si pegan el enlace completo
  const extractVideoId = (input: string) => {
    let clean = input.trim();
    if (clean.includes("v=")) {
      clean = clean.split("v=")[1].split("&")[0];
    } else if (clean.includes("youtu.be/")) {
      clean = clean.split("youtu.be/")[1].split("?")[0];
    } else if (clean.includes("live/")) {
      clean = clean.split("live/")[1].split("?")[0];
    }
    return clean;
  };

  const handleSaveTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Guardando...");

    const videoId = extractVideoId(youtubeInput);

    if (!videoId || videoId.length < 5) {
      setStatus("Error: Ingrese un ID o enlace válido de YouTube.");
      return;
    }

    try {
      // Guarda directamente en el nodo de Firebase
      await set(ref(db, "current_live"), {
        videoId: videoId,
        isLive: true,
        updatedAt: new Date().toISOString(),
      });

      setStatus("¡Transmisión activada correctamente!");
      setYoutubeInput("");
    } catch (error) {
      console.error(error);
      setStatus("Error al conectar con Firebase.");
    }
  };

  const handleStopTransmission = async () => {
    try {
      // Limpia el registro manual para volver al modo automático (RSS/Fallback)
      await set(ref(db, "current_live"), {
        videoId: "",
        isLive: false,
      });
      setStatus("Transmisión manual desactivada.");
    } catch (error) {
      console.error(error);
      setStatus("Error al desactivar la transmisión.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md border">
      <h1 className="text-2xl font-bold mb-4">Panel de Control - Transmisión</h1>
      
      <form onSubmit={handleSaveTransmission} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            ID o URL de la Transmisión de YouTube:
          </label>
          <input
            type="text"
            value={youtubeInput}
            onChange={(e) => setYoutubeInput(e.target.value)}
            placeholder="ej: XGNJoRzIMV0 o https://youtube.com/live/..."
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Activar Transmisión Manual
        </button>
      </form>

      <button
        onClick={handleStopTransmission}
        className="w-full mt-3 bg-gray-200 text-gray-800 font-semibold py-2 rounded-xl hover:bg-gray-300 transition"
      >
        Finalizar Transmisión Manual
      </button>

      {status && <p className="mt-4 text-center font-medium text-sm">{status}</p>}
    </div>
  );
}
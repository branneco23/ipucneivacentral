"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

interface EnvivosTabProps {
  envivosList?: any[];
  setStatusMsg: (msg: string | null) => void;
}

export default function EnvivosTab({ envivosList = [], setStatusMsg }: EnvivosTabProps) {
  const [editingEnvivoId, setEditingEnvivoId] = useState<string | null>(null);
  const [tituloEnvivo, setTituloEnvivo] = useState("");
  const [urlEnvivo, setUrlEnvivo] = useState("");
  const [savingEnvivo, setSavingEnvivo] = useState(false);

  const obtenerYoutubeEmbedUrl = (url: string) => {
    let cleanUrl = url.trim();
    let videoId = "";

    try {
      if (cleanUrl.includes("/embed/")) {
        return cleanUrl;
      } else if (cleanUrl.includes("youtu.be/")) {
        videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0];
      } else if (cleanUrl.includes("watch?v=")) {
        videoId = cleanUrl.split("watch?v=")[1]?.split("&")[0];
      } else if (cleanUrl.includes("/live/")) {
        videoId = cleanUrl.split("/live/")[1]?.split("?")[0]?.split("&")[0];
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (e) {
      console.error("Error parseando URL de YouTube", e);
    }

    return cleanUrl;
  };

  const handleSaveEnvivo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tituloEnvivo.trim() || !urlEnvivo.trim()) {
      setStatusMsg("Por favor completa todos los campos.");
      return;
    }

    setSavingEnvivo(true);
    setStatusMsg("Guardando transmisión...");

    try {
      const formattedUrl = obtenerYoutubeEmbedUrl(urlEnvivo);

      if (editingEnvivoId) {
        await updateDoc(doc(db, "envivos", editingEnvivoId), {
          titulo: tituloEnvivo.trim(),
          url: formattedUrl,
          updatedAt: serverTimestamp(),
        });
        setStatusMsg("¡Transmisión actualizada con éxito!");
      } else {
        await addDoc(collection(db, "envivos"), {
          titulo: tituloEnvivo.trim(),
          url: formattedUrl,
          createdAt: serverTimestamp(),
        });
        setStatusMsg("¡Transmisión creada con éxito!");
      }

      setTituloEnvivo("");
      setUrlEnvivo("");
      setEditingEnvivoId(null);
    } catch (err: any) {
      console.error(err);
      setStatusMsg(`Error al guardar: ${err.message}`);
    } finally {
      setSavingEnvivo(false);
    }
  };

  const handleStartEditEnvivo = (envivo: any) => {
    setEditingEnvivoId(envivo.id);
    setTituloEnvivo(envivo.titulo || "");
    setUrlEnvivo(envivo.url || "");
    setStatusMsg(`Editando transmisión: ${envivo.titulo}`);
  };

  const handleDeleteEnvivo = async (id: string) => {
    if (confirm("¿Deseas eliminar esta transmisión?")) {
      try {
        await deleteDoc(doc(db, "envivos", id));
        setStatusMsg("Transmisión eliminada correctamente.");
      } catch (err) {
        setStatusMsg("Error al eliminar la transmisión.");
      }
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 text-slate-100">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{editingEnvivoId ? "Editar Transmisión" : "Gestión de Transmisión en Vivo"}</h2>
        {editingEnvivoId && (
          <button
            type="button"
            onClick={() => {
              setEditingEnvivoId(null);
              setTituloEnvivo("");
              setUrlEnvivo("");
              setStatusMsg(null);
            }}
            className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20 cursor-pointer"
          >
            Cancelar Edición
          </button>
        )}
      </div>

      <form onSubmit={handleSaveEnvivo} className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Título de la Transmisión</label>
          <input type="text" required value={tituloEnvivo} onChange={(e) => setTituloEnvivo(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Ej: Culto Dominical" />
        </div>

        <div>
          <label className="block text-xs mb-1">URL de YouTube del En Vivo</label>
          <input type="text" required value={urlEnvivo} onChange={(e) => setUrlEnvivo(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="https://www.youtube.com/watch?v=..." />
        </div>

        <button type="submit" disabled={savingEnvivo} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-sm transition cursor-pointer">
          {savingEnvivo ? "Guardando..." : (editingEnvivoId ? "Actualizar Transmisión" : "Poner en Vivo Ahora")}
        </button>
      </form>

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h3 className="font-bold text-sm">Historial de Transmisiones ({envivosList.length})</h3>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {envivosList.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div>
                <h4 className="font-bold text-sm text-white">{item.titulo}</h4>
                <p className="text-xs text-slate-400 truncate max-w-md">{item.url}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => handleStartEditEnvivo(item)} className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg text-xs hover:bg-yellow-500/20 cursor-pointer">Editar</button>
                <button type="button" onClick={() => handleDeleteEnvivo(item.id)} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs hover:bg-red-500/20 cursor-pointer">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot, query } from "firebase/firestore";

interface DevocionalesTabProps {
  setStatusMsg: (msg: string | null) => void;
}

export default function DevocionalesTab({ setStatusMsg }: DevocionalesTabProps) {
  const [devocionalesList, setDevocionalesList] = useState<any[]>([]);
  const [editingDevocionalId, setEditingDevocionalId] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [enlaceMeet, setEnlaceMeet] = useState("");
  const [savingDevocional, setSavingDevocional] = useState(false);

  // 🔄 Cargar devocionales / enlaces en tiempo real desde Firebase
  useEffect(() => {
    const q = query(collection(db, "devocionales"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lista: any[] = [];
      querySnapshot.forEach((docSnap) => {
        lista.push({ id: docSnap.id, ...docSnap.data() });
      });
      setDevocionalesList(lista);
    }, (error) => {
      console.error("Error al obtener devocionales:", error);
      setStatusMsg("Error al cargar los devocionales de Firebase.");
    });

    return () => unsubscribe();
  }, [setStatusMsg]);

  const handleSaveDevocional = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingDevocional(true);
    setStatusMsg("Guardando devocional...");

    try {
      if (editingDevocionalId) {
        await updateDoc(doc(db, "devocionales", editingDevocionalId), {
          titulo,
          enlace: enlaceMeet,
          updatedAt: serverTimestamp(),
        });
        setStatusMsg("Devocional actualizado con éxito.");
      } else {
        await addDoc(collection(db, "devocionales"), {
          titulo,
          enlace: enlaceMeet,
          createdAt: serverTimestamp(),
        });
        setStatusMsg("Devocional creado con éxito.");
      }

      setTitulo("");
      setEnlaceMeet("");
      setEditingDevocionalId(null);
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al guardar el devocional.");
    } finally {
      setSavingDevocional(false);
    }
  };

  const handleStartEditDevocional = (dev: any) => {
    setEditingDevocionalId(dev.id);
    setTitulo(dev.titulo || "");
    setEnlaceMeet(dev.enlace || dev.enlaceMeet || "");
    setStatusMsg(`Editando devocional: ${dev.titulo}`);
  };

  const handleDeleteDevocional = async (id: string) => {
    if (confirm("¿Deseas eliminar este devocional?")) {
      try {
        await deleteDoc(doc(db, "devocionales", id));
        setStatusMsg("Devocional eliminado.");
      } catch (err) {
        console.error(err);
        setStatusMsg("Error al eliminar el devocional.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Formulario Izquierda */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 text-slate-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{editingDevocionalId ? "Editar Devocional / Enlace" : "Nuevo Devocional / Enlace Meet"}</h2>
          {editingDevocionalId && (
            <button
              type="button"
              onClick={() => {
                setEditingDevocionalId(null);
                setTitulo("");
                setEnlaceMeet("");
              }}
              className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20 cursor-pointer"
            >
              Cancelar
            </button>
          )}
        </div>

        <form onSubmit={handleSaveDevocional} className="space-y-4">
          <div>
            <label className="block text-xs mb-1 font-bold uppercase text-slate-400">Título</label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white"
              placeholder="Ej: Oración Matutina"
            />
          </div>

          <div>
            <label className="block text-xs mb-1 font-bold uppercase text-slate-400">Enlace de Google Meet / Zoom</label>
            <input
              type="url"
              required
              value={enlaceMeet}
              onChange={(e) => setEnlaceMeet(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white"
              placeholder="https://meet.google.com/..."
            />
          </div>

          <button
            type="submit"
            disabled={savingDevocional}
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3.5 rounded-xl text-sm transition cursor-pointer shadow-lg shadow-blue-900/20"
          >
            {savingDevocional ? "Guardando..." : (editingDevocionalId ? "Actualizar Devocional" : "Agregar Devocional")}
          </button>
        </form>
      </div>

      {/* Listado Derecha */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 text-slate-100">
        <h3 className="font-bold text-sm">Devocionales Registrados ({devocionalesList.length})</h3>
        
        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
          {devocionalesList.length === 0 ? (
            <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-2xl text-center text-slate-500 text-xs italic">
              No hay devocionales registrados aún.
            </div>
          ) : (
            devocionalesList.map((dev) => (
              <div key={dev.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700 gap-3">
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-white truncate">{dev.titulo}</h4>
                  <a
                    href={dev.enlace || dev.enlaceMeet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline truncate block"
                  >
                    {dev.enlace || dev.enlaceMeet}
                  </a>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStartEditDevocional(dev)}
                    className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1.5 rounded-lg text-xs hover:bg-yellow-500/20 cursor-pointer font-medium"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteDevocional(dev.id)}
                    className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs hover:bg-red-500/20 cursor-pointer font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
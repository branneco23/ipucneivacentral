"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { convertirImagenABase64WebP } from "@/utils/imageUtils";

interface DevocionalesTabProps {
  devocionalesList?: any[];
  setStatusMsg: (msg: string | null) => void;
}

export default function DevocionalesTab({ devocionalesList = [], setStatusMsg }: DevocionalesTabProps) {
  const [editingDevocionalId, setEditingDevocionalId] = useState<string | null>(null);
  const [tituloDevocional, setTituloDevocional] = useState("");
  const [versiculoDevocional, setVersiculoDevocional] = useState("");
  const [textoDevocional, setTextoDevocional] = useState("");
  const [autorDevocional, setAutorDevocional] = useState("Pastor");
  const [imagenDevocionalFile, setImagenDevocionalFile] = useState<File | null>(null);
  const [savingDevocional, setSavingDevocional] = useState(false);

  const handleSaveDevocional = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingDevocional(true);
    setStatusMsg("Guardando devocional...");

    try {
      let imagenUrl = "";
      if (imagenDevocionalFile) {
        imagenUrl = await convertirImagenABase64WebP(imagenDevocionalFile, 0.8);
      }

      if (editingDevocionalId) {
        const updateData: any = {
          titulo: tituloDevocional,
          versiculo: versiculoDevocional,
          texto: textoDevocional,
          autor: autorDevocional,
          updatedAt: serverTimestamp(),
        };
        if (imagenUrl) {
          updateData.imagenUrl = imagenUrl;
        }
        await updateDoc(doc(db, "devocionales", editingDevocionalId), updateData);
        setStatusMsg("Devocional actualizado con éxito.");
      } else {
        await addDoc(collection(db, "devocionales"), {
          titulo: tituloDevocional,
          versiculo: versiculoDevocional,
          texto: textoDevocional,
          autor: autorDevocional,
          imagenUrl: imagenUrl || "",
          createdAt: serverTimestamp(),
        });
        setStatusMsg("Devocional creado con éxito.");
      }

      setTituloDevocional("");
      setVersiculoDevocional("");
      setTextoDevocional("");
      setAutorDevocional("Pastor");
      setImagenDevocionalFile(null);
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
    setTituloDevocional(dev.titulo || "");
    setVersiculoDevocional(dev.versiculo || "");
    setTextoDevocional(dev.texto || "");
    setAutorDevocional(dev.autor || "Pastor");
    setStatusMsg(`Editando devocional: ${dev.titulo}`);
  };

  const handleDeleteDevocional = async (id: string) => {
    if (confirm("¿Deseas eliminar este devocional?")) {
      await deleteDoc(doc(db, "devocionales", id));
      setStatusMsg("Devocional eliminado.");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 text-slate-100">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{editingDevocionalId ? "Editar Devocional" : "Gestión de Devocionales"}</h2>
        {editingDevocionalId && (
          <button
            type="button"
            onClick={() => {
              setEditingDevocionalId(null);
              setTituloDevocional("");
              setVersiculoDevocional("");
              setTextoDevocional("");
            }}
            className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20 cursor-pointer"
          >
            Cancelar Edición
          </button>
        )}
      </div>

      <form onSubmit={handleSaveDevocional} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs mb-1">Título del Devocional</label>
            <input type="text" required value={tituloDevocional} onChange={(e) => setTituloDevocional(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Ej: La paz que sobrepasa todo..." />
          </div>
          <div>
            <label className="block text-xs mb-1">Versículo Clave</label>
            <input type="text" required value={versiculoDevocional} onChange={(e) => setVersiculoDevocional(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Ej: Filipenses 4:6-7" />
          </div>
          <div>
            <label className="block text-xs mb-1">Autor</label>
            <input type="text" value={autorDevocional} onChange={(e) => setAutorDevocional(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1">Imagen Ilustrativa (Opcional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImagenDevocionalFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300" />
        </div>

        <div>
          <label className="block text-xs mb-1">Contenido / Reflexión</label>
          <textarea rows={5} required value={textoDevocional} onChange={(e) => setTextoDevocional(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Escribe la reflexión del devocional aquí..."></textarea>
        </div>

        <button type="submit" disabled={savingDevocional} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-sm transition cursor-pointer">
          {savingDevocional ? "Guardando..." : (editingDevocionalId ? "Actualizar Devocional" : "Publicar Devocional")}
        </button>
      </form>

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h3 className="font-bold text-sm">Devocionales Existentes ({devocionalesList.length})</h3>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {devocionalesList.map((dev) => (
            <div key={dev.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div>
                <h4 className="font-bold text-sm text-white">{dev.titulo}</h4>
                <p className="text-xs text-slate-400">{dev.versiculo} • Por {dev.autor}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleStartEditDevocional(dev)} className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg text-xs hover:bg-yellow-500/20 cursor-pointer">Editar</button>
                <button onClick={() => handleDeleteDevocional(dev.id)} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs hover:bg-red-500/20 cursor-pointer">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
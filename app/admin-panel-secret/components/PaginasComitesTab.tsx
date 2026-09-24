"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { convertirImagenABase64WebP } from "@/utils/imageUtils";

interface PaginasComitesTabProps {
  comitesList?: any[];
  setStatusMsg: (msg: string | null) => void;
}

export default function PaginasComitesTab({ comitesList = [], setStatusMsg }: PaginasComitesTabProps) {
  const [editingComiteId, setEditingComiteId] = useState<string | null>(null);
  const [tituloComite, setTituloComite] = useState("");
  const [slugComite, setSlugComite] = useState("");
  const [descripcionComite, setDescripcionComite] = useState("");
  const [imagenComiteFile, setImagenComiteFile] = useState<File | null>(null);
  const [savingComite, setSavingComite] = useState(false);

  const handleSaveComite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingComite(true);
    setStatusMsg("Guardando comité...");

    try {
      let imagenUrl = "";
      if (imagenComiteFile) {
        imagenUrl = await convertirImagenABase64WebP(imagenComiteFile, 0.8);
      }

      if (editingComiteId) {
        const updateData: any = {
          titulo: tituloComite,
          slug: slugComite,
          descripcion: descripcionComite,
          updatedAt: serverTimestamp(),
        };
        if (imagenUrl) {
          updateData.imagenUrl = imagenUrl;
        }
        await updateDoc(doc(db, "comites", editingComiteId), updateData);
        setStatusMsg("Comité actualizado con éxito.");
      } else {
        await addDoc(collection(db, "comites"), {
          titulo: tituloComite,
          slug: slugComite,
          descripcion: descripcionComite,
          imagenUrl: imagenUrl || "",
          createdAt: serverTimestamp(),
        });
        setStatusMsg("Comité creado con éxito.");
      }

      setTituloComite("");
      setSlugComite("");
      setDescripcionComite("");
      setImagenComiteFile(null);
      setEditingComiteId(null);
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al guardar el comité.");
    } finally {
      setSavingComite(false);
    }
  };

  const handleStartEditComite = (comite: any) => {
    setEditingComiteId(comite.id);
    setTituloComite(comite.titulo || "");
    setSlugComite(comite.slug || "");
    setDescripcionComite(comite.descripcion || "");
    setStatusMsg(`Editando comité: ${comite.titulo}`);
  };

  const handleDeleteComite = async (id: string) => {
    if (confirm("¿Deseas eliminar este comité?")) {
      await deleteDoc(doc(db, "comites", id));
      setStatusMsg("Comité eliminado.");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 text-slate-100">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{editingComiteId ? "Editar Comité" : "Gestión de Páginas de Comités"}</h2>
        {editingComiteId && (
          <button
            type="button"
            onClick={() => {
              setEditingComiteId(null);
              setTituloComite("");
              setSlugComite("");
              setDescripcionComite("");
            }}
            className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20 cursor-pointer"
          >
            Cancelar Edición
          </button>
        )}
      </div>

      <form onSubmit={handleSaveComite} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Nombre del Comité</label>
            <input type="text" required value={tituloComite} onChange={(e) => setTituloComite(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Ej: Comité de Jóvenes" />
          </div>
          <div>
            <label className="block text-xs mb-1">Slug / Identificador URL</label>
            <input type="text" required value={slugComite} onChange={(e) => setSlugComite(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Ej: comite-de-jovenes" />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1">Imagen de Portada / Logo (Opcional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImagenComiteFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300" />
        </div>

        <div>
          <label className="block text-xs mb-1">Descripción del Comité</label>
          <textarea rows={4} value={descripcionComite} onChange={(e) => setDescripcionComite(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Breve descripción de las funciones y objetivos del comité..."></textarea>
        </div>

        <button type="submit" disabled={savingComite} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-sm transition cursor-pointer">
          {savingComite ? "Guardando..." : (editingComiteId ? "Actualizar Comité" : "Crear Comité")}
        </button>
      </form>

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h3 className="font-bold text-sm">Comités Registrados ({comitesList.length})</h3>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {comitesList.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div>
                <h4 className="font-bold text-sm text-white">{item.titulo}</h4>
                <p className="text-xs text-slate-400">Slug: /{item.slug}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleStartEditComite(item)} className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg text-xs hover:bg-yellow-500/20 cursor-pointer">Editar</button>
                <button onClick={() => handleDeleteComite(item.id)} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs hover:bg-red-500/20 cursor-pointer">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
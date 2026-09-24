"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { convertirImagenABase64WebP } from "@/utils/imageUtils";

interface AnunciosTabProps {
  anuncios?: any[];
  setStatusMsg: (msg: string | null) => void;
}

export default function AnunciosTab({ anuncios = [], setStatusMsg }: AnunciosTabProps) {
  const [tituloAnuncio, setTituloAnuncio] = useState("");
  const [tagAnuncio, setTagAnuncio] = useState("ANUNCIO");
  const [fechaAnuncio, setFechaAnuncio] = useState("");
  const [horaAnuncio, setHoraAnuncio] = useState("");
  const [imagenAnuncioFile, setImagenAnuncioFile] = useState<File | null>(null);
  const [uploadingAnuncio, setUploadingAnuncio] = useState(false);

  const handleCreateAnuncio = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingAnuncio(true);
    try {
      let imagenUrl = "";
      if (imagenAnuncioFile) {
        imagenUrl = await convertirImagenABase64WebP(imagenAnuncioFile, 0.8);
      }
      await addDoc(collection(db, "anuncios"), {
        titulo: tituloAnuncio,
        tag: tagAnuncio,
        fecha: fechaAnuncio,
        hora: horaAnuncio,
        imagenUrl,
        createdAt: serverTimestamp(),
      });
      setTituloAnuncio("");
      setFechaAnuncio("");
      setHoraAnuncio("");
      setImagenAnuncioFile(null);
      setStatusMsg("Anuncio creado con éxito.");
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al crear anuncio.");
    } finally {
      setUploadingAnuncio(false);
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (confirm("¿Deseas eliminar este registro?")) {
      await deleteDoc(doc(db, coll, id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <form onSubmit={handleCreateAnuncio} className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-lg font-bold">Nuevo Anuncio</h2>
        <div>
          <label className="block text-xs mb-1">Título</label>
          <input type="text" required value={tituloAnuncio} onChange={(e) => setTituloAnuncio(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Ej: Gran Vigilia" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Etiqueta (Tag)</label>
            <input type="text" value={tagAnuncio} onChange={(e) => setTagAnuncio(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
          </div>
          <div>
            <label className="block text-xs mb-1">Fecha</label>
            <input type="text" value={fechaAnuncio} onChange={(e) => setFechaAnuncio(e.target.value)} placeholder="Ej: 25 Oct" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Hora</label>
            <input type="text" value={horaAnuncio} onChange={(e) => setHoraAnuncio(e.target.value)} placeholder="Ej: 7:00 PM" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
          </div>
          <div>
            <label className="block text-xs mb-1">Imagen</label>
            <input type="file" accept="image/*" onChange={(e) => setImagenAnuncioFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300" />
          </div>
        </div>
        <button type="submit" disabled={uploadingAnuncio} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-xs transition cursor-pointer">
          {uploadingAnuncio ? "Guardando..." : "Publicar Anuncio"}
        </button>
      </form>

      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-lg font-bold">Anuncios Existentes ({anuncios.length})</h2>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {anuncios.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3">
                {item.imagenUrl && <img src={item.imagenUrl} alt="" className="w-12 h-12 object-cover rounded-lg" />}
                <div>
                  <h4 className="font-bold text-sm text-white">{item.titulo}</h4>
                  <p className="text-[11px] text-slate-400">{item.fecha} - {item.hora}</p>
                </div>
              </div>
              <button onClick={() => handleDelete("anuncios", item.id)} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs hover:bg-red-500/20 cursor-pointer">Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
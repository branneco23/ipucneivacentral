"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { convertirImagenABase64WebP, subirArchivoACloudinary } from "@/utils/imageUtils";

interface AnunciosTabProps {
  anuncios?: any[];
  setStatusMsg: (msg: string | null) => void;
}

export default function AnunciosTab({ anuncios = [], setStatusMsg }: AnunciosTabProps) {
  // Estados para el formulario de Video Pop-up (Usa Cloudinary)
  const [tituloVideoPopup, setTituloVideoPopup] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [activoPopup, setActivoPopup] = useState(true);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Estados para el formulario de Anuncios Generales (Tu lógica original con Base64 WebP)
  const [tituloAnuncio, setTituloAnuncio] = useState("");
  const [tagAnuncio, setTagAnuncio] = useState("ANUNCIO");
  const [fechaAnuncio, setFechaAnuncio] = useState("");
  const [horaAnuncio, setHoraAnuncio] = useState("");
  const [imagenAnuncioFile, setImagenAnuncioFile] = useState<File | null>(null);
  const [uploadingAnuncio, setUploadingAnuncio] = useState(false);

  // 1. Guardar Video Pop-up (Cloudinary)
  const handleSaveVideoPopup = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingVideo(true);

    try {
      let mediaUrl = "";
      if (videoFile) {
        setStatusMsg("Subiendo video a Cloudinary...");
        mediaUrl = await subirArchivoACloudinary(videoFile);
      }

      setStatusMsg("Guardando video pop-up en Firebase...");
      await addDoc(collection(db, "anuncios"), {
        titulo: tituloVideoPopup,
        mediaUrl: mediaUrl,
        tipo: "video",
        esPopup: true,
        activoPopup: activoPopup,
        createdAt: serverTimestamp(),
      });

      setTituloVideoPopup("");
      setVideoFile(null);
      setStatusMsg("¡Video Pop-up guardado con éxito!");
    } catch (err: any) {
      console.error(err);
      setStatusMsg(`Error: ${err.message || "No se pudo guardar el video."}`);
    } finally {
      setUploadingVideo(false);
    }
  };

  // 2. Guardar Anuncio General (Tu diseño original)
  const handleCreateAnuncio = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingAnuncio(true);

    try {
      let imagenUrl = "";
      if (imagenAnuncioFile) {
        setStatusMsg("Procesando imagen...");
        imagenUrl = await convertirImagenABase64WebP(imagenAnuncioFile, 0.8);
      }

      setStatusMsg("Guardando anuncio...");
      await addDoc(collection(db, "anuncios"), {
        titulo: tituloAnuncio,
        tag: tagAnuncio,
        fecha: fechaAnuncio,
        hora: horaAnuncio,
        imagenUrl,
        esPopup: false,
        activoPopup: false,
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

  const handleTogglePopup = async (id: string, currentState: boolean) => {
    try {
      const docRef = doc(db, "anuncios", id);
      await updateDoc(docRef, { activoPopup: !currentState });
      setStatusMsg("Estado del popup actualizado.");
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al cambiar el estado del popup.");
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (confirm("¿Deseas eliminar este registro?")) {
      await deleteDoc(doc(db, coll, id));
      setStatusMsg("Registro eliminado.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Columna Izquierda: Formularios Separados */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* SECCIÓN 1: Video Pop-up Principal */}
        <form onSubmit={handleSaveVideoPopup} className="bg-slate-900 border border-indigo-500/30 p-6 rounded-2xl space-y-4 shadow-lg shadow-indigo-950/20">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              🎬 Video Pop-up Principal
            </h2>
            <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-2 py-0.5 rounded-full border border-indigo-500/30">
              Pantalla Principal
            </span>
          </div>
          
          <div>
            <label className="block text-xs mb-1 text-slate-300">Título del Video / Pop-up</label>
            <input 
              type="text" 
              required 
              value={tituloVideoPopup} 
              onChange={(e) => setTituloVideoPopup(e.target.value)} 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-indigo-500 outline-none" 
              placeholder="Ej: Video de bienvenida" 
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-slate-300">Archivo de Video (.mp4)</label>
            <input 
              type="file" 
              accept="video/*" 
              onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)} 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:bg-indigo-600 file:text-white cursor-pointer" 
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input 
              type="checkbox" 
              id="activoPopupCheck" 
              checked={activoPopup} 
              onChange={(e) => setActivoPopup(e.target.checked)} 
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="activoPopupCheck" className="text-xs font-medium text-slate-300 cursor-pointer">
              Activar inmediatamente como Pop-up visible
            </label>
          </div>

          <button 
            type="submit" 
            disabled={uploadingVideo} 
            className="w-full bg-indigo-600 hover:bg-indigo-700 font-bold py-3 rounded-xl text-xs transition cursor-pointer disabled:opacity-50"
          >
            {uploadingVideo ? "Subiendo Video..." : "Guardar Video Pop-up"}
          </button>
        </form>

        {/* SECCIÓN 2: Anuncio General (Tu diseño original intacto) */}
        <form onSubmit={handleCreateAnuncio} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-white">Nuevo Anuncio General</h2>
          
          <div>
            <label className="block text-xs mb-1 text-slate-300">Título</label>
            <input 
              type="text" 
              required 
              value={tituloAnuncio} 
              onChange={(e) => setTituloAnuncio(e.target.value)} 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" 
              placeholder="Ej: Gran Vigilia" 
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1 text-slate-300">Etiqueta (Tag)</label>
              <input 
                type="text" 
                value={tagAnuncio} 
                onChange={(e) => setTagAnuncio(e.target.value)} 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" 
              />
            </div>
            <div>
              <label className="block text-xs mb-1 text-slate-300">Fecha</label>
              <input 
                type="text" 
                value={fechaAnuncio} 
                onChange={(e) => setFechaAnuncio(e.target.value)} 
                placeholder="Ej: 25 Oct" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1 text-slate-300">Hora</label>
              <input 
                type="text" 
                value={horaAnuncio} 
                onChange={(e) => setHoraAnuncio(e.target.value)} 
                placeholder="Ej: 7:00 PM" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" 
              />
            </div>
            <div>
              <label className="block text-xs mb-1 text-slate-300">Imagen</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImagenAnuncioFile(e.target.files ? e.target.files[0] : null)} 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={uploadingAnuncio} 
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-xs transition cursor-pointer"
          >
            {uploadingAnuncio ? "Guardando..." : "Publicar Anuncio"}
          </button>
        </form>

      </div>

      {/* Columna Derecha: Listado Existentes (Compatible con imagenUrl y mediaUrl) */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-lg font-bold text-white">Anuncios Existentes ({anuncios.length})</h2>
        <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
          {anuncios.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700 gap-4">
              <div className="flex items-center gap-3">
                {/* Lee tanto imagenUrl (anuncios normales) como mediaUrl (video pop-up) */}
                {item.imagenUrl ? (
                  <img src={item.imagenUrl} alt="" className="w-12 h-12 object-cover rounded-lg" />
                ) : item.mediaUrl ? (
                  <video src={item.mediaUrl} className="w-12 h-12 object-cover rounded-lg bg-black" />
                ) : (
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-[10px] text-slate-400 text-center">Sin media</div>
                )}
                
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white">{item.titulo}</h4>
                    {item.esPopup ? (
                      <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-2 py-0.5 rounded-full border border-indigo-500/30 font-medium">
                        Video Pop-up
                      </span>
                    ) : (
                      <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded-full">
                        {item.tag || "ANUNCIO"}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {item.esPopup ? "Pop-up multimedia" : `${item.fecha} - ${item.hora}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {item.esPopup && (
                  <button 
                    onClick={() => handleTogglePopup(item.id, Boolean(item.activoPopup))}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border cursor-pointer transition ${
                      item.activoPopup 
                        ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30" 
                        : "bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600"
                    }`}
                  >
                    {item.activoPopup ? "Pop-up Activo" : "Pop-up Inactivo"}
                  </button>
                )}
                <button 
                  onClick={() => handleDelete("anuncios", item.id)} 
                  className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs hover:bg-red-500/20 cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { convertirImagenABase64WebP } from "@/utils/imageUtils";
import { categoriasOficialesComites } from "@/constants/comitesConstants";

const generarSlug = (texto: string) => {
  return texto.toLowerCase().replace(/ /g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function AdminComitesPage() {
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const initialSlug = categoriasOficialesComites.length > 0 ? generarSlug(categoriasOficialesComites[0]) : "directiva-de-escuela-dominical";
  const [selectedComiteSlug, setSelectedComiteSlug] = useState<string>(initialSlug);
  const [comiteNombre, setComiteNombre] = useState(categoriasOficialesComites[0] || "");
  const [comiteVersiculo, setComiteVersiculo] = useState("");
  const [comiteMision, setComiteMision] = useState("");
  const [comiteVision, setComiteVision] = useState("");
  const [comiteYoutubeIds, setComiteYoutubeIds] = useState("");
  const [comiteBannerUrl, setComiteBannerUrl] = useState("");
  const [fotoGrupalFile, setFotoGrupalFile] = useState<File | null>(null);

  // 1. Integrantes para la Página Interna (Medio cuerpo / Avatar)
  const [integrantesInternos, setIntegrantesInternos] = useState<any[]>([]);
  const [newNombreIntInterno, setNewNombreIntInterno] = useState("");
  const [newCargoIntInterno, setNewCargoIntInterno] = useState("");
  const [newFotoIntInternoFile, setNewFotoIntInternoFile] = useState<File | null>(null);
  const [uploadingIntInterno, setUploadingIntInterno] = useState(false);

  // 2. Integrantes para la Página General (Cuerpo Completo / Listado vertical extendido)
  const [integrantesGenerales, setIntegrantesGenerales] = useState<any[]>([]);
  const [newNombreIntGeneral, setNewNombreIntGeneral] = useState("");
  const [newCargoIntGeneral, setNewCargoIntGeneral] = useState("");
  const [newFotoIntGeneralFile, setNewFotoIntGeneralFile] = useState<File | null>(null);
  const [uploadingIntGeneral, setUploadingIntGeneral] = useState(false);

  // 3. Galería / Evidencias
  const [eventos, setEventos] = useState<any[]>([]);
  const [newTituloEvt, setNewTituloEvt] = useState("");
  const [newTipoEvt, setNewTipoEvt] = useState<"imagen" | "video">("imagen");
  const [newArchivoEvtFile, setNewArchivoEvtFile] = useState<File | null>(null);
  const [uploadingEvt, setUploadingEvt] = useState(false);

  const [savingComitePagina, setSavingComitePagina] = useState(false);

  useEffect(() => {
    const categoriaOriginal = categoriasOficialesComites.find(
      (cat) => generarSlug(cat) === selectedComiteSlug
    ) || selectedComiteSlug;

    const loadComitePageData = async () => {
      const docRef = doc(db, "comites_detalles", selectedComiteSlug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const d = docSnap.data();
        setComiteNombre(d.nombre || categoriaOriginal);
        setComiteVersiculo(d.versiculo || "");
        setComiteMision(d.mision || "");
        setComiteVision(d.vision || "");
        setComiteYoutubeIds((d.youtubeIds || []).join(", "));
        setComiteBannerUrl(d.bannerUrl || d.fotoGrupal || "");
        setIntegrantesInternos(d.integrantesInternos || d.integrantes || []);
        setIntegrantesGenerales(d.integrantesGenerales || []);
        setEventos(d.eventos || []);
      } else {
        setComiteNombre(categoriaOriginal);
        setComiteVersiculo("");
        setComiteMision("");
        setComiteVision("");
        setComiteYoutubeIds("");
        setComiteBannerUrl("");
        setIntegrantesInternos([]);
        setIntegrantesGenerales([]);
        setEventos([]);
      }
    };

    loadComitePageData();
  }, [selectedComiteSlug]);

  const subirACloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Faltan las variables de entorno de Cloudinary");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.secure_url) throw new Error("Error al subir archivo a Cloudinary");
    return data.secure_url;
  };

  const handleAddIntInterno = async () => {
    if (!newNombreIntInterno.trim() || !newFotoIntInternoFile) {
      alert("Completa el nombre y selecciona una foto para el integrante interno.");
      return;
    }
    setUploadingIntInterno(true);
    try {
      const fotoUrl = await subirACloudinary(newFotoIntInternoFile);
      setIntegrantesInternos([
        ...integrantesInternos,
        { id: Date.now(), nombre: newNombreIntInterno, cargo: newCargoIntInterno, foto: fotoUrl },
      ]);
      setNewNombreIntInterno("");
      setNewCargoIntInterno("");
      setNewFotoIntInternoFile(null);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setUploadingIntInterno(false);
    }
  };

  const handleAddIntGeneral = async () => {
    if (!newNombreIntGeneral.trim() || !newFotoIntGeneralFile) {
      alert("Completa el nombre y selecciona una foto de cuerpo completo.");
      return;
    }
    setUploadingIntGeneral(true);
    try {
      const fotoUrl = await subirACloudinary(newFotoIntGeneralFile);
      setIntegrantesGenerales([
        ...integrantesGenerales,
        { id: Date.now(), nombre: newNombreIntGeneral, cargo: newCargoIntGeneral, foto: fotoUrl },
      ]);
      setNewNombreIntGeneral("");
      setNewCargoIntGeneral("");
      setNewFotoIntGeneralFile(null);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setUploadingIntGeneral(false);
    }
  };

  const handleAddEvento = async () => {
    if (!newTituloEvt.trim() || !newArchivoEvtFile) {
      alert("Ingresa un título y selecciona un archivo para la evidencia.");
      return;
    }
    setUploadingEvt(true);
    try {
      const archivoUrl = await subirACloudinary(newArchivoEvtFile);
      setEventos([
        ...eventos,
        {
          id: Date.now().toString(),
          titulo: newTituloEvt,
          tipo: newTipoEvt,
          imagen: archivoUrl,
        },
      ]);
      setNewTituloEvt("");
      setNewArchivoEvtFile(null);
    } catch (err: any) {
      alert(`Error al subir evidencia: ${err.message}`);
    } finally {
      setUploadingEvt(false);
    }
  };

  const handleSaveComitePagina = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingComitePagina(true);
    setStatusMsg("Guardando todos los cambios...");

    try {
      let bannerFinalUrl = comiteBannerUrl || "";
      if (fotoGrupalFile) {
        bannerFinalUrl = await convertirImagenABase64WebP(fotoGrupalFile, 0.8);
      }

      const youtubeArray = (comiteYoutubeIds || "")
        .split(",")
        .map((idStr) => String(idStr).trim())
        .filter((idStr) => idStr.length > 0);

      const comiteData = {
        nombre: String(comiteNombre || "Directiva"),
        versiculo: String(comiteVersiculo || ""),
        mision: String(comiteMision || ""),
        vision: String(comiteVision || ""),
        bannerUrl: String(bannerFinalUrl),
        fotoGrupal: String(bannerFinalUrl),
        youtubeIds: youtubeArray,
        integrantesInternos: integrantesInternos.map(i => ({ id: Number(i.id || Date.now()), nombre: String(i.nombre), cargo: String(i.cargo), foto: String(i.foto) })),
        integrantesGenerales: integrantesGenerales.map(i => ({ id: Number(i.id || Date.now()), nombre: String(i.nombre), cargo: String(i.cargo), foto: String(i.foto) })),
        integrantes: integrantesInternos.map(i => ({ id: Number(i.id || Date.now()), nombre: String(i.nombre), cargo: String(i.cargo), foto: String(i.foto) })),
        eventos: eventos.map(evt => ({ id: String(evt.id), titulo: String(evt.titulo), tipo: String(evt.tipo), imagen: String(evt.imagen) })),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "comites_detalles", selectedComiteSlug), comiteData, { merge: true });
      setStatusMsg("¡Guardado correctamente en la base de datos!");
    } catch (err: any) {
      setStatusMsg(`Error al guardar: ${err.message}`);
    } finally {
      setSavingComitePagina(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10 pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {statusMsg && <div className="bg-blue-600/10 border border-blue-500/30 text-blue-300 p-3 rounded-xl text-xs text-center">{statusMsg}</div>}

        <form onSubmit={handleSaveComitePagina} className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-xl font-bold">Gestión de Comités (Panel de Administración)</h2>
              <p className="text-xs text-slate-400">Configura la información general, integrantes, videos y galería.</p>
            </div>
            <select
              value={selectedComiteSlug}
              onChange={(e) => setSelectedComiteSlug(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm font-bold text-yellow-400 cursor-pointer"
            >
              {categoriasOficialesComites.map((cat, idx) => (
                <option key={idx} value={generarSlug(cat)}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs mb-1 font-semibold">Nombre del Comité</label>
              <input type="text" value={comiteNombre} onChange={(e) => setComiteNombre(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
            </div>
            <div>
              <label className="block text-xs mb-1 font-semibold">Versículo Lema</label>
              <input type="text" value={comiteVersiculo} onChange={(e) => setComiteVersiculo(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs mb-1 font-semibold">URL de la Imagen de Banner</label>
              <input type="text" value={comiteBannerUrl} onChange={(e) => setComiteBannerUrl(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
            </div>
            <div>
              <label className="block text-xs mb-1 font-semibold">O Subir Archivo de Banner</label>
              <input type="file" accept="image/*" onChange={(e) => setFotoGrupalFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs mb-1 font-semibold">Misión</label>
              <textarea rows={3} value={comiteMision} onChange={(e) => setComiteMision(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
            </div>
            <div>
              <label className="block text-xs mb-1 font-semibold">Visión</label>
              <textarea rows={3} value={comiteVision} onChange={(e) => setComiteVision(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
            </div>
          </div>

          {/* SECCIÓN 1: INTEGRANTES INTERNOS (Medio cuerpo) */}
          <div className="border-t border-slate-800 pt-6 space-y-4">
            <h3 className="text-lg font-bold">1️⃣ Integrantes (Página Interna - Medio Cuerpo)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
              <div>
                <label className="block text-xs mb-1 font-semibold">Nombre</label>
                <input type="text" value={newNombreIntInterno} onChange={(e) => setNewNombreIntInterno(e.target.value)} placeholder="Ej: Juan Pérez" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs mb-1 font-semibold">Cargo</label>
                <input type="text" value={newCargoIntInterno} onChange={(e) => setNewCargoIntInterno(e.target.value)} placeholder="Ej: Director" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs mb-1 font-semibold">Foto</label>
                <input type="file" accept="image/*" onChange={(e) => setNewFotoIntInternoFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300 cursor-pointer" />
              </div>
            </div>
            <button type="button" onClick={handleAddIntInterno} disabled={uploadingIntInterno} className="bg-blue-600 hover:bg-blue-700 font-bold px-4 py-2.5 rounded-xl text-xs text-white cursor-pointer">
              {uploadingIntInterno ? "Subiendo..." : "+ Añadir a Página Interna"}
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {integrantesInternos.map((int) => (
                <div key={int.id} className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3">
                    <img src={int.foto} alt="" className="w-12 h-12 object-cover rounded-full border border-slate-600" />
                    <div><h4 className="font-bold text-xs text-white">{int.nombre}</h4><p className="text-[10px] text-yellow-400">{int.cargo}</p></div>
                  </div>
                  <button type="button" onClick={() => setIntegrantesInternos(integrantesInternos.filter(i => i.id !== int.id))} className="text-red-400 text-xs bg-red-500/10 px-2 py-1 rounded cursor-pointer">Quitar</button>
                </div>
              ))}
            </div>
          </div>

          {/* SECCIÓN 2: INTEGRANTES GENERALES (CUERPO COMPLETO - Listado con tarjetas altas y object-contain object-bottom) */}
          <div className="border-t border-slate-800 pt-6 space-y-4">
            <h3 className="text-lg font-bold">2️⃣ Integrantes (Página General - Cuerpo Completo)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
              <div>
                <label className="block text-xs mb-1 font-semibold">Nombre y Apellido</label>
                <input type="text" value={newNombreIntGeneral} onChange={(e) => setNewNombreIntGeneral(e.target.value)} placeholder="Ej: Esteban Zúñiga" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs mb-1 font-semibold">Cargo</label>
                <input type="text" value={newCargoIntGeneral} onChange={(e) => setNewCargoIntGeneral(e.target.value)} placeholder="Ej: PASTOR" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs mb-1 font-semibold">Foto de Cuerpo Entero</label>
                <input type="file" accept="image/*" onChange={(e) => setNewFotoIntGeneralFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300 cursor-pointer" />
              </div>
            </div>
            <button type="button" onClick={handleAddIntGeneral} disabled={uploadingIntGeneral} className="bg-purple-600 hover:bg-purple-700 font-bold px-4 py-2.5 rounded-xl text-xs text-white cursor-pointer">
              {uploadingIntGeneral ? "Subiendo..." : "+ Añadir a Página General"}
            </button>
            
            {/* Listado de tarjetas de cuerpo completo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
              {integrantesGenerales.map((int) => (
                <div key={int.id} className="flex flex-col h-[420px] bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                  <div className="text-center py-3 bg-slate-800/90 border-b border-slate-700">
                    <span className="text-yellow-400 text-[10px] font-bold tracking-[0.2em] uppercase">{int.cargo}</span>
                  </div>
                  <div className="relative flex-1 overflow-hidden bg-slate-950 flex items-end justify-center p-2">
                    <img src={int.foto} alt={int.nombre} className="w-full h-full object-contain object-bottom" />
                  </div>
                  <div className="bg-[#001a41] p-4 text-center space-y-2">
                    <h4 className="text-white text-sm font-black tracking-widest uppercase truncate">{int.nombre}</h4>
                    <button type="button" onClick={() => setIntegrantesGenerales(integrantesGenerales.filter(i => i.id !== int.id))} className="w-full bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs py-1.5 rounded-lg transition cursor-pointer font-semibold">Quitar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1 font-semibold">IDs de Videos de YouTube (separados por comas)</label>
            <input type="text" value={comiteYoutubeIds} onChange={(e) => setComiteYoutubeIds(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
          </div>

          {/* GALERÍA / EVIDENCIAS */}
          <div className="border-t border-slate-800 pt-6 space-y-4">
            <h3 className="text-lg font-bold">Galería de Evidencias (Fotos y Videos)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
              <div>
                <label className="block text-xs mb-1 font-semibold">Título del Elemento</label>
                <input type="text" value={newTituloEvt} onChange={(e) => setNewTituloEvt(e.target.value)} placeholder="Ej: Actividad" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs mb-1 font-semibold">Tipo de Evidencia</label>
                <select value={newTipoEvt} onChange={(e) => { setNewTipoEvt(e.target.value as "imagen" | "video"); setNewArchivoEvtFile(null); }} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white cursor-pointer">
                  <option value="imagen">📸 Foto</option>
                  <option value="video">🎥 Video MP4</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1 font-semibold">Seleccionar Archivo (PC)</label>
                <input type="file" accept={newTipoEvt === "imagen" ? "image/*" : "video/mp4,video/webm"} onChange={(e) => setNewArchivoEvtFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300 cursor-pointer" />
              </div>
            </div>
            <button type="button" onClick={handleAddEvento} disabled={uploadingEvt} className="bg-emerald-600 hover:bg-emerald-700 font-bold px-4 py-2.5 rounded-xl text-xs text-white cursor-pointer">
              {uploadingEvt ? "Procesando archivo..." : "+ Añadir a la Galería"}
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {eventos.map((evt) => (
                <div key={evt.id} className="bg-slate-800 border border-slate-700 p-3 rounded-xl relative space-y-2">
                  {evt.tipo === "imagen" ? (
                    <img src={evt.imagen} alt="" className="w-full h-32 object-cover rounded-lg" />
                  ) : (
                    <video src={evt.imagen} controls className="w-full h-32 object-cover rounded-lg" />
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold truncate text-white">{evt.titulo}</span>
                    <button type="button" onClick={() => setEventos(eventos.filter(e => e.id !== evt.id))} className="text-red-400 text-xs bg-red-500/10 px-2 py-1 rounded cursor-pointer">Quitar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={savingComitePagina} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition cursor-pointer">
            {savingComitePagina ? "Guardando..." : "Guardar Todos los Cambios del Comité"}
          </button>
        </form>
      </div>
    </div>
  );
}
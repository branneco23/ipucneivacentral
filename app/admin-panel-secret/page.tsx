"use client";

import React, { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, setDoc, serverTimestamp, query, orderBy, getDoc } from "firebase/firestore";
import { convertirImagenABase64WebP } from "@/utils/imageUtils";
import { categoriasOficialesComites } from "@/constants/comitesConstants";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

// Función utilitaria para generar slugs limpios
const generarSlug = (texto: string) => {
  return texto.toLowerCase().replace(/ /g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Introduce la URL de la imagen:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-1 bg-slate-800 p-2 rounded-t-xl border-b border-slate-700 text-xs text-white">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded ${editor.isActive('bold') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Negrita</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded ${editor.isActive('italic') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Cursiva</button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1.5 rounded ${editor.isActive('underline') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Subrayado</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded ${editor.isActive('bulletList') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Viñetas</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-1.5 rounded ${editor.isActive('orderedList') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Numeración</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className="p-1.5 rounded hover:bg-slate-700">Izq.</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className="p-1.5 rounded hover:bg-slate-700">Centrar</button>
      <input
        type="color"
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 self-center"
        title="Color de texto"
      />
      <button type="button" onClick={addImage} className="p-1.5 rounded hover:bg-slate-700 bg-slate-700">🖼️ Imagen</button>
    </div>
  );
};

export default function AdminPanelPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"anuncios" | "envivos" | "devocionales" | "comites" | "paginasComites" | "blogs">("anuncios");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Listas de Firebase
  const [anuncios, setAnuncios] = useState<any[]>([]);
  const [devocionales, setDevocionales] = useState<any[]>([]);
  const [comitesList, setComitesList] = useState<any[]>([]);
  const [blogsList, setBlogsList] = useState<any[]>([]);

  // Estados Formulario Anuncios
  const [tituloAnuncio, setTituloAnuncio] = useState("");
  const [tagAnuncio, setTagAnuncio] = useState("ANUNCIO");
  const [fechaAnuncio, setFechaAnuncio] = useState("");
  const [horaAnuncio, setHoraAnuncio] = useState("");
  const [imagenAnuncioFile, setImagenAnuncioFile] = useState<File | null>(null);
  const [uploadingAnuncio, setUploadingAnuncio] = useState(false);

  // Estados Formulario En Vivos
  const [liveUrl, setLiveUrl] = useState("");
  const [liveTitle, setLiveTitle] = useState("");
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [savingLive, setSavingLive] = useState(false);

  // Estados Formulario Devocionales
  const [tituloDevocional, setTituloDevocional] = useState("");
  const [linkMeet, setLinkMeet] = useState("");
  const [uploadingDevocional, setUploadingDevocional] = useState(false);

  // SECCIÓN INDEPENDIENTE: Páginas de Comités
  const initialSlug = categoriasOficialesComites.length > 0 ? generarSlug(categoriasOficialesComites[0]) : "directiva-de-escuela-dominical";
  const [selectedComiteSlug, setSelectedComiteSlug] = useState<string>(initialSlug);
  const [comiteNombre, setComiteNombre] = useState(categoriasOficialesComites[0] || "");
  const [comiteVersiculo, setComiteVersiculo] = useState("");
  const [comiteMision, setComiteMision] = useState("");
  const [comiteVision, setComiteVision] = useState("");
  const [comiteYoutubeIds, setComiteYoutubeIds] = useState("");
  const [comiteBannerUrl, setComiteBannerUrl] = useState("");
  const [fotoGrupalFile, setFotoGrupalFile] = useState<File | null>(null);
  const [fotoGrupalPreview, setFotoGrupalPreview] = useState("");

  // Estados actuales de eventos que ya tienes en tu componente:
  const [eventos, setEventos] = useState<any[]>([]);
  const [newTituloEvt, setNewTituloEvt] = useState("");
  const [newTipoEvt, setNewTipoEvt] = useState<"imagen" | "video">("imagen");
  const [newArchivoEvtFile, setNewArchivoEvtFile] = useState<File | null>(null);
  const [uploadingEvt, setUploadingEvt] = useState(false);

  const [savingComitePagina, setSavingComitePagina] = useState(false);

  // Estados Formulario Blogs y Videos de Enseñanza
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [tituloBlog, setTituloBlog] = useState("");
  const [autorBlog, setAutorBlog] = useState("Pastor Principal");
  const [tagBlog, setTagBlog] = useState("Estudio Bíblico");
  const [portadaBlogFile, setPortadaBlogFile] = useState<File | null>(null);
  const [videoBlogUrl, setVideoBlogUrl] = useState("");
  const [savingBlog, setSavingBlog] = useState(false);

  // Editor Tiptap
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: "<p>Escribe tu contenido aquí...</p>",
    immediatelyRender: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubAnuncios = onSnapshot(query(collection(db, "anuncios"), orderBy("createdAt", "desc")), (snap) => {
      setAnuncios(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubLive = onSnapshot(doc(db, "envivos", "main"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLiveUrl(data.url || "");
        setLiveTitle(data.titulo || "");
        setIsLiveActive(data.activo || false);
      }
    });

    const unsubDevocionales = onSnapshot(query(collection(db, "devocionales"), orderBy("createdAt", "desc")), (snap) => {
      setDevocionales(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubComites = onSnapshot(query(collection(db, "comites"), orderBy("createdAt", "desc")), (snap) => {
      setComitesList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubBlogs = onSnapshot(query(collection(db, "blogs"), orderBy("createdAt", "desc")), (snap) => {
      setBlogsList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubAnuncios();
      unsubLive();
      unsubDevocionales();
      unsubComites();
      unsubBlogs();
    };
  }, [user]);

  // Cargar datos de la página del comité cuando cambia la selección
  useEffect(() => {
    if (!user || activeTab !== "paginasComites") return;

    // Encontrar el nombre original basado en el slug seleccionado
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
        setFotoGrupalPreview(d.fotoGrupal || "");
        setEventos(d.eventos || []);
      } else {
        setComiteNombre(categoriaOriginal);
        setComiteVersiculo("");
        setComiteMision("");
        setComiteVision("");
        setComiteYoutubeIds("");
        setComiteBannerUrl("");
        setFotoGrupalPreview("");
        setEventos([]);
      }
    };

    loadComitePageData();
  }, [selectedComiteSlug, activeTab, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setAuthError("Credenciales incorrectas.");
    }
  };

  const handleLogout = () => signOut(auth);

  const handleDelete = async (coll: string, id: string) => {
    if (confirm("¿Deseas eliminar este registro?")) {
      await deleteDoc(doc(db, coll, id));
    }
  };

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

  const handleSaveLive = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingLive(true);
    try {
      await setDoc(doc(db, "envivos", "main"), {
        url: liveUrl,
        titulo: liveTitle,
        activo: isLiveActive,
        updatedAt: serverTimestamp(),
      });
      setStatusMsg("Configuración de en vivo guardada.");
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al guardar en vivo.");
    } finally {
      setSavingLive(false);
    }
  };

  const handleCreateDevocional = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingDevocional(true);
    try {
      await addDoc(collection(db, "devocionales"), {
        titulo: tituloDevocional,
        linkMeet,
        createdAt: serverTimestamp(),
      });
      setTituloDevocional("");
      setLinkMeet("");
      setStatusMsg("Devocional agregado.");
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al agregar devocional.");
    } finally {
      setUploadingDevocional(false);
    }
  };

  // Función mejorada para subir imagen o video localmente desde la PC
  const handleAddEvento = async () => {
    if (!newTituloEvt.trim()) {
      alert("Por favor ingresa un título para el elemento.");
      return;
    }
    if (!newArchivoEvtFile) {
      alert("Por favor selecciona un archivo desde tu PC.");
      return;
    }

    setUploadingEvt(true);
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        alert("Faltan las variables de entorno de Cloudinary en el archivo .env.local");
        setUploadingEvt(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", newArchivoEvtFile);
      formData.append("upload_preset", uploadPreset);

      // Cloudinary detecta automáticamente si es imagen o video con "auto/upload"
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.secure_url) {
        throw new Error(data.error?.message || "Error al subir el archivo a Cloudinary");
      }

      // Guardamos la URL pública que nos devuelve Cloudinary
      setEventos([
        ...eventos,
        {
          id: Date.now().toString(),
          titulo: newTituloEvt,
          tipo: newTipoEvt,
          imagen: data.secure_url // URL directa y optimizada de Cloudinary
        }
      ]);

      setNewTituloEvt("");
      setNewArchivoEvtFile(null);
      alert("¡Archivo multimedia subido con éxito a Cloudinary!");
    } catch (err: any) {
      console.error("Error al subir a Cloudinary:", err);
      alert(`No se pudo subir el archivo: ${err.message}`);
    } finally {
      setUploadingEvt(false);
    }
  };

  const handleRemoveEvento = (id: string) => {
    setEventos(eventos.filter(e => e.id !== id));
  };

  const handleSaveComitePagina = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingComitePagina(true);
    setStatusMsg("Guardando información de la página del comité...");

    try {
      let bannerFinalUrl = comiteBannerUrl || "";
      if (fotoGrupalFile) {
        bannerFinalUrl = await convertirImagenABase64WebP(fotoGrupalFile, 0.8);
      }

      const youtubeArray = (comiteYoutubeIds || "")
        .split(",")
        .map((idStr) => String(idStr).trim())
        .filter((idStr) => idStr.length > 0);

      const eventosLimpios = (eventos || []).map((evt) => ({
        id: String(evt.id || Date.now()),
        titulo: String(evt.titulo || ""),
        tipo: String(evt.tipo || "imagen"),
        imagen: String(evt.imagen || ""),
      }));

      const comiteData = {
        nombre: String(comiteNombre || "Directiva"),
        versiculo: String(comiteVersiculo || ""),
        mision: String(comiteMision || ""),
        vision: String(comiteVision || ""),
        bannerUrl: String(bannerFinalUrl),
        fotoGrupal: String(bannerFinalUrl),
        youtubeIds: youtubeArray,
        eventos: eventosLimpios,
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "comites_detalles", selectedComiteSlug), comiteData, { merge: true });
      setStatusMsg("¡Página del comité actualizada correctamente!");
    } catch (err: any) {
      console.error("Error detallado al guardar en Firestore:", err);
      setStatusMsg(`Error al guardar: ${err.message || "Revisa la consola"}`);
    } finally {
      setSavingComitePagina(false);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;
    setSavingBlog(true);
    setStatusMsg("Procesando y guardando blog...");

    try {
      let portadaUrl = "";
      if (portadaBlogFile) {
        portadaUrl = await convertirImagenABase64WebP(portadaBlogFile, 0.8);
      }

      let formattedVideoUrl = videoBlogUrl.trim();
      if (formattedVideoUrl.includes("watch?v=")) {
        const idStr = formattedVideoUrl.split("v=")[1].split("&")[0];
        formattedVideoUrl = `https://www.youtube.com/embed/${idStr}`;
      } else if (formattedVideoUrl.includes("youtu.be/")) {
        const idStr = formattedVideoUrl.split("youtu.be/")[1].split("?")[0];
        formattedVideoUrl = `https://www.youtube.com/embed/${idStr}`;
      }

      const contenidoHtml = editor.getHTML();

      if (editingBlogId) {
        const updateData: any = {
          titulo: tituloBlog,
          autor: autorBlog,
          tag: tagBlog,
          contenido: contenidoHtml,
          updatedAt: serverTimestamp(),
        };
        if (portadaUrl) {
          updateData.portadaUrl = portadaUrl;
          updateData.imagenUrl = portadaUrl;
        }
        if (formattedVideoUrl !== undefined) {
          updateData.videoUrl = formattedVideoUrl;
        }

        await updateDoc(doc(db, "blogs", editingBlogId), updateData);
        setStatusMsg("Blog actualizado correctamente.");
      } else {
        await addDoc(collection(db, "blogs"), {
          titulo: tituloBlog,
          autor: autorBlog,
          tag: tagBlog,
          contenido: contenidoHtml,
          portadaUrl: portadaUrl || "",
          imagenUrl: portadaUrl || "",
          videoUrl: formattedVideoUrl || "",
          createdAt: serverTimestamp(),
        });
        setStatusMsg("Blog creado con éxito.");
      }

      setTituloBlog("");
      setAutorBlog("Pastor Principal");
      setTagBlog("Estudio Bíblico");
      setPortadaBlogFile(null);
      setVideoBlogUrl("");
      setEditingBlogId(null);
      editor.commands.clearContent();
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al guardar el blog.");
    } finally {
      setSavingBlog(false);
    }
  };

  if (authLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Cargando...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 text-white space-y-4">
          <h1 className="text-2xl font-bold text-center">Acceso Administrativo</h1>
          {authError && <p className="text-red-400 text-xs text-center">{authError}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" className="w-full bg-slate-800 p-3 rounded-xl text-sm border border-slate-700" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="w-full bg-slate-800 p-3 rounded-xl text-sm border border-slate-700" />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-sm transition">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="mt-24 flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <button onClick={handleLogout} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-xs font-bold transition">
            Cerrar Sesión
          </button>
        </div>

        {statusMsg && <div className="bg-blue-600/10 border border-blue-500/30 text-blue-300 p-3 rounded-xl text-xs text-center">{statusMsg}</div>}

        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {[
            { id: "anuncios", label: "Anuncios" },
            { id: "envivos", label: "En Vivos" },
            { id: "devocionales", label: "Devocionales" },
            { id: "paginasComites", label: "🏛️ Páginas de Comités" },
            { id: "blogs", label: "✍️ Gestión de Blogs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${activeTab === tab.id ? "bg-blue-600 text-white" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PESTAÑA ANUNCIOS */}
        {activeTab === "anuncios" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleCreateAnuncio} className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold">Nuevo Anuncio</h2>
              <div>
                <label className="block text-xs mb-1">Título</label>
                <input type="text" required value={tituloAnuncio} onChange={(e) => setTituloAnuncio(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" placeholder="Ej: Gran Vigilia" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">Etiqueta (Tag)</label>
                  <input type="text" value={tagAnuncio} onChange={(e) => setTagAnuncio(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-xs mb-1">Fecha</label>
                  <input type="text" value={fechaAnuncio} onChange={(e) => setFechaAnuncio(e.target.value)} placeholder="Ej: 25 Oct" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">Hora</label>
                  <input type="text" value={horaAnuncio} onChange={(e) => setHoraAnuncio(e.target.value)} placeholder="Ej: 7:00 PM" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-xs mb-1">Imagen</label>
                  <input type="file" accept="image/*" onChange={(e) => setImagenAnuncioFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs" />
                </div>
              </div>
              <button type="submit" disabled={uploadingAnuncio} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-xs transition">
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
                    <button onClick={() => handleDelete("anuncios", item.id)} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs hover:bg-red-500/20">Eliminar</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA EN VIVOS */}
        {activeTab === "envivos" && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-xl mx-auto">
            <form onSubmit={handleSaveLive} className="space-y-4">
              <h2 className="text-lg font-bold">Configurar Transmisión En Vivo</h2>
              <div>
                <label className="block text-xs mb-1">Título de la Transmisión</label>
                <input type="text" value={liveTitle} onChange={(e) => setLiveTitle(e.target.value)} placeholder="Ej: Culto Dominical En Vivo" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs mb-1">URL de YouTube / Video</label>
                <input type="text" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="liveActive" checked={isLiveActive} onChange={(e) => setIsLiveActive(e.target.checked)} className="w-4 h-4 rounded bg-slate-800 border-slate-700" />
                <label htmlFor="liveActive" className="text-xs font-semibold cursor-pointer">Transmitiendo en vivo ahora mismo (Activar indicador)</label>
              </div>
              <button type="submit" disabled={savingLive} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-xs transition">
                {savingLive ? "Guardando..." : "Guardar Configuración En Vivo"}
              </button>
            </form>
          </div>
        )}

        {/* PESTAÑA DEVOCIONALES */}
        {activeTab === "devocionales" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleCreateDevocional} className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold">Nuevo Devocional / Enlace Meet</h2>
              <div>
                <label className="block text-xs mb-1">Título</label>
                <input type="text" required value={tituloDevocional} onChange={(e) => setTituloDevocional(e.target.value)} placeholder="Ej: Oración Matutina" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs mb-1">Enlace de Google Meet / Zoom</label>
                <input type="text" required value={linkMeet} onChange={(e) => setLinkMeet(e.target.value)} placeholder="https://meet.google.com/..." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
              </div>
              <button type="submit" disabled={uploadingDevocional} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-xs transition">
                {uploadingDevocional ? "Guardando..." : "Agregar Devocional"}
              </button>
            </form>

            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold">Devocionales Registrados ({devocionales.length})</h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {devocionales.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div>
                      <h4 className="font-bold text-sm text-white">{item.titulo}</h4>
                      <a href={item.linkMeet} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-400 underline">{item.linkMeet}</a>
                    </div>
                    <button onClick={() => handleDelete("devocionales", item.id)} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs hover:bg-red-500/20">Eliminar</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA PÁGINAS DE COMITÉS */}
        {activeTab === "paginasComites" && (
          <form onSubmit={handleSaveComitePagina} className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <h2 className="text-xl font-bold">Configuración de Páginas de Comités</h2>
                <p className="text-xs text-slate-400">Edita el Banner, Misión, Visión, Videos de YouTube y detalles de cada comité.</p>
              </div>
              <select
                value={selectedComiteSlug}
                onChange={(e) => setSelectedComiteSlug(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm font-bold text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {categoriasOficialesComites.map((cat, idx) => {
                  const slugVal = generarSlug(cat);
                  return (
                    <option key={idx} value={slugVal}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs mb-1 font-semibold">Nombre del Comité (Título Visible)</label>
                <input
                  type="text"
                  value={comiteNombre}
                  onChange={(e) => setComiteNombre(e.target.value)}
                  placeholder="Ej: Escuela Dominical"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 font-semibold">Versículo Lema</label>
                <input
                  type="text"
                  value={comiteVersiculo}
                  onChange={(e) => setComiteVersiculo(e.target.value)}
                  placeholder="Ej: Proverbios 22:6"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs mb-1 font-semibold">URL de la Imagen de Banner</label>
                <input
                  type="text"
                  value={comiteBannerUrl}
                  onChange={(e) => setComiteBannerUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 font-semibold">O Subir Archivo de Banner/Foto Grupal</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFotoGrupalFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs mb-1 font-semibold">Misión</label>
                <textarea
                  rows={3}
                  value={comiteMision}
                  onChange={(e) => setComiteMision(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 font-semibold">Visión</label>
                <textarea
                  rows={3}
                  value={comiteVision}
                  onChange={(e) => setComiteVision(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs mb-1 font-semibold">IDs de Videos de YouTube (separados por comas)</label>
              <input
                type="text"
                value={comiteYoutubeIds}
                onChange={(e) => setComiteYoutubeIds(e.target.value)}
                placeholder="dQw4w9WgXcQ, anotherId"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
              />
            </div>

            {/* SECCIÓN DE GALERÍA / EVIDENCIAS (FOTOS Y VIDEOS DESDE LA PC) */}
            <div className="border-t border-slate-800 pt-6 space-y-4">
              <h3 className="text-lg font-bold">Galería de Evidencias (Fotos y Videos)</h3>
              <p className="text-xs text-slate-400">Sube archivos multimedia directamente desde el explorador de archivos de tu PC.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                {/* Columna 1: Título */}
                <div>
                  <label className="block text-xs mb-1 font-semibold">Título del Elemento</label>
                  <input
                    type="text"
                    value={newTituloEvt}
                    onChange={(e) => setNewTituloEvt(e.target.value)}
                    placeholder="Ej: Actividad Juvenil"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white"
                  />
                </div>

                {/* Columna 2: Tipo de Evidencia */}
                <div>
                  <label className="block text-xs mb-1 font-semibold">Tipo de Evidencia</label>
                  <select
                    value={newTipoEvt}
                    onChange={(e) => {
                      setNewTipoEvt(e.target.value as "imagen" | "video");
                      setNewArchivoEvtFile(null); // Limpiar archivo al cambiar de tipo
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white"
                  >
                    <option value="imagen">📸 Foto (Desde la PC)</option>
                    <option value="video">🎥 Video (Desde la PC)</option>
                  </select>
                </div>

                {/* Columna 3: Explorador de archivos dinámico (Foto o Video) */}
                <div>
                  <label className="block text-xs mb-1 font-semibold">
                    {newTipoEvt === "imagen" ? "Seleccionar Imagen (PC)" : "Seleccionar Video MP4 (PC)"}
                  </label>
                  <input
                    type="file"
                    accept={newTipoEvt === "imagen" ? "image/*" : "video/mp4,video/webm,video/quicktime"}
                    onChange={(e) => setNewArchivoEvtFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddEvento}
                disabled={uploadingEvt}
                className={`font-bold px-4 py-2.5 rounded-xl text-xs transition text-white ${uploadingEvt ? "bg-slate-600 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
              >
                {uploadingEvt ? "Procesando archivo local..." : "+ Añadir a la lista"}
              </button>

              {/* Listado previo de elementos agregados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {eventos.map((evt) => (
                  <div key={evt.id} className="bg-slate-800 border border-slate-700 p-3 rounded-xl relative space-y-2">
                    {evt.tipo === "imagen" ? (
                      <img src={evt.imagen} alt={evt.titulo} className="w-full h-32 object-cover rounded-lg" />
                    ) : (
                      <video src={evt.imagen} controls className="w-full h-32 object-cover rounded-lg" />
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold truncate text-white">{evt.titulo}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEvento(evt.id)}
                        className="text-red-400 hover:text-red-300 text-xs bg-red-500/10 px-2 py-1 rounded"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={savingComitePagina}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition"
            >
              {savingComitePagina ? "Guardando cambios..." : "Guardar Todos los Cambios del Comité"}
            </button>
          </form>
        )}

        {/* PESTAÑA GESTIÓN DE BLOGS */}
        {activeTab === "blogs" && (
          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-bold">Gestión de Blogs y Enseñanzas</h2>
            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs mb-1">Título del Blog</label>
                  <input type="text" required value={tituloBlog} onChange={(e) => setTituloBlog(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" placeholder="Título..." />
                </div>
                <div>
                  <label className="block text-xs mb-1">Autor</label>
                  <input type="text" value={autorBlog} onChange={(e) => setAutorBlog(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-xs mb-1">Categoría / Tag</label>
                  <input type="text" value={tagBlog} onChange={(e) => setTagBlog(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Imagen de Portada (Archivo)</label>
                  <input type="file" accept="image/*" onChange={(e) => setPortadaBlogFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300" />
                </div>
                <div>
                  <label className="block text-xs mb-1">Video Relacionado (URL YouTube opcional)</label>
                  <input type="text" value={videoBlogUrl} onChange={(e) => setVideoBlogUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1 font-semibold">Contenido del Artículo</label>
                <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden text-white">
                  <MenuBar editor={editor} />
                  <EditorContent editor={editor} className="p-4 min-h-[200px] prose prose-invert max-w-none focus:outline-none" />
                </div>
              </div>

              <button type="submit" disabled={savingBlog} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-sm transition">
                {savingBlog ? "Guardando Blog..." : (editingBlogId ? "Actualizar Blog" : "Publicar Blog")}
              </button>
            </form>

            <div className="border-t border-slate-800 pt-6 space-y-4">
              <h3 className="font-bold text-sm">Blogs Publicados ({blogsList.length})</h3>
              <div className="space-y-3">
                {blogsList.map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div>
                      <h4 className="font-bold text-sm text-white">{blog.titulo}</h4>
                      <p className="text-xs text-slate-400">Por {blog.autor} • {blog.tag}</p>
                    </div>
                    <button onClick={() => handleDelete("blogs", blog.id)} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs hover:bg-red-500/20">Eliminar</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
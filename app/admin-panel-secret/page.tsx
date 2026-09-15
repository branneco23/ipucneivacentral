"use client";

import React, { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User
} from "firebase/auth";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

interface AnuncioItem {
  id: string;
  titulo: string;
  tag: string;
  fecha: string;
  hora: string;
  imagenUrl: string;
}

interface DevocionalItem {
  id: string;
  titulo: string;
  linkMeet: string;
}

interface MiembroComite {
  id: string;
  nombre: string;
  cargo: string;
  tipo: string;
  fotoUrl?: string;
}

// Listado completo oficial de comités y directivas para el selector
const categoriasOficialesComites = [
  "Directiva Local",
  "Directiva de Jóvenes",
  "Directiva de Damas (Dorcas)",
  "Directiva de Escuela Dominical",
  "Directiva de Misiones y Evangelismo",
  "Directiva de Alabanza",
  "Directiva de Comunicaciones",
  "Directiva de Obra Social",
  "Directiva de Ujieres",
  "Directiva de Brigadistas",
  "Directiva de Intercesión",
  "Directiva de Protemplo",
  "Directiva de Familia"
];

const convertirImagenABase64WebP = (file: File, calidad = 0.75): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxWidth = 800;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/webp", calidad);
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function AdminPanelPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"anuncios" | "envivos" | "devocionales" | "comites">("anuncios");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Anuncios State
  const [tituloAnuncio, setTituloAnuncio] = useState("");
  const [tagAnuncio, setTagAnuncio] = useState("ANUNCIO");
  const [fechaAnuncio, setFechaAnuncio] = useState("");
  const [horaAnuncio, setHoraAnuncio] = useState("");
  const [imagenAnuncioFile, setImagenAnuncioFile] = useState<File | null>(null);
  const [uploadingAnuncio, setUploadingAnuncio] = useState(false);
  const [anuncios, setAnuncios] = useState<AnuncioItem[]>([]);

  // En Vivos State
  const [liveUrl, setLiveUrl] = useState("");
  const [liveTitle, setLiveTitle] = useState("");
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [savingLive, setSavingLive] = useState(false);

  // Devocionales State
  const [tituloDevocional, setTituloDevocional] = useState("");
  const [linkMeet, setLinkMeet] = useState("");
  const [uploadingDevocional, setUploadingDevocional] = useState(false);
  const [devocionales, setDevocionales] = useState<DevocionalItem[]>([]);

  // Comités State (inicializado con la primera opción del arreglo)
  const [nombreMiembro, setNombreMiembro] = useState("");
  const [cargoMiembro, setCargoMiembro] = useState("");
  const [tipoMiembro, setTipoMiembro] = useState(categoriasOficialesComites[0]);
  const [fotoMiembroFile, setFotoMiembroFile] = useState<File | null>(null);
  const [uploadingMiembro, setUploadingMiembro] = useState(false);
  const [comitesList, setComitesList] = useState<MiembroComite[]>([]);

  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const qAnuncios = query(collection(db, "anuncios"), orderBy("createdAt", "desc"));
    const unsubAnuncios = onSnapshot(qAnuncios, (snap) => {
      setAnuncios(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<AnuncioItem, "id">) })));
    });

    const unsubLive = onSnapshot(doc(db, "envivos", "main"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLiveUrl(data.url || "");
        setLiveTitle(data.titulo || "");
        setIsLiveActive(data.activo || false);
      }
    });

    const qDevocionales = query(collection(db, "devocionales"), orderBy("createdAt", "desc"));
    const unsubDevocionales = onSnapshot(qDevocionales, (snap) => {
      setDevocionales(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<DevocionalItem, "id">) })));
    });

    const qComites = query(collection(db, "comites"), orderBy("createdAt", "desc"));
    const unsubComites = onSnapshot(qComites, (snap) => {
      setComitesList(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<MiembroComite, "id">) })));
    });

    return () => {
      unsubAnuncios();
      unsubLive();
      unsubDevocionales();
      unsubComites();
    };
  }, [user]);

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

  const handleCreateAnuncio = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingAnuncio(true);
    setStatusMsg("Procesando imagen...");

    try {
      let finalImageUrl = "/img/default-anuncio.jpg";
      if (imagenAnuncioFile) {
        finalImageUrl = await convertirImagenABase64WebP(imagenAnuncioFile, 0.75);
      }

      await addDoc(collection(db, "anuncios"), {
        titulo: tituloAnuncio,
        tag: tagAnuncio || "ANUNCIO",
        fecha: fechaAnuncio,
        hora: horaAnuncio,
        imagenUrl: finalImageUrl,
        createdAt: serverTimestamp(),
      });

      setStatusMsg("Anuncio creado correctamente.");
      setTituloAnuncio("");
      setFechaAnuncio("");
      setHoraAnuncio("");
      setImagenAnuncioFile(null);
    } catch (err: any) {
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
      setStatusMsg("Transmisión actualizada con éxito.");
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al guardar transmisión.");
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
        linkMeet: linkMeet,
        createdAt: serverTimestamp(),
      });
      setStatusMsg("Devocional agregado.");
      setTituloDevocional("");
      setLinkMeet("");
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al agregar devocional.");
    } finally {
      setUploadingDevocional(false);
    }
  };

  const handleCreateMiembro = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingMiembro(true);
    setStatusMsg("Procesando foto...");

    try {
      let fotoUrl = "";
      if (fotoMiembroFile) {
        fotoUrl = await convertirImagenABase64WebP(fotoMiembroFile, 0.75);
      }

      await addDoc(collection(db, "comites"), {
        nombre: nombreMiembro,
        cargo: cargoMiembro,
        tipo: tipoMiembro,
        fotoUrl,
        createdAt: serverTimestamp(),
      });

      setStatusMsg("Integrante guardado exitosamente.");
      setNombreMiembro("");
      setCargoMiembro("");
      setFotoMiembroFile(null);
    } catch (err: any) {
      console.error(err);
      setStatusMsg("Error al guardar integrante.");
    } finally {
      setUploadingMiembro(false);
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (confirm("¿Deseas eliminar este registro?")) {
      await deleteDoc(doc(db, coll, id));
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-sm">Cargando datos...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white">
          <h1 className="text-2xl font-bold text-center mb-2">Acceso Administrativo</h1>
          <p className="text-slate-400 text-xs text-center mb-6">Ingresa tus credenciales para administrar la web</p>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs mb-4 text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-300">Correo</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-300">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-sm"
            >
              Entrar al Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div>
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <p className="text-xs text-slate-400">Sesión activa: {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-bold transition"
          >
            Cerrar Sesión
          </button>
        </div>

        {statusMsg && (
          <div className="bg-blue-600/10 border border-blue-500/30 text-blue-300 p-3 rounded-xl text-xs text-center">
            {statusMsg}
          </div>
        )}

        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {[
            { id: "anuncios", label: "Anuncios y Actividades" },
            { id: "envivos", label: "Transmisión En Vivo" },
            { id: "devocionales", label: "Devocionales" },
            { id: "comites", label: "Integrantes de Comités" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "anuncios" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleCreateAnuncio} className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold">Agregar Anuncio</h2>
              <div>
                <label className="block text-xs mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={tituloAnuncio}
                  onChange={(e) => setTituloAnuncio(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">Tag / Categoría</label>
                  <input
                    type="text"
                    value={tagAnuncio}
                    onChange={(e) => setTagAnuncio(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Fecha</label>
                  <input
                    type="text"
                    required
                    value={fechaAnuncio}
                    onChange={(e) => setFechaAnuncio(e.target.value)}
                    placeholder="15/9/2026"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1">Hora</label>
                <input
                  type="text"
                  required
                  value={horaAnuncio}
                  onChange={(e) => setHoraAnuncio(e.target.value)}
                  placeholder="07:00 PM"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Imagen del Anuncio</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagenAnuncioFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs"
                />
              </div>
              <button
                type="submit"
                disabled={uploadingAnuncio}
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold py-3 rounded-xl text-xs transition"
              >
                {uploadingAnuncio ? "Guardando..." : "Publicar Anuncio"}
              </button>
            </form>

            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold">Anuncios Publicados ({anuncios.length})</h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {anuncios.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3">
                      <img src={item.imagenUrl} alt="" className="w-14 h-14 object-cover rounded-lg bg-slate-700" />
                      <div>
                        <span className="text-[10px] bg-blue-600/30 text-blue-400 px-2 py-0.5 rounded font-bold uppercase">{item.tag}</span>
                        <h4 className="font-bold text-sm text-white mt-1">{item.titulo}</h4>
                        <p className="text-xs text-slate-400">{item.fecha} — {item.hora}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete("anuncios", item.id)}
                      className="bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg text-xs hover:bg-red-500/20"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "envivos" && (
          <form onSubmit={handleSaveLive} className="max-w-xl bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-lg font-bold">Transmisión En Vivo</h2>
            <div>
              <label className="block text-xs mb-1">Título de la Transmisión</label>
              <input
                type="text"
                value={liveTitle}
                onChange={(e) => setLiveTitle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">URL / Embed de YouTube</label>
              <input
                type="text"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="liveActive"
                checked={isLiveActive}
                onChange={(e) => setIsLiveActive(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
              <label htmlFor="liveActive" className="text-sm font-semibold">Mostrar transmisión activa en el inicio</label>
            </div>
            <button
              type="submit"
              disabled={savingLive}
              className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-xs transition"
            >
              {savingLive ? "Guardando..." : "Actualizar Estado"}
            </button>
          </form>
        )}

        {activeTab === "devocionales" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleCreateDevocional} className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold">Agregar Devocional</h2>
              <div>
                <label className="block text-xs mb-1">Título del Devocional</label>
                <input
                  type="text"
                  required
                  value={tituloDevocional}
                  onChange={(e) => setTituloDevocional(e.target.value)}
                  placeholder="ej: Devocional Matutino"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Link de Meet</label>
                <input
                  type="url"
                  required
                  value={linkMeet}
                  onChange={(e) => setLinkMeet(e.target.value)}
                  placeholder="https://meet.google.com/abc-defg-hij"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={uploadingDevocional}
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold py-3 rounded-xl text-xs transition"
              >
                {uploadingDevocional ? "Guardando..." : "Publicar Devocional"}
              </button>
            </form>

            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold">Devocionales Activos ({devocionales.length})</h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {devocionales.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div>
                      <h4 className="font-bold text-sm text-white">{item.titulo}</h4>
                      {item.linkMeet && (
                        <a href={item.linkMeet} target="_blank" rel="noreferrer" className="text-[11px] text-blue-400 hover:underline mt-1 block">
                          Unirse a Meet ↗
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete("devocionales", item.id)}
                      className="bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg text-xs hover:bg-red-500/20"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "comites" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleCreateMiembro} className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold">Agregar Integrante de Comité</h2>
              <div>
                <label className="block text-xs mb-1">Tipo de Comité / Directiva</label>
                <select
                  value={tipoMiembro}
                  onChange={(e) => setTipoMiembro(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
                >
                  {categoriasOficialesComites.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={nombreMiembro}
                  onChange={(e) => setNombreMiembro(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Cargo</label>
                <input
                  type="text"
                  required
                  value={cargoMiembro}
                  onChange={(e) => setCargoMiembro(e.target.value)}
                  placeholder="ej: Director General"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Foto (Opcional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFotoMiembroFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs"
                />
              </div>
              <button
                type="submit"
                disabled={uploadingMiembro}
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold py-3 rounded-xl text-xs transition"
              >
                {uploadingMiembro ? "Guardando..." : "Guardar Integrante"}
              </button>
            </form>

            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold">Integrantes Registrados ({comitesList.length})</h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {comitesList.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3">
                      {item.fotoUrl ? (
                        <img src={item.fotoUrl} alt="" className="w-12 h-12 object-cover rounded-full bg-slate-700" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                          {item.nombre.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-bold uppercase">
                          {item.tipo}
                        </span>
                        <h4 className="font-bold text-sm text-white mt-0.5">{item.nombre}</h4>
                        <p className="text-xs text-slate-400">{item.cargo}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete("comites", item.id)}
                      className="bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg text-xs hover:bg-red-500/20"
                    >
                      Eliminar
                    </button>
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
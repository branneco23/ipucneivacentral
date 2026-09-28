"use client";

import React, { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Importación de componentes por pestañas
import AnunciosTab from "./components/AnunciosTab";
import EnvivosTab from "./components/EnvivosTab";
import DevocionalesTab from "./components/DevocionalesTab";
import EventosCalendarioTab from "./components/EventosCalendarioTab";
import PaginasComitesTab from "./components/PaginasComitesTab";
import BlogsTab from "./components/BlogsTab";
import FaqsTab from "./components/FaqsTab";

export default function AdminPanelPage() {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Estados para el formulario de login
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("anuncios");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Estados para las listas de datos desde Firebase
  const [anunciosList, setAnunciosList] = useState<any[]>([]);
  const [envivosList, setEnvivosList] = useState<any[]>([]);
  const [devocionalesList, setDevocionalesList] = useState<any[]>([]);
  const [eventosList, setEventosList] = useState<any[]>([]);
  const [comitesList, setComitesList] = useState<any[]>([]);
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [faqsList, setFaqsList] = useState<any[]>([]);

  // Escuchar el estado de autenticación de Firebase en tiempo real
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      setEmailInput("");
      setPasswordInput("");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      setLoginError("Correo o contraseña incorrectos.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Efecto para escuchar colecciones de Firestore en tiempo real (solo si está autenticado)
  useEffect(() => {
    if (!user) return;

    const unsubAnuncios = onSnapshot(query(collection(db, "anuncios"), orderBy("createdAt", "desc")), (snapshot) => {
      setAnunciosList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubEnvivos = onSnapshot(collection(db, "envivos"), (snapshot) => {
      setEnvivosList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubDevocionales = onSnapshot(query(collection(db, "devocionales"), orderBy("createdAt", "desc")), (snapshot) => {
      setDevocionalesList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubEventos = onSnapshot(query(collection(db, "eventosCalendario"), orderBy("createdAt", "desc")), (snapshot) => {
      setEventosList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubComites = onSnapshot(query(collection(db, "comites"), orderBy("createdAt", "desc")), (snapshot) => {
      setComitesList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubBlogs = onSnapshot(query(collection(db, "blogs"), orderBy("createdAt", "desc")), (snapshot) => {
      setBlogsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubFaqs = onSnapshot(query(collection(db, "faqs_consultas"), orderBy("createdAt", "desc")), (snapshot) => {
      setFaqsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubAnuncios();
      unsubEnvivos();
      unsubDevocionales();
      unsubEventos();
      unsubComites();
      unsubBlogs();
      unsubFaqs();
    };
  }, [user]);

  // Pantalla de carga mientras Firebase verifica la sesión activa
  if (loadingAuth) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Cargando...</div>;
  }

  // Pantalla de inicio de sesión con Correo y Contraseña
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-sm w-full space-y-4 shadow-xl">
          <h2 className="text-xl font-bold">Panel de Administración</h2>
          <p className="text-sm text-slate-400">Inicia sesión con tus credenciales autorizadas.</p>
          
          {loginError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs">
              {loginError}
            </div>
          )}

          <div className="space-y-3">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl text-sm font-bold transition cursor-pointer">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10 pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Cabecera del Panel */}
        <header className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Panel de Administración</h1>
            <p className="text-sm text-slate-400">Sesión iniciada como: <span className="text-slate-200">{user.email}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl transition-all text-sm font-medium cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </header>

        {/* Mensaje de Estado Global */}
        {statusMsg && (
          <div className="bg-blue-600/10 border border-blue-500/30 text-blue-400 px-4 py-3 rounded-xl text-sm flex justify-between items-center">
            <span>{statusMsg}</span>
            <button onClick={() => setStatusMsg(null)} className="text-xs hover:underline cursor-pointer">✕ Cerrar</button>
          </div>
        )}

        {/* Barra de Navegación por Pestañas */}
        <nav className="flex flex-wrap gap-2 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
          {[
            { id: "anuncios", label: "Anuncios" },
            { id: "envivos", label: "En Vivos" },
            { id: "devocionales", label: "Devocionales" },
            { id: "eventos", label: "Eventos Calendario" },
            { id: "comites", label: "Páginas Comites" },
            { id: "blogs", label: "Blogs" },
            { id: "faqs", label: "Centro de Ayuda" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Contenido Dinámico */}
        <main className="transition-all">
          {activeTab === "anuncios" && <AnunciosTab anuncios={anunciosList} setStatusMsg={setStatusMsg} />}
          {activeTab === "envivos" && <EnvivosTab envivosList={envivosList} setStatusMsg={setStatusMsg} />}
          {activeTab === "devocionales" && <DevocionalesTab setStatusMsg={setStatusMsg} />}
          {activeTab === "eventos" && <EventosCalendarioTab eventosList={eventosList} setStatusMsg={setStatusMsg} />}
          {activeTab === "comites" && <PaginasComitesTab setStatusMsg={setStatusMsg} />}
          {activeTab === "blogs" && <BlogsTab blogsList={blogsList} setStatusMsg={setStatusMsg} />}
          {activeTab === "faqs" && <FaqsTab faqsList={faqsList} setFaqsList={setFaqsList} setStatusMsg={setStatusMsg} />}
        </main>

      </div>
    </div>
  );
}
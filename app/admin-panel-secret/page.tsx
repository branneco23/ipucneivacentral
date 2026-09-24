"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

// Importación de componentes por pestañas
import AnunciosTab from "./components/AnunciosTab";
import EnvivosTab from "./components/EnvivosTab";
import DevocionalesTab from "./components/DevocionalesTab";
import EventosCalendarioTab from "./components/EventosCalendarioTab";
import PaginasComitesTab from "./components/PaginasComitesTab";
import BlogsTab from "./components/BlogsTab";

export default function AdminPanelPage() {
  const [user, setUser] = useState(true); // Cambiar según tu lógica real de autenticación
  const [activeTab, setActiveTab] = useState("anuncios");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Estados para las listas de datos desde Firebase
  const [anunciosList, setAnunciosList] = useState<any[]>([]);
  const [envivosList, setEnvivosList] = useState<any[]>([]);
  const [devocionalesList, setDevocionalesList] = useState<any[]>([]);
  const [eventosList, setEventosList] = useState<any[]>([]);
  const [comitesList, setComitesList] = useState<any[]>([]);
  const [blogsList, setBlogsList] = useState<any[]>([]);

  // Efecto para escuchar colecciones de Firestore en tiempo real
  useEffect(() => {
    if (!user) return;

    const unsubAnuncios = onSnapshot(query(collection(db, "anuncios"), orderBy("createdAt", "desc")), (snapshot) => {
      setAnunciosList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubEnvivos = onSnapshot(query(collection(db, "envivos"), orderBy("createdAt", "desc")), (snapshot) => {
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

    return () => {
      unsubAnuncios();
      unsubEnvivos();
      unsubDevocionales();
      unsubEventos();
      unsubComites();
      unsubBlogs();
    };
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Acceso restringido. Por favor inicia sesión.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Cabecera del Panel */}
        <header className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Panel de Administración</h1>
            <p className="text-sm text-slate-400">Gestiona el contenido de la plataforma de forma centralizada.</p>
          </div>
          <button
            onClick={() => setUser(false)}
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
            { id: "comites", label: "Páginas Comités" },
            { id: "blogs", label: "Blogs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Contenido Dinámico según la Pestaña Activa con sus Props Requeridas */}
        <main className="transition-all">
          {activeTab === "anuncios" && <AnunciosTab anunciosList={anunciosList} setStatusMsg={setStatusMsg} />}
          {activeTab === "envivos" && <EnvivosTab envivosList={envivosList} setStatusMsg={setStatusMsg} />}
          {activeTab === "devocionales" && <DevocionalesTab devocionalesList={devocionalesList} setStatusMsg={setStatusMsg} />}
          {activeTab === "eventos" && <EventosCalendarioTab eventosList={eventosList} setStatusMsg={setStatusMsg} />}
          {activeTab === "comites" && <PaginasComitesTab comitesList={comitesList} setStatusMsg={setStatusMsg} />}
          {activeTab === "blogs" && <BlogsTab blogsList={blogsList} setStatusMsg={setStatusMsg} />}
        </main>

      </div>
    </div>
  );
}
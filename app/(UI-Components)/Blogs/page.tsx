"use client";

import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface Articulo {
  id: string;
  titulo: string;
  tag?: string;
  autor?: string;
  imagenUrl?: string;
  portadaUrl?: string;
  contenido?: string;
  createdAt?: any;
}

export default function ListaArticulos() {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Articulo[];
        setArticulos(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Error al obtener blogs:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const articulosFiltrados = articulos.filter((art) =>
    art.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-40 text-center text-slate-500 font-medium">
        Cargando publicaciones...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-36 pb-20 px-[4%]">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado y Buscador Discreto */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Lo que la Biblia enseña
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-4">
              Nosotros Predicamos Lo Que <br className="hidden md:block" /> Dios te sigue hablando hoy.
            </h1>
          </div>

          <div className="relative w-full md:w-80 flex-shrink-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
              🔍
            </span>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar estudio o prédica..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm transition"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-600"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {articulosFiltrados.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 font-medium">No se encontraron publicaciones que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
            {articulosFiltrados.map((art, index) => {
              const imageSrc = art.imagenUrl || art.portadaUrl || "/img/placeholder.jpg";
              
              const isLarge = index % 5 === 0;
              const isTall = index % 5 === 2;
              const isWide = index % 5 === 3;

              const gridClasses = isLarge
                ? "md:col-span-2 md:row-span-2"
                : isTall
                ? "md:row-span-2"
                : isWide
                ? "md:col-span-2"
                : "col-span-1 row-span-1";

              return (
                <Link
                  key={art.id}
                  href={`/Blogs/${art.id}`}
                  className={`group relative bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-end shadow-sm hover:shadow-xl transition-all duration-500 ${gridClasses}`}
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900">
                    <img
                      src={imageSrc}
                      alt={art.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  </div>

                  <div className="relative z-10 p-6 flex flex-col justify-end h-full pointer-events-none">
                    <div className="mb-auto">
                      <span className="text-[10px] font-black text-white bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {art.tag || "Estudio Bíblico"}
                      </span>
                    </div>

                    <div>
                      <h3 className={`text-white font-bold group-hover:text-blue-200 transition line-clamp-2 ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                        {art.titulo}
                      </h3>
                      {art.autor && (
                        <p className="text-xs text-slate-300 mt-2 font-medium">
                          por {art.autor}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
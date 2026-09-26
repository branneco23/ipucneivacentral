"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

interface Integrante {
  id?: number | string;
  nombre?: string;
  cargo?: string;
  foto?: string;
}

interface ComiteItem {
  id: string;
  nombre: string;
  bannerUrl?: string;
  mision?: string;
  integrantes: Integrante[];
}

export default function ComitesGeneralPage() {
  const [comitesList, setComitesList] = useState<ComiteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllComites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "comites_detalles"));
        const items: ComiteItem[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          items.push({ 
            id: docSnap.id, 
            nombre: data.nombre || docSnap.id,
            bannerUrl: data.bannerUrl || "",
            mision: data.mision || "",
            integrantes: data.integrantes || data.miembros || [] 
          });
        });
        setComitesList(items);
      } catch (error) {
        console.error("Error al cargar los comités:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllComites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Cargando comités...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 pt-28">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-center">Nuestros Comités</h1>

        {comitesList.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            No se encontró contenido registrado para este comité.
          </div>
        ) : (
          <div className="space-y-12">
            {comitesList.map((comite) => (
              <div 
                key={comite.id} 
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg p-6 space-y-6"
              >
                {/* Cabecera del Comité: Banner, Nombre, Misión y Enlace interno */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {comite.bannerUrl ? (
                    <img 
                      src={comite.bannerUrl} 
                      alt={comite.nombre} 
                      className="w-full h-48 object-cover rounded-xl border border-slate-800" 
                    />
                  ) : (
                    <div className="w-full h-48 bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-sm">
                      Sin imagen de portada
                    </div>
                  )}

                  <div className="md:col-span-2 space-y-3">
                    <h2 className="text-2xl font-bold text-white">{comite.nombre}</h2>
                    {comite.mision ? (
                      <p className="text-slate-300 text-sm line-clamp-3">{comite.mision}</p>
                    ) : (
                      <p className="text-slate-500 text-sm italic">Sin misión registrada.</p>
                    )}
                    <div>
                      <Link 
                        href={`/Comites/${comite.id}`}
                        className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-semibold text-sm rounded-lg transition"
                      >
                        Ver página completa del comité &rarr;
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Sección de Integrantes dentro de la misma tarjeta general */}
                <div className="border-t border-slate-800 pt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Integrantes</h3>
                  
                  {comite.integrantes.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No hay integrantes registrados en este comité.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {comite.integrantes.map((miembro, index) => (
                        <div key={index} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex flex-col items-center text-center space-y-2">
                          {miembro.foto ? (
                            <img 
                              src={miembro.foto} 
                              alt={miembro.nombre || "Integrante"} 
                              className="w-20 h-20 object-cover rounded-full border border-slate-700 shadow" 
                            />
                          ) : (
                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 text-xs">
                              Sin foto
                            </div>
                          )}
                          <div>
                            <h4 className="text-xs font-bold text-white">{miembro.nombre || "Sin nombre"}</h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">{miembro.cargo || "Integrante"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
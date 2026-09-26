"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function ComitesGeneralPage() {
  const [comitesList, setComitesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllComites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "comites_detalles"));
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
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
    return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Cargando comités...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Nuestros Comités</h1>

        {comitesList.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            No se encontró contenido registrado para los comités.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comitesList.map((comite) => (
              <Link 
                key={comite.id} 
                href={`/Comites/${comite.id}`}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col"
              >
                {comite.bannerUrl ? (
                  <img src={comite.bannerUrl} alt={comite.nombre} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-slate-800 flex items-center justify-center text-slate-500">Sin imagen</div>
                )}
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">{comite.nombre}</h2>
                    <p className="text-xs text-slate-400 line-clamp-2">{comite.mision || comite.versiculo || "Ver detalles del comité..."}</p>
                  </div>
                  <span className="text-xs font-semibold text-yellow-400 inline-block pt-2">Ver Comité &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
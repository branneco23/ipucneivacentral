"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

interface MiembroComite {
  id: string;
  nombre: string;
  cargo: string;
  tipo: string;
  fotoUrl?: string;
}

const categoriasOficiales = [
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

export default function ComitesPage() {
  const [comites, setComites] = useState<MiembroComite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "comites"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<MiembroComite, "id">;
        // Opcional: compatibilidad temporal si tienes datos antiguos guardados como "Comité Directiva"
        let tipoNormalizado = data.tipo;
        if (tipoNormalizado === "Comité Directiva") {
          tipoNormalizado = "Directiva Local";
        }
        return {
          id: doc.id,
          ...data,
          tipo: tipoNormalizado,
        };
      });
      setComites(lista);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase italic">
            Nuestros Comités y Directivas
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Conoce a los líderes y hermanos que sirven con dedicación en las diferentes áreas y ministerios de nuestra iglesia.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm">Cargando comités...</div>
        ) : comites.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <p className="text-slate-400 text-sm">No hay integrantes registrados todavía en el panel.</p>
          </div>
        ) : (
          categoriasOficiales.map((cat) => {
            const miembrosCat = comites.filter((m) => m.tipo === cat);
            
            // Si no hay miembros en esta categoría específica, puedes optar por ocultarla 
            // o mostrar un aviso. Actualmente la ocultamos para mantener la página limpia:
            if (miembrosCat.length === 0) return null;

            return (
              <div key={cat} className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-2xl font-black uppercase text-blue-400 tracking-wide">
                    {cat}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {miembrosCat.map((miembro) => (
                    <div
                      key={miembro.id}
                      className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col"
                    >
                      <div className="w-full h-80 bg-slate-950/60 p-4 flex items-center justify-center relative overflow-hidden">
                        {miembro.fotoUrl ? (
                          <img
                            src={miembro.fotoUrl}
                            alt={miembro.nombre}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-2xl border border-blue-500/30">
                            {miembro.nombre ? miembro.nombre.charAt(0) : "?"}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40 pointer-events-none" />
                      </div>

                      <div className="p-6 text-center space-y-2 bg-slate-900 flex-1 flex flex-col justify-between border-t border-slate-800/60">
                        <span className="inline-block bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest mx-auto">
                          {miembro.cargo}
                        </span>
                        <h3 className="font-bold text-lg text-white leading-tight">{miembro.nombre}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
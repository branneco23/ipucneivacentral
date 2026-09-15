"use client";

import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Integrante {
  id: string;
  nombre: string;
  cargo: string;
  fotoUrl?: string;
  comite: string;
}

const COMITES_ORDEN = [
  "Directiva Local",
  "Jóvenes (JAPUC)",
  "Damas Dorcas",
  "Escuela Dominical",
  "Misioneritas",
  "Alabanza y Música"
];

export default function ComitesPublicPage() {
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "comites"),
      (snapshot) => {
        const docs: Integrante[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Integrante, "id">),
        }));
        setIntegrantes(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Error al cargar comités desde Firestore:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-20 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-[#00338d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        {COMITES_ORDEN.map((nombreComite) => {
          const miembrosComite = integrantes.filter(
            (item) => item.comite?.toLowerCase() === nombreComite.toLowerCase()
          );

          if (miembrosComite.length === 0) return null;

          return (
            <section key={nombreComite} className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#002B66] uppercase tracking-wider font-serif">
                  {nombreComite}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 items-end justify-center">
                {miembrosComite.map((persona) => {
                  const [primerNombre, ...restoNombre] = persona.nombre.trim().split(" ");
                  const apellidos = restoNombre.join(" ");

                  return (
                    <div key={persona.id} className="flex flex-col items-center">
                      <span className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 text-center">
                        {persona.cargo}
                      </span>

                      <div className="w-full aspect-[3/4] bg-slate-100 rounded-t-sm overflow-hidden relative flex items-end justify-center">
                        {persona.fotoUrl ? (
                          <img
                            src={persona.fotoUrl}
                            alt={persona.nombre}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                            <i className="ri-user-line text-4xl"></i>
                          </div>
                        )}
                      </div>

                      <div className="w-full bg-[#001D4A] text-white py-3 px-2 text-center rounded-b-sm shadow-md">
                        <span className="block text-[9px] uppercase tracking-widest text-slate-300 font-medium">
                          HNO(A).
                        </span>
                        <h3 className="text-sm md:text-base font-bold leading-tight uppercase font-serif tracking-wide">
                          {primerNombre}
                        </h3>
                        {apellidos && (
                          <span className="block text-[10px] md:text-xs font-semibold text-slate-300 uppercase tracking-widest leading-none mt-0.5">
                            {apellidos}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
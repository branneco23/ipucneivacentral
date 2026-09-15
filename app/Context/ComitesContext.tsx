"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export interface MiembroComite {
  id: string;
  nombre: string;
  cargo: string;
  tipo: "directiva" | "coordinador";
  fotoUrl?: string;
}

interface ComitesContextType {
  comitesList: MiembroComite[];
  loadingComites: boolean;
}

const ComitesContext = createContext<ComitesContextType>({
  comitesList: [],
  loadingComites: true,
});

export const ComitesProvider = ({ children }: { children: React.ReactNode }) => {
  const [comitesList, setComitesList] = useState<MiembroComite[]>([]);
  const [loadingComites, setLoadingComites] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "comites"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<MiembroComite, "id">),
        }));
        setComitesList(items);
        setLoadingComites(false);
      },
      (error) => {
        console.error("Error al escuchar comités:", error);
        setLoadingComites(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <ComitesContext.Provider value={{ comitesList, loadingComites }}>
      {children}
    </ComitesContext.Provider>
  );
};

export const useComites = () => useContext(ComitesContext);
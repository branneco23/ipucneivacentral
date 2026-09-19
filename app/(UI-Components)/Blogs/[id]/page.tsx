"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DetalleBlog() {
  const params = useParams();
  const id = params?.id as string;

  const [articulo, setArticulo] = useState<any>(null);
  const [otrosTemas, setOtrosTemas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        // Obtener el artículo actual de Firebase
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticulo(docSnap.data());
        }

        // Obtener otros artículos para la barra lateral "Otros Temas"
        const q = query(collection(db, "blogs"), limit(3));
        const querySnapshot = await getDocs(q);
        const lista: any[] = [];
        querySnapshot.forEach((docItem) => {
          if (docItem.id !== id) {
            lista.push({ id: docItem.id, ...docItem.data() });
          }
        });
        setOtrosTemas(lista);
      } catch (error) {
        console.error("Error al obtener detalle del blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 text-center text-slate-500 font-medium">
        Cargando contenido...
      </div>
    );
  }

  if (!articulo) {
    return (
      <div className="min-h-screen pt-40 text-center text-slate-600">
        <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
        <Link href="/Blogs" className="text-blue-600 font-bold hover:underline">
          ← Volver a todos los artículos
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24 px-4 md:px-12 lg:px-20">
      
      {/* Enlace de retorno */}
      <div className="max-w-7xl mx-auto mb-6">
        <Link href="/Blogs" className="inline-block text-xs font-bold text-blue-600 hover:underline">
          ← Volver a Blogs
        </Link>
      </div>

      {/* Título Principal Arriba (como en la captura) */}
      <div className="max-w-7xl mx-auto mb-8">
        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase">
          {articulo.tag || "Estudio Bíblico"}
        </span>
        <h1 className="text-3xl md:text-5xl font-black mt-3 mb-2 text-slate-900 leading-tight">
          {articulo.titulo}
        </h1>
        {articulo.autor && (
          <p className="text-sm text-slate-500 font-medium">por {articulo.autor}</p>
        )}
      </div>

      {/* CONTENEDOR DE DOS COLUMNAS (Estilo exacto de la captura) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA (Ancha): Multimedia + Texto Largo del Artículo */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recurso multimedia (Video de YouTube o Imagen de Portada) */}
          {articulo.videoUrl ? (
            <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-lg">
              <iframe
                src={articulo.videoUrl}
                title={articulo.titulo}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : articulo.portadaUrl || articulo.imagenUrl ? (
            <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-sm bg-slate-200">
              <img
                src={articulo.portadaUrl || articulo.imagenUrl}
                alt={articulo.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          {/* Contenido (HTML o texto) */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 prose prose-slate max-w-none text-slate-700 leading-relaxed text-base md:text-lg">
            {articulo.contenido?.includes("<") ? (
              <div dangerouslySetInnerHTML={{ __html: articulo.contenido }} />
            ) : (
              <p className="whitespace-pre-line">{articulo.contenido}</p>
            )}
          </div>

        </div>

        {/* COLUMNA DERECHA (Angosta): Sección "Otros Temas" */}
        <aside className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-28">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
            Otros Temas
          </h3>

          <div className="space-y-4">
            {otrosTemas.length > 0 ? (
              otrosTemas.map((item) => (
                <Link
                  key={item.id}
                  href={`/Blogs/${item.id}`}
                  className="flex items-center gap-3 group p-2 rounded-2xl hover:bg-slate-50 transition"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                    <img
                      src={item.portadaUrl || item.imagenUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=200"}
                      alt={item.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase">
                      {item.tag || "Estudio"}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition">
                      {item.titulo}
                    </h4>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-xs text-slate-400">No hay más artículos disponibles.</p>
            )}
          </div>
        </aside>

      </div>

    </main>
  );
}
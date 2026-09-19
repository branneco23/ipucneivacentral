"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleBlocks, setVisibleBlocks] = useState(1);
  const postsPerBlock = 4;

  // Cargar publicaciones desde Firebase ordenadas por fecha (o título)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Ordenamos por createdAt de forma descendente (los más nuevos primero)
        // O puedes cambiar a orderBy("titulo", "asc") si prefieres orden alfabético estricto
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const lista: any[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          lista.push({
            id: doc.id,
            title: data.titulo || "Sin título",
            desc: data.contenido || "",
            image: data.portadaUrl || data.imagenUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
            tag: data.tag || "Estudio Bíblico",
            postby: data.autor || "IPUC Sede Central Neiva",
            date: data.fecha || "Reciente",
          });
        });
        setPosts(lista);
      } catch (error) {
        console.error("Error al obtener los blogs de Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Función para agrupar los datos en arrays de 4
  const chunkedPosts = [];
  for (let i = 0; i < posts.length; i += postsPerBlock) {
    chunkedPosts.push(posts.slice(i, i + postsPerBlock));
  }

  const displayedBlocks = chunkedPosts.slice(0, visibleBlocks);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 font-medium">
        Cargando publicaciones...
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <main className="px-[8%] lg:px-[12%] py-20 bg-white">
      {/* --- ENCABEZADO --- */}
      <header className="flex flex-col lg:flex-row gap-10 mb-20">
        <div className="w-full lg:w-1/3 pt-8">
          <span className="rounded-full border border-gray-400 px-7 py-2 GolosText uppercase font-bold text-xs tracking-wider text-gray-600">
            Lo que la biblia enseña
          </span>
        </div>
        <div className="w-full lg:w-2/3">
          <h1 className="CalSans text-4xl md:text-7xl mb-5 lg:w-[90%] leading-tight text-gray-900">
            Nosotros Predicamos Lo Que <span className="text-[#00338d]">Dios te sigue hablando hoy.</span> Nos Enseña.
          </h1>
        </div>
      </header>

      {/* --- GRILLA DE BLOGS (REPETIBLE) --- */}
      <div className="flex flex-col gap-20">
        {displayedBlocks.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-col lg:flex-row gap-12">
            
            {/* 1 GRANDE A LA IZQUIERDA */}
            <article className="w-full lg:w-1/2">
              {group[0] && (
                <Link href={`/Blogs/${group[0].id}`} className="group block">
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl bg-slate-200">
                    <Image
                      src={group[0].image}
                      alt={group[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-5 left-5 bg-[#00338d] px-5 py-2 font-bold rounded-full text-white text-xs z-10">
                      {group[0].tag}
                    </span>
                  </div>
                  <div className="mt-8">
                    <p className="GolosText text-gray-400 text-sm">
                      por <span className="text-[#00338d] font-bold">{group[0].postby}</span> • {group[0].date}
                    </p>
                    <h2 className="text-3xl md:text-4xl CalSans my-5 group-hover:text-[#00338d] transition-colors leading-tight">
                      {group[0].title}
                    </h2>
                    <p className="text-gray-500 line-clamp-3 text-lg">
                      {group[0].desc.replace(/<[^>]*>?/gm, '')}
                    </p>
                  </div>
                </Link>
              )}
            </article>

            {/* 3 PEQUEÑOS A LA DERECHA */}
            <aside className="w-full lg:w-1/2 flex flex-col gap-8">
              {group.slice(1, 4).map((blog: any) => (
                <article key={blog.id}>
                  <Link href={`/Blogs/${blog.id}`} className="group flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/3 relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-md flex-shrink-0 bg-slate-200">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col justify-center">
                      <p className="GolosText text-gray-400 text-xs">
                        por <span className="text-[#00338d] font-bold">{blog.postby}</span>
                      </p>
                      <h3 className="text-xl CalSans my-2 group-hover:text-[#00338d] transition-colors leading-snug">
                        {blog.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {blog.desc.replace(/<[^>]*>?/gm, '')}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </aside>
          </div>
        ))}
      </div>

      {/* --- BOTÓN VER MÁS --- */}
      {visibleBlocks < chunkedPosts.length && (
        <div className="mt-20 flex justify-center">
        <button
            onClick={() => setVisibleBlocks(prev => prev + 1)}
            className="bg-[#00338d] text-white px-10 py-4 rounded-full font-bold hover:bg-blue-900 transition-all shadow-lg"
          >
            Ver más publicaciones
          </button>
        </div>
      )}
    </main>
  );
}
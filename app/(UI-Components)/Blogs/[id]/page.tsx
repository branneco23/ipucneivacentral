import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_DATA } from "@/app/JsonData/BlogsData";
import Newsletter from '@/app/Components/Newsletter/Newsletter';

export async function generateStaticParams() {
  return BLOG_DATA.map((post) => ({
    id: post.id.toString(),
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const post = BLOG_DATA.find((p) => p.id.toString() === id);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-slate-50/50 selection:bg-[#00338d] selection:text-white overflow-hidden">
      
      {/* HEADER CINEMATOGRÁFICO RESPONSIVO */}
      <header className="relative w-full h-[55vh] md:h-[65vh] min-h-[400px] bg-slate-950 flex flex-col justify-end">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-75 scale-105 transition-transform duration-[10s] ease-out"
            priority
          />
        </div>
        
        {/* Degradado multicapa */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-16>">
          
          {/* BOTÓN VOLVER ATRÁS COMPLETAMENTE RESPONSIVO */}
          <div className="mb-4 md:mb-6">
            <Link
              href="/Blogs"
              className="inline-flex items-center gap-2 
                         /* Móvil: Diseño tipo cápsula interactiva con fondo */
                         px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs backdrop-blur-md shadow-lg
                         /* Escritorio: Se vuelve texto limpio integrado al flujo */
                         md:bg-transparent md:border-transparent md:px-0 md:py-0 md:text-sm md:text-white/80 md:shadow-none md:backdrop-blur-none
                         hover:bg-white/20 md:hover:bg-transparent md:hover:text-white
                         font-semibold tracking-wide group transition-all duration-300"
            >
              <i className="ri-arrow-left-line text-sm md:text-base group-hover:-translate-x-1 transition-transform"></i> 
              <span>Volver a Doctrina</span>
            </Link>
          </div>
          
          <span className="inline-block bg-[#00338d] border border-blue-400/20 text-white px-3 py-1 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 shadow-md">
            {post.tag}
          </span>

          <h1 className="text-white text-2xl sm:text-3xl md:text-6xl font-black CalSans leading-[1.15] md:leading-[1.1] max-w-4xl tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-3 md:gap-4 text-white/80 mt-4 md:mt-6 text-xs md:text-sm font-medium">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs shrink-0">
              {post.postby.charAt(0)}
            </div>
            <p className="GolosText truncate">
              Por <span className="text-white font-bold">{post.postby}</span> &bull; <span className="text-slate-300 font-medium">{post.date}</span>
            </p>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL ADAPTATIVO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        
        <main className="lg:col-span-8 flex flex-col gap-8 md:gap-12 order-1">
          {post.videoUrl && (
            <section className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
              <h3 className="text-lg md:text-2xl font-black CalSans text-slate-950 mb-4 md:mb-6 flex items-center gap-2.5">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <i className="ri-video-line text-[#00338d] text-base md:text-xl"></i>
                </div>
                Enseñanaza en Video
              </h3>
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg bg-slate-950 aspect-video group">
                <video
                  src={post.videoUrl}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover opacity-95"
                />
              </div>
            </section>
          )}

          <article className="bg-white p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] prose prose-slate max-w-none">
            <div className="GolosText text-slate-800 leading-[1.7] md:leading-[1.8] text-base md:text-lg font-normal tracking-normal whitespace-pre-line">
              {post.desc}
            </div>
          </article>
        </main>

        <aside className="lg:col-span-4 order-2">
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] lg:sticky lg:top-32">
            <h4 className="CalSans text-xl md:text-2xl font-black text-slate-950 mb-5 pb-3 border-b border-slate-100">
              Otros Temas
            </h4>

            <div className="flex flex-col gap-4 md:gap-5">
              {BLOG_DATA
                .filter((p) => p.id.toString() !== id)
                .slice(0, 3)
                .map((other) => (
                  <Link
                    key={other.id}
                    href={`/Blogs/${other.id}`}
                    className="group flex gap-3 md:gap-4 p-2 md:p-3 rounded-xl md:rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100/70 transition-all duration-300"
                  >
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <Image 
                        src={other.image} 
                        alt="" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>

                    <div className="flex flex-col justify-center overflow-hidden">
                      <span className="text-[9px] md:text-[10px] font-black text-[#00338d] uppercase tracking-widest mb-0.5 block">
                        {other.tag}
                      </span>
                      <h5 className="font-extrabold text-xs md:text-sm text-slate-900 group-hover:text-[#00338d] transition-colors line-clamp-2 leading-snug">
                        {other.title}
                      </h5>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </div>

      <Newsletter />     
    </article>
  );
}
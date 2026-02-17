import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_DATA } from "@/app/JsonData/BlogsData";

// Generamos rutas estáticas
export async function generateStaticParams() {
  return BLOG_DATA.map((post) => ({
    id: post.id.toString(),
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  // 1. CORRECCIÓN: Debes esperar (await) a los params para obtener el 'id'
  const { id } = await params;

  // 2. Ahora 'id' ya está definido para buscar el post
  const post = BLOG_DATA.find((p) => p.id.toString() === id);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="relative w-full h-[60vh] min-h-[420px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55 flex flex-col justify-end px-[8%] lg:px-[12%] pb-16">
          <Link
            href="/UI-Components/Blogs"
            className="text-white/80 hover:text-white mb-6 flex items-center gap-2 transition-colors"
          >
            <i className="ri-arrow-left-line"></i> Volver a Blogs
          </Link>
          <span className="bg-[#00338d] text-white px-4 py-1 rounded-full text-sm font-bold w-fit mb-4">
            {post.tag}
          </span>

          <h1 className="text-white text-4xl md:text-6xl CalSans leading-tight max-w-4xl">
            {post.title}
          </h1>
          <p className="text-white/75 mt-4 GolosText">
            Por <span className="text-white font-bold">{post.postby}</span> {post.date}
          </p>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="px-[8%] lg:px-[12%] py-20 flex flex-col lg:flex-row gap-16">
        {/* MAIN */}
        <div className="w-full lg:w-2/3">
          {/* VIDEO */}
          {post.videoUrl && (
            <section className="mb-16">
              <h3 className="text-2xl CalSans mb-6 flex items-center gap-2">
                <i className="ri-video-line text-[#00338d]"></i>
                Enseñanza en video
              </h3>
              <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gray-100">
                <video
                  // 3. CORRECCIÓN: Usar llaves {post.videoUrl} en lugar de comillas "post.videoUrl"
                  src={post.videoUrl}
                  controls
                  preload="metadata"
                  className="w-full max-h-[75vh] object-cover"
                />
              </div>
            </section>
          )}

          {/* TEXTO */}
          <div className="prose prose-lg max-w-none GolosText text-gray-700 leading-relaxed">
            <p className="text-xl font-medium text-gray-900 whitespace-pre-line">
              {post.desc}
            </p>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 sticky top-32">
            <h4 className="CalSans text-2xl mb-6">Otros Temas</h4>

            <div className="flex flex-col gap-6">
              {BLOG_DATA
                .filter((p) => p.id.toString() !== id)
                .slice(0, 3)
                .map((other) => (
                  <Link
                    key={other.id}
                    href={`/UI-Components/Blogs/${other.id}`}
                    className="group"
                  >
                    <span className="text-xs font-bold text-[#00338d] uppercase tracking-wider">
                      {other.tag}
                    </span>
                    <h5 className="font-bold group-hover:text-[#00338d] transition-colors line-clamp-2">
                      {other.title}
                    </h5>
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
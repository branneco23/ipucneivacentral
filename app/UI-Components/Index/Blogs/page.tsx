"use client";

import Image from "next/image";
import Link from "next/link";
import { BLOG_DATA, BlogPost } from "@/app/JsonData/BlogsData";

export default function BlogPage() {
  // Obtenemos el post principal y los secundarios
  const mainPost = BLOG_DATA[0];
  const secondaryPosts = BLOG_DATA.slice(1, 4);

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
            Nosotros Predicamos Lo Que{" "}
            <span className="text-[#00338d]">
              Dios te sigue hablando hoy.
            </span>{" "}
            Nos Enseña.
          </h1>
        </div>
      </header>

      {/* --- GRILLA DE BLOGS --- */}
      <div className="flex flex-col lg:flex-row gap-12 mt-20">
        
        {/* COLUMNA IZQUIERDA: POST DESTACADO */}
        <article className="w-full lg:w-1/2">
          {mainPost && (
            <Link href={`/UI-Components/Blogs/${mainPost.id}`} className="group block">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={mainPost.image}
                  alt={mainPost.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                />
                <span className="absolute top-5 left-5 bg-[#00338d] px-5 py-2 font-bold rounded-full text-white text-xs GolosText z-10 shadow-lg">
                  {mainPost.tag}
                </span>
              </div>
              
              <div className="mt-8">
                <p className="GolosText text-gray-400 text-sm">
                  por <span className="text-[#00338d] font-bold">{mainPost.postby}</span> • {mainPost.date}
                </p>
                <h2 className="text-4xl md:text-5xl CalSans my-5 group-hover:text-[#00338d] transition-colors duration-300 leading-tight text-gray-900">
                  {mainPost.title}
                </h2>
                <p className="text-gray-500 GolosText text-lg leading-relaxed line-clamp-3">
                  {mainPost.desc}
                </p>
              </div>
            </Link>
          )}
        </article>

        {/* COLUMNA DERECHA: LISTA DE POSTS */}
        <aside className="w-full lg:w-1/2 flex flex-col gap-10">
          {secondaryPosts.map((blog: BlogPost) => (
            <article key={blog.id}>
              <Link href={`/UI-Components/Blogs/${blog.id}`} className="group flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/5 relative aspect-square rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#00338d] px-3 py-1 font-bold rounded-full text-[10px] text-white GolosText z-10 shadow-md">
                    {blog.tag}
                  </span>
                </div>

                <div className="w-full md:w-3/5 flex flex-col justify-center">
                  <p className="GolosText text-gray-400 text-xs">
                    por <span className="text-[#00338d] font-bold">{blog.postby}</span>
                  </p>
                  <h3 className="text-2xl CalSans my-3 group-hover:text-[#00338d] transition-colors duration-300 leading-snug text-gray-900">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 GolosText text-sm line-clamp-2 leading-relaxed">
                    {blog.desc}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </aside>

      </div>
    </main>
  );
}
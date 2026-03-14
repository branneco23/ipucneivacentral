"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_DATA, BlogPost } from "@/app/JsonData/BlogsData";

export default function Blog() {

    // Mostrar solo 4 inicialmente (1 izquierda + 3 derecha)
    const [visibleCount, setVisibleCount] = useState(4);

    // Posts visibles según límite
    const visiblePosts = BLOG_DATA.slice(0, visibleCount);

    // Agrupar en bloques de 4 (1 grande + 3 pequeños)
    const chunkedPost: BlogPost[][] = [];
    for (let i = 0; i < visiblePosts.length; i += 4) {
        chunkedPost.push(visiblePosts.slice(i, i + 4));
    }

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    return (
        <>
            {/* Banner Superior */}
            <div className="section-bg text-white flex flex-col px-[8%] lg:px-[12%] py-20 bg-[#00338d]">
                <h1 className="text-6xl md:text-8xl GolosText pt-10 font-bold">
                    Artículos de Fé
                </h1>
                <div className="flex items-center text-xl mt-3">
                    <Link href="/" className="hover:text-blue-200 transition-all duration-300">
                        Inicio
                    </Link>
                    <i className="ri-arrow-right-wide-fill mt-1 mx-2"></i>
                    <h2 className="GolosText opacity-80">Estudio Bíblico</h2>
                </div>
            </div>

            <main className="px-[8%] lg:px-[12%] py-20 bg-white">

                {/* Header */}
                <header className="flex flex-col lg:flex-row gap-10 mb-20">
                    <div className="w-full lg:w-1/3 pt-8">
                        <span className="rounded-full border border-gray-400 px-7 py-2 GolosText uppercase font-bold text-xs tracking-wider text-gray-600">
                            Lo que la biblia enseña
                        </span>
                    </div>

                    <div className="w-full lg:w-2/3">
                        <h1 className="CalSans text-4xl md:text-7xl mb-5 leading-tight text-gray-900">
                            Nosotros Predicamos Lo Que{" "}
                            <span className="text-[#00338d]">
                                Dios te sigue hablando hoy.
                            </span>
                        </h1>
                    </div>
                </header>

                {/* BLOQUES REPETIBLES */}
                <div className="flex flex-col gap-24">

                    {chunkedPost.map((chunk, chunkIndex) => {
                        const mainPost = chunk[0];
                        const secondaryPost = chunk.slice(1);

                        return (
                            <div
                                key={chunkIndex}
                                className="flex flex-col lg:flex-row gap-12"
                            >

                                {/* POST PRINCIPAL (IZQUIERDA) */}
                                {mainPost && (
                                    <article className="w-full lg:w-1/2">
                                        <Link
                                            href={`/Blogs/${mainPost.id}`}
                                            className="group block"
                                        >
                                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl bg-gray-100">
                                                <Image
                                                    src={mainPost.image}
                                                    alt={mainPost.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />

                                                {mainPost.videoUrl && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                                                            <i className="ri-play-fill text-white text-4xl"></i>
                                                        </div>
                                                    </div>
                                                )}

                                                <span className="absolute top-5 left-5 bg-[#00338d] px-5 py-2 font-bold rounded-full text-white text-xs z-10">
                                                    {mainPost.tag}
                                                </span>
                                            </div>

                                            <div className="mt-8">
                                                <p className="text-gray-400 text-sm">
                                                    por{" "}
                                                    <span className="text-[#00338d] font-bold">
                                                        {mainPost.postby}
                                                    </span>
                                                </p>

                                                <h2 className="text-4xl md:text-5xl CalSans my-5 group-hover:text-[#00338d] transition-colors">
                                                    {mainPost.title}
                                                </h2>

                                                <p className="text-gray-500 text-lg line-clamp-3 leading-relaxed" style={{whiteSpace: "pre-line"}}>
                                                    {mainPost.desc}
                                                </p>
                                            </div>
                                        </Link>
                                    </article>
                                )}

                                {/* POSTS SECUNDARIOS (DERECHA) */}
                                <aside className="w-full lg:w-1/2 flex flex-col gap-10">

                                    {secondaryPost.map((blog: BlogPost) => (
                                        <article key={blog.id}>
                                            <Link
                                                href={`/Blogs/${blog.id}`}
                                                className="group flex flex-col md:flex-row gap-6"
                                            >
                                                <div className="w-full md:w-2/5 relative aspect-square rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                                                    <Image
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />

                                                    {blog.videoUrl && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                            <i className="ri-play-circle-fill text-white text-3xl opacity-80"></i>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="w-full md:w-3/5 flex flex-col justify-center">
                                                    <p className="text-gray-400 text-xs">
                                                        por{" "}
                                                        <span className="text-[#00338d] font-bold">
                                                            {blog.postby}
                                                        </span>
                                                    </p>

                                                    <h3 className="text-2xl CalSans my-3 group-hover:text-[#00338d] transition-colors leading-snug">
                                                        {blog.title}
                                                    </h3>

                                                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                                        {blog.desc}
                                                    </p>
                                                </div>
                                            </Link>
                                        </article>
                                    ))}

                                </aside>
                            </div>
                        );
                    })}

                </div>

                {/* BOTÓN VER MÁS */}
                {visibleCount < BLOG_DATA.length && (
                    <div className="mt-24 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="group flex items-center gap-3 bg-[#00338d] hover:bg-[#002a73] transition-all text-white px-10 py-5 rounded-xl"
                        >
                            Ver más Artículos
                            <i className="ri-add-line text-2xl group-hover:rotate-90 transition-transform"></i>
                        </button>
                    </div>
                )}

            </main>
        </>
    );
}

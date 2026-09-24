"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { convertirImagenABase64WebP } from "@/utils/imageUtils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Introduce la URL de la imagen:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-1 bg-slate-800 p-2 rounded-t-xl border-b border-slate-700 text-xs text-white">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded cursor-pointer ${editor.isActive('bold') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Negrita</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded cursor-pointer ${editor.isActive('italic') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Cursiva</button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1.5 rounded cursor-pointer ${editor.isActive('underline') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Subrayado</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded cursor-pointer ${editor.isActive('bulletList') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Viñetas</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-1.5 rounded cursor-pointer ${editor.isActive('orderedList') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Numeración</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className="p-1.5 rounded hover:bg-slate-700 cursor-pointer">Izq.</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className="p-1.5 rounded hover:bg-slate-700 cursor-pointer">Centrar</button>
      <input
        type="color"
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 self-center"
        title="Color de texto"
      />
      <button type="button" onClick={addImage} className="p-1.5 rounded hover:bg-slate-700 bg-slate-700 cursor-pointer">🖼️ Imagen</button>
    </div>
  );
};

interface BlogsTabProps {
  blogsList?: any[];
  setStatusMsg: (msg: string | null) => void;
}

export default function BlogsTab({ blogsList = [], setStatusMsg }: BlogsTabProps) {
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [tituloBlog, setTituloBlog] = useState("");
  const [autorBlog, setAutorBlog] = useState("Pastor Principal");
  const [tagBlog, setTagBlog] = useState("Estudio Bíblico");
  const [portadaBlogFile, setPortadaBlogFile] = useState<File | null>(null);
  const [videoBlogUrl, setVideoBlogUrl] = useState("");
  const [savingBlog, setSavingBlog] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: "<p>Escribe tu contenido aquí...</p>",
    immediatelyRender: false,
  });

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;
    setSavingBlog(true);
    setStatusMsg("Procesando y guardando blog...");

    try {
      let portadaUrl = "";
      if (portadaBlogFile) {
        portadaUrl = await convertirImagenABase64WebP(portadaBlogFile, 0.8);
      }

      let formattedVideoUrl = videoBlogUrl.trim();
      if (formattedVideoUrl.includes("watch?v=")) {
        const idStr = formattedVideoUrl.split("v=")[1].split("&")[0];
        formattedVideoUrl = `https://www.youtube.com/embed/${idStr}`;
      } else if (formattedVideoUrl.includes("youtu.be/")) {
        const idStr = formattedVideoUrl.split("youtu.be/")[1].split("?")[0];
        formattedVideoUrl = `https://www.youtube.com/embed/${idStr}`;
      }

      const contenidoHtml = editor.getHTML();

      if (editingBlogId) {
        const updateData: any = {
          titulo: tituloBlog,
          autor: autorBlog,
          tag: tagBlog,
          contenido: contenidoHtml,
          updatedAt: serverTimestamp(),
        };
        if (portadaUrl) {
          updateData.portadaUrl = portadaUrl;
          updateData.imagenUrl = portadaUrl;
        }
        if (formattedVideoUrl !== undefined) {
          updateData.videoUrl = formattedVideoUrl;
        }

        await updateDoc(doc(db, "blogs", editingBlogId), updateData);
        setStatusMsg("Blog actualizado correctamente.");
      } else {
        await addDoc(collection(db, "blogs"), {
          titulo: tituloBlog,
          autor: autorBlog,
          tag: tagBlog,
          contenido: contenidoHtml,
          portadaUrl: portadaUrl || "",
          imagenUrl: portadaUrl || "",
          videoUrl: formattedVideoUrl || "",
          createdAt: serverTimestamp(),
        });
        setStatusMsg("Blog creado con éxito.");
      }

      setTituloBlog("");
      setAutorBlog("Pastor Principal");
      setTagBlog("Estudio Bíblico");
      setPortadaBlogFile(null);
      setVideoBlogUrl("");
      setEditingBlogId(null);
      editor.commands.clearContent();
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al guardar el blog.");
    } finally {
      setSavingBlog(false);
    }
  };

  const handleStartEditBlog = (blog: any) => {
    setEditingBlogId(blog.id);
    setTituloBlog(blog.titulo || "");
    setAutorBlog(blog.autor || "Pastor Principal");
    setTagBlog(blog.tag || "Estudio Bíblico");
    setVideoBlogUrl(blog.videoUrl || "");
    if (editor && blog.contenido) {
      editor.commands.setContent(blog.contenido);
    }
    setStatusMsg(`Editando blog: ${blog.titulo}`);
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm("¿Deseas eliminar este blog?")) {
      await deleteDoc(doc(db, "blogs", id));
      setStatusMsg("Blog eliminado.");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 text-slate-100">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{editingBlogId ? "Editar Blog o Enseñanza" : "Gestión de Blogs y Enseñanzas"}</h2>
        {editingBlogId && (
          <button
            type="button"
            onClick={() => {
              setEditingBlogId(null);
              setTituloBlog("");
              setVideoBlogUrl("");
              if (editor) editor.commands.clearContent();
            }}
            className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20 cursor-pointer"
          >
            Cancelar Edición
          </button>
        )}
      </div>

      <form onSubmit={handleSaveBlog} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs mb-1">Título del Blog</label>
            <input type="text" required value={tituloBlog} onChange={(e) => setTituloBlog(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Título..." />
          </div>
          <div>
            <label className="block text-xs mb-1">Autor</label>
            <input type="text" value={autorBlog} onChange={(e) => setAutorBlog(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
          </div>
          <div>
            <label className="block text-xs mb-1">Categoría / Tag</label>
            <input type="text" value={tagBlog} onChange={(e) => setTagBlog(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Imagen de Portada (Archivo)</label>
            <input type="file" accept="image/*" onChange={(e) => setPortadaBlogFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-slate-300" />
          </div>
          <div>
            <label className="block text-xs mb-1">Video Relacionado (URL YouTube opcional)</label>
            <input type="text" value={videoBlogUrl} onChange={(e) => setVideoBlogUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1 font-semibold">Contenido del Artículo</label>
          <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden text-white">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="p-4 min-h-[200px] prose prose-invert max-w-none focus:outline-none" />
          </div>
        </div>

        <button type="submit" disabled={savingBlog} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-sm transition cursor-pointer">
          {savingBlog ? "Guardando Blog..." : (editingBlogId ? "Actualizar Blog" : "Publicar Blog")}
        </button>
      </form>

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h3 className="font-bold text-sm">Blogs Publicados ({blogsList.length})</h3>
        <div className="space-y-3">
          {blogsList.map((blog) => (
            <div key={blog.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div>
                <h4 className="font-bold text-sm text-white">{blog.titulo}</h4>
                <p className="text-xs text-slate-400">Por {blog.autor} • {blog.tag}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleStartEditBlog(blog)} className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg text-xs hover:bg-yellow-500/20 cursor-pointer">Editar</button>
                <button onClick={() => handleDeleteBlog(blog.id)} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs hover:bg-red-500/20 cursor-pointer">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
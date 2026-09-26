"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style"; // <-- Corregido con llaves
import Image from "@tiptap/extension-image";
import React from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[220px] p-4 bg-slate-900 text-slate-100 focus:outline-none rounded-b-xl text-sm leading-relaxed prose prose-invert max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Introduce la URL de la imagen:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-900 shadow-lg">
      {/* Barra de herramientas estilo Microsoft Word */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-800 p-2.5 border-b border-slate-700 text-xs">
        
        {/* Fuente y Estilos básicos */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${editor.isActive("bold") ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            title="Negrilla"
          >
            N
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2.5 py-1 rounded italic transition-all cursor-pointer ${editor.isActive("italic") ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            title="Cursiva"
          >
            K
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2.5 py-1 rounded underline transition-all cursor-pointer ${editor.isActive("underline") ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            title="Subrayado"
          >
            S
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-2.5 py-1 rounded line-through transition-all cursor-pointer ${editor.isActive("strike") ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            title="Tachado"
          >
            abc
          </button>
        </div>

        {/* Selector de Color de Texto */}
        <div className="flex items-center gap-1 bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-700">
          <span className="text-slate-400">Color:</span>
          <input
            type="color"
            onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
            value={editor.getAttributes("textStyle").color || "#ffffff"}
            className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
            title="Color de texto"
          />
        </div>

        {/* Títulos y Párrafo */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 rounded font-bold transition-all cursor-pointer ${editor.isActive("heading", { level: 1 }) ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded font-semibold transition-all cursor-pointer ${editor.isActive("heading", { level: 2 }) ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`px-2 py-1 rounded transition-all cursor-pointer ${editor.isActive("paragraph") ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
          >
            Normal
          </button>
        </div>

        {/* Alineación */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`px-2 py-1 rounded transition-all cursor-pointer ${editor.isActive({ textAlign: "left" }) ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            title="Alinear a la izquierda"
          >
            Izquierda
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`px-2 py-1 rounded transition-all cursor-pointer ${editor.isActive({ textAlign: "center" }) ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            title="Centrar"
          >
            Centro
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`px-2 py-1 rounded transition-all cursor-pointer ${editor.isActive({ textAlign: "right" }) ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            title="Alinear a la derecha"
          >
            Derecha
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={`px-2 py-1 rounded transition-all cursor-pointer ${editor.isActive({ textAlign: "justify" }) ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            title="Justificar"
          >
            Justificar
          </button>
        </div>

        {/* Listas */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${editor.isActive("bulletList") ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            title="Viñetas"
          >
            • Viñeta
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${editor.isActive("orderedList") ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            title="Numeración"
          >
            1. Num
          </button>
        </div>

        {/* Insertar Imagen */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={addImage}
            className="px-3 py-1 rounded text-indigo-300 hover:bg-indigo-600/20 font-medium transition-all cursor-pointer"
            title="Insertar Imagen por URL"
          >
            🖼️ Insertar Imagen
          </button>
        </div>

      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
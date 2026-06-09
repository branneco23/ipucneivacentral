// src/app/admin/anuncios/page.tsx
"use client";

import React, { useState } from 'react';

interface Anuncio {
  id: number;
  bg: string;
  tag: string;
  title: string;
  hours: string;
  year: string;
}

export default function AdminAnuncios() {
  // Estado con datos iniciales (simulando lo que vendría de tu JSON o Base de Datos)
  const [anuncios, setAnuncios] = useState<Anuncio[]>([
    {
      id: 1,
      bg: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_16_03_33_ngqva5.png",
      tag: "Confraternidad",
      title: "Gran Vigilia de Oración Extraordinaria",
      hours: "19:00 - 23:00",
      year: "2026"
    },
    {
      id: 2,
      bg: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_18_06_erwfkk.png",
      tag: "Especial",
      title: "Seminario de Fortalecimiento Familiar",
      hours: "09:00 - 12:00",
      year: "2026"
    }
  ]);

  // Estados para capturar los campos del formulario
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState('');
  const [tag, setTag] = useState('General');
  const [bgUrl, setBgUrl] = useState('');
  const [year, setYear] = useState('2026');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejador para agregar nuevos anuncios al flujo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !hours || !bgUrl) return;

    setIsSubmitting(true);

    const nuevoAnuncio: Anuncio = {
      id: Date.now(), // ID único temporal
      title,
      hours,
      tag,
      bg: bgUrl,
      year
    };

    // Simulación de delay de red antes de actualizar la UI
    setTimeout(() => {
      setAnuncios([nuevoAnuncio, ...anuncios]);
      // Limpiar formulario
      setTitle('');
      setHours('');
      setBgUrl('');
      setTag('General');
      setIsSubmitting(false);
    }, 800);
  };

  // Eliminar un anuncio de la lista
  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este anuncio del carrusel público?')) {
      setAnuncios(anuncios.filter(anuncio => anuncio.id !== id));
    }
  };

  return (
    <div className="space-y-10">
      
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight CalSans">
          Gestión de <span className="text-[#00338d]">Anuncios &amp; Carrusel</span>
        </h2>
        <p className="text-white/40 mt-1.5 text-sm md:text-base">
          Añade o remueve las tarjetas informativas que se muestran en la sección principal con opción de agendamiento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO DE REGISTRO (5 Columnas) */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-[#090d16] border border-white/5 rounded-[2rem] p-6 md:p-8 space-y-5 h-fit">
          <div>
            <h3 className="text-lg font-bold font-sans">Crear Nuevo Anuncio</h3>
            <p className="text-xs text-white/40 mt-1">Completa los campos requeridos para el despliegue.</p>
          </div>

          {/* Campo: Título */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Título del Anuncio</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Convención Nacional de Jóvenes"
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00338d] transition-all"
              required
            />
          </div>

          {/* Fila Doble: Hora y Año */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Horario / Hora</label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Ej: 18:30"
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00338d] transition-all"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Año</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00338d] transition-all"
                required
              />
            </div>
          </div>

          {/* Fila Doble: Categoría/Tag y Carga de Imagen */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Etiqueta (Tag)</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00338d] transition-all"
            >
              <option value="General">General</option>
              <option value="Especial">Especial</option>
              <option value="Confraternidad">Confraternidad</option>
              <option value="Damas">Damas</option>
              <option value="Jóvenes">Jóvenes</option>
            </select>
          </div>

          {/* Campo: Subir Imagen (Dirección URL o Cloudinary) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">URL de la Imagen de Fondo</label>
            <input
              type="url"
              value={bgUrl}
              onChange={(e) => setBgUrl(e.target.value)}
              placeholder="https://res.cloudinary.com/.../imagen.jpg"
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00338d] transition-all font-mono"
              required
            />
            <p className="text-[10px] text-white/30">Recomendado: Imágenes horizontales optimizadas de Cloudinary.</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00338d] hover:bg-[#002260] disabled:bg-[#00338d]/50 text-white font-bold py-3.5 rounded-xl text-sm transition-all uppercase tracking-wide mt-2 shadow-lg shadow-[#00338d]/10"
          >
            {isSubmitting ? 'Publicando...' : 'Publicar Anuncio'}
          </button>
        </form>

        {/* COLUMNA DERECHA: TABLA / LISTADO DE ANUNCIOS EXISTENTES (7 Columnas) */}
        <div className="lg:col-span-7 bg-[#090d16] border border-white/5 rounded-[2rem] p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold font-sans">Anuncios en Cartelera</h3>
            <p className="text-xs text-white/40 mt-1">Lista de elementos renderizados en tiempo real en la página principal.</p>
          </div>

          {/* CONTENEDOR DE TARJETAS DE MONITOREO */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
            {anuncios.map((anuncio) => (
              <div 
                key={anuncio.id} 
                className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:bg-white/[0.03] transition-all group"
              >
                {/* Miniatura y Detalles */}
                <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                  {/* Preview de la imagen */}
                  <div 
                    className="w-16 h-16 rounded-xl bg-cover bg-center bg-no-repeat border border-white/10 flex-shrink-0"
                    style={{ backgroundImage: `url(${anuncio.bg})` }}
                  />
                  <div className="min-w-0 space-y-1">
                    <span className="inline-block text-[9px] font-bold bg-white/5 border border-white/10 text-white/70 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {anuncio.tag}
                    </span>
                    <h4 className="text-sm font-semibold text-white truncate max-w-[220px] sm:max-w-[320px]">
                      {anuncio.title}
                    </h4>
                    <p className="text-xs text-white/40 flex items-center gap-1.5">
                      <i className="ri-time-line text-[#00338d]"></i> {anuncio.hours} | <span className="font-mono text-[11px]">{anuncio.year}</span>
                    </p>
                  </div>
                </div>

                {/* Acciones de Fila */}
                <div className="flex items-center gap-2 self-end sm:self-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                  <button 
                    onClick={() => handleDelete(anuncio.id)}
                    className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/10 transition-all flex items-center justify-center text-sm"
                    title="Eliminar del slider"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
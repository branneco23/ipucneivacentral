"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// Definición de tipos para TypeScript
interface FormData {
  nombre: string;
  telefono: string;
  peticion: string;
}

const PeticionesForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    telefono: '',
    peticion: ''
  });

  // CONFIGURACIÓN: Reemplaza con el número de la congregación (con código de país)
  const WHATSAPP_NUMBER = "573107596532"; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Estructuración del mensaje con formato de WhatsApp (* para negrita)
    const mensaje = encodeURIComponent(
      `*NUEVA PETICIÓN DE ORACIÓN*\n\n` +
      `*Nombre:* ${formData.nombre}\n` +
      `*Contacto:* ${formData.telefono}\n\n` +
      `*Petición:*\n${formData.peticion}`
    );

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
    
    window.open(url, '_blank');
  };

  return (
    <section className="pt-24 md:pt-32 max-w-6xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
        
        {/* Columna 1: Imagen con Next.js Image */}
        <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[600px]">
          <Image 
            src="https://res.cloudinary.com/dbbzk99pj/image/upload/v1772289064/472779511_611808141324892_20310964730384181_n_nepk4b.jpg" 
            alt="Intercesión y Oración" 
            fill
            className="object-cover"
            priority
          />
          {/* Capa de diseño (Gradient Overlay) */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent flex items-end p-10">
            <div className="text-white">
              <span className="bg-blue-500 text-xs uppercase font-bold px-3 py-1 rounded-full mb-4 inline-block tracking-widest">
                Intercesión
              </span>
              <h2 className="text-4xl font-extrabold mb-3 leading-tight">
                No estás solo, <br />queremos orar por ti.
              </h2>
              <p className="text-blue-100 text-lg font-light max-w-md">
                "La oración eficaz del justo puede mucho." — Santiago 5:16
              </p>
            </div>
          </div>
        </div>

        {/* Columna 2: Formulario */}
        <div className="lg:w-1/2 p-8 md:p-14 bg-white">
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-slate-800">Buzón de Peticiones</h3>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-600 mb-2 group-focus-within:text-blue-600 transition-colors">
                Nombre del hermano(a)
              </label>
              <input
                required
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Escribe tu nombre"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-600 mb-2 group-focus-within:text-blue-600 transition-colors">
                Número de WhatsApp / Celular
              </label>
              <input
                required
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: +57 300 123 4567"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-600 mb-2 group-focus-within:text-blue-600 transition-colors">
                ¿Cuál es tu necesidad?
              </label>
              <textarea
                required
                name="peticion"
                rows={5}
                value={formData.peticion}
                onChange={handleChange}
                placeholder="Describe tu motivo de oración aquí..."
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 transform transition hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 text-lg"
            >
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.404 3.48s3.481 5.229 3.481 8.404c0 6.556-5.332 11.888-11.888 11.888-2.01 0-3.988-.511-5.742-1.482l-6.142 1.707zm5.422-3.787l.389.231c1.474.875 3.177 1.336 4.932 1.336 5.563 0 10.088-4.525 10.088-10.088 0-2.694-1.05-5.227-2.956-7.132s-4.438-2.956-7.132-2.956c-5.563 0-10.088 4.525-10.088 10.088 0 1.78.468 3.51 1.355 5.013l.253.429-1.008 3.682 3.768-.944z"/>
              </svg>
              Enviar al WhatsApp de la Iglesia
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PeticionesForm;
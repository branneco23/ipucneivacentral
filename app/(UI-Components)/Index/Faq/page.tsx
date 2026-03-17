"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser"; // Importación necesaria
import { FAQ_DATA } from "@/app/JsonData/FaqData";
import faqBanner from "@/public/img/faq-banner.jpg";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Estados para el formulario de contacto
  const [showInput, setShowInput] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  }, []);

  // Función para enviar a través de EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setIsSending(true);

    // Definimos los parámetros que recibirá tu plantilla en EmailJS
    const templateParams = {
      intro_paterna: "Hola, se ha recibido una nueva consulta desde el Centro de Ayuda de IPUC Neiva Central:",
      user_message: userQuestion, // Este nombre debe ser igual al que pusiste entre llaves {{ }}
    };

    try {
      // Reemplaza estos 3 valores con los de tu cuenta de EmailJS
      await emailjs.send(
        "service_430q00f",   // Ej: 'service_gmail123'
        "template_carbdjj",  // Ej: 'template_faq_ipuc'
        templateParams,
        "Fz1SJhmYGExQrCUMh"    // Lo encuentras en Account > Public Key
      );

      alert("¡Tu mensaje ha sido enviado exitosamente!");
      setUserQuestion("");
      setShowInput(false);
    } catch (error) {
      console.error("Error EmailJS:", error);
      alert("Hubo un fallo al enviar el correo. Por favor, intenta más tarde.");
    } finally {
      setIsSending(false);
    }
  };

  if (!mounted) return null;

  return (
    <section className="px-[8%] lg:px-[12%] py-24 bg-[#f6f6f6]" aria-labelledby="faq-title">
      <header className="mb-20 text-center lg:text-left">
        <span className="text-[#00338d] font-bold uppercase tracking-[0.3em] text-xs">
          Centro de Ayuda
        </span>
        <h2 id="faq-title" className="text-4xl md:text-6xl CalSans mt-4 text-gray-900">
          Preguntas <span className="text-gray-400 italic">Frecuentes</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* COLUMNA IMAGEN */}
        <div className="lg:col-span-5 relative group h-full hidden lg:block">
          <div className="sticky top-10">
            <Image
              src={faqBanner}
              alt="Consulta IPUC Neiva"
              placeholder="blur"
              className="rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl max-w-[200px] border border-gray-100">
              <p className="text-[#00338d] font-bold text-3xl">24/7</p>
              <p className="text-gray-500 text-xs uppercase font-bold tracking-tighter">Ayuda Espiritual</p>
            </div>
          </div>
        </div>

        {/* COLUMNA FAQ */}
        <div className="lg:col-span-7 w-full">
          <div className="divide-y divide-gray-300 border-t border-gray-300">
            {FAQ_DATA.map((item, index) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          {/* FOOTER CON FORMULARIO EMAILJS */}
          <footer className="mt-12 p-8 rounded-3xl bg-white shadow-sm border border-gray-200">
            {!showInput ? (
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="GolosText text-gray-600 italic">¿Tienes otra duda?</p>
                <button
                  onClick={() => setShowInput(true)}
                  className="px-8 py-3 bg-[#00338d] text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-lg active:scale-95"
                >
                  Escribir al Correo
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center">
                  <p className="text-[#00338d] font-bold text-sm uppercase">Redactar Consulta</p>
                  <button type="button" onClick={() => setShowInput(false)} className="text-gray-400 hover:text-red-500 text-xs font-bold">CANCELAR</button>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    required
                    autoFocus
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Escribe tu pregunta aquí..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#00338d] text-gray-800"
                  />
                  <button
                    type="submit"
                    disabled={isSending}
                    className="bg-[#00338d] text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-900 transition-all disabled:opacity-50"
                  >
                    {isSending ? "Enviando..." : "Enviar a IPUC"}
                  </button>
                </div>
              </form>
            )}
          </footer>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ item, isOpen, onToggle }: { item: any, isOpen: boolean, onToggle: () => void }) {
  return (
    <article className="transition-all duration-300">
      <button
        className="w-full flex justify-between items-center py-8 text-left focus:outline-none group rounded-lg"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-6">
          <h3 className={`text-2xl font-bold ${isOpen ? "text-[#00338d]" : "text-[#00338d]/20"}`}>
            {item.id < 10 ? `0${item.id}` : item.id}
          </h3>
          <span className={`text-lg md:text-xl GolosText font-semibold ${isOpen ? "text-[#00338d]" : "text-gray-800"}`}>
            {item.question}
          </span>
        </div>
        <div className={`text-2xl transition-all duration-500 w-10 h-10 rounded-full flex items-center justify-center ${isOpen ? "rotate-45 bg-[#00338d] text-white" : "bg-gray-100 text-gray-400"}`}>
          <i className="ri-add-line"></i>
        </div>
      </button>

      <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100 pb-10" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="pl-14 md:pl-16">
            <p className="GolosText text-gray-600 text-lg leading-relaxed border-l-4 border-[#00338d]/20 pl-6 italic">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
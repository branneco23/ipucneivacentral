"use client";
import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // REEMPLAZA ESTA URL con la que te dio Google Apps Script
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpx6vhB-Kb6GxjSFGd7A_OY4k3m1jwMvhO6WhWH5W6wNmgB2nrNzI8ALUdd9gwqdjjjQ/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Importante para evitar problemas de CORS con Google
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      setStatus("idle");
    }
  };

  return (
    <section className="w-full bg-white py-24 px-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block px-4 py-1 rounded-full border border-gray-200 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-8">
          Mantenente Actualizado
        </span>

        <h2 className="text-4xl md:text-6xl font-medium text-slate-900 leading-tight mb-6 tracking-tight">
          Eventos <span className="text-[#00338d]">Metropolitanos,</span> <br />
          <span className="text-[#00338d]">Distritales, Nacionales</span> de la IPUC.
        </h2>

        {status === "success" ? (
          <p className="text-green-600 font-bold animate-bounce">¡Gracias! Te has suscrito correctamente.</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
            <div className="relative flex items-center border-b border-gray-300 group-focus-within:border-[#00338d] transition-colors pb-2">
              <input
                type="email"
                required
                disabled={status === "loading"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={status === "loading" ? "Enviando..." : "Email address.."}
                className="w-full bg-transparent py-3 px-2 text-gray-700 outline-none placeholder:text-gray-400 placeholder:text-sm"
              />
              
              <button
                type="submit"
                disabled={status === "loading"}
                className="ml-2 bg-[#00338d] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-900 transition-all shadow-lg active:scale-90 disabled:bg-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-[-45deg]">
                  <path d="M1.94607 9.31543C1.42351 9.14125 1.4194 8.86022 1.95684 8.68108L21.0431 2.31901C21.5715 2.14288 21.8746 2.43866 21.7266 2.95694L16.2733 22.0432C16.1223 22.5716 15.8183 22.5901 15.5945 22.0876L11.9999 14L18 7L11 13.9999L1.94607 9.31543Z"></path>
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
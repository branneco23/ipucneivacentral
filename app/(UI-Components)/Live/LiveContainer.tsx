"use client";

import React from 'react';

interface LiveContainerProps {
  children: React.ReactNode; // Aquí irá el video y las reacciones
  chat: React.ReactNode;     // Aquí irá el componente del chat
}

export const LiveContainer = ({ children, chat }: LiveContainerProps) => {
  return (
    <div className="max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* COLUMNA PRINCIPAL: VIDEO Y TITULOS */}
        <div className="w-full lg:w-[70%] space-y-6">
          <div className="bg-white/5 backdrop-blur-md p-2 rounded-[2.5rem] border border-white/10 shadow-2xl">
            {children}
          </div>
          
          {/* Información adicional debajo del video */}
          <div className="px-4 py-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              IPUC Neiva Central - Sede Principal
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Transmitiendo en directo para la gloria de Dios.
            </p>
          </div>
        </div>

        {/* COLUMNA LATERAL: CHAT */}
        <div className="w-full lg:w-[30%] lg:sticky lg:top-28">
          <div className="bg-zinc-900/50 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-xl overflow-hidden h-[600px] lg:h-[calc(100vh-180px)]">
            {chat}
          </div>
        </div>

      </div>
    </div>
  );
};
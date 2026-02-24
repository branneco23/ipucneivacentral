"use client";

import React, { useEffect, useState, useRef } from 'react';
import { db, auth } from '@/services/firebase';
import { ref, onValue, push, serverTimestamp, query, limitToLast } from 'firebase/database';

interface ChatSectionProps {
  user: string | null;
}

export const ChatSection = ({ user }: ChatSectionProps) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatRef = query(ref(db, 'live_chat'), limitToLast(50));
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ 
          id: key, 
          ...data[key],
          // Si el timestamp aún no llega de Firebase, usamos la hora actual
          date: data[key].ts ? new Date(data[key].ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
        }));
        setChatMessages(list.sort((a, b) => a.ts - b.ts));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    try {
      await push(ref(db, 'live_chat'), {
        username: user,
        text: message.trim(),
        ts: serverTimestamp(),
        userId: auth.currentUser?.uid || 'anonimo'
      });
      setMessage("");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900/80 backdrop-blur-2xl border-l border-white/5">
      {/* Cabecera con contador visual */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Chat en Vivo
        </h3>
        <span className="text-[10px] text-zinc-500 font-medium">{chatMessages.length} mensajes</span>
      </div>

      {/* Lista de Mensajes con mejor contraste */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide"
      >
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
              <i className="ri-chat-smile-2-line text-zinc-500 text-xl"></i>
            </div>
            <p className="text-zinc-500 text-xs italic">La comunidad está en silencio. ¡Saluda!</p>
          </div>
        ) : (
          chatMessages.map((msg) => (
            <div key={msg.id} className="flex flex-col items-start animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="flex items-center gap-2 mb-1.5 ml-1">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-tighter">
                  {msg.username}
                </span>
                <span className="text-[9px] text-zinc-600 font-medium">
                  {msg.date}
                </span>
              </div>
              <div className="bg-gradient-to-br from-white/[0.08] to-transparent border border-white/5 px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm group hover:border-white/20 transition-all">
                <p className="text-sm text-zinc-300 leading-relaxed break-words">
                  {msg.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Formulario Estilo Flotante */}
      <div className="p-4 bg-zinc-900/90 border-t border-white/5">
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe una bendición..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-12 py-3 text-sm outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all placeholder:text-zinc-600 text-white"
          />
          <button 
            type="submit"
            disabled={!message.trim()}
            className="absolute right-2 p-2 text-blue-500 hover:text-blue-400 disabled:text-zinc-700 transition-colors"
          >
            <i className="ri-send-plane-2-fill text-xl"></i>
          </button>
        </form>
        <p className="text-[9px] text-center text-zinc-600 mt-2">
          Participa con respeto y amor cristiano.
        </p>
      </div>
    </div>
  );
};
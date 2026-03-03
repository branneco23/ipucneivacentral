"use client";
import { useState } from 'react';
import { registerLiveUser } from '@/services/liveService';

interface Props { onJoined: (name: string) => void; }

export const UsernameModal = ({ onJoined }: Props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const registeredName = await registerLiveUser(name);
      localStorage.setItem('live_user', registeredName);
      onJoined(registeredName);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">¿Cómo quieres aparecer?</h2>
        <input 
          className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none"
          placeholder="TuNombreSinEspacios"
          value={name}
          onChange={(e) => setName(e.target.value.replace(/\s+/g, ''))}
        />
        <button 
          onClick={handleSubmit}
          disabled={loading || name.length < 3}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
        >
          {loading ? "Validando..." : "Entrar a la transmisión"}
        </button>
      </div>
    </div>
  );
};
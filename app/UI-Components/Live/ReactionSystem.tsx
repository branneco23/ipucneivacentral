"use client";
import { useEffect, useState } from 'react';
import { db, auth } from '@/services/firebase';
import { ref, set, serverTimestamp, onChildAdded, onChildChanged } from 'firebase/database';

const EMOJIS = [
  { icon: '🙌', type: 'amen', label: 'Amén' },
  { icon: '❤️', type: 'love', label: 'Me encanta' },
  { icon: '🙏', type: 'pray', label: 'Oración' },
  { icon: '🔥', type: 'fire', label: 'Gloria a Dios' },
];

// --- COMPONENTE DE BOTONES ---
export function ReactionSystem() {
  const sendReaction = async (type: string) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      // Usamos 'set' con el UID del usuario para que el contador sea único.
      // El 'ts: serverTimestamp()' es vital para que onChildChanged detecte el clic.
      await set(ref(db, `live_events/reactions/${user.uid}`), {
        type: type,
        username: localStorage.getItem('live_user') || 'Anónimo',
        ts: serverTimestamp(), 
      });
    } catch (error) {
      console.error("Error al reaccionar:", error);
    }
  };

  return (
    <div className="flex justify-around items-center bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 shadow-xl">
      {EMOJIS.map((e) => (
        <button
          key={e.type}
          onClick={() => sendReaction(e.type)}
          className="group flex flex-col items-center gap-1 transition-all active:scale-75 hover:scale-125"
          title={e.label}
        >
          <span className="text-3xl md:text-4xl filter drop-shadow-md">{e.icon}</span>
          <span className="text-[8px] font-black uppercase text-zinc-500 group-hover:text-blue-400 transition-colors">
            {e.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// --- COMPONENTE DE ANIMACIÓN (CAPA FLOTANTE) ---
export function FloatingReactions() {
  const [elements, setElements] = useState<{ id: string; icon: string }[]>([]);

  useEffect(() => {
    const reactionsRef = ref(db, 'live_events/reactions');

    const handleReaction = (snapshot: any) => {
      const data = snapshot.val();
      if (!data) return;

      const emojiMatch = EMOJIS.find(e => e.type === data.type);
      const icon = emojiMatch ? emojiMatch.icon : '❤️';
      const id = Math.random().toString(36).substring(2, 9);

      // Añadir el emoji al estado para renderizarlo
      setElements(prev => [...prev, { id, icon }]);

      // Limpiar el emoji después de 4 segundos (duración de la animación)
      setTimeout(() => {
        setElements(prev => prev.filter(el => el.id !== id));
      }, 4000);
    };

    // 1. Se dispara cuando un usuario reacciona por primera vez
    const unsubAdded = onChildAdded(reactionsRef, handleReaction);
    
    // 2. Se dispara cuando el mismo usuario vuelve a presionar (gracias al timestamp)
    const unsubChanged = onChildChanged(reactionsRef, handleReaction);

    return () => {
      unsubAdded();
      unsubChanged();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {elements.map((el) => (
        <span
          key={el.id}
          className="absolute bottom-[-60px] text-5xl animate-float-up opacity-0"
          style={{ 
            left: `${Math.random() * 80 + 10}%`,
            // Variación ligera en la velocidad para que se vea natural
            animationDuration: `${3 + Math.random()}s` 
          }}
        >
          {el.icon}
        </span>
      ))}
      
      <style jsx global>{`
        @keyframes float-up {
          0% { 
            transform: translateY(0) rotate(0deg) scale(0.5); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
            transform: translateY(-10vh) rotate(10deg) scale(1.2);
          }
          100% { 
            transform: translateY(-120vh) rotate(-20deg) scale(1.8); 
            opacity: 0; 
          }
        }
        .animate-float-up {
          animation: float-up linear forwards;
        }
      `}</style>
    </div>
  );
}
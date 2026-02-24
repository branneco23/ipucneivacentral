"use client";
import { useEffect, useState } from 'react';
import { db } from '@/services/firebase';
import { ref, onValue } from 'firebase/database';

export function CounterReactions() {
  const [counts, setCounts] = useState({ amen: 0, love: 0, pray: 0, fire: 0 });

  useEffect(() => {
    const reactionsRef = ref(db, 'live_events/reactions');
    
    return onValue(reactionsRef, (snapshot) => {
      const data = snapshot.val();
      const newCounts = { amen: 0, love: 0, pray: 0, fire: 0 };

      if (data) {
        // Recorremos cada usuario y sumamos su reacción elegida
        Object.values(data).forEach((reaction: any) => {
          if (newCounts.hasOwnProperty(reaction.type)) {
            newCounts[reaction.type as keyof typeof newCounts]++;
          }
        });
      }
      setCounts(newCounts);
    });
  }, []);

  return (
    <div className="flex gap-4 items-center bg-white/5 px-4 py-2 rounded-full border border-white/10 w-fit">
      <div className="flex -space-x-2">
        <span className="z-10">🙌</span>
        <span className="z-20">❤️</span>
        <span className="z-30">🙏</span>
      </div>
      <span className="text-sm font-bold text-zinc-300">
        {counts.amen + counts.love + counts.pray + counts.fire} personas reaccionaron
      </span>
    </div>
  );
}
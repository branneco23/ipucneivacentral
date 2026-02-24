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
        Object.values(data).forEach((reaction: any) => {
          if (newCounts.hasOwnProperty(reaction.type)) {
            newCounts[reaction.type as keyof typeof newCounts]++;
          }
        });
      }
      setCounts(newCounts);
    });
  }, []);

  const total = counts.amen + counts.love + counts.pray + counts.fire;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      {/* Badge Total */}
      <div className="bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg shadow-blue-900/20">
        {total} INTERACCIONES
      </div>

      {/* Contadores Individuales */}
      <div className="flex gap-2">
        {counts.amen > 0 && <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5 text-xs">🙌 {counts.amen}</span>}
        {counts.love > 0 && <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5 text-xs">❤️ {counts.love}</span>}
        {counts.pray > 0 && <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5 text-xs">🙏 {counts.pray}</span>}
        {counts.fire > 0 && <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5 text-xs">🔥 {counts.fire}</span>}
      </div>
    </div>
  );
}
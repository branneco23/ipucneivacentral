"use client";
import { useEffect, useState } from 'react';
import { db } from '@/services/firebase';
import { ref, onValue } from 'firebase/database';

export function CounterReactions({ liveId }: { liveId: string }) {
  const [counts, setCounts] = useState({ amen: 0, love: 0, pray: 0, fire: 0 });

  useEffect(() => {
    if (!liveId) return;
    const reactionsRef = ref(db, `live_events/${liveId}/reactions`);
    
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
  }, [liveId]);

  const total = counts.amen + counts.love + counts.pray + counts.fire;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <div className="bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg shadow-blue-900/20">
        {total} INTERACCIONES
      </div>
      <div className="flex gap-2">
        {Object.entries(counts).map(([type, count]) => {
          if (count === 0) return null;
          const icons: any = { amen: '🙌', love: '❤️', pray: '🙏', fire: '🔥' };
          return (
            <span key={type} className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5 text-xs">
              {icons[type]} {count}
            </span>
          );
        })}
      </div>
    </div>
  );
}
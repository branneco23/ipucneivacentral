"use client";

import { useState } from "react";

interface AccordionProps {
  titulo: string;
  contenido: string[];
}

export default function Accordion({ titulo, contenido }: AccordionProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="border rounded-xl mb-4 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-4 font-semibold"
      >
        <span>{titulo}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-5 pb-4 space-y-2 text-gray-700">
          {contenido.map((item, index) => (
            <p key={index} className="text-sm text-gray-600">{item}</p>
          ))}
        </div>
      )}
    </div>
  );
}

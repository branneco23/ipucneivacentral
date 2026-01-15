import React from 'react';

// ESTO ES LO QUE FALTA:
// Next.js necesita saber qué IDs de proyectos existen para crear los archivos HTML
export async function generateStaticParams() {
  // Aquí deberías traer los IDs de tu base de datos o JSON.
  // Por ahora, pondremos unos de ejemplo para que el build no falle:
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="pt-32 p-10">
      <h1 className="text-2xl font-bold text-green-700">Detalle del Proyecto</h1>
      <p className="mt-4 text-gray-600">
        ID del Proyecto: <span className="font-mono bg-gray-100 px-2">{id}</span>
      </p>
    </div>
  );
}
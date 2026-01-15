import React from 'react';

// 1. Definimos los IDs que queremos generar estáticamente
// En producción, aquí podrías hacer un fetch a tu API
export async function generateStaticParams() {
  const ids = ['1', '2', '3']; // Ejemplo de IDs manuales
  
  return ids.map((id) => ({
    id: id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="pt-32 p-10">
      <h1 className="text-2xl font-bold text-blue-700">Detalle del Blog</h1>
      <p className="mt-4 text-gray-600">
        Viendo la entrada con ID: <span className="font-mono bg-gray-100 px-2">{id}</span>
      </p>
    </div>
  );
}
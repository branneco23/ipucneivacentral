"use client";

import Link from "next/link";
import CommitteeMembers from "@/app/Components/CommiteeMember/CommitteeMembers";
import data from '@/app/JsonData/ComitesData.json';

function Index() {
  // Extraemos las llaves del JSON para saber qué comités existen
  const nombresComites = Object.keys(data);

  return (
    <main className="bg-white">
      {/* BANNER DE ENCABEZADO */}
      <div className='section-bg text-white flex flex-col items-center justify-center min-h-[400px]'>
        <h1 className='text-6xl md:text-8xl GolosText font-black uppercase'>Comités</h1>
        
        <div className='flex items-center text-xl mt-4 bg-black/20 px-6 py-2 rounded-full backdrop-blur-sm'>
          <Link href="/" className="hover:text-blue-400 transition-all">Inicio</Link>
          <i className="ri-arrow-right-wide-fill mx-2"></i>
          <span className="opacity-70">Directivas 2026</span>
        </div>
      </div>

      {/* SECCIONES POR COMITÉ */}
      <div className="bg-white">
        {nombresComites.map((idComite) => {
          const integrantes = data[idComite as keyof typeof data];
          
          // Solo renderizamos si el comité tiene integrantes
          if (integrantes && integrantes.length > 0) {
            return (
              <CommitteeMembers 
                key={idComite} 
                integrantes={integrantes} 
                tituloComite={idComite} 
              />
            );
          }
          return null;
        })}
      </div>
    </main>
  );
}

export default Index;
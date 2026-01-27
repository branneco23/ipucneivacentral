import React from 'react';

interface Miembro {
  id: number;
  nombre: string;
  cargo: string;
  foto: string;
}

interface Props {
  integrantes: Miembro[];
  tituloComite: string;
}

const CommitteeMembers = ({ integrantes, tituloComite }: Props) => {
  return (
    <section className="py-16 border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        {/* Título del Comité */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#00338d] font-['Cal_Sans']">
            {tituloComite.replace('-', ' ')}
          </h2>
          <div className="w-24 h-1 bg-[#00338d] mx-auto mt-4"></div>
        </div>

        {/* Grid de Integrantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {integrantes.map((miembro) => {
            // Lógica para separar nombre de firma y apellido
            const nombreArray = miembro.nombre.split(' ');
            const firma = nombreArray[0];
            const apellido = nombreArray.slice(1).join(' ');

            return (
              <div 
                key={miembro.id}
                className="group relative flex flex-col h-[500px] transition-all duration-500 hover:-translate-y-4"
              >
                {/* CARGO (Superior) */}
                <div className="text-center mb-4">
                  <span className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                    {miembro.cargo}
                  </span>
                </div>

                {/* IMAGEN (Centro) */}
                <div className="relative flex-1 overflow-hidden bg-gray-100">
                  <img 
                    src={miembro.foto} 
                    alt={miembro.nombre}
                    className="absolute bottom-0 w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* BLOQUE DE NOMBRE (Inferior - Estilo Referencia) */}
                <div className="bg-[#001a41] group-hover:bg-[#00338d] p-5 text-center transition-colors duration-500">
                  <p className="text-white/60 text-[9px] tracking-widest font-bold mb-1">HNO(A).</p>
                  
                  {/* Nombre con fuente de firma (Dancing Script) */}
                  <h3 className="text-white text-3xl leading-none mb-1 italic" 
                      style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {firma}
                  </h3>
                  
                  {/* Apellido en bloque */}
                  <h4 className="text-white text-sm font-black tracking-widest uppercase font-['GolosText']">
                    {apellido}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommitteeMembers;
export default function Blog() {
  return (
    <div className="px-[8%] lg:px-[12%] py-30 pb-20 overflow-hidden">
      <div className="flex flex-col items-center justify-center"> {/* Corregido: justify-center */}
        <span className="rounded-full border border-gray-400 px-7 py-2 GolosText uppercase font-semibold text-center">
          Mantente Actualizado
        </span>
        
        <h1 className="CalSans text-center text-4xl md:text-7xl my-5 w-full lg:w-[60%]">
          Eventos <span className="text-(--prim)">Metropolitanos, Distritales, Nacionales</span> de la IPUC.
        </h1>
        
        <p className="text-center GolosText w-full text-lg lg:w-[60%] mb-10">
          Join our newsletter. Learn something new, gain access to exclusive content, and stay informed with the latest updates in the industry.
        </p>

        {/* --- CAMBIO CLAVE AQUÍ --- */}
        <div className="email-details border-b border-gray-300 w-full max-w-[450px] flex items-center transition-all duration-300 hover:border-(--prim) cursor-pointer">
          <input 
            type="email" 
            placeholder="Email address.." 
            className="focus:outline-none w-full py-3 bg-transparent" // bg-transparent por si acaso
          />
          <i className="bi bi-arrow-up-right px-2 py-1 bg-(--prim) rounded-full text-white transition-all duration-300 hover:rotate-45 shrink-0"></i>
        </div>
      </div>
    </div>
  )
}
export default function Banner() {
  return (
    <section className="relative banner h-[60vh] md:h-[85vh] flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-6">
        
        {/* Badge superior */}
        <span className="inline-block px-4 py-1.5 border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs md:text-sm tracking-[0.2em] uppercase font-bold rounded-full animate-fade-in">
          IPUC Neiva Central
        </span>

        {/* Título Principal */}
        <h1 className="text-white text-4xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight italic uppercase">
          Donde la <span className="text-blue-500 drop-shadow-sm">Bendición</span> <br /> 
          se hace Familia
        </h1>

        {/* Subtexto opcional para dar contexto */}
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl font-light leading-relaxed tracking-wide">
          "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía." - Salmos 133:1
        </p>

        {/* Botones de acción (Call to Action) */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg">
            Nuestros Servicios
          </button>
          <button className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/50 text-white font-bold rounded-lg transition-all">
            Ver Transmisión
          </button>
        </div>

      </div>
    </section>
  );
}
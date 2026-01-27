import Link from 'next/link'

export default function Footer() {
  return (
    <>
        <div className='px-[8%] lg:px-[12%] py-20 pb-0 footer relative'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-15">
                <div className="footer-content">
                    <Link href="/" className="text-3xl lg:text-5xl font-bold Audiowide text-white">
                    IPUC <span className='text-(--prim)'>Central Neiva</span>
                    </Link>
                    <h2 className='text-gray-200 text-lg my-5 GolosText'>Iglesia Pentecostal Unida de Colombia, Neiva.</h2>
                    <p className='text-gray-300 GolosText'>Sede central, barrio Altico; Calle 8 # 9-24 </p>
                </div>
                <div className="footer-content py-3">
                    <ul className='footer-links flex flex-col'>
                        <Link href="/app/UI-Components/Pages/About" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Inicio</Link>
                        <Link href="/app/UI-Components/Pages/Services" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Servicios</Link>
                        <Link href="/app/UI-Components/Pages/Directives" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directivas</Link>
                        <Link href="/app/UI-Components/Pages/Doctrine" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Doctrinas</Link>
                        <Link href="/app/UI-Components/Pages/Transmissions" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Transmisiones</Link>
                        <Link href="/app/UI-Components/Pages/Request" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Peticiones</Link>
                        <Link href="/app/UI-Components/Pages/Contact" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Blog</Link>
                        <Link href="/app/UI-Components/Pages/About" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Contactenos</Link>
                    </ul>
                </div>
                <div className="footer-content py-3">
                    <ul className='footer-links flex flex-col'>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Junta Local</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Jóvenes</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Damas Dorcas</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Escuela Dominical</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Misiones y evangelismo</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Alabanza</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Comunicaciones</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Obra Social</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Ujieres</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Intercesión</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Protemplo</Link>
                        <Link href="/" className='text-gray-300 GolosText mb-1 text-xl transition-all duration-300 hover:text-(--prim) hover:lm-2'>Directiva de Edad Dorada</Link>
                    </ul>
                </div>
                <div className='footer-content py-3 flex flex-col'>
                    <h2 className='text-3xl text-(--prim) underline CalSans mb-3'>+(57)487-6492</h2>
                    <h4 className='text-gray-300 GolosText text-2xl'>Support@example.com</h4>
                    <div className='footer-social flex gap-3 py-6 cursor-pointer'>
                        <p className='text-gray-300 GolosText transition-all duration-300 hover:text-(--prim) font-semibold hover:-translate-y-1'>Facebook</p>
                        <p className='text-gray-300 GolosText transition-all duration-300 hover:text-(--prim) font-semibold hover:-translate-y-1'>Youtube</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom flex justify-center py-8 border-t border-gray-500">
                <p className='text-gray-300 text-lg'>© Copyright 2025. Directiva de Comunicaciones, central Neiva</p>
            </div>
        </div>
    </>
  )
}

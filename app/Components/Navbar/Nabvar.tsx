"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Play, Pause, Youtube, Radio as RadioIcon, Minus, ChevronDown } from "lucide-react";

interface SubMenu {
  label: string;
  href: string;
}

interface DropdownItem {
  label: string;
  href: string;
  subMenu?: SubMenu[];
}

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/Pages/Services" },
  {
    label: "Comités",
    href: "/Comites",
    dropdown: [
      { label: "Directiva Local", href: "/Comites/directiva-local" },
      { label: "Jóvenes", href: "/Comites/jovenes" },
      { label: "Directiva de Damas (Dorcas)", href: "/Comites/damas-dorcas" },
      { label: "Directiva de Escuela Dominical", href: "/Comites/escuela-dominical" },
      { label: "Directiva de Misiones y Evangelismo", href: "/Comites/misiones" },
      { label: "Directiva de Alabanza", href: "/Comites/alabanza" },
      { label: "Directiva de Comunicaciones", href: "/Comites/comunicaciones" },
      { label: "Directiva de Obra Social", href: "/Comites/obra-social" },
      { label: "Directiva de Ujieres", href: "/Comites/ujieres" },
      { label: "Directiva de Brigadistas", href: "/Comites/brigadistas" },
      { label: "Directiva de Intercesión", href: "/Comites/intercesion" },
      { label: "Directiva de Protemplo", href: "/Comites/protemplo" },
      { label: "Directiva de Familia", href: "/Comites/familia" },
    ],
  },
  { label: "Doctrina IPUC", href: "/Blogs" },
  { label: "Transmisiones", href: "/transmision" },
  { label: "Peticiones", href: "/Pages/Peticiones" },
];

export default function RootLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [isRadioExpanded, setIsRadioExpanded] = useState(false); 
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUrl = "https://play14.tikast.com:22038/stream"; 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const togglePlayRadio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); 
    if (!audioRef.current) return;

    if (isRadioPlaying) {
      audioRef.current.pause();
      setIsRadioPlaying(false);
    } else {
      const allVideos = document.querySelectorAll("video");
      allVideos.forEach((video) => video.pause());
      audioRef.current.load(); 
      audioRef.current.play().catch((err) => console.error(err));
      setIsRadioPlaying(true);
    }
  };

  const midPoint = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, midPoint);
  const rightLinks = navLinks.slice(midPoint);

  return (
    <>
      <nav
        style={{ fontFamily: "var(--GolosText)" }}
        className={`fixed top-0 left-0 w-full transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-[#00338d]/95 backdrop-blur-lg py-2 shadow-xl border-b border-white/10 z-[150]"
            : "bg-slate-50/90 backdrop-blur-md py-4 border-b border-slate-200/40 shadow-xs z-[150]"
        }`}
      >
        {/* VISTA ESCRITORIO (LG) */}
        <div className="hidden lg:block max-w-7xl mx-auto px-6">
          <div className="relative flex items-center justify-between min-h-[64px]">
            
            {/* ESTRUCTURA 1: CUANDO ESTÁ ARRIBA */}
            <div className={`w-full flex items-center justify-between transition-all duration-500 ${
              isScrolled ? "opacity-0 pointer-events-none absolute inset-0 scale-95" : "opacity-100 pointer-events-auto relative"
            }`}>
              <div className="flex items-center gap-2 xl:gap-4 w-[40%] justify-end">
                {leftLinks.map((link) => (
                  <NavLinkRender key={link.label} link={link} isScrolled={isScrolled} />
                ))}
              </div>

              <div className="w-[20%] flex justify-center relative z-50">
                <Link href="/" className="absolute -top-12 flex flex-col items-center group">
                  <div className="rounded-full p-4 bg-slate-50/90 backdrop-blur-md border border-slate-200/40 shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:scale-105">
                    <Image
                      src="https://res.cloudinary.com/dbbzk99pj/image/upload/v1780514429/logo_ipuc_texto_negro_ff9crx.webp"
                      alt="Logo IPUC"
                      width={180}
                      height={180}
                      className="w-24 h-24 md:w-28 md:h-28 object-contain"
                      priority
                    />
                  </div>
                </Link>
              </div>

              <div className="flex items-center gap-2 xl:gap-4 w-[40%] justify-start">
                {rightLinks.map((link) => (
                  <NavLinkRender key={link.label} link={link} isScrolled={isScrolled} />
                ))}
              </div>
            </div>

            {/* ESTRUCTURA 2: CUANDO SE HACE SCROLL */}
            <div className={`w-full flex items-center justify-between transition-all duration-500 ${
              isScrolled ? "opacity-100 pointer-events-auto relative" : "opacity-0 pointer-events-none absolute inset-0 scale-95"
            }`}>
              <Link href="/" className="flex items-center gap-3 group relative z-50">
                <div className="rounded-full p-1.5 bg-white shadow-md border border-slate-100 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0">
                  <Image 
                    src="https://res.cloudinary.com/dbbzk99pj/image/upload/v1780514429/logo_ipuc_texto_negro_ff9crx.webp" 
                    alt="Logo IPUC" 
                    width={56} 
                    height={56} 
                    className="w-11 h-11 object-contain" 
                  />
                </div>
                <div className="leading-tight text-white">
                  <h1 className="text-base font-black tracking-wider">IPUC</h1>
                  <span className="text-[9px] font-bold text-blue-200 tracking-widest block uppercase">NEIVA CENTRAL</span>
                </div>
              </Link>

              <div className="flex items-center gap-1 xl:gap-2">
                {navLinks.map((link) => (
                  <NavLinkRender key={link.label} link={link} isScrolled={isScrolled} />
                ))}
                <Link
                  href="https://wa.me/573125444740"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <i className="ri-whatsapp-line text-sm"></i> Contáctenos
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* VISTA MÓVIL */}
        <div className="lg:hidden max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 z-[160] relative">
            <div className="rounded-full p-1.5 bg-white border border-slate-200 shadow-md flex items-center justify-center translate-y-0.5">
              <Image 
                src="https://res.cloudinary.com/dbbzk99pj/image/upload/v1780514429/logo_ipuc_texto_negro_ff9crx.webp" 
                alt="Logo IPUC" 
                width={50} 
                height={50} 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="leading-tight">
              <h1 className={`text-base font-black transition-colors ${isScrolled ? "text-white" : "text-slate-800"}`}>IPUC</h1>
              <span className={`text-[9px] font-bold tracking-wider block uppercase ${isScrolled ? "text-blue-200" : "text-slate-400"}`}>NEIVA CENTRAL</span>
            </div>
          </Link>

          <button
            className={`p-2 rounded-lg transition-colors z-[160] text-2xl ${isScrolled ? "text-white bg-white/10" : "text-slate-800 bg-slate-200/60"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-4-line"}></i>
          </button>
        </div>

        {/* CONTENEDOR DESPLEGABLE DEL MENÚ MÓVIL */}
        <div
          className={`fixed inset-x-0 top-[64px] bottom-0 w-full h-[calc(100vh-64px)] z-[140] lg:hidden transition-all duration-500 ease-in-out border-t border-white/5 overflow-y-auto ${
            isMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          } ${isScrolled ? "bg-[#00338d]/98 backdrop-blur-xl" : "bg-white shadow-2xl"}`}
        >
          <div className="px-6 py-8 flex flex-col gap-2">
            {navLinks.map((link) => {
              const hasDropdown = !!link.dropdown;
              const isDropdownOpen = openDropdown === link.label;

              return (
                <div key={link.label} className="border-b border-slate-100/10 last:border-0 py-1">
                  {hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : link.label)}
                        className={`w-full flex items-center justify-between py-3 font-bold text-left text-lg ${
                          isScrolled ? "text-white" : "text-slate-800"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      <div
                        className={`grid transition-all duration-300 ease-in-out pl-4 overflow-hidden ${
                          isDropdownOpen ? "grid-rows-[1fr] opacity-100 mt-2 mb-4" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden flex flex-col gap-2.5 border-l-2 border-blue-500/30 pl-3">
                          {link.dropdown?.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={`text-sm py-1 transition-colors ${
                                isScrolled ? "text-slate-200 hover:text-white" : "text-slate-600 hover:text-blue-700"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3 font-bold text-lg transition-colors ${
                        isScrolled ? "text-white hover:text-blue-200" : "text-slate-800 hover:text-blue-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}

            <Link
              href="https://wa.me/573125444740"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="mt-6 w-full bg-green-500 text-white hover:bg-green-600 py-4 rounded-xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-2"
            >
              <i className="ri-whatsapp-line text-lg"></i> Contáctenos
            </Link>
          </div>
        </div>
      </nav>

      {/* REPRODUCTOR DE RADIO FLOTANTE */}
      <div className="fixed bottom-6 right-6 z-[200]">
        <button
          onClick={() => setIsRadioExpanded(true)}
          className={`absolute bottom-0 right-0 w-16 h-16 rounded-full bg-[#00338d] text-white flex flex-col items-center justify-center shadow-lg transition-all duration-500 ease-out origin-bottom-right hover:scale-105 z-10 ${
            isRadioExpanded ? "opacity-0 pointer-events-none scale-75" : "opacity-100 pointer-events-auto scale-100"
          }`}
        >
          <RadioIcon size={22} className={`${isRadioPlaying ? 'animate-pulse' : ''}`} />
          {isRadioPlaying ? (
            <div className="flex items-end gap-0.5 h-3 mt-1 justify-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-0.5 bg-yellow-400 rounded-full animate-equalizer" style={{ animationDelay: `${i * 0.15}s`, height: '100%' }} />
              ))}
            </div>
          ) : (
            <span className="text-[8px] font-bold tracking-tight mt-0.5 uppercase opacity-70">Radio</span>
          )}
        </button>

        <div className={`bg-[#0f172a] text-white p-5 rounded-2xl shadow-2xl border border-gray-800 w-72 md:w-80 transition-all duration-500 ease-out origin-bottom-right ${isRadioExpanded ? "opacity-100 scale-100 pointer-events-auto relative" : "opacity-0 scale-75 pointer-events-none absolute bottom-0 right-0"}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
                <RadioIcon size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">RADIO IPUC</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{isRadioPlaying ? 'En Directo' : 'En Pausa'}</p>
              </div>
            </div>
            <button onClick={() => setIsRadioExpanded(false)} className="p-1.5 rounded-lg bg-gray-800/60 text-gray-400 hover:text-white"><Minus size={16} /></button>
          </div>
          <div className="flex items-end gap-1 h-10 mb-5 justify-center px-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`w-1.5 bg-yellow-400 rounded-full transition-all ${isRadioPlaying ? 'animate-equalizer' : 'h-1.5'}`} style={{ animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
          <button onClick={togglePlayRadio} className={`w-full flex items-center justify-center gap-3 font-bold py-3.5 rounded-xl transition-all ${isRadioPlaying ? 'bg-red-500/10 text-red-500 border border-red-500/50' : 'bg-white text-[#0f172a]'}`}>
            {isRadioPlaying ? <><Pause size={18} fill="currentColor" /> DETENER</> : <><Play size={18} fill="currentColor" /> ESCUCHAR EN VIVO</>}
          </button>
          <audio ref={audioRef} src={audioUrl} preload="none" />
        </div>
      </div>
    </>
  );
}

{/* COMPONENTE NAVLINKRENDER OPTIMIZADO PARA ESCRITORIO CON DROPDOWN INCLUIDO */}
function NavLinkRender({ link, isScrolled }: { link: NavLink; isScrolled: boolean }) {
  const hasDropdown = !!link.dropdown;

  return (
    <div className="relative group py-3">
      <Link
        href={link.href}
        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm xl:text-base font-bold transition-all duration-300 ${
          isScrolled
            ? "text-white/90 hover:text-white hover:bg-white/10"
            : "text-slate-700 hover:text-[#00338d] hover:bg-slate-200/60"
        }`}
      >
        <span>{link.label}</span>
        {hasDropdown && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
      </Link>

      {/* RENDERIZADO DEL SUBMENÚ AL PASAR EL MOUSE */}
      {hasDropdown && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 opacity-0 pointer-events-none scale-95 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 transition-all duration-300 z-[200]">
          <div
            className={`w-64 py-2 rounded-xl shadow-2xl border backdrop-blur-xl ${
              isScrolled
                ? "bg-[#00338d]/98 border-white/10 text-white"
                : "bg-white/95 border-slate-100 text-slate-800"
            }`}
          >
            {link.dropdown?.map((subItem) => (
              <Link
                key={subItem.label}
                href={subItem.href}
                className={`block px-4 py-2 text-xs font-semibold transition-all ${
                  isScrolled
                    ? "hover:bg-white/10 text-slate-100 hover:text-white"
                    : "hover:bg-slate-50 text-slate-600 hover:text-[#00338d]"
                }`}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
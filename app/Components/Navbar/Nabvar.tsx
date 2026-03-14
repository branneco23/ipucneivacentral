"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/* =====================
    TIPOS (Interfaces)
===================== */
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

/* =====================
    CONFIGURACIÓN DE LINKS
===================== */
const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/Pages/Services" },
  {
    label: "Comites",
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
      { label: "Directiva de Intercesión", href: "/Comites/intercesion" },
      { label: "Directiva de Protemplo", href: "/Comites/protemplo" },
      { label: "Directiva de Familia", href: "/Comites/familia" },
    ],
  },
  { label: "Doctrina IPUC", href: "/Blogs" },
  // RUTA CORREGIDA PARA TU NUEVA PÁGINA:
  { label: "Transmisiones", href: "/transmision" },
  { label: "Peticiones", href: "/Pages/Peticiones" },
];

/* =====================
    COMPONENTE NAVBAR
===================== */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estados para controlar qué menús están abiertos en móvil
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  /* Efecto de Scroll para cambiar el fondo */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(prev => (prev === label ? null : label));
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(prev => (prev === label ? null : label));
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled
          ? "bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 py-2 shadow-lg"
          : "bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 py-3"
          }`}
      >
        <div className="flex items-center justify-between px-[4%] lg:px-[6%]">
          {/* SECCIÓN LOGO */}
          <Link href="/" className="flex items-center gap-3 z-[110]">
            <div className="rounded-2xl p-2 bg-gradient-to-b from-slate-50 via-white to-slate-200 border border-white/70 shadow-[inset_0_2px_6px_rgba(0,0,0,0.15),0_6px_14px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out hover:shadow-[inset_0_1px_3px_rgba(0,0,0,0.12),0_10px_20px_rgba(0,0,0,0.35)] hover:-translate-y-[1px]">
              <Image
                src="/img/logo.png"
                alt="Logo IPUC"
                width={350}
                height={350}
                className="w-14 h-14 lg:w-24 lg:h-24"
                priority
              />
            </div>
            <div className="leading-tight">
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white">CENTRAL</h1>
              <span className="text-blue-200 text-sm lg:text-lg font-bold uppercase block">
                SEDE - NEIVA
              </span>
            </div>
          </Link>

          {/* BOTÓN HAMBURGUESA (Móvil) */}
          <button
            className="lg:hidden text-white text-4xl z-[110]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
          </button>

          {/* MENÚ DESKTOP */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-xl font-semibold text-white hover:text-blue-200 transition-colors"
                >
                  {link.label}
                  {link.dropdown && <i className="ri-arrow-down-s-line text-sm"></i>}
                </Link>

                {/* Dropdown Desktop */}
                {link.dropdown && (
                  <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white rounded-xl shadow-2xl min-w-[320px] py-3">
                      {link.dropdown.map((item) => (
                        <div key={item.label} className="relative group/sub">
                          <Link
                            href={item.href}
                            className="flex justify-between px-5 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
                          >
                            {item.label}
                            {item.subMenu && <i className="ri-arrow-right-s-line"></i>}
                          </Link>

                          {/* Submenu Desktop */}
                          {item.subMenu && (
                            <div className="absolute left-full top-0 pl-2 opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 transition-all duration-300">
                              <div className="bg-white rounded-xl shadow-2xl min-w-[260px] py-3">
                                {item.subMenu.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    className="block px-5 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Botón WhatsApp Actualizado */}
            <Link
              href="https://wa.me/573125444740?text=Hola!%20Te%20Gustaría%20Darnos%20Tu%20Recomendación."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-8 py-3 rounded-full font-black text-xl shadow-xl hover:scale-105 transition active:scale-95 flex items-center justify-center"
            >
              <i className="ri-whatsapp-line mr-2 text-2xl"></i> Contáctenos
            </Link>
          </div>
        </div>

        {/* MÓVIL: FONDO OSCURECIDO (Overlay) */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-900/60 lg:hidden transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* MÓVIL: SIDEBAR */}
        <div
          className={`fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[120] transform transition-transform duration-500 lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-8 pt-28 flex flex-col gap-6 overflow-y-auto h-full">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <Link
                    href={link.href}
                    className="text-2xl font-bold text-slate-800"
                    onClick={() => !link.dropdown && setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>

                  {link.dropdown && (
                    <button onClick={() => toggleDropdown(link.label)} className="p-2">
                      <i className={openDropdown === link.label ? "ri-subtract-line" : "ri-add-line"}></i>
                    </button>
                  )}
                </div>

                {/* Dropdown Móvil */}
                {link.dropdown && openDropdown === link.label && (
                  <div className="pl-4 mt-4 flex flex-col gap-3 animate-fadeIn">
                    {link.dropdown.map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between items-center">
                          <Link
                            href={item.href}
                            className="text-slate-600 font-medium"
                            onClick={() => !item.subMenu && setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>

                          {item.subMenu && (
                            <button onClick={() => toggleSubmenu(item.label)} className="p-2">
                              <i className={openSubmenu === item.label ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}></i>
                            </button>
                          )}
                        </div>

                        {/* Submenu Móvil */}
                        {item.subMenu && openSubmenu === item.label && (
                          <div className="pl-4 mt-2 border-l-2 border-blue-100 flex flex-col gap-2">
                            {item.subMenu.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                className="text-slate-500 py-1"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/contacto"
              className="mt-6 bg-blue-700 text-white py-5 rounded-2xl text-center font-black text-xl shadow-lg active:bg-blue-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="ri-whatsapp-line mr-2"></i> Contáctenos
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
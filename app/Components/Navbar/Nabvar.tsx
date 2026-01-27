"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/* =====================
   TIPOS
===================== */
type SubMenu = { label: string; href: string };
type DropdownItem = { label: string; href: string; subMenu?: SubMenu[] };
type NavLink = { label: string; href: string; dropdown?: DropdownItem[] };

/* =====================
   LINKS (SIN QUITAR NADA)
===================== */
const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/UI-Components/Pages/Services" },
  {
    label: "Comites",
    href: "/UI-Components/Projects",
    dropdown: [
      { label: "Directiva Local", href: "/UI-Components/Projects" },
      { label: "Jóvenes", href: "/UI-Components/Projects" },
      { label: "Directiva de Damas (Dorcas)", href: "/UI-Components/Projects" },
      { label: "Directiva de Escuela Dominical", href: "/UI-Components/Projects"},
      { label: "Directiva de Misiones y Evangelismo", href: "/UI-Components/Projects"},
      { label: "Directiva de Alabanza", href: "/UI-Components/Projects" },
      { label: "Directiva de Comunicaciones", href: "/UI-Components/Projects"},
      { label: "Directiva de Obra Social", href: "/UI-Components/Projects" },
      { label: "Directiva de Ujieres", href: "/UI-Components/Projects" },
      { label: "Directiva de Intercesión", href: "/UI-Components/Projects" },
      { label: "Directiva de Protemplo", href: "/UI-Components/Projects" },
      { label: "Directiva de Edad Dorada", href: "/UI-Components/Projects" },
    ],
  },
  {
    label: "Doctrina IPUC",
    href: "/UI-Components/Blogs",
    dropdown: [{ label: "Blog", href: "/UI-Components/Blogs" }],
  },
  { label: "Transmisiones", href: "/" },
  { label: "Peticiones", href: "/" },
];

/* =====================
   COMPONENTE
===================== */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // estados separados (clave del arreglo)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  /* Scroll */
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

  /* =====================
     RENDER
  ===================== */
  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled ? "bg-blue-800 py-2 shadow-lg" : "bg-blue-700 py-3"
        }`}
      >
        <div className="flex items-center justify-between px-[4%] lg:px-[6%]">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 z-[110]">
            <Image
              src="/img/logo.png"
              alt="Logo IPUC"
              width={300}
              height={300}
              className="w-14 h-14 lg:w-24 lg:h-24"
            />
            <div className="leading-tight">
              <h1 className="text-2xl lg:text-5xl font-extrabold text-white">
                IPUC
              </h1>
              <span className="text-blue-200 text-sm lg:text-xl font-bold uppercase">
                Neiva Central
              </span>
            </div>
          </Link>

          {/* HAMBURGER */}
          <button
            className="lg:hidden text-white text-4xl z-[110]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-xl font-semibold text-white hover:text-blue-200"
                >
                  {link.label}
                  {link.dropdown && <i className="ri-arrow-down-s-line text-sm"></i>}
                </Link>

                {link.dropdown && (
                  <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all">
                    <div className="bg-white rounded-xl shadow-2xl min-w-[320px] py-3">
                      {link.dropdown.map(item => (
                        <div key={item.label} className="relative group/sub">
                          <Link
                            href={item.href}
                            className="flex justify-between px-5 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
                          >
                            {item.label}
                            {item.subMenu && <i className="ri-arrow-right-s-line"></i>}
                          </Link>

                          {item.subMenu && (
                            <div className="absolute left-full top-0 pl-2 opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 transition-all">
                              <div className="bg-white rounded-xl shadow-2xl min-w-[260px] py-3">
                                {item.subMenu.map(sub => (
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

            <Link
              href="/contacto"
              className="bg-white text-blue-700 px-8 py-3 rounded-full font-black text-xl shadow-xl hover:scale-105 transition"
            >
              <i className="ri-whatsapp-line mr-2"></i> Contáctenos
            </Link>
          </div>
        </div>

        {/* MOBILE OVERLAY */}
        <div
          className={`fixed inset-0 bg-slate-900/60 lg:hidden transition ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* MOBILE SIDEBAR */}
        <div
          className={`fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[120] transform transition-transform duration-500 lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-8 pt-28 flex flex-col gap-6">
            {navLinks.map(link => (
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
                    <button onClick={() => toggleDropdown(link.label)}>
                      <i
                        className={
                          openDropdown === link.label
                            ? "ri-subtract-line"
                            : "ri-add-line"
                        }
                      ></i>
                    </button>
                  )}
                </div>

                {link.dropdown && openDropdown === link.label && (
                  <div className="pl-4 mt-4 flex flex-col gap-3">
                    {link.dropdown.map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between items-center">
                          <Link
                            href={item.href}
                            className="text-slate-600"
                            onClick={() => !item.subMenu && setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>

                          {item.subMenu && (
                            <button onClick={() => toggleSubmenu(item.label)}>
                              <i
                                className={
                                  openSubmenu === item.label
                                    ? "ri-arrow-up-s-line"
                                    : "ri-arrow-down-s-line"
                                }
                              ></i>
                            </button>
                          )}
                        </div>

                        {item.subMenu && openSubmenu === item.label && (
                          <div className="pl-4 mt-2 border-l flex flex-col gap-2">
                            {item.subMenu.map(sub => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                className="text-slate-500"
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
              className="mt-6 bg-blue-700 text-white py-5 rounded-2xl text-center font-black text-xl"
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

import React from 'react';

// 1. Definición de la Interface para Blogs
export interface BlogPost {
  readonly id: string;
  readonly image: string;
  readonly imageDet: string;
  readonly tag: string;
  readonly postby: string;
  readonly date: string;
  readonly title: string;
  readonly desc: string;
}

// 2. Ruta base para imágenes (Centralizada para fácil mantenimiento)
const BLOG_IMG_PATH = "/img";
const DEFAULT_AUTHOR = "Comunicaciones IPUC";
const DEFAULT_DESC = "Explora cómo el diseño y la organización de nuestros espacios pueden reflejar la armonía y el propósito en nuestra vida cotidiana. Un enfoque moderno para el bienestar integral.";

export const BLOG_DATA: readonly BlogPost[] = [
  {
    id: "1",
    image: `${BLOG_IMG_PATH}/blog-1.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-1.jpg`,
    tag: "Vida Cristiana",
    postby: DEFAULT_AUTHOR,
    date: "Junio 2, 2025",
    title: "Tendencias de Diseño que Unen Estilo y Comodidad",
    desc: "El diseño moderno busca crear espacios funcionales que reflejen un estilo de vida contemporáneo y organizado."
  },
  {
    id: "2",
    image: `${BLOG_IMG_PATH}/blog-2.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-2.jpg`,
    tag: "Bienestar",
    postby: "Admin",
    date: "Junio 3, 2025",
    title: "Ideas Innovadoras para Refrescar tu Espacio Vital",
    desc: "Pequeños cambios en nuestro entorno pueden generar grandes impactos en nuestra paz mental y productividad."
  },
  {
    id: "3",
    image: `${BLOG_IMG_PATH}/blog-3.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-3.jpg`,
    tag: "Hogar",
    postby: DEFAULT_AUTHOR,
    date: "Junio 4, 2025",
    title: "Transforma tu Hogar con un Diseño Interior Moderno",
    desc: "Cómo adaptar los conceptos de arquitectura moderna para crear un ambiente acogedor y espiritual."
  },
  {
    id: "4",
    image: `${BLOG_IMG_PATH}/blog-4.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-4.jpg`,
    tag: "Arquitectura",
    postby: "Admin",
    date: "Junio 5, 2025",
    title: "Eleva Cada Rincón con Conceptos de Diseño Elegantes",
    desc: DEFAULT_DESC
  },
  {
    id: "5",
    image: `${BLOG_IMG_PATH}/blog-5.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-5.jpg`,
    tag: "Diseño",
    postby: DEFAULT_AUTHOR,
    date: "Junio 6, 2025",
    title: "El Arte del Espacio: Diseños Inteligentes para la Vida",
    desc: DEFAULT_DESC
  },
  {
    id: "6",
    image: `${BLOG_IMG_PATH}/blog-6.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-6.jpg`,
    tag: "Estilo",
    postby: "Admin",
    date: "Junio 6, 2025",
    title: "Conceptos de Interiorismo para Ambientes Sofisticados",
    desc: DEFAULT_DESC
  },
  {
    id: "7",
    image: `${BLOG_IMG_PATH}/blog-7.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-7.jpg`,
    tag: "Armonía",
    postby: DEFAULT_AUTHOR,
    date: "Junio 12, 2025",
    title: "Diseñando Armonía: Donde la Arquitectura se Encuentra",
    desc: DEFAULT_DESC
  },
  {
    id: "8",
    image: `${BLOG_IMG_PATH}/blog-8.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-8.jpg`,
    tag: "Creatividad",
    postby: "Admin",
    date: "Junio 6, 2025",
    title: "Optimizando la Luz Natural en Espacios Pequeños",
    desc: DEFAULT_DESC
  },
  {
    id: "9",
    image: `${BLOG_IMG_PATH}/blog-9.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-9.jpg`,
    tag: "Minimalismo",
    postby: DEFAULT_AUTHOR,
    date: "Junio 6, 2025",
    title: "Menos es Más: La Guía del Minimalismo Práctico",
    desc: DEFAULT_DESC
  },
  {
    id: "10",
    image: `${BLOG_IMG_PATH}/blog-10.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-10.jpg`,
    tag: "Decoración",
    postby: "Admin",
    date: "Junio 6, 2025",
    title: "Colores que Inspiran: Psicología del Color en el Hogar",
    desc: DEFAULT_DESC
  },
  {
    id: "11",
    image: `${BLOG_IMG_PATH}/blog-11.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-11.jpg`,
    tag: "Innovación",
    postby: DEFAULT_AUTHOR,
    date: "Junio 6, 2025",
    title: "Nuevos Materiales para un Diseño Sostenible",
    desc: DEFAULT_DESC
  },
  {
    id: "12",
    image: `${BLOG_IMG_PATH}/blog-12.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-12.jpg`,
    tag: "Cultura",
    postby: "Admin",
    date: "Junio 6, 2025",
    title: "Integración de Espacios Verdes en el Interior",
    desc: DEFAULT_DESC
  },
  {
    id: "13",
    image: `${BLOG_IMG_PATH}/blog-13.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-13.jpg`,
    tag: "Mobiliario",
    postby: DEFAULT_AUTHOR,
    date: "Junio 6, 2025",
    title: "Muebles con Historia: Funcionalidad y Estética",
    desc: DEFAULT_DESC
  },
  {
    id: "14",
    image: `${BLOG_IMG_PATH}/blog-14.jpg`,
    imageDet: `${BLOG_IMG_PATH}/blog-14.jpg`,
    tag: "Tendencias",
    postby: "Admin",
    date: "Junio 6, 2025",
    title: "El Futuro del Diseño de Interiores en 2026",
    desc: DEFAULT_DESC
  }
];
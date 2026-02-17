import React from 'react';

// 1. Interface robusta
export interface ParalexItem {
  id: number;
  tag: string;
  number: string;
  title: React.ReactNode; // Permite strings o etiquetas <br />
  location: string;
  hours: string;
  year: string;           // Nombre más descriptivo que 'hours'
  bg: string;
}

// 2. Constante de prefijo para imágenes (Evita repetir /img/ en cada objeto)
const IMG_PATH = "/img";

export const PARALEX_DATA: readonly ParalexItem[] = [
  {
    id: 1,
    tag: "Devocional",
    number: "01",
    title: "Un Clamor por Nuestros Hijos",
    location: "Vía Plataforma Meet",
    hours: "04:30",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1770060544/Paralex-1_kktfg8.jpg`,
  },
  {
    id: 2,
    tag: "Evangelismo",
    number: "02",
    title: "Gran Impacto Evangelístico",
    location: "Diferentes Sectores",
    hours: "18:30",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1770060546/Paralex-2_vhpjbj.png`,
  },
  {
    id: 3,
    tag: "Protemplo",
    number: "03",
    title: "Culto Dirigido por Protemplo",
    location: "Sede Central de Neiva",
    hours: "19:00",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1770060547/Paralex-3_tkkcnx.png`,
  },
  {
    id: 4,
    tag: "Obra Social",
    number: "04",
    title: "Culto Dirigido por Obra Social",
    location: "Sede Central de Neiva",
    hours: "19:00",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1770060546/Paralex-4_llcpey.jpg`,
  },
  {
    id: 5,
    tag: "Misiones",
    number: "05",
    title: "Día Misionero",
    location: "Sede Central de Neiva",
    hours: "09:30",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1770060545/Paralex-5_jawrse.jpg`,
  },
];

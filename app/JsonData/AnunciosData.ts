import React from 'react';

// 1. Interface robusta
export interface ParalexItem {
  id: number;
  tag: string;
  number: string;
  title: React.ReactNode; // Permite strings o etiquetas <br />
  location: string;
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
    year: "2026",
    bg: `${IMG_PATH}/Paralex-1.jpg`,
  },
  {
    id: 2,
    tag: "Evangelismo",
    number: "02",
    title: "Gran Impacto Evangelístico",
    location: "Diferentes Sectores",
    year: "2026",
    bg: `${IMG_PATH}/Paralex-2.jpg`,
  },
  {
    id: 3,
    tag: "Protemplo",
    number: "03",
    title: "Culto Dirigido por Protemplo",
    location: "Sede Central de Neiva",
    year: "2026",
    bg: `${IMG_PATH}/Paralex-3.jpg`,
  },
  {
    id: 4,
    tag: "Obra Social",
    number: "04",
    title: "Culto Dirigido por Obra Social",
    location: "Sede Central de Neiva",
    year: "2026",
    bg: `${IMG_PATH}/Paralex-4.jpg`,
  },
  {
    id: 5,
    tag: "Misiones",
    number: "05", // Corregido de 04 a 05
    title: "Día Misionero",
    location: "Sede Central de Neiva",
    year: "2026",
    bg: `${IMG_PATH}/Paralex-5.jpg`,
  },
];

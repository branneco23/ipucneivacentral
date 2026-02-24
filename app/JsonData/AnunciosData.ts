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
    tag: "Misiones",
    number: "04",
    title: "Campaña Evangelística al Parque",
    location: "Zona Parque Santander",
    hours: "02:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771936479/WhatsApp_Image_2026-02-23_at_8.29.29_AM_pmudrc.jpg`,
  },
  {
    id: 2,
    tag: "Escuela Dominical",
    number: "04",
    title: "Culto de Escuela Dominical",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771936479/WhatsApp_Image_2026-02-23_at_7.38.23_AM_dnj1fk.jpg`,
  },
  {
    id: 3,
    tag: "Junta Local",
    number: "04",
    title: "Escuela de Formación de Líderes",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771936479/WhatsApp_Image_2026-02-23_at_8.29.28_AM_geenkq.jpg`,
  },
];

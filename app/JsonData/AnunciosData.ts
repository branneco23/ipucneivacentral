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
    tag: "Escuela Dominical",
    number: "01",
    title: "Culto de Escuela Dominical",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771936479/WhatsApp_Image_2026-02-23_at_7.38.23_AM_dnj1fk.jpg`,
  },
  {
    id: 2,
    tag: "Junta Local",
    number: "02",
    title: "Escuela de Formación de Líderes",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771936479/WhatsApp_Image_2026-02-23_at_8.29.28_AM_geenkq.jpg`,
  },
  {
    id: 3,
    tag: "Protemplo",
    number: "04",
    title: "Culto Dirigido Por Protemplo",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772562920/ChatGPT_Image_3_mar_2026_13_34_29_bqy7rp.png`,
  },
  {
    id: 4,
    tag: "Damas Dorcas",
    number: "04",
    title: "Gran Encuentro De Mujeres",
    location: "En Nuestro Templo",
    hours: "03:30pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772643481/WhatsApp_Image_2026-03-04_at_11.57.03_AM_hmbfon.jpg`,
  },
];

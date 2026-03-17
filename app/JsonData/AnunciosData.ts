import React from "react";

// 1. Interface robusta
export interface ParalexItem {
  id: number;
  tag: string;
  number: string;
  title: React.ReactNode; // Permite strings o etiquetas <br />
  location: string;
  hours: string;
  year: string; // Nombre más descriptivo que 'hours'
  bg: string;
}

// 2. Constante de prefijo para imágenes (Evita repetir /img/ en cada objeto)
const IMG_PATH = "/img";

export const PARALEX_DATA: readonly ParalexItem[] = [
  {
    id: 1,
    tag: "Directiva de Obra Social",
    number: "01",
    title: "Marcha del Mercado",
    location: "En Nuestro Templo",
    hours: "09:30am",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773766020/WhatsApp_Image_2026-03-17_at_10.36.50_AM_smavy8.jpg`,
  },
  {
    id: 1,
    tag: "Directiva de Misiones y Evangelismo",
    number: "01",
    title: "Culto Misionero",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773744257/WhatsApp_Image_2026-03-17_at_4.57.41_AM_panmvx.jpg`,
  },
  {
    id: 2,
    tag: "Directiva de Jóvenes",
    number: "02",
    title: "Culto Juvenil",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773629727/WhatsApp_Image_2026-03-14_at_11.44.18_AM_lovdsa.jpg`,
  },
  {
    id: 3,
    tag: "Directiva de Jóvenes",
    number: "03",
    title: "Coloreados por su gracia",
    location: "En Nuestro Templo",
    hours: "04:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773629728/WhatsApp_Image_2026-03-14_at_11.44.18_AM_1_llxo1m.jpg`,
  },
  {
    id: 4,
    tag: "Brigadistas, Ujieres, Escuela Dominical e Iglesia",
    number: "04",
    title: "Damas Dorcas",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773541831/WhatsApp_Image_2026-03-14_at_1.27.31_PM_silcqi.jpg`,
  },
  {
    id: 5,
    tag: "Brigadistas, Ujieres, Escuela Dominical e Iglesia",
    number: "05",
    title: "Brigadistas",
    location: "En Nuestro Templo",
    hours: "03:30pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773510246/WhatsApp_Image_2026-03-13_at_5.45.30_PM_enzkzv.jpg`,
  },
  {
    id: 6,
    tag: "Escuela Dominical",
    number: "06",
    title: "Día Del Denario",
    location: "En Nuestro Templo",
    hours: "09:30pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772966688/WhatsApp_Image_2026-03-07_at_10.08.43_PM_rpfrht.jpg`,
  },
  {
    id: 7,
    tag: "Damas Dorcas",
    number: "07",
    title: "Gran Ecuentro De Mujeres",
    location: "En Nuestro Templo",
    hours: "03:30pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772966688/WhatsApp_Image_2026-03-06_at_9.31.14_AM_ae8zwg.jpg`,
  },  
];

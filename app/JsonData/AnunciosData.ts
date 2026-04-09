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
    tag: "Misiones Infantiles",
    number: "01",
    title: "Niños En La Misión",
    location: "En Nuestro Templo",
    hours: "",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1775748029/WhatsApp_Image_2026-04-08_at_7.14.31_PM_kjrxvr.jpg`,
  },
  {
    id: 2,
    tag: "Esfol",
    number: "02",
    title: "Escuela De Formación Para Lideres",
    location: "En Nuestro Templo",
    hours: "07:30pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1775748029/WhatsApp_Image_2026-04-07_at_6.32.28_AM_fbeuqm.jpg`,
  },
  {
    id: 3,
    tag: "Damas Dorcas",
    number: "03",
    title: "Directiva de Obra Social",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1775748029/WhatsApp_Image_2026-04-07_at_2.59.26_PM_czmvmd.jpg`,
  },
  {
    id: 4,
    tag: "Directiva de Obra Social",
    number: "04",
    title: "Marcha del Mercado",
    location: "En Nuestro Templo",
    hours: "09:30am",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773766020/WhatsApp_Image_2026-03-17_at_10.36.50_AM_smavy8.jpg`,
  },
  {
    id: 5,
    tag: "Directiva de Misiones y Evangelismo",
    number: "05",
    title: "Culto Misionero",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773744257/WhatsApp_Image_2026-03-17_at_4.57.41_AM_panmvx.jpg`,
  },
  {
    id: 6,
    tag: "Directiva de Jóvenes",
    number: "06",
    title: "Culto Juvenil",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773629727/WhatsApp_Image_2026-03-14_at_11.44.18_AM_lovdsa.jpg`,
  },
  {
    id: 7,
    tag: "Directiva de Jóvenes",
    number: "07",
    title: "Coloreados por su gracia",
    location: "En Nuestro Templo",
    hours: "04:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773629728/WhatsApp_Image_2026-03-14_at_11.44.18_AM_1_llxo1m.jpg`,
  },
  {
    id: 8,
    tag: "Brigadistas, Ujieres, Escuela Dominical e Iglesia",
    number: "08",
    title: "Damas Dorcas",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773541831/WhatsApp_Image_2026-03-14_at_1.27.31_PM_silcqi.jpg`,
  },
  {
    id: 9,
    tag: "Brigadistas, Ujieres, Escuela Dominical e Iglesia",
    number: "09",
    title: "Brigadistas",
    location: "En Nuestro Templo",
    hours: "03:30pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773510246/WhatsApp_Image_2026-03-13_at_5.45.30_PM_enzkzv.jpg`,
  },
];

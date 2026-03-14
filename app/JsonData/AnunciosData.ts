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
    tag: "Brigadistas, Ujieres, Escuela Dominical e Iglesia",
    number: "06",
    title: "Brigadistas",
    location: "En Nuestro Templo",
    hours: "03:30pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773510246/WhatsApp_Image_2026-03-13_at_5.45.30_PM_enzkzv.jpg`,
  },
  {
    id: 2,
    tag: "Escuela Dominical",
    number: "05",
    title: "Día Del Denario",
    location: "En Nuestro Templo",
    hours: "09:30pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772966688/WhatsApp_Image_2026-03-07_at_10.08.43_PM_rpfrht.jpg`,
  },
  {
    id: 3,
    tag: "Damas Dorcas",
    number: "04",
    title: "Gran Ecuentro De Mujeres",
    location: "En Nuestro Templo",
    hours: "03:30pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772966688/WhatsApp_Image_2026-03-06_at_9.31.14_AM_ae8zwg.jpg`,
  },
  {
    id: 4,
    tag: "Obra Social",
    number: "03",
    title: "Culto Dirigido Por Obra Social",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772966689/WhatsApp_Image_2026-03-07_at_8.59.57_AM_x3p0tr.jpg`,
  },
  {
    id: 5,
    tag: "Damas Dorcas",
    number: "02",
    title: "Gran Encuentro De Mujeres",
    location: "En Nuestro Templo",
    hours: "03:30pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772643481/WhatsApp_Image_2026-03-04_at_11.57.03_AM_hmbfon.jpg`,
  },
  {
    id: 6,
    tag: "Protemplo",
    number: "01",
    title: "Culto Dirigido Por Protemplo",
    location: "En Nuestro Templo",
    hours: "07:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772562920/ChatGPT_Image_3_mar_2026_13_34_29_bqy7rp.png`,
  },
  
];

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
    tag: "Gran Culto de Protemplo",
    number: "01",
    title: "Gran Culto de Protemplo",
    location: "En Nuestro Templo",
    hours: "7:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1780957669/WhatsApp_Image_2026-06-08_at_11.03.05_AM_jdjgwz.jpg`,
  },
  {
    id: 2,
    tag: "Servicio de Santa Cena",
    number: "02",
    title: "Servicio de Santa Cena",
    location: "En Nuestro Templo",
    hours: "9:30am",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1780522271/WhatsApp_Image_2026-06-03_at_4.25.02_PM_x6olf2.jpg`,
  },
  {
    id: 3,
    tag: "Gran Culto de Alabanza",
    number: "03",
    title: "Gran Culto de Alabanza",
    location: "En Nuestro Templo",
    hours: "7:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1780522271/WhatsApp_Image_2026-06-03_at_4.25.48_PM_dvzzhv.jpg`,
  },
  {
    id: 4,
    tag: "Gran Culto Misionero",
    number: "04",
    title: "Gran Culto Misionero",
    location: "En Nuestro Templo",
    hours: "7:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1778078011/WhatsApp_Image_2026-05-05_at_8.27.29_AM_qd0nio.jpg`,
  },
  {
    id: 5,
    tag: "Ayuno para Solteros y Solteras",
    number: "05",
    title: "Ayuno para Solteros y Solteras",
    location: "En Nuestro Templo",
    hours: "",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1778078012/WhatsApp_Image_2026-05-05_at_6.45.59_PM_wr8msy.jpg`,
  },
];

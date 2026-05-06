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
    tag: "Gran Culto Misionero",
    number: "01",
    title: "Gran Culto Misionero",
    location: "En Nuestro Templo",
    hours: "7:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1778078011/WhatsApp_Image_2026-05-05_at_8.27.29_AM_qd0nio.jpg`,
  },
  {
    id: 2,
    tag: "Ayuno para Solteros y Solteras",
    number: "02",
    title: "Ayuno para Solteros y Solteras",
    location: "En Nuestro Templo",
    hours: "",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1778078012/WhatsApp_Image_2026-05-05_at_6.45.59_PM_wr8msy.jpg`,
  },
  {
    id: 3,
    tag: "",
    number: "03",
    title: "Culto Dirigido por Alabanza",
    location: "En Nuestro Templo",
    hours: "7:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1778078012/WhatsApp_Image_2026-05-02_at_10.21.26_AM_iticvf.jpg`,
  },
];

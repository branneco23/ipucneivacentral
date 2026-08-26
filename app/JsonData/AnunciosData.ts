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
    tag: "Semana Evangelística",
    number: "02",
    title: "Semana Evangelística",
    location: "En Nuestro Templo",
    hours: "",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1787714030/WhatsApp_Image_2026-08-25_at_7.21.15_AM_f1vjcq.jpg`,
  },
  {
    id: 3,
    tag: "Ofrenda Solidaria",
    number: "03",
    title: "Ofrenda Solidaria a los Damnificados",
    location: "En Nuestro Templo",
    hours: "9:30am",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1787714030/WhatsApp_Image_2026-08-25_at_11.49.14_AM_hcvsxq.jpg`,
  },
  {
    id: 4,
    tag: "Culto Evangelístico",
    number: "04",
    title: "Culto Evangelístico",
    location: "En Nuestro Templo",
    hours: "19:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1787714030/WhatsApp_Image_2026-08-25_at_7.25.26_AM_ixe05s.jpg`,
  },
  {
    id: 5,
    tag: "Rompiendo Cadenas",
    number: "05",
    title: "Caravana Rompiendo Cadenas",
    location: "Sector Correspondiente a la Sede",
    hours: "7:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1787714030/WhatsApp_Image_2026-08-25_at_7.24.45_AM_nz1gyt.jpg`,
  },
];

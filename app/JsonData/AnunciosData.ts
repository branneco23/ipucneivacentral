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
    tag: "Mesas De Trabajo",
    number: "01",
    title: "Mesas De Trabajo",
    location: "En Nuestro Templo",
    hours: "7:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1789064194/WhatsApp_Image_2026-09-07_at_5.11.24_PM_csh8cg.jpg`,
  },
  {
    id: 2,
    tag: "Gran Culto Misionero",
    number: "02",
    title: "Gran Culto Misionero",
    location: "En Nuestro Templo",
    hours: "7:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1778078011/WhatsApp_Image_2026-05-05_at_8.27.29_AM_qd0nio.jpg`,
  },
  {
    id: 3,
    tag: "Gran Culto Misionero",
    number: "03",
    title: "Gran Culto Misionero",
    location: "En Nuestro Templo",
    hours: "7:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1778078011/WhatsApp_Image_2026-05-05_at_8.27.29_AM_qd0nio.jpg`,
  },
  {
    id: 4,
    tag: "Semana Evangelística",
    number: "04",
    title: "Semana Evangelística",
    location: "En Nuestro Templo",
    hours: "",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1787714030/WhatsApp_Image_2026-08-25_at_7.21.15_AM_f1vjcq.jpg`,
  },
  {
    id: 5,
    tag: "Ofrenda Solidaria",
    number: "05",
    title: "Ofrenda Solidaria a los Damnificados",
    location: "En Nuestro Templo",
    hours: "9:30am",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1787714030/WhatsApp_Image_2026-08-25_at_11.49.14_AM_hcvsxq.jpg`,
  },
  {
    id: 6,
    tag: "Culto Evangelístico",
    number: "06",
    title: "Culto Evangelístico",
    location: "En Nuestro Templo",
    hours: "19:00pm",
    year: "2026",
    bg: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1787714030/WhatsApp_Image_2026-08-25_at_7.25.26_AM_ixe05s.jpg`,
  },
];

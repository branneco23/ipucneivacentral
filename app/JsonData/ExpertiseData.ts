// src/data/expertiseData.ts
import { StaticImageData } from "next/image";

// Importación de imágenes
import expertise2 from "@/public/img/expertise2.jpg";
import expertiseSlide1 from "@/public/img/banner-slide-1.jpg";
import expertiseSlide2 from "@/public/img/banner-slide-2.jpg";
import expertiseSlide3 from "@/public/img/banner-slide-3.jpg";
import expertiseSlide4 from "@/public/img/banner-slide-4.jpg";

export interface ExpertiseItem {
  id: string;
  title: string;
  desc: string;
  image: StaticImageData;
}

export const EXPERTISE_DATA: ExpertiseItem[] = [
  { id: "1", title: "Culto Dirigido por Escuela Dominical", desc: "Martes, 26 de Febrero 2026.", image: expertise2 },
  { id: "2", title: "Culto Dirigido por Junta Local", desc: "Jueves, 28 de Febrero 2026.", image: expertise2 },
  { id: "3", title: "Culto Dirigido por Ujieres", desc: "Sabado,  de Marzo 2026.", image: expertise2 },
  { id: "4", title: "Culto Dirigido por Misiones y Evangelismo", desc: "Domingo, 1 de Marzo 2026.", image: expertise2 },
];

export const SLIDE_IMAGES = [expertiseSlide1, expertiseSlide2];
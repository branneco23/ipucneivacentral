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
  { id: "1", title: "Culto Dirigido por Decom y Sonido", desc: "Martes, 10 de Marzo 2026.", image: expertise2 },
  { id: "3", title: "Culto Dirigido por Junta Local", desc: "Jueves, 12 de Marzo 2026.", image: expertise2 },
  { id: "2", title: "Culto Dirigido por Damas Dorcas", desc: "Sábado, 14 de Febrero 2026.", image: expertise2 },
  { id: "4", title: "Culto Dirigido por Junta Local", desc: "Domingo, 15 de Marzo 2026.", image: expertise2 },
];

export const SLIDE_IMAGES = [expertiseSlide1, expertiseSlide2];
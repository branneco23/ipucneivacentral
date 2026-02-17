// src/data/expertiseData.ts
import { StaticImageData } from "next/image";

// Importación de imágenes
import expertise2 from "@/public/img/expertise2.jpg";
import expertise3 from "@/public/img/expertise3.jpg";
import expertise4 from "@/public/img/expertise4.jpg";
import expertiseSlide1 from "@/public/img/banner-slide-1.jpg";
import expertiseSlide2 from "@/public/img/banner-slide-2.jpg";

export interface ExpertiseItem {
  id: string;
  title: string;
  desc: string;
  image: StaticImageData;
}

export const EXPERTISE_DATA: ExpertiseItem[] = [
  { id: "1", title: "Culto Dirigido por Alabanza", desc: "Sábado, 7 de Febrero 2026", image: expertise4 },
  { id: "2", title: "Culto Dirigido por Escuela Dominical", desc: "Domingo, 8 de Febrero 2026.", image: expertise4 },
  { id: "3", title: "Culto Dirigido por Intercesión", desc: "Martes, 10 de Febrero 2026.", image: expertise2 },
  { id: "4", title: "Culto Dirigido por Junta Local", desc: "Jueves, 12 de Febrero 2026.", image: expertise2 },
];

export const SLIDE_IMAGES = [expertiseSlide1, expertiseSlide2];
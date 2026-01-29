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
  { id: "1", title: "Culto Dirigido Somos Rayos de Luz Al Mundo", desc: "Juevés, 22 de Enero 2026", image: expertise4 },
  { id: "2", title: "Culto de Protemplo", desc: "Sabado, 24 de Enero 2026.", image: expertise4 },
  { id: "3", title: "Culto de Escuela Dominical", desc: "Domingo, 25 de Enero 2026.", image: expertise2 },
  { id: "4", title: "Culto de Obra Social", desc: "Martes, 27 de Enero 2026.", image: expertise2 },
];

export const SLIDE_IMAGES = [expertiseSlide1, expertiseSlide2];
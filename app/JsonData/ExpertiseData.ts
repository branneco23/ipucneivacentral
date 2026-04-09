// app/JsonData/ExpertiseData.ts
import { StaticImageData } from "next/image";

// 1. Importaciones locales (Asegúrate de que estos archivos EXISTAN en public/img)
import expertiseSlide1 from "@/public/img/banner-slide-1.jpg";
import expertiseSlide2 from "@/public/img/banner-slide-2.jpg";
import expertiseSlide3 from "@/public/img/banner-slide-3.jpg";
// Hemos eliminado la importación de slide-4 para evitar el error de compilación

export interface ExpertiseItem {
  id: string;
  title: string;
  desc: string;
  image: StaticImageData | string; 
}

export const EXPERTISE_DATA: ExpertiseItem[] = [
  { 
    id: "1", 
    title: "Culto Dirigido por Intercesión", 
    desc: "Jueves, 2 de Abril 2026.", 
    image: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_15_46_wsvzld.png" 
  },
  { 
    id: "3", 
    title: "Culto Dirigido por Protemplo", 
    desc: "Sábado, 4 de Abril 2026.", 
    image: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_17_02_uwxjqm.png" 
  },
  { 
    id: "2", 
    title: "Culto Dirigido por Misiones y Evangelismo", 
    desc: "Domingo, 5 de Abril 2026.", 
    image: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_16_01_31_me1n1h.png" 
  },
  { 
    id: "4", 
    title: "Culto Dirigido por Obra Social", 
    desc: "Martes, 7 de Abril 2026.", 
    image: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_16_10_39_r0gifd.png" 
  },
];

// Solo incluimos los slides que sí existen físicamente
export const SLIDE_IMAGES = [expertiseSlide1, expertiseSlide2, expertiseSlide3];
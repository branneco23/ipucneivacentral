// app/JsonData/ExpertiseData.ts
import { EVENTOS_ANUALES_2026 } from "./EventsData";

import expertiseSlide1 from "@/public/img/banner-slide-1.jpg";
import expertiseSlide2 from "@/public/img/banner-slide-2.jpg";
import expertiseSlide3 from "@/public/img/banner-slide-3.jpg";

export interface ExpertiseItem {
  id: string;
  title: string;
  desc: string;
  image: string; 
}

const obtenerProximosEventos = (): ExpertiseItem[] => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return EVENTOS_ANUALES_2026
    .filter(evento => {
      const nombre = evento.titulo.trim().toLowerCase();
      // Filtra solo los que empiezan por "culto" y son de hoy en adelante
      return nombre.startsWith("culto") && new Date(evento.fecha) >= hoy;
    })
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 4)
    .map(evento => ({
      id: evento.id,
      title: evento.titulo,
      desc: formatearFechaEspanol(evento.fecha),
      image: asignarImagenExacta(evento.titulo)
    }));
};

const asignarImagenExacta = (titulo: string): string => {
  const t = titulo.toLowerCase();

  // 1. ESCUELA DOMINICAL
  if (t.includes("dominical") || t.includes("maestro") || t.includes("niño")) 
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_15_59_31_upcbzh.png";

  // 2. FAMILIA
  if (t.includes("familia")) 
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_18_06_erwfkk.png";

  // 3. MISIONES / 100 AMIGOS
  if (t.includes("misiones") || t.includes("evangelismo") || t.includes("amigos")) 
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_16_01_31_me1n1h.png";

  // 4. OBRA SOCIAL (Corregida la URL que fallaba)
  if (t.includes("obra social") || t.includes("mercado"))
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_16_10_39_r0gifd.png";

  // 5. PROTEMPLO (Ahora tiene su propia condición para no repetir Junta Local si no quieres)
  if (t.includes("protemplo"))
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_17_02_uwxjqm.png";

  // 6. DAMAS / DORCAS
  if (t.includes("damas") || t.includes("dorcas") || t.includes("Rayos de Luz"))
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_15_55_52_tntorq.png";
  
  // 7. DECOM / COMUNICACIONES
  if (t.includes("decom") || t.includes("comunicaciones"))
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_15_52_32_s3leoq.png";
  
  // 8. ALABANZA
  if (t.includes("alabanza"))
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_16_03_33_ngqva5.png";
  
  // 9. UJIERES
  if (t.includes("ujieres") || t.includes("brigadistas"))
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_12_05_w9yqaj.png";
  
  // 10. INTERCESIÓN
  if (t.includes("intercesion"))
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_15_46_wsvzld.png";

  // 7. JUNTA LOCAL / OTROS (Imagen por defecto)
  return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_15_54_26_aiqxye.png";
};

const formatearFechaEspanol = (fechaStr: string) => {
  const fecha = new Date(fechaStr + "T00:00:00");
  const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const res = fecha.toLocaleDateString('es-ES', opciones);
  return res.charAt(0).toUpperCase() + res.slice(1);
};

export const EXPERTISE_DATA = obtenerProximosEventos();
export const SLIDE_IMAGES = [expertiseSlide1, expertiseSlide2, expertiseSlide3];
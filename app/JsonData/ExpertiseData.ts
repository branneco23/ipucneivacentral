// app/JsonData/ExpertiseData.ts
import { EVENTOS_ANUALES_2026 } from "./EventsData";

export interface ExpertiseItem {
  id: string;
  title: string;
  desc: string;
  image: string; 
}

const obtenerProximosEventos = (): ExpertiseItem[] => {
  const hoy = new Date();
  
  // Calcular el domingo de la semana actual
  const inicioSemana = new Date(hoy);
  const diaSemana = hoy.getDay(); // 0 = Domingo, 1 = Lunes, etc.
  inicioSemana.setDate(hoy.getDate() - diaSemana);
  inicioSemana.setHours(0, 0, 0, 0);

  return EVENTOS_ANUALES_2026
    .filter(evento => {
      const nombre = evento.titulo.trim().toLowerCase();
      const fechaEvento = new Date(evento.fecha + "T00:00:00");
      
      return nombre.startsWith("culto") && fechaEvento >= inicioSemana;
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

  if (t.includes("dominical") || t.includes("maestro") || t.includes("niño") ) 
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_15_59_31_upcbzh.png";

  if (t.includes("familia") || t.includes("ayuno")) 
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_18_06_erwfkk.png";

  if (t.includes("misiones") || t.includes("evangelismo") || t.includes("amigos") ) 
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_16_01_31_me1n1h.png";

  if (t.includes("obra social") || t.includes("mercado") )
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_16_10_39_r0gifd.png";

  if (t.includes("protemplo") || t.includes("ayuno"))
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_17_02_uwxjqm.png";

  if (t.includes("damas") || t.includes("dorcas") || t.includes("Rayos de Luz") )
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_15_55_52_tntorq.png";
  
  if (t.includes("decom") || t.includes("comunicaciones") )
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_15_52_32_s3leoq.png";
  
  if (t.includes("alabanza") || t.includes("música") )
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_16_03_33_ngqva5.png";
  
  if (t.includes("ujieres") || t.includes("brigadistas") )
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_12_05_w9yqaj.png";
  
  if (t.includes("intercesion") )
    return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782341/ChatGPT_Image_17_mar_2026_16_15_46_wsvzld.png";

  return "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773782342/ChatGPT_Image_17_mar_2026_15_54_26_aiqxye.png";
};

const formatearFechaEspanol = (fechaStr: string) => {
  const fecha = new Date(fechaStr + "T00:00:00");
  const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const res = fecha.toLocaleDateString('es-ES', opciones);
  return res.charAt(0).toUpperCase() + res.slice(1);
};

export const EXPERTISE_DATA = obtenerProximosEventos();

// IMÁGENES EXCLUSIVAS PARA EL SLIDER (Reemplaza estas URLs por tus imágenes de Cloudinary)
export const SLIDE_IMAGES = [
  "https://res.cloudinary.com/dbbzk99pj/image/upload/v1787751449/784197569_1057661366878687_3651761308593122153_n_l9wm9o.jpg",
  "https://res.cloudinary.com/dbbzk99pj/image/upload/v1787751449/785200705_1057661420212015_7637312670180937828_n_aeguqe.jpg",
  "https://res.cloudinary.com/dbbzk99pj/image/upload/v1787751449/784351563_1057661383545352_2349816471195665337_n_ajohx7.jpg",
  "https://res.cloudinary.com/dbbzk99pj/image/upload/v1787751449/749354499_1028035759841248_3366419648842350152_n_dxxlsi.jpg",
  "https://res.cloudinary.com/dbbzk99pj/image/upload/v1787751449/765769777_1043026191675538_8692380115865893723_n_x49idz.jpg",
  "https://res.cloudinary.com/dbbzk99pj/image/upload/v1787751449/723612463_999110662733758_4926785373274089695_n_nj8w05.jpg",
  "https://res.cloudinary.com/dbbzk99pj/image/upload/v1787751449/766762614_1043026835008807_5183562800748502843_n_mighmv.jpg",
  "https://res.cloudinary.com/dbbzk99pj/image/upload/v1787751448/726373211_1004008422243982_6116895429307904022_n_so2uon.jpg",
];
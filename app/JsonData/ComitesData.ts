// app/JsonData/ComitesData.ts

export interface Integrante {
  readonly id: number;
  readonly nombre: string;
  readonly cargo: string;
  readonly foto: string;
}

export interface Evento {
  id: number;
  titulo: string;
  imagen: string;
  tipo: 'imagen' | 'video' | 'youtube';
}

export interface Comite {
  nombre: string;
  versiculo: string;
  mision: string;
  vision: string;
  fotoGrupal?: string;
  youtubeIds?: string[];
  integrantes: Integrante[];
  eventos?: Evento[];
}

const FOTO_BASE = "/img/comites";

export const ComitesData: Record<string, Comite> = {
  "directiva-local": {
    nombre: "Directiva Local",
    versiculo: "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía. Salmos 133:1",
    mision: "Liderar la congregación en unidad y orden.",
    vision: "Crecimiento espiritual y administrativo constante.",
    youtubeIds: ["xyz", "QLJa9WfrDQc", "Hi_aneMtE0Y", "OgEKJkcqXUo", "UeHOBDBEh3I", "-5LE3FEj9C8", "TiJK-cLwEc0", "lWflt8Y7Uxo&t", "cobsHqlOBcs&t","nvLRZXq0QoU"],
    integrantes: [
      { id: 1, nombre: "Esteban Zuñiga", cargo: "PASTOR", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771593674/ChatGPT_Image_16_feb_2026_12_18_21_eeta9e.png" },
      { id: 2, nombre: "Fernando Betancourth", cargo: "TESORERO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771263209/ChatGPT_Image_16_feb_2026_12_32_52_ye4of5.png" },
      { id: 3, nombre: "Maria Segrera", cargo: "SECRETARIO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773713108/ChatGPT_Image_16_mar_2026_21_04_22_hqfllw.png" },
      { id: 4, nombre: "Crisanto Sanchez", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771286652/ChatGPT_Image_16_feb_2026_12_47_17_qlkicj.png" },
      { id: 5, nombre: "Judith Vargas", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771287186/ChatGPT_Image_16_feb_2026_19_12_29_yj4jyj.png" },
      { id: 6, nombre: "Javier Zoque", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771287385/ChatGPT_Image_16_feb_2026_19_15_06_nf4ffw.png" },
      { id: 7, nombre: "Arnoldo Salinas", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771263830/ChatGPT_Image_16_feb_2026_12_43_12_rjvnrq.png" }
    ]
  },

  "intercesion": {
    nombre: "Directiva Intercesión",
    versiculo: "Confesaos vuestras ofensas unos a otros, y orad unos por otros, para que seáis sanados, Santiago 5: 16",
    mision: "Levantar un altar de oración continuo.",
    vision: "Una iglesia fortalecida en la presencia de Dios.",
    youtubeIds: ["xyz", "KcFF0lLCNsY", "rOTzIxHA9eE", "UJm0bvnVknA"],
    integrantes: [
      { id: 1, nombre: "Esneda Tejada", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 2, nombre: "Ana Romero", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 3, nombre: "Amparo Murcia", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 4, nombre: "Margarita Laguna", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 5, nombre: "Lida Barrero", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
    ]
  },

  "jovenes": {
    nombre: "Directiva Jóvenes",
    versiculo: "Acuérdate de tu creador en los días de tu juventud. Eclesiastés 12:1",
    mision: "Inspirar a la juventud a una vida de santidad.",
    vision: "Generación de relevo comprometida.",
    youtubeIds: ["xyz", "tPeT4dyw5vg", "QNf7Q-If0GM", "5mCeHA_ULz8"],
    integrantes: [
      { id: 1, nombre: "Jonathan Zuñiga", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771593556/ChatGPT_Image_20_feb_2026_08_18_49_jynelb.png" },
      { id: 2, nombre: "Elizabeth Sanches", cargo: "RECAUDADOR(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771864697/ChatGPT_Image_23_feb_2026_11_37_27_kbvgga.png" },
      { id: 3, nombre: "Doraliz Chavarriaga", cargo: "SECRETARIO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771246601/ChatGPT_Image_16_feb_2026_07_55_37_qrn683.png" },
      { id: 4, nombre: "Salomón Villamil", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771151000/ChatGPT_Image_14_feb_2026_23_40_12_a8kieg.png" },
      { id: 5, nombre: "Stiven Osuna", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771260711/image_1_1771260669961_e9jhvs.png" },
      { id: 6, nombre: "Aneika ", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771248208/ChatGPT_Image_16_feb_2026_08_22_35_nbolwq.png" }
    ]
  },

  "damas-dorcas": {
    nombre: "Directiva Damas Dorcas",
    versiculo: "Mujer virtuosa, ¿Quien la hallará? Proverbios 31:10",
    mision: "Fomentar el crecimiento espiritual de la mujer.",
    vision: "Mujeres sabias que edifican su casa.",
    youtubeIds: ["xyz", "EV7kNcaclNI", "txKKhJm-Yh8", "5iOe2oHhiTs"],
    integrantes: [
      { id: 1, nombre: "Edith Poveda", cargo: "PRESIDENTE(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773068003/ChatGPT_Image_9_mar_2026_09_27_15_ulmqbh.png` },
      { id: 2, nombre: "Marlen Mantilla", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 3, nombre: "Norma Santos", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 4, nombre: "Cristina Mayorca", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 5, nombre: "Cielo Lemus", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
    ]
  },

  "escuela-dominical": {
    nombre: "Directiva Escuela Dominical",
    versiculo: "Instruye al niño en su camino. Proverbios 22:6",
    mision: "Enseñar las sagradas escrituras.",
    vision: "Iglesia fundamentada desde la infancia.",
    youtubeIds: ["xyz", "Hi_aneMtE0Y", "TM1jlmTyHGQ", "e7G057gr8eQ", "JJT32u7_Bb4", "4YAYE30gRDw", "FhwfSZHjtBU", "YGpazkIaLt8", "fEQHPIhJm3Q", "ap63FfytNeE"],
    integrantes: [
      { id: 1, nombre: "Jhon Fredy Zoque", cargo: "PRESIDENTE(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772047567/ChatGPT_Image_25_feb_2026_14_25_43_it4k9b.png` },
      { id: 2, nombre: "Enith Arias", cargo: "VICEPRESIDENTE(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773764496/ChatGPT_Image_17_mar_2026_11_20_22_rraslx.png` },
      { id: 3, nombre: "Jader Alvis", cargo: "RECAUDADOR(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 4, nombre: "Eidy Culma", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 5, nombre: "Mauricio Ardila", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771516185/WhatsApp_Image_2026-02-19_at_10.19.35_AM_pywxtq.jpg" },
      { id: 6, nombre: "Jorge Charry", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771516186/WhatsApp_Image_2026-02-19_at_10.27.03_AM_lsqezu.jpg" },
      { id: 7, nombre: "Laura Zoque", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771861621/ChatGPT_Image_23_feb_2026_10_43_39_bpz1or.png" }
    ]
  },

  "misiones-evangelismo": {
    nombre: "Directiva Misiones y Evangelismo",
    versiculo: "Id por todo el mundo y predicad el evengelio. Marcos 16: 15",
    mision: "Extender el reino de Dios.",
    vision: "Una iglesia misionera que impacta.",
    youtubeIds: ["xyz", "UwMoCoWR-e4", "vSpp7BlGNfM", "3iHgaJodSug", "BZFZJU_MTW1s", "ZkiViKRcLoA", "py3G9tjyZLY"],
    integrantes: [
      { id: 1, nombre: "Alexander Prieto", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771427488/ChatGPT_Image_18_feb_2026_10_10_39_g7uvaf.png" },
      { id: 2, nombre: "Alexandra Granda", cargo: "LIDER DE BIS Y REFAM", foto: `${FOTO_BASE}/joven1.png` },
      { id: 3, nombre: "Mary Molano", cargo: "LIDER DE MISIONES NACIONALES", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1772056497/ChatGPT_Image_25_feb_2026_16_54_38_jb4lcd.png" },
      { id: 4, nombre: "Marina Aya", cargo: "LIDER DE MISIONES EXTRANJERAS", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773070745/ChatGPT_Image_9_mar_2026_10_35_17_ozoe8m.png` },
      { id: 5, nombre: "Nicolas Duarte", cargo: "LIDER DE MISIONES ESPECIALES", foto: `${FOTO_BASE}/joven1.png` },
      { id: 6, nombre: "Campoelias Ochoa", cargo: "LIDER DE MISIONES RESTAURATIVAS", foto: `${FOTO_BASE}/joven1.png` },
      { id: 7, nombre: "Milton Valdes", cargo: "LIDER DE MISIONES RESTAURATIVAS", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771106304/WhatsApp_Image_2026-02-14_at_4.56.34_PM_ukuyzi.jpg" },
      { id: 8, nombre: "Nidia Laverde", cargo: "LIDER DE MISIONES INFANTIL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 9, nombre: "Claudia Murcia", cargo: "LIDER DE MISIONES HOSPITALARIA", foto: `${FOTO_BASE}/joven1.png` },
      { id: 10, nombre: "Vicente Artuduaga", cargo: "LIDER DE MISIONES EN INSTITUCIONES PÚBLICAS", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771014405/ChatGPT_Image_13_feb_2026_15_26_14_rbgp3w.png" },
      { id: 11, nombre: "Andrés Medina", cargo: "AUXILIAR DE MISIONES HOSPITALARIA", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773540789/ChatGPT_Image_14_mar_2026_21_10_43_hmbwux.png` }
    ]
  },

  "alabanza": {
    nombre: "Directiva de Alabanza",
    versiculo: "Cantad a él, cantadle salmos. 1 Crónicas 16:9",
    mision: "Guiar a la iglesia en adoración.",
    vision: "Excelencia musical para Dios.",
    youtubeIds: ["xyz", "5MmGHLIOrIw"],
    integrantes: [
      { id: 1, nombre: "Esteban Zuñiga", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771605746/Gemini_Generated_Image_bpm3z9bpm3z9bpm3_nd1rzw.png" },
      { id: 2, nombre: "Jaime Pastrana", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 3, nombre: "Cristian Sanchez", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 4, nombre: "Dagoberto Conde", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 5, nombre: "Claudia Murcia", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771632177/Gemini_Generated_Image_zhunslzhunslzhun_x6ffvd.png" }
    ]
  },

  "comunicaciones": {
    nombre: "Directiva de Comunicaciones",
    versiculo: "¡Cuán hermosos son los pies del que trae alegres nuevas!",
    mision: "Difundir el mensaje por medios digitales.",
    vision: "Puente tecnológico para el evangelio.",
    youtubeIds: ["xyz", "YU7e80T3qas", "pIbRtZFnlD8"],
    integrantes: [
      { id: 1, nombre: "Paula Ramires", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771951602/ChatGPT_Image_24_feb_2026_11_43_52_luzs63.png" },
      { id: 2, nombre: "Lorem Lemus", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 3, nombre: "Fernando Betancourth", cargo: "SONIDISTA", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771862349/ChatGPT_Image_23_feb_2026_10_58_48_nbjr37.png" },
      { id: 4, nombre: "Jonathan Zuñiga", cargo: "SONIDISTA", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771735354/ChatGPT_Image_21_feb_2026_23_40_37_tb4qid.png" }
    ]
  },

  "obra-social": {
    nombre: "Directiva de Obra Social",
    versiculo: "A Jehová presta el que da al pobre. Proverbios 19:17",
    mision: "Socorrer a los necesitados.",
    vision: "Brazo extendido de misericordia.",
    youtubeIds: ["zzz", "Z4ttMefC_rA", "JXL5LGSKKVY", "f_tgppPm0Yo"],
    integrantes: [
      { id: 1, nombre: "Luz Soto", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 2, nombre: "Maria Lozano", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 3, nombre: "Ester Garcia", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 4, nombre: "Araceli Lopez", cargo: "RECAUDADOR(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1774227629/ChatGPT_Image_22_mar_2026_19_58_27_g6w1cf.png` },
      { id: 5, nombre: "Reinerio Ardila", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 6, nombre: "Jenny Poveda", cargo: "VOCAL", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1774277309/ChatGPT_Image_23_mar_2026_09_41_14_fes93f.png` }
    ]
  },

  "ujieres": {
    nombre: "Directiva de Ujieres",
    versiculo: "Porque mejor es un día en tus atrios que mil fuera de ellos.",
    mision: "Servir con excelencia en la recepción.",
    vision: "Orden y amor en cada servicio.",
    youtubeIds: ["xyz", "MHfizKqnu4M", "zP-UYrYnTKw"],
    integrantes: [
      { id: 1, nombre: "Nohemi Henao", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771595298/Gemini_Generated_Image_qqdw47qqdw47qqdw_ckyuun.png" },
      { id: 2, nombre: "Esperanza Rodriguez", cargo: "VICEPRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771121297/ChatGPT_Image_14_feb_2026_21_06_45_iqgwz5.png" },
      { id: 3, nombre: "Alberto Garcia", cargo: "RECAUDADOR(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 4, nombre: "Maria Muñoz", cargo: "SECRETARIA(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771856477/ChatGPT_Image_23_feb_2026_09_03_25_wgjbih.png" },
      { id: 5, nombre: "Mireya Polania", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771866903/ChatGPT_Image_23_feb_2026_11_57_40_hbxn8b.png" },
      { id: 6, nombre: "Flor Amanda", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 7, nombre: "Maria Perdomo", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 8, nombre: "Carlos Herrera", cargo: "VOCAL", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773071485/ChatGPT_Image_9_mar_2026_10_48_10_znvgo3.png` },
      { id: 9, nombre: "José Collazos", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771594009/WhatsApp_Image_2026-02-19_at_10.50.06_PM_1_tl9mt9.jpg" },
      { id: 10, nombre: "Milton Valdes", cargo: "VOCAL", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1772124889/ChatGPT_Image_26_feb_2026_11_53_57_f0my9d.png` }
    ]
  },

  "protemplo": {
    nombre: "Directiva Protemplo",
    versiculo: "Yo me alegré con los que me decián: A la casa de Jehová iremos.",
    mision: "Embellecimiento y mantenimiento del templo.",
    vision: "Un lugar digno para adorar.",
    youtubeIds: ["xyz", "nB5vVp-YYn8", "E7BM5TKwI5E"],
    integrantes: [
      { id: 1, nombre: "Norma Sterling", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 2, nombre: "Javier Lemus", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 3, nombre: "Lucelida Tovar", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 4, nombre: "Luz Hernandez", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 5, nombre: "Gerson Aviles", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
    ]
  },

  "brigadistas": {
    nombre: "Directiva de Brigadista",
    versiculo: "El avisado ve el mal y se esconde. Proverbios 22:3",
    mision: "Garantizar la seguridad.",
    vision: "Cultura de prevención.",
    youtubeIds: ["xyz"],
    integrantes: [
      { id: 1, nombre: "Angelica Lemus", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 2, nombre: "Mayra Poveda", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
      { id: 3, nombre: "Sandra Cuellar", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` }
    ]
  },

  "familia": {
    nombre: "Directiva de Familia",
    versiculo: "Pero yo y mi casa serviremos a Jehová. Josué 24:15",
    mision: "Fortalecer el núcleo familiar.",
    vision: "Hogares restaurados.",
    youtubeIds: ["xyz", "YGpazkIaLt8"],
    integrantes: [
      { id: 1, nombre: "Esteban Zuñiga", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1773085335/ChatGPT_Image_9_mar_2026_14_41_49_rxihb4.png" },
      { id: 2, nombre: "Edith Poveda", cargo: "VICEPRESIDENTE(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1773069980/ChatGPT_Image_9_mar_2026_10_25_54_ehqfdc.png`},
      { id: 3, nombre: "Maria Medina", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 4, nombre: "Eber Lozada", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 5, nombre: "Norma Santos", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
      { id: 6, nombre: "Jorge Mendez", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
    ]
  }
};

/**
 * EXPORTACIÓN DE APOYO: COMITES_MEMBERS
 * Esto permite que tu archivo anterior siga funcionando sin cambios masivos,
 * extrayendo los miembros directamente de ComitesData.
 */
export const COMITES_MEMBERS: Record<string, Integrante[]> = Object.keys(ComitesData).reduce((acc, key) => {
  acc[key] = ComitesData[key].integrantes;
  return acc;
}, {} as Record<string, Integrante[]>);
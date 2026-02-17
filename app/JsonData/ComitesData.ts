// 1. Definición de la Interface para un miembro de comité
export interface ComiteMember {
  readonly id: number;
  readonly nombre: string;
  readonly cargo: string;
  readonly foto: string;
}

// 2. Definición del tipo para el diccionario de comités (mapeo de llaves a arreglos)
export interface ComitesDictionary {
  [key: string]: ComiteMember[];
}

// 3. Ruta base centralizada para las imágenes de los comités
const FOTO_BASE = "/img/comites";

// 4. Datos exportados con tipado estricto
export const COMITES_MEMBERS: ComitesDictionary = {
  "directiva-local": [
    { id: 1, nombre: "Esteban Zuñiga", cargo: "PASTOR", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771262335/ChatGPT_Image_16_feb_2026_12_18_21_znuoqr.png` },
    { id: 2, nombre: "Fernando Betancourth", cargo: "TESORERO(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771263209/ChatGPT_Image_16_feb_2026_12_32_52_ye4of5.png` },
    { id: 3, nombre: "Maria Segrera", cargo: "SECRETARIO(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771286667/ChatGPT_Image_16_feb_2026_19_00_50_ma1d8u.png` },
    { id: 4, nombre: "Crisanto Sanchez", cargo: "VOCAL", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771286652/ChatGPT_Image_16_feb_2026_12_47_17_qlkicj.png` },
    { id: 5, nombre: "Judith Vargas", cargo: "VOCAL", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771287186/ChatGPT_Image_16_feb_2026_19_12_29_yj4jyj.png` },
    { id: 6, nombre: "Javier Zoque", cargo: "VOCAL", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771287385/ChatGPT_Image_16_feb_2026_19_15_06_nf4ffw.png` },
    { id: 7, nombre: "Arnoldo Salinas", cargo: "VOCAL", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771263830/ChatGPT_Image_16_feb_2026_12_43_12_rjvnrq.png` }
  ],
  "intercesion": [
    { id: 1, nombre: "Esneda Tejada", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 2, nombre: "Ana Romero", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Amparo Murcia", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 4, nombre: "Margarita Laguna", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 5, nombre: "Lida Barrero", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
  ],
  "jovenes": [
    { id: 1, nombre: "Jonathan Zuñiga", cargo: "PRESIDENTE(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771150880/WhatsApp_Image_2026-02-15_at_12.15.41_AM_fzm3ol.jpg` },
    { id: 2, nombre: "Elizabeth Sanches", cargo: "RECAUDADOR(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Doraliz Chavarriaga", cargo: "SECRETARIO(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771246601/ChatGPT_Image_16_feb_2026_07_55_37_qrn683.png` },
    { id: 4, nombre: "Salomón Villamil", cargo: "VOCAL", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771151000/ChatGPT_Image_14_feb_2026_23_40_12_a8kieg.png` },
    { id: 5, nombre: "Stiven Osuna", cargo: "VOCAL", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771260711/image_1_1771260669961_e9jhvs.png`},
    { id: 6, nombre: "Aneika ", cargo: "VOCAL", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771248208/ChatGPT_Image_16_feb_2026_08_22_35_nbolwq.png`}
  ],
  "damas-dorcas": [
    { id: 1, nombre: "Edith Poveda", cargo: "PRESIDENTE(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1770734123/ChatGPT_Image_10_feb_2026_09_29_40_mzjqoo.png` },
    { id: 2, nombre: "Marlen Mantilla", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Norma Santos", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 4, nombre: "Cristina Mayorca", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 5, nombre: "Cielo Lemus", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
  ],
  "escuela-dominical": [
    { id: 1, nombre: "Jhon Fredy Zoque", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 2, nombre: "Enith Arias", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Jader Alvis", cargo: "RECAUDADOR(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 4, nombre: "Eidy Culma", cargo: "SECRETARIA(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 5, nombre: "Mauricio Ardila", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 6, nombre: "Jorge Charry", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 7, nombre: "Laura Zoque", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
  ],
  "misiones-evangelismo": [
    { id: 1, nombre: "Alexander Prieto", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 2, nombre: "Alexandra Granda", cargo: "LIDER DE BIS Y REFAM", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Mary Molano", cargo: "LIDER DE MISIONES NACIONALES", foto: `${FOTO_BASE}/joven1.png` },
    { id: 4, nombre: "Marina Aya", cargo: "LIDER DE MISIONES EXTRANJERAS", foto: `${FOTO_BASE}/joven1.png` },
    { id: 5, nombre: "Nicolas Duarte", cargo: "LIDER DE MISIONES ESPECIALES", foto: `${FOTO_BASE}/joven1.png` },
    { id: 6, nombre: "Campoelias Ochoa", cargo: "LIDER DE MISIONES RESTAURATIVAS", foto: `${FOTO_BASE}/joven1.png` },
    { id: 7, nombre: "Milton", cargo: "LIDER DE MISIONES RESTAURATIVAS", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771106304/WhatsApp_Image_2026-02-14_at_4.56.34_PM_ukuyzi.jpg` },
    { id: 8, nombre: "Nidia Laverde", cargo: "LIDER DE MISIONES INFANTIL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 9, nombre: "Claudia Murcia", cargo: "LIDER DE MISIONES HOSPITALARIA", foto: `${FOTO_BASE}/joven1.png` },
    { id: 10, nombre: "Vicente Artuduaga", cargo: "LIDER DE MISIONES EN INSTITUCIONES PÚBLICAS", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771014405/ChatGPT_Image_13_feb_2026_15_26_14_rbgp3w.png` },
    { id: 11, nombre: "Andrés Medina", cargo: "AUXILIAR DE MISIONES HOSPITALARIA", foto: `${FOTO_BASE}/joven1.png` }
  ],
  "alabanza": [
    { id: 1, nombre: "Esteban Zuñiga", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 2, nombre: "Jaime Pastrana", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Cristian Sanchez", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 4, nombre: "Dagoberto Conde", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 5, nombre: "Claudia Murcia", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
  ],
  "comunicaciones": [
    { id: 1, nombre: "Paula Ramires", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 2, nombre: "Lorem Lemus", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Fernando Betancourth", cargo: "SONIDISTA", foto: `${FOTO_BASE}/joven1.png` },
    { id: 4, nombre: "Jonathan Zuñiga", cargo: "SONIDISTA", foto: `${FOTO_BASE}/joven1.png` }
  ],
  "obra-social": [
    { id: 1, nombre: "Luz Soto", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 2, nombre: "Maria Lozano", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Ester Garcia", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 4, nombre: "Araceli Lopez", cargo: "RECAUDADOR(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 5, nombre: "Reinerio Ardila", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 6, nombre: "Jenny Poveda", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
  ],
  "ujieres": [
    { id: 1, nombre: "Nohemi Henao", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 2, nombre: "Esperanza Rodriguez", cargo: "VICEPRESIDENTE(A)", foto: `https://res.cloudinary.com/dbbzk99pj/image/upload/v1771121297/ChatGPT_Image_14_feb_2026_21_06_45_iqgwz5.png` },
    { id: 3, nombre: "Alberto Garcia", cargo: "RECAUDADOR(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 4, nombre: "Maria Muñoz", cargo: "SECRETARIA(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 5, nombre: "Mireya Polania", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 6, nombre: "Flor Amanda", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 7, nombre: "Maria Perdomo", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 8, nombre: "Carlos Herrera", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 9, nombre: "José Collazos", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 10, nombre: "Milton", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
  ],
  "protemplo": [
    { id: 1, nombre: "Norma Sterling", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 2, nombre: "Javier Lemus", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Lucelida Tovar", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 4, nombre: "Luz Hernandez", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 5, nombre: "Gerson Aviles", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
  ],
  "brigadistas": [
    { id: 1, nombre: "Angelica Lemus", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 2, nombre: "Mayra Poveda", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Sandra Cuellar", cargo: "SECRETARIO(A)", foto: `${FOTO_BASE}/joven1.png` }
  ],
  "familia": [
    { id: 1, nombre: "Esteban Zuñiga", cargo: "PRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 2, nombre: "Edith Poveda", cargo: "VICEPRESIDENTE(A)", foto: `${FOTO_BASE}/joven1.png` },
    { id: 3, nombre: "Maria Medina", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 4, nombre: "Eber Lozada", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 5, nombre: "Norma Santos", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` },
    { id: 6, nombre: "Jorge Mendez", cargo: "VOCAL", foto: `${FOTO_BASE}/joven1.png` }
  ]
};
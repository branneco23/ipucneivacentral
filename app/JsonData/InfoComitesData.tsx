export interface Integrante {
  id: number;
  nombre: string;
  cargo: string;
  foto: string;
}

export interface Evento {
  id: number;
  titulo: string;
  imagen: string;
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

export const ComitesData: Record<string, Comite> = {
  "directiva-local": {
    nombre: "Directiva Local",
    versiculo: "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía. Salmos 133:1",
    mision: "Liderar la congregación en unidad y orden.",
    vision: "Crecimiento espiritual y administrativo constante.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: ["","TiJK-cLwEc0","lwflt8Y7Uxo", "cobsHqlOBcs"],
    integrantes: [
      { id: 1, nombre: "Esteban Zuñiga", cargo: "PASTOR", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771334907/ChatGPT_Image_17_feb_2026_08_27_47_x5vyar.png" },
      { id: 2, nombre: "Fernando Betancourth", cargo: "TESORERO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771335047/ChatGPT_Image_17_feb_2026_08_30_12_fvdwh5.png" },
      { id: 3, nombre: "Maria Segrera", cargo: "SECRETARIO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771335131/ChatGPT_Image_16_feb_2026_19_03_12_oyqxgo.png" },
      { id: 4, nombre: "Crisanto Sanchez", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771335669/ChatGPT_Image_17_feb_2026_08_40_35_mpfion.png" },
      { id: 5, nombre: "Judith Vargas", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771287068/ChatGPT_Image_16_feb_2026_19_10_24_xqnrrn.png" },
      { id: 6, nombre: "Javier Zoque", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
      { id: 7, nombre: "Arnoldo Salinas", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "intercecion": {
    nombre: "Directiva Intercesión",
    versiculo: "Confesaos vuestras ofensas unos a otros, y orad unos por otros, para que seáis sanados, Santiago 5: 16",
    mision: "Levantar un altar de oración continuo por las necesidades de la iglesia.",
    vision: "Una iglesia fortalecida en la presencia de Dios a través del clamor.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: ["","UJm0bvnVknA"],
    integrantes: [
      { id: 1, nombre: "Esneda Tejada", cargo: "PRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 2, nombre: "Ana Romero", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/einer.png" },
      { id: 3, nombre: "Amparo Murcia", cargo: "SECRETARIO(A)", foto: "/img/comites/ruth.png" },
      { id: 4, nombre: "Margarita Laguna", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Lida Barrero", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "jovenes": {
    nombre: "Directiva Jóvenes",
    versiculo: "Acuérdate de tu creador en los días de tu juventud. Eclesiastés 12:1",
    mision: "Inspirar a la juventud a una vida de santidad y servicio.",
    vision: "Generación de relevo comprometida con el evangelio",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: ["","QNf7Q-If0GM","5mCeHA_ULz8"],
    integrantes: [
      { id: 1, nombre: "Jonathan Zuñiga", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771259878/Nano_Banana_Pro_pon_la_imagen_de_medio_cuerpo__que_se_alcance_a_notar_un_poco_los_pantalones__y_algo_xfnnub.png" },
      { id: 2, nombre: "Elizabeth Sanchez", cargo: "RECAUDADOR(A)", foto: "/img/comites/einer.png" },
      { id: 3, nombre: "Doraliz Chavarriaga", cargo: "SECRETARIO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771247008/ChatGPT_Image_16_feb_2026_08_02_42_rwccyw.png" },
      { id: 4, nombre: "Salomón Villamil", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771260029/ChatGPT_Image_16_feb_2026_08_05_18_gnnwtf.png" },
      { id: 5, nombre: "Stiven Osuna", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771334631/ChatGPT_Image_17_feb_2026_08_23_16_bjewpv.png" },
      { id: 6, nombre: "Aneika ", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771249060/c6ed5cb68c24407599d8f9d5dde5054b_ywbccx.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "damas-dorcas": {
    nombre: "Directiva Damas Dorcas",
    versiculo: "Mujer virtuosa, ¿Quien la hallará? Porque su estima sobrepasa largamente a la de las piedras presiosas. Proverbios 31:10",
    mision: "Fomentar el crecimiento espíritual y la labor social de la mujer cristiana.",
    vision: "Mujeres sabias que edifican su casa y su iglesia.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: ["","5iOe2oHhiTs"],
    integrantes: [
      { id: 1, nombre: "Edith Poveda", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1770734508/ChatGPT_Image_10_feb_2026_09_41_22_petryp.png" },
      { id: 2, nombre: "Marlen Mantilla", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 3, nombre: "Norma Santos", cargo: "SECRETARIO(A)", foto: "/img/comites/einer.png" },
      { id: 3, nombre: "Cristina Mayorca", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
      { id: 4, nombre: "Cielo Lemus", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "escuela-dominical": {
    nombre: "Directiva Escuela Dominical",
    versiculo: "Instruye al niño en su camino, aun cuando fuere viejo no se apartará de él. Proverbios 22:6",
    mision: "Enseñar las sagradas escrituras a todas las edades.",
    vision: "Una iglesia bíblicamente fundamentada desde la infancia.",
    youtubeIds:["","ap63FfytNeE","fEQHPIhJm3Q","XoxEhXGbw-s","vhHx5mG337M&t","sg39LL8Qkyk"],
    fotoGrupal: "/img/comites/portada-local.jpg",
    integrantes: [
      { id: 1, nombre: "Jhon Fredy Zoque", cargo: "PRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 2, nombre: "Enith Arias", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 3, nombre: "Jader Alvis", cargo: "RECAUDADOR(A)", foto: "/img/comites/einer.png" },
      { id: 4, nombre: "Eidy Culma", cargo: "SECRETARIO(A)", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Mauricio Ardila", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
      { id: 6, nombre: "Jorge Charry", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
      { id: 7, nombre: "Laura Zoque", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "misiones": {
    nombre: "Directiva Misiones y Evangelismo",
    versiculo: "Y les dijo: Id por todo el mundo y predicad el evengelio a toda criatura. Marcos 16: 15",
    mision: "Extender el reino de Dios a través de la predicación y el servicio social.",
    vision: "Una iglesia misionera que impacta su ciudad y el mundo.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds:["","ZkiViKRcLoA", "EmtNSPeSHNM", "py3G9tjyZLY"],
    integrantes: [
      { id: 1, nombre: "Alexander Prieto", cargo: "PRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 2, nombre: "Alexandra Granda", cargo: "LIDER DE BIS Y REFAM", foto: "/img/comites/ever.png" },
      { id: 3, nombre: "Mary Molano", cargo: "LIDER DE MISIONES NACIONALES", foto: "/img/comites/einer.png" },
      { id: 4, nombre: "Nicolas Duarte", cargo: "LIDER DE MISIONES ESPECIALES", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Campoelias Ochoa", cargo: "LIDER DE MISIONES RESTAURATIVAS", foto: "/img/comites/ruth.png" },
      { id: 6, nombre: "Milton", cargo: "LIDER DE MISIONES RESTAURATIVAS", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771106304/WhatsApp_Image_2026-02-14_at_4.56.50_PM_y3ukcy.jpg" },
      { id: 7, nombre: "Nidia Laverde", cargo: "LIDER DE MISIONES INFANTIL", foto: "/img/comites/ruth.png" },
      { id: 8, nombre: "Claudia Murcia", cargo: "LIDER DE MISIONES HOSPITALARIAS", foto: "/img/comites/ruth.png" },
      { id: 9, nombre: "Vicente Artuduaga", cargo: "LIDER DE MISIONES EN INSTITUCIONES PÚBLICAS", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771012277/ChatGPT_Image_13_feb_2026_14_48_05_wsmkpx.png" },
      { id: 10, nombre: "Andrés Medina", cargo: "AUXILIAR DE MISIONES HOSPITALARIA", foto: "/img/comites/ruth.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "alabanza": {
    nombre: "Directiva de Alabanza",
    versiculo: "Cantad a él, cantadle salmos; Hablad de todas sus maravillas. 1 Crónicas 16:9",
    mision: "Guiar a la iglesia en adoración genuina.",
    vision: "Excelencia musical para la gloria de Dios.",
    youtubeIds: ["", "5MmGHLIOrIw"],
    integrantes: [
      { id: 1, nombre: "Esteban Zuñiga", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Jaime Pastrana", cargo: "VICEPRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Cristian Sanchez", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Dagoberto Conde", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Claudia Murcia", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "comunicaciones": {
    nombre: "Directiva de Comunicaciones",
    versiculo: "¡Cuán hermosos son sobre los montes los pies del que trae alegres nuevas! Isaías 52:7",
    mision: "Difundir el mensaje de salvación a través de medios digitales y técnicos.",
    vision: "Ser el puente tecnológico para la expansión del evangelio.",
    youtubeIds: ["","pIbRtZnlD&&t"],
    integrantes: [
      { id: 1, nombre: "Paula Ramires", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Lorem Lemus", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Fernando Betancourth", cargo: "SONIDISTA", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Jonathan Zuñiga", cargo: "SONIDISTA", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
    ]
  },
  "obra-social": {
    nombre: "Directiva de Obra Social",
    versiculo: "A Jehová presta el que da al pobre, y el bien que ha hecho, se lo volverá a pagar. Proverbios 19:17",
    mision: "Socorrer a los necIesitados reflejando el amor de Cristo.",
    vision: "Un brazo extendido de misericordia en la comunidad.",
    youtubeIds: ["", "f_tgppPm0Yo"],
    integrantes: [
      { id: 1, nombre: "Luz Soto", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Maria Lozano", cargo: "VICEPRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Ester Garcia", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Fernando Betancourth", cargo: "SONIDISTA", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Araceli Lopez", cargo: "RECAUDADOR", foto: "/img/comites/joven1.png" },
      { id: 6, nombre: "Reinerio Ardila", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 7, nombre: "Jenny Poveda", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "protemplo": {
    nombre: "Directiva Protemplo",
    versiculo: "Yo me alegré con los que me decián: A la casa de Jehová iremos. Salmos 122:1",
    youtubeIds: ["","E7BM5TKwI5E"],
    mision: "Trabajar por el embellecimiento y mantenimiento del templo.",
    vision: "Un lugar digno para adorar a Dios.",
    integrantes: [
      { id: 1, nombre: "Norma Sterling", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Javier Lemus", cargo: "VICEPRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Lucelida Tovar", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Luz Henandez", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Gerson Avilés", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "brigadistas": {
    nombre: "Directiva de Brigadista",
    versiculo: "El avisado ve el mal y se esconde; más los simples pasan y reciben el daño. Proverbios 22:3",
    mision: "Garantizar la seguridad y el mal y se esconde; mas los simples pasan y reciben el daño. Proverbios 22:3",
    vision: "Cultura de prevención y cuidado mutuo.",
    integrantes: [
      { id: 1, nombre: "Angelica Lemus", cargo: "PRESIDENTE(A)", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Mayra Poveda", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Sandra Cuellar", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "ujieres": {
    nombre: "Directiva de Ujieres",
    versiculo: "Porque mejor es un día en tus atrios que mil fuera de ellos. Salmos 84:10",
    youtubeIds: ["","zP-UYrYnTKw","zP-UYrYnTKw&t"],
    mision: "Servir con excelencia en la recepción de la hermandad.",
    vision: "Orden y amor en cada servicio.",
    integrantes: [
      { id: 1, nombre: "Nohemi Henao", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Esperanza Rodriguez", cargo: "VICEPRESIDENTE", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771121571/ChatGPT_Image_14_feb_2026_21_12_15_dv6tfq.png" },
      { id: 3, nombre: "Alberto Garcia", cargo: "RECAUDADOR", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Maria Muñoz", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Mireya Polania", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 6, nombre: "Flor Amanda", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 7, nombre: "Maria Perdomo", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 8, nombre: "Carlos Herrera", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 9, nombre: "José Collazos", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 10, nombre: "Miltón", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      { id: 1, titulo: "Ayuno de Ujieres", imagen: "/img/eventos/ayuno-ujieres.jpg" }
    ]
  },
  "familia": {
    nombre: "Directiva de Familia",
    versiculo: "Pero yo y mi casa serviremos a Jehová. Josué 24:15",
    mision: "Fortalecer el núcleo familiar bajo los principios bíblicos.",
    vision: "Hogares restaurados y saludables para la gloria de Dios.",
    youtubeIds:[""],
    integrantes: [
      { id: 1, nombre: "Estebán Zuñiga", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Edith Poveda", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Maria Medina", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Eber Lozada", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Norma Santos", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 6, nombre: "Jorge Mendez", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      { id: 1, titulo: "Ayuno de Ujieres", imagen: "/img/eventos/ayuno-ujieres.jpg" }
    ]
  },

  // Agrega aquí los demás comités siguiendo este mismo formato...
};
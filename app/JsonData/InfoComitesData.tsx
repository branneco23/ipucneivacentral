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

export const ComitesData: Record<string, Comite> = {
  "directiva-local": {
    nombre: "Directiva Local",
    versiculo: "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía. Salmos 133:1",
    mision: "Liderar la congregación en unidad y orden.",
    vision: "Crecimiento espiritual y administrativo constante.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: [" ","-5LE3FEj9C8","TiJK-cLwEc0","lwflt8Y7Uxo","cobsHqlOBcs"],
    integrantes: [
      { id: 1, nombre: "Esteban Zuñiga", cargo: "PASTOR", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771334907/ChatGPT_Image_17_feb_2026_08_27_47_x5vyar.png" },
      { id: 2, nombre: "Fernando Betancourth", cargo: "TESORERO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771335047/ChatGPT_Image_17_feb_2026_08_30_12_fvdwh5.png" },
      { id: 3, nombre: "Maria Segrera", cargo: "SECRETARIO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771335131/ChatGPT_Image_16_feb_2026_19_03_12_oyqxgo.png" },
      { id: 4, nombre: "Crisanto Sanchez", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771335669/ChatGPT_Image_17_feb_2026_08_40_35_mpfion.png" },
      { id: 5, nombre: "Judith Vargas", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771287068/ChatGPT_Image_16_feb_2026_19_10_24_xqnrrn.png" },
      { id: 6, nombre: "Javier Zoque", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771435741/ChatGPT_Image_18_feb_2026_12_28_28_izq72z.png" },
      { id: 7, nombre: "Arnoldo Salinas", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771436378/ChatGPT_Image_18_feb_2026_12_39_04_tppsoj.png" },
    ],
    eventos: [

    ]
  },

  "intercesion": {
    nombre: "Directiva Intercesión",
    versiculo: "Confesaos vuestras ofensas unos a otros, y orad unos por otros, para que seáis sanados, Santiago 5: 16",
    mision: "Levantar un altar de oración continuo por las necesidades de la iglesia.",
    vision: "Una iglesia fortalecida en la presencia de Dios a través del clamor.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: [" ","UJm0bvnVknA"],
    integrantes: [
      { id: 1, nombre: "Esneda Tejada", cargo: "PRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 2, nombre: "Ana Romero", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/einer.png" },
      { id: 3, nombre: "Amparo Murcia", cargo: "SECRETARIO(A)", foto: "/img/comites/ruth.png" },
      { id: 4, nombre: "Margarita Laguna", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Lida Barrero", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
    ],
    eventos: [

    ]
  },

  "jovenes": {
    nombre: "Directiva Jóvenes",
    versiculo: "Acuérdate de tu creador en los días de tu juventud. Eclesiastés 12:1",
    mision: "Inspirar a la juventud a una vida de santidad y servicio.",
    vision: "Generación de relevo comprometida con el evangelio",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: [" ","QNf7Q-If0GM","5mCeHA_ULz8"],
    integrantes: [
      { id: 1, nombre: "Jonathan Zuñiga", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771259878/Nano_Banana_Pro_pon_la_imagen_de_medio_cuerpo__que_se_alcance_a_notar_un_poco_los_pantalones__y_algo_xfnnub.png" },
      { id: 2, nombre: "Elizabeth Sanchez", cargo: "RECAUDADOR(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771864697/ChatGPT_Image_23_feb_2026_11_35_47_hcstqu.png" },
      { id: 3, nombre: "Doraliz Chavarriaga", cargo: "SECRETARIO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771247008/ChatGPT_Image_16_feb_2026_08_02_42_rwccyw.png" },
      { id: 4, nombre: "Salomón Villamil", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771260029/ChatGPT_Image_16_feb_2026_08_05_18_gnnwtf.png" },
      { id: 5, nombre: "Stiven Osuna", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771334631/ChatGPT_Image_17_feb_2026_08_23_16_bjewpv.png" },
      { id: 6, nombre: "Aneika ", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771249060/c6ed5cb68c24407599d8f9d5dde5054b_ywbccx.png" },
    ],
    eventos: [

    ]
  },

  "damas-dorcas": {
    nombre: "Directiva Damas Dorcas",
    versiculo: "Mujer virtuosa, ¿Quien la hallará? Porque su estima sobrepasa largamente a la de las piedras presiosas. Proverbios 31:10",
    mision: "Fomentar el crecimiento espíritual y la labor social de la mujer cristiana.",
    vision: "Mujeres sabias que edifican su casa y su iglesia.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: [" ","txKKhJm-Yh8","5iOe2oHhiTs"],
    integrantes: [
      { id: 1, nombre: "Edith Poveda", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1770734508/ChatGPT_Image_10_feb_2026_09_41_22_petryp.png" },
      { id: 2, nombre: "Marlen Mantilla", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 3, nombre: "Norma Santos", cargo: "SECRETARIO(A)", foto: "/img/comites/einer.png" },
      { id: 3, nombre: "Cristina Mayorca", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
      { id: 4, nombre: "Cielo Lemus", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
    ],
    eventos: [

    ]
  },

  "escuela-dominical": {
    nombre: "Directiva Escuela Dominical",
    versiculo: "Instruye al niño en su camino, aun cuando fuere viejo no se apartará de él. Proverbios 22:6",
    mision: "Enseñar las sagradas escrituras a todas las edades.",
    vision: "Una iglesia bíblicamente fundamentada desde la infancia.",
    youtubeIds:["","YGpazkIaLt8","fEQHPIhJm3Q","ap63FfytNeE","T3GPJ7u2Drs","sg39LL8QkYk","vhHx5mG337M"],
    fotoGrupal: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771734177/WhatsApp_Image_2026-02-21_at_10.32.15_PM_pcg9k9.jpg",
    integrantes: [
      { id: 1, nombre: "Jhon Fredy Zoque", cargo: "PRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 2, nombre: "Enith Arias", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 3, nombre: "Jader Alvis", cargo: "RECAUDADOR(A)", foto: "/img/comites/einer.png" },
      { id: 4, nombre: "Eidy Culma", cargo: "SECRETARIO(A)", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Mauricio Ardila", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771515433/ChatGPT_Image_19_feb_2026_10_34_54_sqf5qr.png" },
      { id: 6, nombre: "Jorge Charry", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771515433/ChatGPT_Image_19_feb_2026_10_36_40_voygky.png" },
      { id: 7, nombre: "Laura Zoque", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771861621/ChatGPT_Image_23_feb_2026_10_46_34_vizh2o.png" },
    ],
    eventos: [
      { id: 1, titulo: "Una Cifra con Jesús", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771730261/WhatsApp_Video_2026-02-06_at_9.31.47_AM_fdexaq.mp4", tipo:"video",},
      { id: 2, titulo: "Los Cinco Panes y Los Dos Peces", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729894/WhatsApp_Video_2026-02-14_at_9.25.14_AM_z0rglf.mp4", tipo:"video",},
      { id: 3, titulo: "El Que Olvida Pierde", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729854/WhatsApp_Video_2026-02-06_at_10.01.33_AM_cf0yrd.mp4", tipo:"video",},
      { id: 4, titulo: "Llamados a Dejar Huella", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729868/WhatsApp_Video_2026-02-12_at_1.27.30_PM_rybn0a.mp4", tipo:"video",},   
      { id: 5, titulo: "¿Te Habian Contado?", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729874/WhatsApp_Video_2026-02-14_at_9.25.28_AM_qfrqpo.mp4", tipo:"video",},
      { id: 6, titulo: "Niños, Elija Bien sus Amistades", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729867/WhatsApp_Video_2026-02-15_at_1.04.32_PM_m0tgxn.mp4", tipo:"video",},
      { id: 7, titulo: "La Ansiedad Desaparece", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729888/WhatsApp_Video_2026-02-16_at_8.48.09_AM_gka446.mp4", tipo:"video",},
      { id: 8, titulo: "La Ansiedad Desaparece", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729888/WhatsApp_Video_2026-02-17_at_9.05.01_AM_jt58yr.mp4", tipo:"video",},
      { id: 9, titulo: "Grupo de Trabajo", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771734177/WhatsApp_Image_2026-02-21_at_10.32.15_PM_pcg9k9.jpg", tipo:"imagen",},
      { id: 10, titulo: "Cuando te Sientes Fuera", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771862796/WhatsApp_Video_2026-02-23_at_9.25.48_AM_k0hjpg.mp4", tipo:"video",},
      { id: 11, titulo: "¡Niños, Es Tiempo de Ponerse la Armadura de Dios!", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771862795/WhatsApp_Video_2026-02-23_at_9.25.48_AM_1_zxm82j.mp4", tipo:"video",},
      { id: 12, titulo: "Participacion Escuela Dominical 1", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771867240/WhatsApp_Image_2026-02-23_at_12.19.56_PM_ebgp3e.jpg", tipo:"imagen",}
    ]
  },

  "misiones": {
    nombre: "Directiva Misiones y Evangelismo",
    versiculo: "Y les dijo: Id por todo el mundo y predicad el evengelio a toda criatura. Marcos 16: 15",
    mision: "Extender el reino de Dios a través de la predicación y el servicio social.",
    vision: "Una iglesia misionera que impacta su ciudad y el mundo.",
    fotoGrupal: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771536578/WhatsApp_Image_2026-02-08_at_3.52.59_PM_gnjtqk.jpg",
    youtubeIds:[" ","BZZJU_MTW1s","ZkiViKRcLoA","EmtNSPeSHNM","py3G9tjyZLY"],
    integrantes: [
      { id: 1, nombre: "Alexander Prieto", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771427767/ChatGPT_Image_18_feb_2026_10_15_27_wrho8h.png" },
      { id: 2, nombre: "Alexandra Granda", cargo: "LIDER DE BIS Y REFAM", foto: "/img/comites/ever.png" },
      { id: 3, nombre: "Mary Molano", cargo: "LIDER DE MISIONES NACIONALES", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771592946/Gemini_Generated_Image_vygpdrvygpdrvygp_b095hd.png" },
      { id: 4, nombre: "Nicolas Duarte", cargo: "LIDER DE MISIONES ESPECIALES", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Campoelias Ochoa", cargo: "LIDER DE MISIONES RESTAURATIVAS", foto: "/img/comites/ruth.png" },
      { id: 6, nombre: "Milton", cargo: "LIDER DE MISIONES RESTAURATIVAS", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771106304/WhatsApp_Image_2026-02-14_at_4.56.50_PM_y3ukcy.jpg" },
      { id: 7, nombre: "Nidia Laverde", cargo: "LIDER DE MISIONES INFANTIL", foto: "/img/comites/ruth.png" },
      { id: 8, nombre: "Claudia Murcia", cargo: "LIDER DE MISIONES HOSPITALARIAS", foto: "/img/comites/ruth.png" },
      { id: 9, nombre: "Vicente Artuduaga", cargo: "LIDER DE MISIONES EN INSTITUCIONES PÚBLICAS", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771429747/ChatGPT_Image_18_feb_2026_10_48_21_uuysoj.png" },
      { id: 10, nombre: "Andrés Medina", cargo: "AUXILIAR DE MISIONES HOSPITALARIA", foto: "/img/comites/ruth.png" },
    ],
    eventos: [
      { id: 1, titulo: "Impacto Evangelistico", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771509567/WhatsApp_Image_2026-02-19_at_8.54.12_AM_kyovck.jpg", tipo:"imagen",},
      { id: 2, titulo: "Impacto Evangelistico", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771509567/WhatsApp_Image_2026-02-19_at_8.56.19_AM_cfon4h.jpg", tipo:"imagen",},
      { id: 3, titulo: "Impacto Evangelistico", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771509566/WhatsApp_Image_2026-02-19_at_8.55.06_AM_yrrbgv.jpg", tipo:"imagen",},
      { id: 4, titulo: "Impacto Evangelistico", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771510725/WhatsApp_Video_2026-01-21_at_7.20.31_PM_nb0t43.mp4", tipo:"video",},   
      { id: 5, titulo: "Grupo de Trabajo", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771536578/WhatsApp_Image_2026-02-08_at_3.52.59_PM_gnjtqk.jpg", tipo:"imagen",}
    ]
  },

  "alabanza": {
    nombre: "Directiva de Alabanza",
    versiculo: "Cantad a él, cantadle salmos; Hablad de todas sus maravillas. 1 Crónicas 16:9",
    mision: "Guiar a la iglesia en adoración genuina.",
    vision: "Excelencia musical para la gloria de Dios.",
    youtubeIds: [" ","5MmGHLIOrIw"],
    integrantes: [
      { id: 1, nombre: "Esteban Zuñiga", cargo: "PRESIDENTE", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771605778/Gemini_Generated_Image_zg6n7hzg6n7hzg6n_f5k9ic.png" },
      { id: 2, nombre: "Jaime Pastrana", cargo: "VICEPRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Cristian Sanchez", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Dagoberto Conde", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Claudia Murcia", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771632176/Gemini_Generated_Image_rowdtzrowdtzrowd_b8wb9n.png" },
    ],
    eventos: [

    ]
  },

  "comunicaciones": {
    nombre: "Directiva de Comunicaciones",
    versiculo: "¡Cuán hermosos son sobre los montes los pies del que trae alegres nuevas! Isaías 52:7",
    mision: "Difundir el mensaje de salvación a través de medios digitales y técnicos.",
    vision: "Ser el puente tecnológico para la expansión del evangelio.",
    youtubeIds: [" ","pIbRtZFnlD8"],
    integrantes: [
      { id: 1, nombre: "Paula Ramires", cargo: "PRESIDENTE", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771960910/ChatGPT_Image_24_feb_2026_14_19_24_slyn3t.png" },
      { id: 2, nombre: "Lorem Lemus", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Fernando Betancourth", cargo: "SONIDISTA", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771733457/Gemini_Generated_Image_mwhmcvmwhmcvmwhm_imvdej.png" },
      { id: 4, nombre: "Jonathan Zuñiga", cargo: "SONIDISTA", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771735352/ChatGPT_Image_21_feb_2026_23_42_08_xan74s.png" },
    ],
    eventos: [
    
    ]
  },

  "obra-social": {
    nombre: "Directiva de Obra Social",
    versiculo: "A Jehová presta el que da al pobre, y el bien que ha hecho, se lo volverá a pagar. Proverbios 19:17",
    mision: "Socorrer a los necIesitados reflejando el amor de Cristo.",
    vision: "Un brazo extendido de misericordia en la comunidad.",
    youtubeIds: [" ","f_tgppPm0Yo" ],
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
    
    ]
  },

  "protemplo": {
    nombre: "Directiva Protemplo",
    versiculo: "Yo me alegré con los que me decián: A la casa de Jehová iremos. Salmos 122:1",
    youtubeIds: [" ","E7BM5TKwI5E"],
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

    ]
  },

  "brigadistas": {
    nombre: "Directiva de Brigadista",
    versiculo: "El avisado ve el mal y se esconde; más los simples pasan y reciben el daño. Proverbios 22:3",
    mision: "Garantizar la seguridad y el mal y se esconde; mas los simples pasan y reciben el daño. Proverbios 22:3",
    vision: "Cultura de prevención y cuidado mutuo.",
    youtubeIds: [" "],
    integrantes: [
      { id: 1, nombre: "Angelica Lemus", cargo: "PRESIDENTE(A)", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Mayra Poveda", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Sandra Cuellar", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      
    ]
  },

  "ujieres": {
    nombre: "Directiva de Ujieres",
    versiculo: "Porque mejor es un día en tus atrios que mil fuera de ellos. Salmos 84:10",
    youtubeIds: [" ","zP-UYrYnTKw","zP-UYrYnTKw&t"],
    mision: "Servir con excelencia en la recepción de la hermandad.",
    vision: "Orden y amor en cada servicio.",
    integrantes: [
      { id: 1, nombre: "Nohemi Henao", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Esperanza Rodriguez", cargo: "VICEPRESIDENTE", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771121571/ChatGPT_Image_14_feb_2026_21_12_15_dv6tfq.png" },
      { id: 3, nombre: "Alberto Garcia", cargo: "RECAUDADOR", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Maria Muñoz", cargo: "SECRETARIO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771856466/ChatGPT_Image_23_feb_2026_09_16_18_hdew3e.png" },
      { id: 5, nombre: "Mireya Polania", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771866903/ChatGPT_Image_23_feb_2026_11_57_40_hbxn8b.png" },
      { id: 6, nombre: "Flor Amanda", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 7, nombre: "Maria Perdomo", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 8, nombre: "Carlos Herrera", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 9, nombre: "José Collazos", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771594009/WhatsApp_Image_2026-02-19_at_10.50.06_PM_dmy23e.jpg" },
      { id: 10, nombre: "Miltón", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      
    ]
  },

  "familia": {
    nombre: "Directiva de Familia",
    versiculo: "Pero yo y mi casa serviremos a Jehová. Josué 24:15",
    mision: "Fortalecer el núcleo familiar bajo los principios bíblicos.",
    vision: "Hogares restaurados y saludables para la gloria de Dios.",
    youtubeIds:[" ", "YGpazkIaLt8"],
    integrantes: [
      { id: 1, nombre: "Estebán Zuñiga", cargo: "PRESIDENTE", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771605729/Gemini_Generated_Image_pcpshwpcpshwpcps_apugy0.png" },
      { id: 2, nombre: "Edith Poveda", cargo: "VICEPRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771628258/ChatGPT_Image_20_feb_2026_17_53_26_ebmpny.png" },
      { id: 3, nombre: "Maria Medina", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Eber Lozada", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Norma Santos", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 6, nombre: "Jorge Mendez", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      
    ]
  },

  // Agrega aquí los demás comités siguiendo este mismo formato...
};
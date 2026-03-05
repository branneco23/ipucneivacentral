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

// --- NUEVAS INTERFACES PARA LA HISTORIETA ---
export interface Capitulo {
  rango: string;
  contenido: string;
  cita: string;
  reto: string;
}

export interface Historieta {
  id: number;
  titulo: string;
  introduccion: string;
  capitulos: Capitulo[];
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
  historietas?: Historieta[]; // Corregido: Ahora es un array de objetos tipo Historieta
}

export const ComitesData: Record<string, Comite> = {
  "directiva-local": {
    nombre: "Directiva Local",
    versiculo: "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía. Salmos 133:1",
    mision: "Liderar la congregación en unidad y orden.",
    vision: "Crecimiento espiritual y administrativo constante.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: ["zzz", "UeHOBDBEh3I", "-5LE3FEj9C8", "TiJK-cLwEc0", "lWflt8Y7Uxo&t", "cobsHqlOBcs&t","nvLRZXq0QoU"],
    integrantes: [
      { id: 1, nombre: "Esteban Zuñiga", cargo: "PASTOR", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771334907/ChatGPT_Image_17_feb_2026_08_27_47_x5vyar.png" },
      { id: 2, nombre: "Fernando Betancourth", cargo: "TESORERO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771335047/ChatGPT_Image_17_feb_2026_08_30_12_fvdwh5.png" },
      { id: 3, nombre: "Maria Segrera", cargo: "SECRETARIO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771335131/ChatGPT_Image_16_feb_2026_19_03_12_oyqxgo.png" },
      { id: 4, nombre: "Crisanto Sanchez", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771335669/ChatGPT_Image_17_feb_2026_08_40_35_mpfion.png" },
      { id: 5, nombre: "Judith Vargas", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771287068/ChatGPT_Image_16_feb_2026_19_10_24_xqnrrn.png" },
      { id: 6, nombre: "Javier Zoque", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771435741/ChatGPT_Image_18_feb_2026_12_28_28_izq72z.png" },
      { id: 7, nombre: "Arnoldo Salinas", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771436378/ChatGPT_Image_18_feb_2026_12_39_04_tppsoj.png" },
    ],
    eventos: []
  },

  "escuela-dominical": {
    nombre: "Directiva Escuela Dominical",
    versiculo: "Instruye al niño en su camino, aun cuando fuere viejo no se apartará de él. Proverbios 22:6",
    mision: "Enseñar las sagradas escrituras a todas las edades.",
    vision: "Una iglesia bíblicamente fundamentada desde la infancia.",
    youtubeIds: ["zzz", "FhwfSZHjtBU", "YGpazkIaLt8", "fEQHPIhJm3Q", "ap63FfytNeE", "T3GPJ7u2Drs", "sg39LL8QkYk", "vhHx5mG337M"],
    fotoGrupal: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771734177/WhatsApp_Image_2026-02-21_at_10.32.15_PM_pcg9k9.jpg",
    integrantes: [
      { id: 1, nombre: "Jhon Fredy Zoque", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1772047567/ChatGPT_Image_25_feb_2026_14_18_54_rxvdgj.png" },
      { id: 2, nombre: "Enith Arias", cargo: "VICEPRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1772568243/ChatGPT_Image_3_mar_2026_15_01_58_khid18.png" },
      { id: 3, nombre: "Jader Alvis", cargo: "RECAUDADOR(A)", foto: "/img/comites/einer.png" },
      { id: 4, nombre: "Eidy Culma", cargo: "SECRETARIO(A)", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Mauricio Ardila", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771515433/ChatGPT_Image_19_feb_2026_10_34_54_sqf5qr.png" },
      { id: 6, nombre: "Jorge Charry", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771515433/ChatGPT_Image_19_feb_2026_10_36_40_voygky.png" },
      { id: 7, nombre: "Laura Zoque", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1772568243/ChatGPT_Image_3_mar_2026_14_58_11_vfqxah.png" },
    ],
    eventos: [
      { id: 1, titulo: "Una Cifra con Jesús", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771730261/WhatsApp_Video_2026-02-06_at_9.31.47_AM_fdexaq.mp4", tipo: "video", },
      { id: 2, titulo: "Los Cinco Panes y Los Dos Peces", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729894/WhatsApp_Video_2026-02-14_at_9.25.14_AM_z0rglf.mp4", tipo: "video", },
      { id: 3, titulo: "El Que Olvida Pierde", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729854/WhatsApp_Video_2026-02-06_at_10.01.33_AM_cf0yrd.mp4", tipo: "video", },
      { id: 4, titulo: "Llamados a Dejar Huella", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729868/WhatsApp_Video_2026-02-12_at_1.27.30_PM_rybn0a.mp4", tipo: "video", },
      { id: 5, titulo: "¿Te Habian Contado?", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729874/WhatsApp_Video_2026-02-14_at_9.25.28_AM_qfrqpo.mp4", tipo: "video", },
      { id: 6, titulo: "Niños, Elija Bien sus Amistades", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729867/WhatsApp_Video_2026-02-15_at_1.04.32_PM_m0tgxn.mp4", tipo: "video", },
      { id: 7, titulo: "La Ansiedad Desaparece", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729888/WhatsApp_Video_2026-02-16_at_8.48.09_AM_gka446.mp4", tipo: "video", },
      { id: 8, titulo: "La Ansiedad Desaparece", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771729888/WhatsApp_Video_2026-02-17_at_9.05.01_AM_jt58yr.mp4", tipo: "video", },
      { id: 9, titulo: "Grupo de Trabajo", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771734177/WhatsApp_Image_2026-02-21_at_10.32.15_PM_pcg9k9.jpg", tipo: "imagen", },
      { id: 10, titulo: "Cuando te Sientes Fuera", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771862796/WhatsApp_Video_2026-02-23_at_9.25.48_AM_k0hjpg.mp4", tipo: "video", },
      { id: 11, titulo: "¡Niños, Es Tiempo de Ponerse la Armadura de Dios!", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771862795/WhatsApp_Video_2026-02-23_at_9.25.48_AM_1_zxm82j.mp4", tipo: "video", },
      { id: 12, titulo: "Participacion Escuela Dominical 1", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771867240/WhatsApp_Image_2026-02-23_at_12.19.56_PM_ebgp3e.jpg", tipo: "imagen", },
      { id: 13, titulo: "Participacion Escuela Dominical 2", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771981201/WhatsApp_Image_2026-02-24_at_7.39.56_PM_vfc4hb.jpg", tipo: "imagen", },
      { id: 14, titulo: "Participacion Escuela Dominical 2", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1772031212/WhatsApp_Image_2026-02-24_at_9.18.57_PM_r9t2r2.jpg", tipo: "imagen", },
      { id: 15, titulo: "Participacion Escuela Dominical 2", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771981228/WhatsApp_Video_2026-02-24_at_7.47.18_PM_iltdqm.mp4", tipo: "video", }
    ],
    historietas: [
      {
        id: 1,
        titulo: "Un Niño Conforme al Corazón de Dios",
        introduccion: "¡Hola! Soy Jim y me alegra mucho conocerte. He invitado a un chico llamado Dylan a que nos acompañe en este viaje para descubrir lo que significa seguir a Jesús y ser un niño conforme a Su corazón.",
        capitulos: [
          {
            rango: "CAPÍTULO 1: MI CORAZÓN",
            contenido: `—¡Dylan! ¡Dylan! ¡Dylan Douglas! —gritó la Sra. Abrams. Pero Dylan estaba sumido en sus pensamientos. No fue hasta que su amigo Bart le dio un puñetazo en el brazo que Dylan volvió del mundo de los videojuegos. Le costó toda su fuerza de voluntad apartar su atención de los caballeros medievales y matar dragones para darse cuenta de que estaba en la escuela y todos lo miraban.

Después de un tímido “Duh” seguido de una mirada vacía, la Sra. Abrams, la profesora de inglés de Dylan, repitió su pregunta.

Verán, Dylan se había vuelto muy distraído desde que empezó a jugar videojuegos en casa de Bart. Dylan estaba enganchado. No podía dejar de pensar en batallas y estrategia militar. Estaba deseando que terminara la escuela para ir con Bart a casa a jugar más videojuegos. Las familias de Dylan y Bart eran amigos desde hacía mucho tiempo, y se entendía que los dos chicos trabajarían juntos en sus tareas hasta que la hermana mayor de Dylan, Helen, llegara del instituto para llevarlo a casa. ¡Pero Dylan sabía que no iba a permitir que un poco de tarea les impidiera afrontar su próximo reto de videojuegos!

**¡Diversión en la Palabra de Dios!**
Hay muchas cosas en la vida de un hombre que pueden distraerlo de lo verdaderamente importante. Para Dylan, eran los videojuegos. Lo distraían de sus estudios y de todo lo demás. No podía dejar de pensar en toda la diversión que podría tener jugando videojuegos.

Entonces, ¿cuál es el problema? ¿Qué tiene de malo un videojuego? ¿Qué tiene de malo divertirse? ¡Pues nada! Sobre todo si se hace después de haber cumplido con tus responsabilidades. Y siempre y cuando no se descontrole ni se vaya a los extremos. Pero el verdadero problema de Dylan era el enfoque de su corazón. Solo le preocupaba una cosa: ¡Dylan! Lo que necesitaba era comprender mejor dónde quiere Dios que sus hijos en crecimiento enfoquen sus corazones.

Sé que hablar del corazón no es cosa de hombres, pero acompáñenme mientras vemos por qué es tan importante.

Divirtámonos con el acróstico de abajo que dice CORAZÓN. Antes de empezar, busquen un bolígrafo o lápiz (puede ser de un color como azul o rojo). Luego, con el bolígrafo en la mano, emprendamos una aventura con Jesús y un viaje a través de la Palabra de Dios.

Al leer los versículos bíblicos de los siguientes capítulos, marca lo que te guste y aprendas. ¡Y siéntete libre de escribir en todo tu libro! A medida que avanzas, intenta responder las preguntas, aunque solo sea mentalmente. Y si no tienes un bolígrafo a mano o solo te apetece leer, ¡no te preocupes! Quiero que leer este libro sea divertido; no quiero que sientas que es otra tarea.

¡Allá vamos! Ora a Dios y pídele que obre en tu corazón. Luego, dediquemos un momento a deletrear CORAZÓN: el camino de Dios.

**C — Háganse un chequeo cardíaco.** ¡Vaya, Jesús tenía toda la razón cuando les dijo a quienes querían seguirlo: «Donde esté vuestro tesoro, allí estará también vuestro corazón» (Mateo 6:21). Para Dylan, es bastante obvio que su «tesoro» —el centro de su corazón— eran los videojuegos. Para otros chicos, el centro de su corazón puede ser el deporte o su deseo de ser popular en la escuela.

Eso nos lleva a la pregunta más importante de todas: ¿Dónde está tu tesoro? ¿Dónde está tu enfoque? ¿Dónde está tu corazón? Un niño conforme al corazón de Dios quiere asegurarse de que su tesoro —lo que él considera más valioso e importante del mundo— sea lo que Dios dice que debe ser.

Al comenzar esta aventura de seguir a Jesús y obedecerle, aquí tienes un versículo clave que te muestra lo que Dios quiere que sea lo primero en tu vida. Es Hechos 13:22, ¡y es dinamita! En este versículo, Dios describe el corazón del hombre que eligió para ser rey de su pueblo. Esto es lo que Dios dice:

"He encontrado en David, hijo de Jesé, un hombre conforme a mi corazón; hará todo lo que yo quiera que haga."

¿Qué hace una persona conforme al corazón de Dios que la distingue? Amigo mío, este es el objetivo de este libro: que te conviertas en un niño conforme al corazón de Dios, un niño que sigue a Dios y está dispuesto a embarcarse en la aventura de hacer lo que Dios quiere que haga. ¿Suena imposible? Pues no lo es. ¡Sigue leyendo!

**O — Experimenta el amor de Dios.** Sentir un corazón para Dios comienza con darte cuenta de que Él te ama. Por mucho que tus padres y abuelos te amen, ¿adivina qué? Nadie te ama más que Dios. Veamos lo que dice la Biblia sobre el amor de Dios:

"Dios es amor" (1 Juan 4:8). ¿Qué aprendes sobre Dios en este versículo?

"De tal manera amó Dios al mundo [¡incluyéndote a ti!] que dio a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna" (Juan 3:16). Jesús, el Hijo unigénito de Dios, murió por los pecadores. ¿Qué te dice esto sobre cuánto te ama Dios?

**R — Deja que Dios te guíe.** Saber que Dios te ama requiere una respuesta de tu parte. Una manera clave de demostrar tu amor por Dios es haciendo lo que Él quiere que hagas. Jesús nos dice en la Biblia lo importante que es hacer su voluntad. Dijo:

"Si me amáis, obedeceréis mis mandamientos" (Juan 14:15). ¿Qué hace un corazón que ama a Jesús?

Como ya hemos descubierto, un niño conforme al corazón de Dios es un niño que hará lo que Dios quiere que haga. Su razonamiento es el siguiente: «Si Dios quiere que haga esto, lo haré. Y si Dios no quiere que lo haga, ¡seguro que no lo haré!».

¿Te preguntas: "¿Cómo? ¿Cómo puedo saber qué quiere Dios que haga? ¿Cómo puedo estar seguro de lo que Él quiere?". ¡Tengo buenas noticias para ti! Dios ya te ha revelado su voluntad en su Palabra, la Biblia. Así que asegúrate de dedicar un tiempo cada día a leerla. Si no entiendes lo que lees o tienes preguntas, pregúntales a tus padres, a tu pastor o a tu maestro de escuela dominical. Dios te ha dado a estas personas para guiarte y ayudarte a entender lo que Dios quiere que hagas, cómo quiere que actúen y las decisiones que quiere que tomes.

"Tu palabra es lámpara a mis pies y lumbrera a mi camino" (Salmo 119:105).`,
            cita: "Mateo 6:21; Hechos 13:22; Salmo 119:105",
            reto: "Busca un bolígrafo y rodea en el texto las palabras que más te llamaron la atención sobre el corazón de David."
          }
        ]
      }
    ]
  },

  "misiones": {
    nombre: "Directiva Misiones y Evangelismo",
    versiculo: "Y les dijo: Id por todo el mundo y predicad el evengelio a toda criatura. Marcos 16: 15",
    mision: "Extender el reino de Dios a través de la predicación y el servicio social.",
    vision: "Una iglesia misionera que impacta su ciudad y el mundo.",
    fotoGrupal: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771536578/WhatsApp_Image_2026-02-08_at_3.52.59_PM_gnjtqk.jpg",
    youtubeIds: ["zzz", "3iHgaJodSug", "BZZJU_MTW1s", "ZkiViKRcLoA", "py3G9tjyZLY"],
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
      { id: 1, titulo: "Impacto Evangelistico", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771509567/WhatsApp_Image_2026-02-19_at_8.54.12_AM_kyovck.jpg", tipo: "imagen", },
      { id: 2, titulo: "Impacto Evangelistico", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771509567/WhatsApp_Image_2026-02-19_at_8.56.19_AM_cfon4h.jpg", tipo: "imagen", },
      { id: 3, titulo: "Impacto Evangelistico", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771509566/WhatsApp_Image_2026-02-19_at_8.55.06_AM_yrrbgv.jpg", tipo: "imagen", },
      { id: 4, titulo: "Impacto Evangelistico", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771510725/WhatsApp_Video_2026-01-21_at_7.20.31_PM_nb0t43.mp4", tipo: "video", },
      { id: 5, titulo: "Grupo de Trabajo", imagen: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771536578/WhatsApp_Image_2026-02-08_at_3.52.59_PM_gnjtqk.jpg", tipo: "imagen", },
      { id: 6, titulo: "Impacto Evangelistico Al Parque", imagen: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1772642883/WhatsApp_Video_2026-03-04_at_11.45.28_AM_fzt1q4.mp4", tipo: "video", }
    ]
  },

  "intercesion": {
    nombre: "Directiva Intercesión",
    versiculo: "Confesaos vuestras ofensas unos a otros, y orad unos por otros, para que seáis sanados, Santiago 5: 16",
    mision: "Levantar un altar de oración continuo por las necesidades de la iglesia.",
    vision: "Una iglesia fortalecida en la presencia de Dios a través del clamor.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: ["zzz", "UJm0bvnVknA"],
    integrantes: [
      { id: 1, nombre: "Esneda Tejada", cargo: "PRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 2, nombre: "Ana Romero", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/einer.png" },
      { id: 3, nombre: "Amparo Murcia", cargo: "SECRETARIO(A)", foto: "/img/comites/ruth.png" },
      { id: 4, nombre: "Margarita Laguna", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Lida Barrero", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
    ],
    eventos: []
  },

  "jovenes": {
    nombre: "Directiva Jóvenes",
    versiculo: "Acuérdate de tu creador en los días de tu juventud. Eclesiastés 12:1",
    mision: "Inspirar a la juventud a una vida de santidad y servicio.",
    vision: "Generación de relevo comprometida con el evangelio",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: ["zzz", "QNf7Q-If0GM", "5mCeHA_ULz8"],
    integrantes: [
      { id: 1, nombre: "Jonathan Zuñiga", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771259878/Nano_Banana_Pro_pon_la_imagen_de_medio_cuerpo__que_se_alcance_a_notar_un_poco_los_pantalones__y_algo_xfnnub.png" },
      { id: 2, nombre: "Elizabeth Sanchez", cargo: "RECAUDADOR(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771864697/ChatGPT_Image_23_feb_2026_11_35_47_hcstqu.png" },
      { id: 3, nombre: "Doraliz Chavarriaga", cargo: "SECRETARIO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771247008/ChatGPT_Image_16_feb_2026_08_02_42_rwccyw.png" },
      { id: 4, nombre: "Salomón Villamil", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771260029/ChatGPT_Image_16_feb_2026_08_05_18_gnnwtf.png" },
      { id: 5, nombre: "Stiven Osuna", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771334631/ChatGPT_Image_17_feb_2026_08_23_16_bjewpv.png" },
      { id: 6, nombre: "Aneika ", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771249060/c6ed5cb68c24407599d8f9d5dde5054b_ywbccx.png" },
    ],
    eventos: []
  },

  "damas-dorcas": {
    nombre: "Directiva Damas Dorcas",
    versiculo: "Mujer virtuosa, ¿Quien la hallará? Porque su estima sobrepasa largamente a la de las piedras presiosas. Proverbios 31:10",
    mision: "Fomentar el crecimiento espíritual y la labor social de la mujer cristiana.",
    vision: "Mujeres sabias que edifican su casa y su iglesia.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    youtubeIds: ["zzz", "txKKhJm-Yh8", "5iOe2oHhiTs"],
    integrantes: [
      { id: 1, nombre: "Edith Poveda", cargo: "PRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1770734508/ChatGPT_Image_10_feb_2026_09_41_22_petryp.png" },
      { id: 2, nombre: "Marlen Mantilla", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 3, nombre: "Norma Santos", cargo: "SECRETARIO(A)", foto: "/img/comites/einer.png" },
      { id: 4, nombre: "Cristina Mayorca", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Cielo Lemus", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
    ],
    eventos: []
  },

  "alabanza": {
    nombre: "Directiva de Alabanza",
    versiculo: "Cantad a él, cantadle salmos; Hablad de todas sus maravillas. 1 Crónicas 16:9",
    mision: "Guiar a la iglesia en adoración genuina.",
    vision: "Excelencia musical para la gloria de Dios.",
    youtubeIds: ["zzz", "5MmGHLIOrIw"],
    integrantes: [
      { id: 1, nombre: "Esteban Zuñiga", cargo: "PRESIDENTE", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771605778/Gemini_Generated_Image_zg6n7hzg6n7hzg6n_f5k9ic.png" },
      { id: 2, nombre: "Jaime Pastrana", cargo: "VICEPRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Cristian Sanchez", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Dagoberto Conde", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Claudia Murcia", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771632176/Gemini_Generated_Image_rowdtzrowdtzrowd_b8wb9n.png" },
    ],
    eventos: []
  },

  "comunicaciones": {
    nombre: "Directiva de Comunicaciones",
    versiculo: "¡Cuán hermosos son sobre los montes los pies del que trae alegres nuevas! Isaías 52:7",
    mision: "Difundir el mensaje de salvación a través de medios digitales y técnicos.",
    vision: "Ser el puente tecnológico para la expansión del evangelio.",
    youtubeIds: ["zzz", "pIbRtZFnlD8"],
    integrantes: [
      { id: 1, nombre: "Paula Ramires", cargo: "PRESIDENTE", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771960910/ChatGPT_Image_24_feb_2026_14_19_24_slyn3t.png" },
      { id: 2, nombre: "Lorem Lemus", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Fernando Betancourth", cargo: "SONIDISTA", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771733457/Gemini_Generated_Image_mwhmcvmwhmcvmwhm_imvdej.png" },
      { id: 4, nombre: "Jonathan Zuñiga", cargo: "SONIDISTA", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771735352/ChatGPT_Image_21_feb_2026_23_42_08_xan74s.png" },
    ],
    eventos: []
  },

  "obra-social": {
    nombre: "Directiva de Obra Social",
    versiculo: "A Jehová presta el que da al pobre, y el bien que ha hecho, se lo volverá a pagar. Proverbios 19:17",
    mision: "Socorrer a los necIesitados reflejando el amor de Cristo.",
    vision: "Un brazo extendido de misericordia en la comunidad.",
    youtubeIds: ["zzz", "f_tgppPm0Yo"],
    integrantes: [
      { id: 1, nombre: "Luz Soto", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Maria Lozano", cargo: "VICEPRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Ester Garcia", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Fernando Betancourth", cargo: "SONIDISTA", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Araceli Lopez", cargo: "RECAUDADOR", foto: "/img/comites/joven1.png" },
      { id: 6, nombre: "Reinerio Ardila", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 7, nombre: "Jenny Poveda", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
    ],
    eventos: []
  },

  "protemplo": {
    nombre: "Directiva Protemplo",
    versiculo: "Yo me alegré con los que me decián: A la casa de Jehová iremos. Salmos 122:1",
    youtubeIds: ["zzz", "E7BM5TKwI5E"],
    mision: "Trabajar por el embellecimiento y mantenimiento del templo.",
    vision: "Un lugar digno para adorar a Dios.",
    integrantes: [
      { id: 1, nombre: "Norma Sterling", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Javier Lemus", cargo: "VICEPRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Lucelida Tovar", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Luz Henandez", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Gerson Avilés", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
    ],
    eventos: []
  },

  "brigadistas": {
    nombre: "Directiva de Brigadista",
    versiculo: "El avisado ve el mal y se esconde; más los simples pasan y reciben el daño. Proverbios 22:3",
    mision: "Garantizar la seguridad y el mal y se esconde; mas los simples pasan y reciben el daño. Proverbios 22:3",
    vision: "Cultura de prevención y cuidado mutuo.",
    youtubeIds: ["zzz"],
    integrantes: [
      { id: 1, nombre: "Angelica Lemus", cargo: "PRESIDENTE(A)", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Mayra Poveda", cargo: "VICEPRESIDENTE(A)", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Sandra Cuellar", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
    ],
    eventos: []
  },

  "ujieres": {
    nombre: "Directiva de Ujieres",
    versiculo: "Porque mejor es un día en tus atrios que mil fuera de ellos. Salmos 84:10",
    youtubeIds: ["zzz", "KDdxBgQh7Ec", "zP-UYrYnTKw", "zP-UYrYnTKw&t"],
    mision: "Servir con excelencia en la recepción de la hermandad.",
    vision: "Orden y amor en cada servicio.",
    integrantes: [
      { id: 1, nombre: "Nohemi Henao", cargo: "PRESIDENTE", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1772212115/ChatGPT_Image_27_feb_2026_12_07_41_hqbrki.png" },
      { id: 2, nombre: "Esperanza Rodriguez", cargo: "VICEPRESIDENTE", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771121571/ChatGPT_Image_14_feb_2026_21_12_15_dv6tfq.png" },
      { id: 3, nombre: "Alberto Garcia", cargo: "RECAUDADOR", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Maria Muñoz", cargo: "SECRETARIO(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771856466/ChatGPT_Image_23_feb_2026_09_16_18_hdew3e.png" },
      { id: 5, nombre: "Mireya Polania", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771971226/ChatGPT_Image_23_feb_2026_11_55_52_cb7fkf.png" },
      { id: 6, nombre: "Flor Amanda", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 7, nombre: "Maria Perdomo", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 8, nombre: "Carlos Herrera", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 9, nombre: "José Collazos", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771594009/WhatsApp_Image_2026-02-19_at_10.50.06_PM_dmy23e.jpg" },
      { id: 10, nombre: "Miltón Valdes", cargo: "VOCAL", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1772124889/ChatGPT_Image_26_feb_2026_11_50_49_cu8g9f.png" },
    ],
    eventos: []
  },

  "familia": {
    nombre: "Directiva de Familia",
    versiculo: "Pero yo y mi casa serviremos a Jehová. Josué 24:15",
    mision: "Fortalecer el núcleo familiar bajo los principios bíblicos.",
    vision: "Hogares restaurados y saludables para la gloria de Dios.",
    youtubeIds: ["zzz", "YGpazkIaLt8"],
    integrantes: [
      { id: 1, nombre: "Estebán Zuñiga", cargo: "PRESIDENTE", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771605729/Gemini_Generated_Image_pcpshwpcpshwpcps_apugy0.png" },
      { id: 2, nombre: "Edith Poveda", cargo: "VICEPRESIDENTE(A)", foto: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1771628258/ChatGPT_Image_20_feb_2026_17_53_26_ebmpny.png" },
      { id: 3, nombre: "Maria Medina", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Eber Lozada", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 5, nombre: "Norma Santos", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
      { id: 6, nombre: "Jorge Mendez", cargo: "VOCAL", foto: "/img/comites/joven1.png" },
    ],
    eventos: []
  },
};
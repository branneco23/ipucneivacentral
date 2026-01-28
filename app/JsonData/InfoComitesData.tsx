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
    integrantes: [
      { id: 1, nombre: "Esteban Zuñiga", cargo: "PASTOR", foto: "/img/comites/ever.png" },
      { id: 2, nombre: "Fernando Betancourth", cargo: "TESORERO(A)", foto: "/img/comites/einer.png" },
      { id: 3, nombre: "Maria Segrera", cargo: "SECRETARIO(A)", foto: "/img/comites/ruth.png" },
      { id: 4, nombre: "Crisanto Sanchez", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Judith Vargas", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
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
    nombre: "Directiva Interceción",
    versiculo: "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía. Salmos 133:1",
    mision: "Liderar la congregación en unidad y orden.",
    vision: "Crecimiento espiritual y administrativo constante.",
    fotoGrupal: "/img/comites/portada-local.jpg",
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
    versiculo: "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía. Salmos 133:1",
    mision: "Liderar la congregación en unidad y orden.",
    vision: "Crecimiento espiritual y administrativo constante.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    integrantes: [
      { id: 1, nombre: "Jonathan Zuñiga", cargo: "PRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 2, nombre: "Elizabeth Sanchez", cargo: "RECAUDADOR(A)", foto: "/img/comites/einer.png" },
      { id: 3, nombre: "Doraliz Chavarriaga", cargo: "SECRETARIO(A)", foto: "/img/comites/ruth.png" },
      { id: 4, nombre: "Salomón Villamil", cargo: "VOCAL", foto: "/img/comites/ruth.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "damas-dorcas": {
    nombre: "Directiva Damas Dorcas",
    versiculo: "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía. Salmos 133:1",
    mision: "Liderar la congregación en unidad y orden.",
    vision: "Crecimiento espiritual y administrativo constante.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    integrantes: [
      { id: 1, nombre: "Edith Poveda", cargo: "PRESIDENTE(A)", foto: "/img/comites/ever.png" },
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
    versiculo: "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía. Salmos 133:1",
    mision: "Liderar la congregación en unidad y orden.",
    vision: "Crecimiento espiritual y administrativo constante.",
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
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "misiones": {
    nombre: "Directiva Misiones y Evangelismo",
    versiculo: "Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía. Salmos 133:1",
    mision: "Liderar la congregación en unidad y orden.",
    vision: "Crecimiento espiritual y administrativo constante.",
    fotoGrupal: "/img/comites/portada-local.jpg",
    integrantes: [
      { id: 1, nombre: "Alexander Prieto", cargo: "PRESIDENTE(A)", foto: "/img/comites/ever.png" },
      { id: 2, nombre: "Alexandra Granda", cargo: "LIDER DE BIS Y REFAM", foto: "/img/comites/ever.png" },
      { id: 3, nombre: "Mary Molano", cargo: "LIDER DE MISIONES NACIONALES", foto: "/img/comites/einer.png" },
      { id: 4, nombre: "Nicolas Duarte", cargo: "LIDER DE MISIONES ESPECIALES", foto: "/img/comites/ruth.png" },
      { id: 5, nombre: "Campoelias Ochoa", cargo: "LIDER DE MISIONES RESTAURATIVAS", foto: "/img/comites/ruth.png" },
      { id: 6, nombre: "Milton", cargo: "LIDER DE MISIONES RESTAURATIVAS", foto: "/img/comites/ruth.png" },
      { id: 7, nombre: "Nidia Laverde", cargo: "LIDER DE MISIONES INFANTIL", foto: "/img/comites/ruth.png" },
      { id: 8, nombre: "Claudia Murcia", cargo: "LIDER DE MISIONES HOSPITALARIAS", foto: "/img/comites/ruth.png" },
      { id: 9, nombre: "Vicente Artuduaga", cargo: "LIDER DE MISIONES EN INSTITUCIONES PÚBLICAS", foto: "/img/comites/ruth.png" },
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
    versiculo: "Cantad a él, cantadle salmos; Hablad de todas sus maravillas. 1 Crónicas 16:9",
    mision: "Guiar a la iglesia en adoración genuina.",
    vision: "Excelencia musical para la gloria de Dios.",
    integrantes: [
      { id: 1, nombre: "Paula Ramires", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Lorem Lemus", cargo: "SECRETARIO(A)", foto: "/img/comites/joven1.png" },
      { id: 3, nombre: "Fernando Betancourth", cargo: "SONIDISTA", foto: "/img/comites/joven1.png" },
      { id: 4, nombre: "Jonathan Zuñiga", cargo: "SONIDISTA", foto: "/img/comites/joven1.png" },
    ],
    eventos: [
      { id: 1, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 2, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" },
      { id: 3, titulo: "Culto Especial Protemplo", imagen: "/img/eventos/protemplo-enero.jpg" }
    ]
  },
  "obra-social": {
    nombre: "Directiva de Obra Social",
    versiculo: "Cantad a él, cantadle salmos; Hablad de todas sus maravillas. 1 Crónicas 16:9",
    mision: "Guiar a la iglesia en adoración genuina.",
    vision: "Excelencia musical para la gloria de Dios.",
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
    versiculo: "Alabad a Jehová, porque él es bueno; porque para siempre es su misericordia. Salmos 106:1",
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
    versiculo: "Alabad a Jehová, porque él es bueno; porque para siempre es su misericordia. Salmos 106:1",
    mision: "Trabajar por el embellecimiento y mantenimiento del templo.",
    vision: "Un lugar digno para adorar a Dios.",
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
    mision: "Servir con excelencia en la recepción de la hermandad.",
    vision: "Orden y amor en cada servicio.",
    integrantes: [
      { id: 1, nombre: "Nohemi Henao", cargo: "PRESIDENTE", foto: "/img/comites/joven1.png" },
      { id: 2, nombre: "Esperanza Rodriguez", cargo: "VICEPRESIDENTE", foto: "/img/comites/joven1.png" },
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
    versiculo: "Porque mejor es un día en tus atrios que mil fuera de ellos. Salmos 84:10",
    mision: "Servir con excelencia en la recepción de la hermandad.",
    vision: "Orden y amor en cada servicio.",
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
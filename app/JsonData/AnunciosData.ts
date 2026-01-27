// app/JsonData/ParalexData.ts

export interface ParalexItem {
  id: number;
  tag: string;
  number: string;
  title: string;        // ← STRING PLANO
  location: string;
  year: string;
  bg: string;
}

export const PARALEX_DATA: ParalexItem[] = [
  {
    id: 1,
    tag: "Próximos Eventos",
    number: "01",
    title: "Convención Nacional | de Jóvenes",
    location: "Movistar Arena, Bogotá",
    year: "2026",
    bg: "/img/Paralex1.jpg",
  },
  {
    id: 2,
    tag: "Anuncios Local",
    number: "02",
    title: "Escuela Dominical | Especial",
    location: "Sede Central, Neiva",
    year: "2026",
    bg: "/img/Paralex2.jpg",
  },
  {
    id: 3,
    tag: "Misiones",
    number: "03",
    title: "Impacto Evangelístico | Huila",
    location: "Zonas Rurales",
    year: "2026",
    bg: "/img/Paralex3.jpg",
  },
];

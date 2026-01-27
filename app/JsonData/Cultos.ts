export interface CultoAcordeon {
  id: string;
  titulo: string;
  contenido: string[];
}

export const CULTOS_ACORDEON: CultoAcordeon[] = [
  {
    id: "direccion",
    titulo: "Dirección",
    contenido: [
      "Calle 8 # 9-24",
      "Barrio El Altico",
      "Neiva, Huila"
    ]
  },
  {
    id: "horarios",
    titulo: "Horarios de Culto",
    contenido: [
      "Martes: 7:00 pm – 8:00 pm | Oración",
      "Jueves: 7:00 pm – 8:00 pm | Dorcas y Caballeros",
      "Sábados: 7:00 pm – 8:00 pm | Jóvenes",
      "Domingos:",
      "• 9:30 am – 12:00 am | Escuela Dominical",
    ]
  }
];

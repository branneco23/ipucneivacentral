export interface DevocionalDia {
  id: number;
  diaSemana: number; 
  nombreDia: string;
  grupo: string;
  link: string;
  hora: string;
}

export const DEVOCIONALES_SEMANALES: DevocionalDia[] = [
  { 
    id: 1, diaSemana: 1, nombreDia: "Lunes", 
    grupo: "Comite Jóvenes", 
    link: "https://meet.google.com/aaa-bbb-ccc ", 
    hora: "4:30 AM" 
  },
  { 
    id: 2, diaSemana: 2, nombreDia: "Martes", 
    grupo: "Comite Intercesión", 
    link: "https://meet.google.com/aaa-bbbb-ccc", 
    hora: "4:30 AM" 
  },
  { 
    id: 3, diaSemana: 3, nombreDia: "Miércoles", 
    grupo: "Un Despertar con Dios", 
    link: "https://meet.google.com/fyn-spku-adn", 
    hora: "4:30 AM" 
  },
  { 
    id: 4, diaSemana: 4, nombreDia: "Jueves", 
    grupo: "Comite de Intercesión", 
    link: "https://meet.google.com/aaa-bbbb-ccc", 
    hora: "4:30 AM" 
  },
  { 
    id: 5, diaSemana: 5, nombreDia: "Viernes", 
    grupo: "Un clamor por Nuestros Hijos", 
    link: "https://meet.google.com/bbb-bbbb-bbb", 
    hora: "4:30 AM" 
  }
];
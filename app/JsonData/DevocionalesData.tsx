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
    link: "https://meet.google.com/twz-guuz-jwe ", 
    hora: "4:30 AM" 
  },
  { 
    id: 2, diaSemana: 2, nombreDia: "Martes", 
    grupo: "Comite Ujieres y Brigadistas", 
    link: "https://meet.google.com/jym-ssgb-wit ", 
    hora: "4:30 AM" 
  },
  { 
    id: 3, diaSemana: 3, nombreDia: "Miércoles", 
    grupo: "Un Despertar con Dios", 
    link: "https://meet.google.com/ikc-gfgp-dui", 
    hora: "4:30 AM" 
  },
  { 
    id: 4, diaSemana: 4, nombreDia: "Jueves", 
    grupo: "Comite de Intercesión", 
    link: "https://meet.google.com/omo-vtqs-auc", 
    hora: "4:30 AM" 
  },
  { 
    id: 5, diaSemana: 5, nombreDia: "Viernes", 
    grupo: "Comite de Alabanza", 
    link: "https://meet.google.com/bbb-bbbb-bbb", 
    hora: "4:30 AM" 
  }
];
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
    grupo: "Sociedad de Damas", 
    link: "https://meet.google.com/xxx-xxxx-xxx", 
    hora: "4:30 AM" 
  },
  { 
    id: 2, diaSemana: 2, nombreDia: "Martes", 
    grupo: "Sociedad de Jóvenes", 
    link: "https://meet.google.com/yyy-yyyy-yyy", 
    hora: "4:30 AM" 
  },
  { 
    id: 3, diaSemana: 3, nombreDia: "Miércoles", 
    grupo: "Cuerpo de Diáconos", 
    link: "https://meet.google.com/zzz-zzzz-zzz", 
    hora: "4:30 AM" 
  },
  { 
    id: 4, diaSemana: 4, nombreDia: "Jueves", 
    grupo: "Escuela Dominical", 
    link: "https://meet.google.com/aaa-aaaa-aaa", 
    hora: "4:30 AM" 
  },
  { 
    id: 5, diaSemana: 5, nombreDia: "Viernes", 
    grupo: "Ministerio de Alabanza", 
    link: "https://meet.google.com/bbb-bbbb-bbb", 
    hora: "4:30 AM" 
  }
];
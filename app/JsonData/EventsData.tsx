// app/JsonData/EventsData.ts

export interface CultoAcordeon {
  id: string;
  titulo: string;
  contenido: string[];
}

export interface EventoCalendario {
  id: string;
  titulo: string;
  fecha: string;    // YYYY-MM-DD
  fechaFin?: string; // Opcional para rangos
  inicio: string;
  fin: string;
  color?: string;
}

/* ===============================
   ACORDEÓN DE HORARIOS / INFO
================================ */
export const CULTOS_ACORDEON: CultoAcordeon[] = [
  {
    id: "direccion",
    titulo: "Dirección",
    contenido: ["Calle 8 # 9-24", "Barrio El Altico", "Neiva, Huila"]
  },
  {
    id: "horarios",
    titulo: "Horarios de Culto",
    contenido: [
      "Martes, Jueves y Sábados: 7:00 pm – 8:00 pm",
      "Domingos: 9:30 am – 12:00 am"
    ]
  },
  {
    id: "contacto",
    titulo: "Contáctanos",
    contenido: ["WhatsApp: +57 3XX XXX XXXX", "Correo: contacto@ipucneiva.org"]
  }
];

/* ===============================
   CALENDARIO DE EVENTOS 2026
================================ */
export const EVENTOS_ANUALES_2026: EventoCalendario[] = [
  // --- ENERO ---
  { id: "jan-01", titulo: "Culto Junta Local", fecha: "2026-01-06", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "jan-02", titulo: "Culto Junta Local", fecha: "2026-01-08", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "jan-03", titulo: "Culto Junta Local", fecha: "2026-01-10", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "jan-04", titulo: "Día Misionero «Misiones y Evangelismo»", fecha: "2026-01-11", inicio: "09:30", fin: "12:00", color: "#FF0000" },
  { id: "jan-05", titulo: "Culto de Jóvenes", fecha: "2026-01-13", inicio: "19:00", fin: "20:00", color: "#F58E27" },
  { id: "jan-06", titulo: "Culto Junta Local", fecha: "2026-01-15", inicio: "19:00", fin: "20:00", color: "#008000" },
  { id: "jan-07", titulo: "Culto Escuela Dominical", fecha: "2026-01-17", inicio: "19:00", fin: "20:00", color: "#FAA18F" },
  { id: "jan-08", titulo: "Culto de Junta Local", fecha: "2026-01-18", inicio: "09:30", fin: "12:00", color: "#008000" },
  { id: "jan-09", titulo: "Marcha del Mercado", fecha: "2026-01-18", inicio: "09:30", fin: "12:00", color: "#AA0DDE" },
  { id: "jan-10", titulo: "1ra Asamblea de Directivas", fecha: "2026-01-18", inicio: "15:00", fin: "12:00", color: "#4D27F5" },
  { id: "jan-11", titulo: "Culto Ujieres y brigaditas", fecha: "2026-01-20", inicio: "19:00", fin: "20:00", color: "#F5276C" },
  { id: "jan-12", titulo: "Culto Damas Dorcas «rayos de luz»", fecha: "2026-01-22", inicio: "19:00", fin: "20:00", color: "#F5F527" },
  { id: "jan-13", titulo: "Culto Protemplo", fecha: "2026-01-24", inicio: "19:00", fin: "20:00", color: "#4D27F5" },
  { id: "jan-14", titulo: "Culto Departamento de Familia", fecha: "2026-01-25", inicio: "09:30", fin: "12:00", color: "#F5275B" },
  { id: "jan-15", titulo: "Culto de Obra Social", fecha: "2026-01-27", inicio: "19:00", fin: "20:00", color: "#AA0DDE" },
  { id: "jan-16", titulo: "Culto Junta Local", fecha: "2026-01-29", inicio: "19:00", fin: "20:00", color: "#008000" },
  { id: "jan-17", titulo: "Culto Misiones y Evangelismo", fecha: "2026-01-31", inicio: "19:00", fin: "20:00", color: "#FF0000" },
  { id: "jan-18", titulo: "Encuentro de Servidores", fecha: "2026-01-31", inicio: "19:00", fin: "20:00", color: "#4D27F5" },

  // --- FEBRERO ---
  { id: "feb-01", titulo: "Bienvenida a los Niños", fecha: "2026-02-01", inicio: "09:30", fin: "12:00", color: "#FF0000" },
  { id: "feb-02", titulo: "Convocatoria de Alabanza", fecha: "2026-02-01", inicio: "09:30", fin: "12:00", color: "#AE02F7" },
  { id: "feb-03", titulo: "Culto Misiones y Evangelismo", fecha: "2026-02-01", inicio: "09:30", fin: "12:00", color: "#FAA18F" },
  { id: "feb-04", titulo: "Culto DECOM y Sonido", fecha: "2026-02-03", inicio: "19:00", fin: "20:00", color: "#27F5B7" },
  { id: "feb-05", titulo: "Culto Junta Local", fecha: "2026-02-05", inicio: "19:00", fin: "20:00", color: "#008000" },
  { id: "feb-06", titulo: "Brigada de Limpieza a Sonido", fecha: "2026-02-06", inicio: "08:00", fin: "12:00", color: "#27F5B7" },
  { id: "feb-07", titulo: "Ensayo de Música", fecha: "2026-02-07", inicio: "16:00", fin: "17:00", color: "#AE02F7" },
  { id: "feb-08", titulo: "Culto de Alabanza", fecha: "2026-02-07", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "feb-09", titulo: "Dominical del Denario", fecha: "2026-02-08", inicio: "09:30", fin: "12:00", color: "#008000" },
  { id: "feb-10", titulo: "Desayuno de Ujieres", fecha: "2026-02-08", inicio: "07:30", fin: "08:00", color: "#F5276C" },
  { id: "feb-11", titulo: "Culto de Intercesión", fecha: "2026-02-10", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "feb-12", titulo: "Culto de Junta Local", fecha: "2026-02-12", inicio: "19:00", fin: "20:00", color: "#008000" },
  { id: "feb-13", titulo: "Culto de Jóvenes", fecha: "2026-02-14", inicio: "19:00", fin: "20:00", color: "#F58E27" },
  { id: "feb-14", titulo: "Capacitación sonido y limpieza", fecha: "2026-02-14", inicio: "09:00", fin: "15:00", color: "#27F5B7" },
  { id: "feb-15", titulo: "Capacitación técnica Alabanza", fecha: "2026-02-14", inicio: "09:00", fin: "15:00", color: "#AE02F7" },
  { id: "feb-16", titulo: "Culto de Junta Local", fecha: "2026-02-15", inicio: "09:30", fin: "12:00", color: "#008000" },
  { id: "feb-17", titulo: "Marcha del Mercado", fecha: "2026-02-15", inicio: "09:30", fin: "12:00", color: "#AA0DDE" },
  { id: "feb-18", titulo: "Culto de Damas Dorcas", fecha: "2026-02-17", inicio: "19:00", fin: "20:00", color: "#F5F527" },
  { id: "feb-19", titulo: "Culto de Junta Local", fecha: "2026-02-19", inicio: "19:00", fin: "20:00", color: "#008000" },
  { id: "feb-20", titulo: "Culto de Misiones y Evangelismo", fecha: "2026-02-21", inicio: "19:00", fin: "20:00", color: "#FF0000" },
  { id: "feb-21", titulo: "Ayuno General", fecha: "2026-02-21", inicio: "07:00", fin: "15:00", color: "#008000" },
  { id: "feb-22", titulo: "Culto de Departamento de Familia", fecha: "2026-02-22", inicio: "09:30", fin: "12:00", color: "#F5275B" },
  { id: "feb-23", titulo: "Culto de Escuela Dominical", fecha: "2026-02-24", inicio: "19:00", fin: "20:00", color: "#FAA18F" },
  { id: "feb-24", titulo: "Culto de Junta Local", fecha: "2026-02-26", inicio: "19:00", fin: "20:00", color: "#008000" },
  { id: "feb-25", titulo: "Vigilia de Oración - Alabanza", fecha: "2026-02-26", inicio: "19:00", fin: "23:00", color: "#AE02F7" },
  { id: "feb-26", titulo: "Culto de Ujieres y brigaditas", fecha: "2026-02-28", inicio: "19:00", fin: "20:00", color: "#F5276C" },
  { id: "feb-27", titulo: "Evangelismo al Parque", fecha: "2026-02-28", inicio: "14:00", fin: "16:00", color: "#008000" },

  // --- MARZO ---
  { id: "mar-01", titulo: "Día misionero", fecha: "2026-03-01", inicio: "09:30", fin: "12:00", color: "#FF0000" },
  { id: "mar-02", titulo: "Culto de Protemplo", fecha: "2026-03-03", inicio: "19:00", fin: "20:00", color: "#4D27F5" },
  { id: "mar-03", titulo: "Culto de Junta Local", fecha: "2026-03-05", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "mar-04", titulo: "Culto de Obra Social", fecha: "2026-03-07", inicio: "19:00", fin: "20:00", color: "#AA0DDE" },
  { id: "mar-05", titulo: "Ensayo Música", fecha: "2026-03-07", inicio: "16:00", fin: "17:00", color: "#AE02F7" },
  { id: "mar-06", titulo: "Taller Damas Dorcas", fecha: "2026-03-07", inicio: "15:00", fin: "16:00", color: "#F5F527" },
  { id: "mar-07", titulo: "Dominical Denario", fecha: "2026-03-08", inicio: "09:30", fin: "12:00", color: "#2563eb" }, // Limpiado duplicado
  { id: "mar-08", titulo: "Culto de Decom y Sonido", fecha: "2026-03-10", inicio: "19:00", fin: "20:00", color: "#27F5B7" },
  { id: "mar-09", titulo: "Culto de Junta Local", fecha: "2026-03-12", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "mar-10", titulo: "Culto de Damas Dorcas", fecha: "2026-03-14", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "mar-11", titulo: "Capacitación Ujieres", fecha: "2026-03-14", inicio: "16:00", fin: "15:00", color: "#F5276C" },
  { id: "mar-12", titulo: "Intercambio de Alabanza", fecha: "2026-03-14", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "mar-13", titulo: "Culto de Junta Local", fecha: "2026-03-15", inicio: "09:30", fin: "12:00", color: "#2563eb" },
  { id: "mar-14", titulo: "Culto de Misiones y Evangelismo", fecha: "2026-03-17", inicio: "19:00", fin: "20:00", color: "#FF0000" },
  { id: "mar-15", titulo: "Culto de Junta Local", fecha: "2026-03-19", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "mar-16", titulo: "Culto de Jóvenes", fecha: "2026-03-21", inicio: "19:00", fin: "20:00", color: "#F58E27" },
  { id: "mar-17", titulo: "Taller Formación Escuela Dominical", fecha: "2026-03-21", inicio: "15:00", fin: "16:00", color: "#FAA18F" },
  { id: "mar-18", titulo: "Ensayo Música", fecha: "2026-03-21", inicio: "16:00", fin: "17:00", color: "#AE02F7" },
  { id: "mar-19", titulo: "Cumpleaños Damas Dorcas", fecha: "2026-03-21", inicio: "16:00", fin: "17:00", color: "#F5F527" },
  { id: "mar-20", titulo: "Asamblea General Ministros", fecha: "2026-03-22", fechaFin: "2026-03-27", inicio: "08:00", fin: "20:00", color: "#4D27F5" },
  { id: "mar-21", titulo: "Culto Junta Local", fecha: "2026-03-22", inicio: "09:30", fin: "12:00", color: "#2563eb" },
  { id: "mar-22", titulo: "Marcha del Mercado", fecha: "2026-03-22", inicio: "09:30", fin: "12:00", color: "#AA0DDE" },
  { id: "mar-23", titulo: "Integración de Jóvenes", fecha: "2026-03-22", inicio: "16:00", fin: "18:00", color: "#F58E27" },
  { id: "mar-24", titulo: "Salida Ujieres Finca", fecha: "2026-03-23", inicio: "16:00", fin: "18:00", color: "#F5276C" },
  { id: "mar-25", titulo: "Mantenimiento Equipos Decom", fecha: "2026-03-23", inicio: "16:00", fin: "18:00", color: "#27F5B7" },
  { id: "mar-26", titulo: "Culto Escuela Dominical", fecha: "2026-03-24", inicio: "19:00", fin: "20:00", color: "#27F5B7" },
  { id: "mar-27", titulo: "Culto Junta Local", fecha: "2026-03-26", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "mar-28", titulo: "Impacto Evangelistico Musical", fecha: "2026-03-27", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "mar-29", titulo: "Ensayo Tarde de Cuerdas", fecha: "2026-03-28", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "mar-30", titulo: "Dominical Depto Familia", fecha: "2026-03-29", inicio: "09:30", fin: "12:00", color: "#F5275B" },
  { id: "mar-31", titulo: "Culto de Ujieres y Brigadistas", fecha: "2026-03-31", inicio: "09:30", fin: "12:00", color: "#F5276C" },

  // --- ABRIL ---
  { id: "apr-01", titulo: "Ayuno Escuela Dominical", fecha: "2026-04-01", inicio: "05:30", fin: "12:00", color: "#FAA18F" },
  { id: "apr-02", titulo: "Vigilia General Intercesión", fecha: "2026-04-02", inicio: "19:00", fin: "23:00", color: "#2563eb" },
  { id: "apr-03", titulo: "Culto de Protemplo", fecha: "2026-04-04", inicio: "19:00", fin: "20:00", color: "#4D27F5" },
  { id: "apr-04", titulo: "Día Misionero", fecha: "2026-04-05", inicio: "09:30", fin: "12:00", color: "#FF0000" },
  { id: "apr-05", titulo: "2da Asamblea de Directivas", fecha: "2026-04-05", inicio: "15:00", fin: "16:00", color: "#FF0000" },
  { id: "apr-06", titulo: "Culto de Obra Social", fecha: "2026-04-07", inicio: "19:00", fin: "20:00", color: "#AA0DDE" },
  { id: "apr-07", titulo: "Culto de Junta Local", fecha: "2026-04-09", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "apr-08", titulo: "Culto de Decom y Sonido", fecha: "2026-04-11", inicio: "19:00", fin: "20:00", color: "#27F5B7" },
  { id: "apr-09", titulo: "Dominical del Denario", fecha: "2026-04-12", inicio: "09:30", fin: "12:00", color: "#27F5B7" },
  { id: "apr-10", titulo: "Actividad de jóvenes", fecha: "2026-04-12", inicio: "16:00", fin: "18:00", color: "#F58E27" },
  { id: "apr-11", titulo: "Culto de Intercesión", fecha: "2026-04-14", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "apr-12", titulo: "Culto de Junta Local", fecha: "2026-04-16", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "apr-13", titulo: "Culto de Jóvenes", fecha: "2026-04-18", inicio: "19:00", fin: "20:00", color: "#F58E27" },
  { id: "apr-14", titulo: "Ayuno Misión Restauración", fecha: "2026-04-18", inicio: "05:00", fin: "12:00", color: "#FF0000" },
  { id: "apr-15", titulo: "Culto Escuela Dominical", fecha: "2026-04-19", inicio: "09:30", fin: "12:00", color: "#2563eb" },
  { id: "apr-16", titulo: "Marcha del Mercado", fecha: "2026-04-19", inicio: "09:30", fin: "12:00", color: "#AA0DDE" },
  { id: "apr-17", titulo: "Celebración día del niño", fecha: "2026-04-19", inicio: "09:30", fin: "12:00", color: "#FAA18F" },
  { id: "apr-18", titulo: "Cultos de Damas Dorcas", fecha: "2026-04-21", inicio: "19:00", fin: "20:00", color: "#F5F527" },
  { id: "apr-19", titulo: "Cultos de Junta Local", fecha: "2026-04-23", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "apr-20", titulo: "Capacitación REFAM", fecha: "2026-04-24", inicio: "19:00", fin: "20:00", color: "#FF0000" },
  { id: "apr-21", titulo: "Vigilia General Alabanza", fecha: "2026-04-24", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "apr-22", titulo: "Culto de los 100 Amigos", fecha: "2026-04-25", inicio: "19:00", fin: "20:00", color: "#FF0000" },
  { id: "apr-23", titulo: "Culto Departamento Familia", fecha: "2026-04-26", inicio: "09:30", fin: "12:00", color: "#F5275B" },
  { id: "apr-24", titulo: "Culto Escuela Dominical", fecha: "2026-04-28", inicio: "19:00", fin: "20:00", color: "#FAA18F" },
  { id: "apr-25", titulo: "Culto Junta Local", fecha: "2026-04-30", inicio: "19:00", fin: "20:00", color: "#2563eb" },

  // --- MAYO ---
  { id: "may-01", titulo: "Culto de Alabanza", fecha: "2026-05-02", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "may-02", titulo: "Culto Misiones y Evangelismo", fecha: "2026-05-03", inicio: "09:30", fin: "12:00", color: "#FF0000" },
  { id: "may-03", titulo: "Culto Ujieres y Brigadistas", fecha: "2026-05-05", inicio: "19:00", fin: "20:00", color: "#F5276C" },
  { id: "may-04", titulo: "Culto de Junta Local", fecha: "2026-05-07", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "may-05", titulo: "Culto de Protemplo", fecha: "2026-05-09", inicio: "19:00", fin: "20:00", color: "#4D27F5" },
  { id: "may-06", titulo: "Ensayo de Alabanza", fecha: "2026-05-09", inicio: "14:00", fin: "16:00", color: "#AE02F7" },
  { id: "may-07", titulo: "Culto Dominical Denario", fecha: "2026-05-10", inicio: "09:30", fin: "12:00", color: "#2563eb" },
  { id: "may-08", titulo: "Culto de Obra Social", fecha: "2026-05-12", inicio: "19:00", fin: "20:00", color: "#AA0DDE" },
  { id: "may-09", titulo: "Culto de Junta Local", fecha: "2026-05-14", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "may-10", titulo: "Culto de Damas Dorcas", fecha: "2026-05-16", inicio: "19:00", fin: "20:00", color: "#F5F527" },
  { id: "may-11", titulo: "Celebración día del Maestro", fecha: "2026-05-16", inicio: "16:00", fin: "18:00", color: "#FAA18F" },
  { id: "may-12", titulo: "Dominical Campal", fecha: "2026-05-17", inicio: "09:30", fin: "12:00", color: "#FAA18F" },
  { id: "may-13", titulo: "Culto de Intercesión", fecha: "2026-05-19", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "may-14", titulo: "Culto de Junta Local", fecha: "2026-05-21", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "may-15", titulo: "Impacto Evangelístico", fecha: "2026-05-22", inicio: "19:00", fin: "20:00", color: "#FF0000" },
  { id: "may-16", titulo: "Culto Misiones y Evangelístico", fecha: "2026-05-23", inicio: "19:00", fin: "20:00", color: "#FF0000" },
  { id: "may-17", titulo: "Culto Junta Local", fecha: "2026-05-24", inicio: "09:30", fin: "12:00", color: "#2563eb" },
  { id: "may-18", titulo: "Culto Jóvenes", fecha: "2026-05-26", inicio: "19:00", fin: "20:00", color: "#F58E27" },
  { id: "may-19", titulo: "Culto Junta Local", fecha: "2026-05-28", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "may-20", titulo: "Culto Escuela Dominical", fecha: "2026-05-30", inicio: "19:00", fin: "20:00", color: "#FAA18F" },
  { id: "may-21", titulo: "Ayuno Escuela Dominical", fecha: "2026-05-30", inicio: "05:00", fin: "13:00", color: "#FAA18F" },
  { id: "may-22", titulo: "Capacitación Ujieres", fecha: "2026-05-30", inicio: "16:00", fin: "18:00", color: "#F5276C" },
  { id: "may-23", titulo: "Dominical Depto Familia", fecha: "2026-05-31", inicio: "09:30", fin: "12:00", color: "#F5275B" },

  // --- JUNIO ---
  { id: "jun-01", titulo: "Culto de Alabanza", fecha: "2026-06-02", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "jun-02", titulo: "Culto de Junta Local", fecha: "2026-06-04", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "jun-03", titulo: "Ayuno General Intercesión", fecha: "2026-06-06", inicio: "07:00", fin: "12:00", color: "#2563eb" },
  { id: "jun-04", titulo: "Día Misionero", fecha: "2026-06-07", inicio: "09:30", fin: "12:00", color: "#FF0000" },
  { id: "jun-05", titulo: "Culto de Protemplo", fecha: "2026-06-09", inicio: "19:00", fin: "20:00", color: "#4D27F5" },
  { id: "jun-06", titulo: "Culto de Junta Local", fecha: "2026-06-11", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "jun-07", titulo: "Culto de Obra Social", fecha: "2026-06-13", inicio: "19:00", fin: "20:00", color: "#AA0DDE" },
  { id: "jun-08", titulo: "Dominical del Denario", fecha: "2026-06-14", inicio: "09:30", fin: "12:00", color: "#2563eb" },
  { id: "jun-09", titulo: "Culto de comunicaciones", fecha: "2026-06-16", inicio: "19:00", fin: "20:00", color: "#27F5B7" },
  { id: "jun-10", titulo: "Culto de Junta Local", fecha: "2026-06-18", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "jun-11", titulo: "Vigilia de Alabanza", fecha: "2026-06-19", inicio: "19:00", fin: "23:00", color: "#AE02F7" },
  { id: "jun-12", titulo: "Culto de Jóvenes", fecha: "2026-06-20", inicio: "19:00", fin: "23:00", color: "#F58E27" },
  { id: "jun-13", titulo: "Cumpleaños Damas y Ujieres", fecha: "2026-06-20", inicio: "19:00", fin: "23:00", color: "#F5F527" },
  { id: "jun-14", titulo: "Culto de Junta Local", fecha: "2026-06-21", inicio: "09:30", fin: "12:00", color: "#2563eb" },
  { id: "jun-15", titulo: "Culto de Intercesión", fecha: "2026-06-23", inicio: "19:00", fin: "20:00", color: "#AE02F7" },
  { id: "jun-16", titulo: "Culto de Junta Local", fecha: "2026-06-25", inicio: "19:00", fin: "20:00", color: "#2563eb" },
  { id: "jun-17", titulo: "Escuela para lideres", fecha: "2026-06-26", inicio: "19:00", fin: "20:00", color: "#4D27F5" },
  { id: "jun-18", titulo: "Cumpleaños Maestros", fecha: "2026-06-27", inicio: "19:00", fin: "20:00", color: "#FAA18F" },
  { id: "jun-19", titulo: "Dominical Depto Familia", fecha: "2026-06-28", inicio: "09:30", fin: "12:00", color: "#F5275B" },
  { id: "jun-20", titulo: "Culto Damas Dorcas", fecha: "2026-06-30", inicio: "19:00", fin: "20:00", color: "#F5F527" },
];
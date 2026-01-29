export interface PastorHistory {
  readonly id: number;
  readonly nombre: string;
  readonly detalle: string;
  readonly periodo: string;
}

export interface HitoHistory {
  readonly id: number;
  readonly evento: string;
  readonly ubicación: string;
  readonly fecha: string;
}

export interface HistoryContent {
  readonly pastores: PastorHistory[];
  readonly hitos: HitoHistory[];
}

export const HISTORY_DATA: HistoryContent = {
  pastores: [
    { id: 1, nombre: "Pastor Fundador", detalle: "Inicio de la obra en Neiva", periodo: "1970 - 1985" },
    { id: 2, nombre: "Rev. Nombre Ejemplo", detalle: "Crecimiento exponencial y misiones", periodo: "1985 - 2000" },
  ],
  hitos: [
    { id: 1, evento: "Compra del Terreno", ubicación: "Sede Central", fecha: "12 de Mayo, 1975" },
    { id: 2, evento: "Inauguración del Templo", ubicación: "Barrio Centro", fecha: "Diciembre, 1990" },
  ],
};
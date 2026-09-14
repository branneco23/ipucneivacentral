export interface TransmissionData {
  youtubeId: string;
  updatedAt?: string;
}

export const initialTransmission: TransmissionData = {
  youtubeId: "",
  updatedAt: new Date().toISOString(),
};
export interface IPrescriptionStatus {
  id?: number;
  code?: string;
  description?: string;
}

export const defaultValue: Readonly<IPrescriptionStatus> = {};

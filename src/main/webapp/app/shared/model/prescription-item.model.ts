import { IDrug } from 'app/shared/model/drug.model';
import { IPrescription } from 'app/shared/model/prescription.model';

export interface IPrescriptionItem {
  id?: number;
  prescriptionQty?: number;
  instructionsToCustomer?: string;
  drug?: IDrug;
  prescription?: IPrescription;
}

export const defaultValue: Readonly<IPrescriptionItem> = {};

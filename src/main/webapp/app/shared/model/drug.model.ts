import { Moment } from 'moment';
import { IDrugCompany } from 'app/shared/model/drug-company.model';

export interface IDrug {
  id?: number;
  drugName?: string;
  drugCost?: number;
  drugAavailableDate?: string;
  drugWithdrawnDate?: string;
  drugDescription?: string;
  genericYn?: string;
  drugDetails?: string;
  company?: IDrugCompany;
}

export const defaultValue: Readonly<IDrug> = {};

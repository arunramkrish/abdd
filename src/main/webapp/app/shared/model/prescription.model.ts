import { Moment } from 'moment';
import { IPrescriptionItem } from 'app/shared/model/prescription-item.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { IDoctor } from 'app/shared/model/doctor.model';
import { IPrescriptionStatus } from 'app/shared/model/prescription-status.model';
import { IPaymentMethods } from 'app/shared/model/payment-methods.model';

export interface IPrescription {
  id?: number;
  prescriptionIssuedDate?: string;
  prescriptionFilledDate?: string;
  otherDetails?: string;
  items?: IPrescriptionItem[];
  customer?: ICustomer;
  doctor?: IDoctor;
  status?: IPrescriptionStatus;
  paymentMethods?: IPaymentMethods;
}

export const defaultValue: Readonly<IPrescription> = {};

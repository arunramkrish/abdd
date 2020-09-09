import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/address.model';

export interface ICustomer {
  id?: number;
  customerName?: string;
  dateBecameCustomer?: string;
  mobileNo?: string;
  address?: IAddress;
}

export const defaultValue: Readonly<ICustomer> = {};

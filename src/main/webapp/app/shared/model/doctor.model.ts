import { IAddress } from 'app/shared/model/address.model';

export interface IDoctor {
  id?: number;
  doctorName?: string;
  doctorHospital?: string;
  doctorSpeciality?: string;
  mobileNo?: string;
  address?: IAddress;
}

export const defaultValue: Readonly<IDoctor> = {};

export interface IAddress {
  id?: number;
  line1BuildingNumber?: string;
  lineStreetNumber?: string;
  lineLocality?: string;
  city?: string;
  zipPostcode?: string;
  state?: string;
  country?: string;
}

export const defaultValue: Readonly<IAddress> = {};

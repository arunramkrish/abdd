export interface IPaymentMethods {
  id?: number;
  code?: string;
  pmtMethodDesc?: string;
}

export const defaultValue: Readonly<IPaymentMethods> = {};

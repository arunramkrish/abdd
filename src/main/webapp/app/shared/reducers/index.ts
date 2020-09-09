import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import address, {
  AddressState
} from 'app/entities/address/address.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import doctor, {
  DoctorState
} from 'app/entities/doctor/doctor.reducer';
// prettier-ignore
import prescriptionStatus, {
  PrescriptionStatusState
} from 'app/entities/prescription-status/prescription-status.reducer';
// prettier-ignore
import paymentMethods, {
  PaymentMethodsState
} from 'app/entities/payment-methods/payment-methods.reducer';
// prettier-ignore
import drugCompany, {
  DrugCompanyState
} from 'app/entities/drug-company/drug-company.reducer';
// prettier-ignore
import drug, {
  DrugState
} from 'app/entities/drug/drug.reducer';
// prettier-ignore
import prescriptionItem, {
  PrescriptionItemState
} from 'app/entities/prescription-item/prescription-item.reducer';
// prettier-ignore
import prescription, {
  PrescriptionState
} from 'app/entities/prescription/prescription.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly address: AddressState;
  readonly customer: CustomerState;
  readonly doctor: DoctorState;
  readonly prescriptionStatus: PrescriptionStatusState;
  readonly paymentMethods: PaymentMethodsState;
  readonly drugCompany: DrugCompanyState;
  readonly drug: DrugState;
  readonly prescriptionItem: PrescriptionItemState;
  readonly prescription: PrescriptionState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  address,
  customer,
  doctor,
  prescriptionStatus,
  paymentMethods,
  drugCompany,
  drug,
  prescriptionItem,
  prescription,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;

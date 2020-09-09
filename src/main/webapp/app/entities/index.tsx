import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Address from './address';
import Customer from './customer';
import Doctor from './doctor';
import PrescriptionStatus from './prescription-status';
import PaymentMethods from './payment-methods';
import DrugCompany from './drug-company';
import Drug from './drug';
import PrescriptionItem from './prescription-item';
import Prescription from './prescription';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}address`} component={Address} />
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}doctor`} component={Doctor} />
      <ErrorBoundaryRoute path={`${match.url}prescription-status`} component={PrescriptionStatus} />
      <ErrorBoundaryRoute path={`${match.url}payment-methods`} component={PaymentMethods} />
      <ErrorBoundaryRoute path={`${match.url}drug-company`} component={DrugCompany} />
      <ErrorBoundaryRoute path={`${match.url}drug`} component={Drug} />
      <ErrorBoundaryRoute path={`${match.url}prescription-item`} component={PrescriptionItem} />
      <ErrorBoundaryRoute path={`${match.url}prescription`} component={Prescription} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;

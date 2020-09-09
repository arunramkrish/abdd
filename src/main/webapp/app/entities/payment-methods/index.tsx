import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaymentMethods from './payment-methods';
import PaymentMethodsDetail from './payment-methods-detail';
import PaymentMethodsUpdate from './payment-methods-update';
import PaymentMethodsDeleteDialog from './payment-methods-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaymentMethodsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaymentMethodsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaymentMethodsDetail} />
      <ErrorBoundaryRoute path={match.url} component={PaymentMethods} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PaymentMethodsDeleteDialog} />
  </>
);

export default Routes;

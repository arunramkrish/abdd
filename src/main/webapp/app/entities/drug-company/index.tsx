import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DrugCompany from './drug-company';
import DrugCompanyDetail from './drug-company-detail';
import DrugCompanyUpdate from './drug-company-update';
import DrugCompanyDeleteDialog from './drug-company-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DrugCompanyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DrugCompanyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DrugCompanyDetail} />
      <ErrorBoundaryRoute path={match.url} component={DrugCompany} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DrugCompanyDeleteDialog} />
  </>
);

export default Routes;

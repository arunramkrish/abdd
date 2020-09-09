import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PrescriptionStatus from './prescription-status';
import PrescriptionStatusDetail from './prescription-status-detail';
import PrescriptionStatusUpdate from './prescription-status-update';
import PrescriptionStatusDeleteDialog from './prescription-status-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrescriptionStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrescriptionStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrescriptionStatusDetail} />
      <ErrorBoundaryRoute path={match.url} component={PrescriptionStatus} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrescriptionStatusDeleteDialog} />
  </>
);

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PrescriptionItem from './prescription-item';
import PrescriptionItemDetail from './prescription-item-detail';
import PrescriptionItemUpdate from './prescription-item-update';
import PrescriptionItemDeleteDialog from './prescription-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrescriptionItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrescriptionItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrescriptionItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={PrescriptionItem} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrescriptionItemDeleteDialog} />
  </>
);

export default Routes;

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './prescription-status.reducer';
import { IPrescriptionStatus } from 'app/shared/model/prescription-status.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrescriptionStatusProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PrescriptionStatus = (props: IPrescriptionStatusProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { prescriptionStatusList, match, loading } = props;
  return (
    <div>
      <h2 id="prescription-status-heading">
        <Translate contentKey="abddApp.prescriptionStatus.home.title">Prescription Statuses</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abddApp.prescriptionStatus.home.createLabel">Create new Prescription Status</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {prescriptionStatusList && prescriptionStatusList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescriptionStatus.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescriptionStatus.description">Description</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prescriptionStatusList.map((prescriptionStatus, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${prescriptionStatus.id}`} color="link" size="sm">
                      {prescriptionStatus.id}
                    </Button>
                  </td>
                  <td>{prescriptionStatus.code}</td>
                  <td>{prescriptionStatus.description}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${prescriptionStatus.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prescriptionStatus.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prescriptionStatus.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="abddApp.prescriptionStatus.home.notFound">No Prescription Statuses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ prescriptionStatus }: IRootState) => ({
  prescriptionStatusList: prescriptionStatus.entities,
  loading: prescriptionStatus.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionStatus);

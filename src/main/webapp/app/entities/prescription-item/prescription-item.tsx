import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './prescription-item.reducer';
import { IPrescriptionItem } from 'app/shared/model/prescription-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrescriptionItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PrescriptionItem = (props: IPrescriptionItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { prescriptionItemList, match, loading } = props;
  return (
    <div>
      <h2 id="prescription-item-heading">
        <Translate contentKey="abddApp.prescriptionItem.home.title">Prescription Items</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abddApp.prescriptionItem.home.createLabel">Create new Prescription Item</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {prescriptionItemList && prescriptionItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescriptionItem.prescriptionQty">Prescription Qty</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescriptionItem.instructionsToCustomer">Instructions To Customer</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescriptionItem.drug">Drug</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescriptionItem.prescription">Prescription</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prescriptionItemList.map((prescriptionItem, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${prescriptionItem.id}`} color="link" size="sm">
                      {prescriptionItem.id}
                    </Button>
                  </td>
                  <td>{prescriptionItem.prescriptionQty}</td>
                  <td>{prescriptionItem.instructionsToCustomer}</td>
                  <td>
                    {prescriptionItem.drug ? <Link to={`drug/${prescriptionItem.drug.id}`}>{prescriptionItem.drug.drugName}</Link> : ''}
                  </td>
                  <td>
                    {prescriptionItem.prescription ? (
                      <Link to={`prescription/${prescriptionItem.prescription.id}`}>{prescriptionItem.prescription.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${prescriptionItem.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prescriptionItem.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prescriptionItem.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="abddApp.prescriptionItem.home.notFound">No Prescription Items found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ prescriptionItem }: IRootState) => ({
  prescriptionItemList: prescriptionItem.entities,
  loading: prescriptionItem.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionItem);

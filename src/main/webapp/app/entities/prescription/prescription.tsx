import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './prescription.reducer';
import { IPrescription } from 'app/shared/model/prescription.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrescriptionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Prescription = (props: IPrescriptionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { prescriptionList, match, loading } = props;
  return (
    <div>
      <h2 id="prescription-heading">
        <Translate contentKey="abddApp.prescription.home.title">Prescriptions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abddApp.prescription.home.createLabel">Create new Prescription</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {prescriptionList && prescriptionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescription.prescriptionIssuedDate">Prescription Issued Date</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescription.prescriptionFilledDate">Prescription Filled Date</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescription.otherDetails">Other Details</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescription.customer">Customer</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescription.doctor">Doctor</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescription.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.prescription.paymentMethods">Payment Methods</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prescriptionList.map((prescription, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${prescription.id}`} color="link" size="sm">
                      {prescription.id}
                    </Button>
                  </td>
                  <td>
                    {prescription.prescriptionIssuedDate ? (
                      <TextFormat type="date" value={prescription.prescriptionIssuedDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {prescription.prescriptionFilledDate ? (
                      <TextFormat type="date" value={prescription.prescriptionFilledDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{prescription.otherDetails}</td>
                  <td>
                    {prescription.customer ? (
                      <Link to={`customer/${prescription.customer.id}`}>{prescription.customer.customerName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {prescription.doctor ? <Link to={`doctor/${prescription.doctor.id}`}>{prescription.doctor.doctorName}</Link> : ''}
                  </td>
                  <td>
                    {prescription.status ? (
                      <Link to={`prescription-status/${prescription.status.id}`}>{prescription.status.code}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {prescription.paymentMethods ? (
                      <Link to={`payment-methods/${prescription.paymentMethods.id}`}>{prescription.paymentMethods.code}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${prescription.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prescription.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prescription.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="abddApp.prescription.home.notFound">No Prescriptions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ prescription }: IRootState) => ({
  prescriptionList: prescription.entities,
  loading: prescription.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Prescription);

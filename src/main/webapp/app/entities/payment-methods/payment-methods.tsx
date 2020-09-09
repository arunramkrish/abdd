import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './payment-methods.reducer';
import { IPaymentMethods } from 'app/shared/model/payment-methods.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentMethodsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PaymentMethods = (props: IPaymentMethodsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { paymentMethodsList, match, loading } = props;
  return (
    <div>
      <h2 id="payment-methods-heading">
        <Translate contentKey="abddApp.paymentMethods.home.title">Payment Methods</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abddApp.paymentMethods.home.createLabel">Create new Payment Methods</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {paymentMethodsList && paymentMethodsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.paymentMethods.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.paymentMethods.pmtMethodDesc">Pmt Method Desc</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paymentMethodsList.map((paymentMethods, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${paymentMethods.id}`} color="link" size="sm">
                      {paymentMethods.id}
                    </Button>
                  </td>
                  <td>{paymentMethods.code}</td>
                  <td>{paymentMethods.pmtMethodDesc}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${paymentMethods.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paymentMethods.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paymentMethods.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="abddApp.paymentMethods.home.notFound">No Payment Methods found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ paymentMethods }: IRootState) => ({
  paymentMethodsList: paymentMethods.entities,
  loading: paymentMethods.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethods);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payment-methods.reducer';
import { IPaymentMethods } from 'app/shared/model/payment-methods.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentMethodsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaymentMethodsDetail = (props: IPaymentMethodsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { paymentMethodsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abddApp.paymentMethods.detail.title">PaymentMethods</Translate> [<b>{paymentMethodsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="abddApp.paymentMethods.code">Code</Translate>
            </span>
          </dt>
          <dd>{paymentMethodsEntity.code}</dd>
          <dt>
            <span id="pmtMethodDesc">
              <Translate contentKey="abddApp.paymentMethods.pmtMethodDesc">Pmt Method Desc</Translate>
            </span>
          </dt>
          <dd>{paymentMethodsEntity.pmtMethodDesc}</dd>
        </dl>
        <Button tag={Link} to="/payment-methods" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-methods/${paymentMethodsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ paymentMethods }: IRootState) => ({
  paymentMethodsEntity: paymentMethods.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsDetail);

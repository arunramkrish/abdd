import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prescription.reducer';
import { IPrescription } from 'app/shared/model/prescription.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrescriptionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrescriptionDetail = (props: IPrescriptionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prescriptionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abddApp.prescription.detail.title">Prescription</Translate> [<b>{prescriptionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="prescriptionIssuedDate">
              <Translate contentKey="abddApp.prescription.prescriptionIssuedDate">Prescription Issued Date</Translate>
            </span>
          </dt>
          <dd>
            {prescriptionEntity.prescriptionIssuedDate ? (
              <TextFormat value={prescriptionEntity.prescriptionIssuedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="prescriptionFilledDate">
              <Translate contentKey="abddApp.prescription.prescriptionFilledDate">Prescription Filled Date</Translate>
            </span>
          </dt>
          <dd>
            {prescriptionEntity.prescriptionFilledDate ? (
              <TextFormat value={prescriptionEntity.prescriptionFilledDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="otherDetails">
              <Translate contentKey="abddApp.prescription.otherDetails">Other Details</Translate>
            </span>
          </dt>
          <dd>{prescriptionEntity.otherDetails}</dd>
          <dt>
            <Translate contentKey="abddApp.prescription.customer">Customer</Translate>
          </dt>
          <dd>{prescriptionEntity.customer ? prescriptionEntity.customer.customerName : ''}</dd>
          <dt>
            <Translate contentKey="abddApp.prescription.doctor">Doctor</Translate>
          </dt>
          <dd>{prescriptionEntity.doctor ? prescriptionEntity.doctor.doctorName : ''}</dd>
          <dt>
            <Translate contentKey="abddApp.prescription.status">Status</Translate>
          </dt>
          <dd>{prescriptionEntity.status ? prescriptionEntity.status.code : ''}</dd>
          <dt>
            <Translate contentKey="abddApp.prescription.paymentMethods">Payment Methods</Translate>
          </dt>
          <dd>{prescriptionEntity.paymentMethods ? prescriptionEntity.paymentMethods.code : ''}</dd>
        </dl>
        <Button tag={Link} to="/prescription" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prescription/${prescriptionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prescription }: IRootState) => ({
  prescriptionEntity: prescription.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionDetail);

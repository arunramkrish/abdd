import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { IDoctor } from 'app/shared/model/doctor.model';
import { getEntities as getDoctors } from 'app/entities/doctor/doctor.reducer';
import { IPrescriptionStatus } from 'app/shared/model/prescription-status.model';
import { getEntities as getPrescriptionStatuses } from 'app/entities/prescription-status/prescription-status.reducer';
import { IPaymentMethods } from 'app/shared/model/payment-methods.model';
import { getEntities as getPaymentMethods } from 'app/entities/payment-methods/payment-methods.reducer';
import { getEntity, updateEntity, createEntity, reset } from './prescription.reducer';
import { IPrescription } from 'app/shared/model/prescription.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrescriptionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrescriptionUpdate = (props: IPrescriptionUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [doctorId, setDoctorId] = useState('0');
  const [statusId, setStatusId] = useState('0');
  const [paymentMethodsId, setPaymentMethodsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { prescriptionEntity, customers, doctors, prescriptionStatuses, paymentMethods, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/prescription');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
    props.getDoctors();
    props.getPrescriptionStatuses();
    props.getPaymentMethods();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...prescriptionEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="abddApp.prescription.home.createOrEditLabel">
            <Translate contentKey="abddApp.prescription.home.createOrEditLabel">Create or edit a Prescription</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prescriptionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prescription-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="prescription-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="prescriptionIssuedDateLabel" for="prescription-prescriptionIssuedDate">
                  <Translate contentKey="abddApp.prescription.prescriptionIssuedDate">Prescription Issued Date</Translate>
                </Label>
                <AvField id="prescription-prescriptionIssuedDate" type="date" className="form-control" name="prescriptionIssuedDate" />
              </AvGroup>
              <AvGroup>
                <Label id="prescriptionFilledDateLabel" for="prescription-prescriptionFilledDate">
                  <Translate contentKey="abddApp.prescription.prescriptionFilledDate">Prescription Filled Date</Translate>
                </Label>
                <AvField id="prescription-prescriptionFilledDate" type="date" className="form-control" name="prescriptionFilledDate" />
              </AvGroup>
              <AvGroup>
                <Label id="otherDetailsLabel" for="prescription-otherDetails">
                  <Translate contentKey="abddApp.prescription.otherDetails">Other Details</Translate>
                </Label>
                <AvField id="prescription-otherDetails" type="text" name="otherDetails" />
              </AvGroup>
              <AvGroup>
                <Label for="prescription-customer">
                  <Translate contentKey="abddApp.prescription.customer">Customer</Translate>
                </Label>
                <AvInput id="prescription-customer" type="select" className="form-control" name="customer.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.customerName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="prescription-doctor">
                  <Translate contentKey="abddApp.prescription.doctor">Doctor</Translate>
                </Label>
                <AvInput id="prescription-doctor" type="select" className="form-control" name="doctor.id">
                  <option value="" key="0" />
                  {doctors
                    ? doctors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.doctorName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="prescription-status">
                  <Translate contentKey="abddApp.prescription.status">Status</Translate>
                </Label>
                <AvInput id="prescription-status" type="select" className="form-control" name="status.id">
                  <option value="" key="0" />
                  {prescriptionStatuses
                    ? prescriptionStatuses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.code}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="prescription-paymentMethods">
                  <Translate contentKey="abddApp.prescription.paymentMethods">Payment Methods</Translate>
                </Label>
                <AvInput id="prescription-paymentMethods" type="select" className="form-control" name="paymentMethods.id">
                  <option value="" key="0" />
                  {paymentMethods
                    ? paymentMethods.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.code}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/prescription" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  customers: storeState.customer.entities,
  doctors: storeState.doctor.entities,
  prescriptionStatuses: storeState.prescriptionStatus.entities,
  paymentMethods: storeState.paymentMethods.entities,
  prescriptionEntity: storeState.prescription.entity,
  loading: storeState.prescription.loading,
  updating: storeState.prescription.updating,
  updateSuccess: storeState.prescription.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getDoctors,
  getPrescriptionStatuses,
  getPaymentMethods,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionUpdate);

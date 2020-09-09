import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDrug } from 'app/shared/model/drug.model';
import { getEntities as getDrugs } from 'app/entities/drug/drug.reducer';
import { IPrescription } from 'app/shared/model/prescription.model';
import { getEntities as getPrescriptions } from 'app/entities/prescription/prescription.reducer';
import { getEntity, updateEntity, createEntity, reset } from './prescription-item.reducer';
import { IPrescriptionItem } from 'app/shared/model/prescription-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrescriptionItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrescriptionItemUpdate = (props: IPrescriptionItemUpdateProps) => {
  const [drugId, setDrugId] = useState('0');
  const [prescriptionId, setPrescriptionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { prescriptionItemEntity, drugs, prescriptions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/prescription-item');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDrugs();
    props.getPrescriptions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...prescriptionItemEntity,
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
          <h2 id="abddApp.prescriptionItem.home.createOrEditLabel">
            <Translate contentKey="abddApp.prescriptionItem.home.createOrEditLabel">Create or edit a PrescriptionItem</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prescriptionItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prescription-item-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="prescription-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="prescriptionQtyLabel" for="prescription-item-prescriptionQty">
                  <Translate contentKey="abddApp.prescriptionItem.prescriptionQty">Prescription Qty</Translate>
                </Label>
                <AvField id="prescription-item-prescriptionQty" type="string" className="form-control" name="prescriptionQty" />
              </AvGroup>
              <AvGroup>
                <Label id="instructionsToCustomerLabel" for="prescription-item-instructionsToCustomer">
                  <Translate contentKey="abddApp.prescriptionItem.instructionsToCustomer">Instructions To Customer</Translate>
                </Label>
                <AvField id="prescription-item-instructionsToCustomer" type="text" name="instructionsToCustomer" />
              </AvGroup>
              <AvGroup>
                <Label for="prescription-item-drug">
                  <Translate contentKey="abddApp.prescriptionItem.drug">Drug</Translate>
                </Label>
                <AvInput id="prescription-item-drug" type="select" className="form-control" name="drug.id">
                  <option value="" key="0" />
                  {drugs
                    ? drugs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.drugName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="prescription-item-prescription">
                  <Translate contentKey="abddApp.prescriptionItem.prescription">Prescription</Translate>
                </Label>
                <AvInput id="prescription-item-prescription" type="select" className="form-control" name="prescription.id">
                  <option value="" key="0" />
                  {prescriptions
                    ? prescriptions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/prescription-item" replace color="info">
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
  drugs: storeState.drug.entities,
  prescriptions: storeState.prescription.entities,
  prescriptionItemEntity: storeState.prescriptionItem.entity,
  loading: storeState.prescriptionItem.loading,
  updating: storeState.prescriptionItem.updating,
  updateSuccess: storeState.prescriptionItem.updateSuccess,
});

const mapDispatchToProps = {
  getDrugs,
  getPrescriptions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionItemUpdate);

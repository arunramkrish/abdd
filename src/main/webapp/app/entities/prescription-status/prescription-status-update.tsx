import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './prescription-status.reducer';
import { IPrescriptionStatus } from 'app/shared/model/prescription-status.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrescriptionStatusUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrescriptionStatusUpdate = (props: IPrescriptionStatusUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { prescriptionStatusEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/prescription-status');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...prescriptionStatusEntity,
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
          <h2 id="abddApp.prescriptionStatus.home.createOrEditLabel">
            <Translate contentKey="abddApp.prescriptionStatus.home.createOrEditLabel">Create or edit a PrescriptionStatus</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prescriptionStatusEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prescription-status-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="prescription-status-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="prescription-status-code">
                  <Translate contentKey="abddApp.prescriptionStatus.code">Code</Translate>
                </Label>
                <AvField id="prescription-status-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="prescription-status-description">
                  <Translate contentKey="abddApp.prescriptionStatus.description">Description</Translate>
                </Label>
                <AvField id="prescription-status-description" type="text" name="description" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/prescription-status" replace color="info">
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
  prescriptionStatusEntity: storeState.prescriptionStatus.entity,
  loading: storeState.prescriptionStatus.loading,
  updating: storeState.prescriptionStatus.updating,
  updateSuccess: storeState.prescriptionStatus.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionStatusUpdate);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { getEntity, updateEntity, createEntity, reset } from './doctor.reducer';
import { IDoctor } from 'app/shared/model/doctor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDoctorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DoctorUpdate = (props: IDoctorUpdateProps) => {
  const [addressId, setAddressId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { doctorEntity, addresses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/doctor');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAddresses();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...doctorEntity,
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
          <h2 id="abddApp.doctor.home.createOrEditLabel">
            <Translate contentKey="abddApp.doctor.home.createOrEditLabel">Create or edit a Doctor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : doctorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="doctor-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="doctor-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="doctorNameLabel" for="doctor-doctorName">
                  <Translate contentKey="abddApp.doctor.doctorName">Doctor Name</Translate>
                </Label>
                <AvField id="doctor-doctorName" type="text" name="doctorName" />
              </AvGroup>
              <AvGroup>
                <Label id="doctorHospitalLabel" for="doctor-doctorHospital">
                  <Translate contentKey="abddApp.doctor.doctorHospital">Doctor Hospital</Translate>
                </Label>
                <AvField id="doctor-doctorHospital" type="text" name="doctorHospital" />
              </AvGroup>
              <AvGroup>
                <Label id="doctorSpecialityLabel" for="doctor-doctorSpeciality">
                  <Translate contentKey="abddApp.doctor.doctorSpeciality">Doctor Speciality</Translate>
                </Label>
                <AvField id="doctor-doctorSpeciality" type="text" name="doctorSpeciality" />
              </AvGroup>
              <AvGroup>
                <Label id="mobileNoLabel" for="doctor-mobileNo">
                  <Translate contentKey="abddApp.doctor.mobileNo">Mobile No</Translate>
                </Label>
                <AvField id="doctor-mobileNo" type="text" name="mobileNo" />
              </AvGroup>
              <AvGroup>
                <Label for="doctor-address">
                  <Translate contentKey="abddApp.doctor.address">Address</Translate>
                </Label>
                <AvInput id="doctor-address" type="select" className="form-control" name="address.id">
                  <option value="" key="0" />
                  {addresses
                    ? addresses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.line1BuildingNumber}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/doctor" replace color="info">
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
  addresses: storeState.address.entities,
  doctorEntity: storeState.doctor.entity,
  loading: storeState.doctor.loading,
  updating: storeState.doctor.updating,
  updateSuccess: storeState.doctor.updateSuccess,
});

const mapDispatchToProps = {
  getAddresses,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DoctorUpdate);

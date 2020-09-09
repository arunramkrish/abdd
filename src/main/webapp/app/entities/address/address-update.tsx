import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAddressUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AddressUpdate = (props: IAddressUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { addressEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/address');
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
        ...addressEntity,
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
          <h2 id="abddApp.address.home.createOrEditLabel">
            <Translate contentKey="abddApp.address.home.createOrEditLabel">Create or edit a Address</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : addressEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="address-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="address-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="line1BuildingNumberLabel" for="address-line1BuildingNumber">
                  <Translate contentKey="abddApp.address.line1BuildingNumber">Line 1 Building Number</Translate>
                </Label>
                <AvField id="address-line1BuildingNumber" type="text" name="line1BuildingNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="lineStreetNumberLabel" for="address-lineStreetNumber">
                  <Translate contentKey="abddApp.address.lineStreetNumber">Line Street Number</Translate>
                </Label>
                <AvField id="address-lineStreetNumber" type="text" name="lineStreetNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="lineLocalityLabel" for="address-lineLocality">
                  <Translate contentKey="abddApp.address.lineLocality">Line Locality</Translate>
                </Label>
                <AvField id="address-lineLocality" type="text" name="lineLocality" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="address-city">
                  <Translate contentKey="abddApp.address.city">City</Translate>
                </Label>
                <AvField id="address-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="zipPostcodeLabel" for="address-zipPostcode">
                  <Translate contentKey="abddApp.address.zipPostcode">Zip Postcode</Translate>
                </Label>
                <AvField id="address-zipPostcode" type="text" name="zipPostcode" />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="address-state">
                  <Translate contentKey="abddApp.address.state">State</Translate>
                </Label>
                <AvField id="address-state" type="text" name="state" />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="address-country">
                  <Translate contentKey="abddApp.address.country">Country</Translate>
                </Label>
                <AvField id="address-country" type="text" name="country" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/address" replace color="info">
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
  addressEntity: storeState.address.entity,
  loading: storeState.address.loading,
  updating: storeState.address.updating,
  updateSuccess: storeState.address.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressUpdate);

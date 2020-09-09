import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDrugCompany } from 'app/shared/model/drug-company.model';
import { getEntities as getDrugCompanies } from 'app/entities/drug-company/drug-company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './drug.reducer';
import { IDrug } from 'app/shared/model/drug.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDrugUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DrugUpdate = (props: IDrugUpdateProps) => {
  const [companyId, setCompanyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { drugEntity, drugCompanies, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/drug');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDrugCompanies();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...drugEntity,
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
          <h2 id="abddApp.drug.home.createOrEditLabel">
            <Translate contentKey="abddApp.drug.home.createOrEditLabel">Create or edit a Drug</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : drugEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="drug-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="drug-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="drugNameLabel" for="drug-drugName">
                  <Translate contentKey="abddApp.drug.drugName">Drug Name</Translate>
                </Label>
                <AvField id="drug-drugName" type="text" name="drugName" />
              </AvGroup>
              <AvGroup>
                <Label id="drugCostLabel" for="drug-drugCost">
                  <Translate contentKey="abddApp.drug.drugCost">Drug Cost</Translate>
                </Label>
                <AvField id="drug-drugCost" type="string" className="form-control" name="drugCost" />
              </AvGroup>
              <AvGroup>
                <Label id="drugAavailableDateLabel" for="drug-drugAavailableDate">
                  <Translate contentKey="abddApp.drug.drugAavailableDate">Drug Aavailable Date</Translate>
                </Label>
                <AvField id="drug-drugAavailableDate" type="date" className="form-control" name="drugAavailableDate" />
              </AvGroup>
              <AvGroup>
                <Label id="drugWithdrawnDateLabel" for="drug-drugWithdrawnDate">
                  <Translate contentKey="abddApp.drug.drugWithdrawnDate">Drug Withdrawn Date</Translate>
                </Label>
                <AvField id="drug-drugWithdrawnDate" type="date" className="form-control" name="drugWithdrawnDate" />
              </AvGroup>
              <AvGroup>
                <Label id="drugDescriptionLabel" for="drug-drugDescription">
                  <Translate contentKey="abddApp.drug.drugDescription">Drug Description</Translate>
                </Label>
                <AvField id="drug-drugDescription" type="text" name="drugDescription" />
              </AvGroup>
              <AvGroup>
                <Label id="genericYnLabel" for="drug-genericYn">
                  <Translate contentKey="abddApp.drug.genericYn">Generic Yn</Translate>
                </Label>
                <AvField id="drug-genericYn" type="text" name="genericYn" />
              </AvGroup>
              <AvGroup>
                <Label id="drugDetailsLabel" for="drug-drugDetails">
                  <Translate contentKey="abddApp.drug.drugDetails">Drug Details</Translate>
                </Label>
                <AvField id="drug-drugDetails" type="text" name="drugDetails" />
              </AvGroup>
              <AvGroup>
                <Label for="drug-company">
                  <Translate contentKey="abddApp.drug.company">Company</Translate>
                </Label>
                <AvInput id="drug-company" type="select" className="form-control" name="company.id">
                  <option value="" key="0" />
                  {drugCompanies
                    ? drugCompanies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.companyName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/drug" replace color="info">
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
  drugCompanies: storeState.drugCompany.entities,
  drugEntity: storeState.drug.entity,
  loading: storeState.drug.loading,
  updating: storeState.drug.updating,
  updateSuccess: storeState.drug.updateSuccess,
});

const mapDispatchToProps = {
  getDrugCompanies,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DrugUpdate);

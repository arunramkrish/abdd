import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prescription-item.reducer';
import { IPrescriptionItem } from 'app/shared/model/prescription-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrescriptionItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrescriptionItemDetail = (props: IPrescriptionItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prescriptionItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abddApp.prescriptionItem.detail.title">PrescriptionItem</Translate> [<b>{prescriptionItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="prescriptionQty">
              <Translate contentKey="abddApp.prescriptionItem.prescriptionQty">Prescription Qty</Translate>
            </span>
          </dt>
          <dd>{prescriptionItemEntity.prescriptionQty}</dd>
          <dt>
            <span id="instructionsToCustomer">
              <Translate contentKey="abddApp.prescriptionItem.instructionsToCustomer">Instructions To Customer</Translate>
            </span>
          </dt>
          <dd>{prescriptionItemEntity.instructionsToCustomer}</dd>
          <dt>
            <Translate contentKey="abddApp.prescriptionItem.drug">Drug</Translate>
          </dt>
          <dd>{prescriptionItemEntity.drug ? prescriptionItemEntity.drug.drugName : ''}</dd>
          <dt>
            <Translate contentKey="abddApp.prescriptionItem.prescription">Prescription</Translate>
          </dt>
          <dd>{prescriptionItemEntity.prescription ? prescriptionItemEntity.prescription.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/prescription-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prescription-item/${prescriptionItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prescriptionItem }: IRootState) => ({
  prescriptionItemEntity: prescriptionItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionItemDetail);

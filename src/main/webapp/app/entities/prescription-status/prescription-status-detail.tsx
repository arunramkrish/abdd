import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prescription-status.reducer';
import { IPrescriptionStatus } from 'app/shared/model/prescription-status.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrescriptionStatusDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrescriptionStatusDetail = (props: IPrescriptionStatusDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prescriptionStatusEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abddApp.prescriptionStatus.detail.title">PrescriptionStatus</Translate> [
          <b>{prescriptionStatusEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="abddApp.prescriptionStatus.code">Code</Translate>
            </span>
          </dt>
          <dd>{prescriptionStatusEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="abddApp.prescriptionStatus.description">Description</Translate>
            </span>
          </dt>
          <dd>{prescriptionStatusEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/prescription-status" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prescription-status/${prescriptionStatusEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prescriptionStatus }: IRootState) => ({
  prescriptionStatusEntity: prescriptionStatus.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionStatusDetail);

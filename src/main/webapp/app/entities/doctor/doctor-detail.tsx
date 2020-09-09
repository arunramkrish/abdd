import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './doctor.reducer';
import { IDoctor } from 'app/shared/model/doctor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDoctorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DoctorDetail = (props: IDoctorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { doctorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abddApp.doctor.detail.title">Doctor</Translate> [<b>{doctorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="doctorName">
              <Translate contentKey="abddApp.doctor.doctorName">Doctor Name</Translate>
            </span>
          </dt>
          <dd>{doctorEntity.doctorName}</dd>
          <dt>
            <span id="doctorHospital">
              <Translate contentKey="abddApp.doctor.doctorHospital">Doctor Hospital</Translate>
            </span>
          </dt>
          <dd>{doctorEntity.doctorHospital}</dd>
          <dt>
            <span id="doctorSpeciality">
              <Translate contentKey="abddApp.doctor.doctorSpeciality">Doctor Speciality</Translate>
            </span>
          </dt>
          <dd>{doctorEntity.doctorSpeciality}</dd>
          <dt>
            <span id="mobileNo">
              <Translate contentKey="abddApp.doctor.mobileNo">Mobile No</Translate>
            </span>
          </dt>
          <dd>{doctorEntity.mobileNo}</dd>
          <dt>
            <Translate contentKey="abddApp.doctor.address">Address</Translate>
          </dt>
          <dd>{doctorEntity.address ? doctorEntity.address.line1BuildingNumber : ''}</dd>
        </dl>
        <Button tag={Link} to="/doctor" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/doctor/${doctorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ doctor }: IRootState) => ({
  doctorEntity: doctor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);

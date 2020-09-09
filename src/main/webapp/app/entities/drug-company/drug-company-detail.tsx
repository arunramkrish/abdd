import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './drug-company.reducer';
import { IDrugCompany } from 'app/shared/model/drug-company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDrugCompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DrugCompanyDetail = (props: IDrugCompanyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { drugCompanyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abddApp.drugCompany.detail.title">DrugCompany</Translate> [<b>{drugCompanyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="companyName">
              <Translate contentKey="abddApp.drugCompany.companyName">Company Name</Translate>
            </span>
          </dt>
          <dd>{drugCompanyEntity.companyName}</dd>
          <dt>
            <span id="companyDetails">
              <Translate contentKey="abddApp.drugCompany.companyDetails">Company Details</Translate>
            </span>
          </dt>
          <dd>{drugCompanyEntity.companyDetails}</dd>
        </dl>
        <Button tag={Link} to="/drug-company" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/drug-company/${drugCompanyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ drugCompany }: IRootState) => ({
  drugCompanyEntity: drugCompany.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DrugCompanyDetail);

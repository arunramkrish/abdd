import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './drug.reducer';
import { IDrug } from 'app/shared/model/drug.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDrugDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DrugDetail = (props: IDrugDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { drugEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abddApp.drug.detail.title">Drug</Translate> [<b>{drugEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="drugName">
              <Translate contentKey="abddApp.drug.drugName">Drug Name</Translate>
            </span>
          </dt>
          <dd>{drugEntity.drugName}</dd>
          <dt>
            <span id="drugCost">
              <Translate contentKey="abddApp.drug.drugCost">Drug Cost</Translate>
            </span>
          </dt>
          <dd>{drugEntity.drugCost}</dd>
          <dt>
            <span id="drugAavailableDate">
              <Translate contentKey="abddApp.drug.drugAavailableDate">Drug Aavailable Date</Translate>
            </span>
          </dt>
          <dd>
            {drugEntity.drugAavailableDate ? (
              <TextFormat value={drugEntity.drugAavailableDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="drugWithdrawnDate">
              <Translate contentKey="abddApp.drug.drugWithdrawnDate">Drug Withdrawn Date</Translate>
            </span>
          </dt>
          <dd>
            {drugEntity.drugWithdrawnDate ? (
              <TextFormat value={drugEntity.drugWithdrawnDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="drugDescription">
              <Translate contentKey="abddApp.drug.drugDescription">Drug Description</Translate>
            </span>
          </dt>
          <dd>{drugEntity.drugDescription}</dd>
          <dt>
            <span id="genericYn">
              <Translate contentKey="abddApp.drug.genericYn">Generic Yn</Translate>
            </span>
          </dt>
          <dd>{drugEntity.genericYn}</dd>
          <dt>
            <span id="drugDetails">
              <Translate contentKey="abddApp.drug.drugDetails">Drug Details</Translate>
            </span>
          </dt>
          <dd>{drugEntity.drugDetails}</dd>
          <dt>
            <Translate contentKey="abddApp.drug.company">Company</Translate>
          </dt>
          <dd>{drugEntity.company ? drugEntity.company.companyName : ''}</dd>
        </dl>
        <Button tag={Link} to="/drug" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/drug/${drugEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ drug }: IRootState) => ({
  drugEntity: drug.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetail);

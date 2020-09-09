import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './drug-company.reducer';
import { IDrugCompany } from 'app/shared/model/drug-company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDrugCompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DrugCompany = (props: IDrugCompanyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { drugCompanyList, match, loading } = props;
  return (
    <div>
      <h2 id="drug-company-heading">
        <Translate contentKey="abddApp.drugCompany.home.title">Drug Companies</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abddApp.drugCompany.home.createLabel">Create new Drug Company</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {drugCompanyList && drugCompanyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.drugCompany.companyName">Company Name</Translate>
                </th>
                <th>
                  <Translate contentKey="abddApp.drugCompany.companyDetails">Company Details</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {drugCompanyList.map((drugCompany, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${drugCompany.id}`} color="link" size="sm">
                      {drugCompany.id}
                    </Button>
                  </td>
                  <td>{drugCompany.companyName}</td>
                  <td>{drugCompany.companyDetails}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${drugCompany.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${drugCompany.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${drugCompany.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="abddApp.drugCompany.home.notFound">No Drug Companies found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ drugCompany }: IRootState) => ({
  drugCompanyList: drugCompany.entities,
  loading: drugCompany.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DrugCompany);

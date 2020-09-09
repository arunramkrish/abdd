import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/address">
      <Translate contentKey="global.menu.entities.address" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/customer">
      <Translate contentKey="global.menu.entities.customer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/doctor">
      <Translate contentKey="global.menu.entities.doctor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/prescription-status">
      <Translate contentKey="global.menu.entities.prescriptionStatus" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/payment-methods">
      <Translate contentKey="global.menu.entities.paymentMethods" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/drug-company">
      <Translate contentKey="global.menu.entities.drugCompany" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/drug">
      <Translate contentKey="global.menu.entities.drug" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/prescription-item">
      <Translate contentKey="global.menu.entities.prescriptionItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/prescription">
      <Translate contentKey="global.menu.entities.prescription" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

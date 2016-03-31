/**
 *   Copyright 2016 OSBI Ltd
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import React from 'react';
import autoBind from 'react-autobind';
import _ from 'underscore';
import classNames from 'classnames';
import {
  Grid,
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
  Button
} from 'react-bootstrap';
import Clearfix from '../../bootstrap/Clearfix';
import { Icon } from '../react-saiku';
import Logo from '../Logo';
import MenubarCollection from './MenuBarCollection';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      models: ''
    };

    this._menubarUI = new MenubarCollection();

    autoBind(this, '_handleFetchUI', '_renderMenu', '_renderSubMenu');
  }

  componentDidMount() {
    this._menubarUI.fetch({
      success: this._handleFetchUI
    });
  }

  _handleFetchUI(menubarUI) {
    this.setState({
      models: menubarUI.models[0]
    });
  }

  _renderMenu(menu, index) {
    let key = _.uniqueId('menu_');
    let isVisible = !menu.visible ? 'hidden' : '';

    return (
      <NavDropdown
        className={isVisible}
        id={key}
        key={key}
        eventKey={index}
        title={menu.name}
      >
        {menu.subitem.map(this._renderSubMenu)}
      </NavDropdown>
    );
  }

  _renderSubMenu(submenu, index) {
    let key = _.uniqueId(`menu_item_${index}_`);
    let isVisible = !submenu.visible ? 'hidden' : '';

    return (
      <MenuItem
        className={isVisible}
        id={key}
        key={key}
        eventKey={key}
        href={submenu.action}
      >
        {submenu.name}
      </MenuItem>
    );
  }

  renderLogo(isLogo) {
    if (isLogo) {
      return (
        <div className="topbar-left">
          <div className="text-center">
            <a href="#" className="logo">
              <Logo
                src="../dist/assets/images/saiku/logo-big.svg"
                width={180}
                height={30}
              />
            </a>
          </div>
        </div>
      );
    }
  }

  renderMenuMobile(isMenuMobile) {
    if (isMenuMobile) {
      return (
        <div className="pull-left">
          <Button
            className="button-menu-mobile open-left"
          >
            <Icon name="navicon" />
          </Button>
          <Clearfix />
        </div>
      );
    }
  }

  render() {
    let menus = (this.state && !(_.isEmpty(this.state.models))) ?
      this.state.models.getItem() : [];
    let isLogo = this.props.logo;
    let isMenuMobile = this.props.menuMobile;

    return (
      <div
        className={classNames('topbar', this.props.className)}
        {...this.props}
        style={this.props.style}
      >
        {this.renderLogo(isLogo)}
        <Navbar role="navigation">
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Grid>
              {this.renderMenuMobile(isMenuMobile)}
              <Nav pullLeft>
                {this.props.contentLeft}
              </Nav>
              <Nav>
                {menus.map(this._renderMenu)}
              </Nav>
              <Nav pullRight>
                {this.props.contentRight}
              </Nav>
            </Grid>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

MenuBar.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  contentLeft: React.PropTypes.node,
  contentRight: React.PropTypes.node,
  logo: React.PropTypes.bool,
  menuMobile: React.PropTypes.bool
};

MenuBar.defaultProps = {
  logo: false,
  menuMobile: false
};

export default MenuBar;

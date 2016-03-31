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
  NavItem,
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

    autoBind(this, 'handleFetchUI', 'renderMenu');
  }

  componentDidMount() {
    this._menubarUI.fetch({
      success: this.handleFetchUI
    });
  }

  handleFetchUI(menubarUI) {
    this.setState({
      models: menubarUI.models[0]
    });
  }

  renderMenuItem(menuItem, index) {
    let key = _.uniqueId(`menu_item_${index}_`);
    let isVisible = !menuItem.visible ? 'hidden' : '';
    let { componentProps } = menuItem;
    let className = componentProps.className;

    componentProps.className = classNames(className, isVisible);

    if (!componentProps.id) {
      componentProps.id = key;
    }

    if (!componentProps.eventKey) {
      componentProps.eventKey = index;
    }

    return (
      <MenuItem
        key={key}
        {...componentProps}
      >
        {menuItem.name}
      </MenuItem>
    );
  }

  renderNavDropdown(menu, index) {
    let key = _.uniqueId(`menu_${index}_`);
    let isVisible = !menu.visible ? 'hidden' : '';
    let { componentProps } = menu;
    let className = componentProps.className;

    componentProps.className = classNames(className, isVisible);

    if (!componentProps.id) {
      componentProps.id = key;
    }

    if (!componentProps.eventKey) {
      componentProps.eventKey = index;
    }

    return (
      <NavDropdown
        key={key}
        title={menu.name}
        {...componentProps}
      >
        {menu.children.map(this.renderMenuItem)}
      </NavDropdown>
    );
  }

  renderNavItem(menu, index) {
    let key = _.uniqueId(`menu_${index}_`);
    let isVisible = !menu.visible ? 'hidden' : '';
    let { componentProps } = menu;
    let className = componentProps.className;

    componentProps.className = classNames(className, isVisible);

    if (!componentProps.id) {
      componentProps.id = key;
    }

    if (!componentProps.eventKey) {
      componentProps.eventKey = index;
    }

    return (
      <NavItem
        key={key}
        {...componentProps}
      >
        {menu.name}
      </NavItem>
    );
  }

  renderMenu(menu, index) {
    if (menu.component === 'NavDropdown') {
      return this.renderNavDropdown(menu, index);
    }
    else if (menu.component === 'NavItem') {
      return this.renderNavItem(menu, index);
    }
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
    let data = (this.state && !(_.isEmpty(this.state.models))) ?
      this.state.models.getData() : [];
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
                {data.map(this.renderMenu)}
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
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
import { elementType } from 'react-prop-types';
import classNames from 'classnames';

/**
 * Saiku <Icon /> component.
 * This component should display a icon of Font-Awesome.
 *
 * @example
 * <Icon name="home" />
 */
class Icon extends React.Component {

  /**
   * React components implement the `render()` method that takes input data and
   * returns what to display. This method uses an XML-like syntax called JSX.
   * Input data that is passed into the component can be accessed by `render()`
   * via this.props.
   *
   * @return {HTMLElement|Node|String} An image the company.
   */
  render() {
    let {
      componentClass: ComponentClass,
      name, fixed, spin, pulse,
      size, rotate, flip
    } = this.props;
    let className = classNames(this.props.className, {
      [this.props.faClass]: true,
      [`fa-${name}`]: true,
      ['fa-fw']: fixed,
      ['fa-spin']: spin,
      ['fa-pulse']: pulse
    });

    if (size) {
      className = `${className} fa-${size}`;
    }

    if (rotate) {
      className = `${className} fa-rotate-${rotate}`;
    }

    if (flip) {
      className = `${className} fa-flip-${flip}`;
    }

    return (
      <ComponentClass
        className={className}
        {...this.props}
        style={this.props.style}
      />
    );
  }
}

Icon.propTypes = {
  componentClass: elementType,
  className: React.PropTypes.string,
  style: React.PropTypes.string,
  faClass: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  fixed: React.PropTypes.bool,
  spin: React.PropTypes.bool,
  pulse: React.PropTypes.bool,
  size: React.PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
  rotate: React.PropTypes.oneOf(['45', '90', '135', '180',
    '225', '270', '315']),
  flip: React.PropTypes.oneOf(['horizontal', 'vertical'])
};

Icon.defaultProps = {
  componentClass: 'i',
  faClass: 'fa',
  fixed: false,
  spin: false,
  pulse: false
};

export default Icon;

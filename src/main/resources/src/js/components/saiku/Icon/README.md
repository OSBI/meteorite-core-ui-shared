# Saiku `<Icon />` component

This component should display a icon of [Font Awesome](https://fortawesome.github.io/Font-Awesome/icons/).

## Usage

```javascript
import { Icon } from '../react-saiku';
```

## Options

### Props

Attribute        | Options                                       | Default | Description
---              | ---                                           | ---     | ---
`componentClass` | *elementType*                                 | `i`     | You can use a custom element for this component. Ex.: `span`, `a` etc.
`className`      | *string*                                      |         | The `className` props specifies one or more classnames for an element.
`style`          | *string*                                      |         | The `style` props specifies an inline style for an element.
`faClass`        | *string*                                      | `fa`    | The `faClass` props specifies the default class name `fa`.
`name`           | *string*                                      |         | Name of the icon to use.
`fixed`          | *boolean*                                     | `false` | Make buttons fixed width.
`spin`           | *boolean*                                     | `false` | Spin the icon.
`pulse`          | *boolean*                                     | `false` | Rotate icon with 8 steps (rather than smoothly).
`size`           | `lg`, `2x`, `3x`, `4x`, `5x`                  |         | The icon scaling size.
`rotate`         | `45`, `90`, `135`, `180`, `225`, `270`, `315` |         | The degree to rotate the icon.
`flip`           | `horizontal`, `vertical`                      |         | Flip the icon's orientation.

### Methods

*None*

### Events

*None*

## Example

```javascript
import React from 'react';
import { Icon } from '../react-saiku';

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <Icon
          className="super-crazy-colors"
          name="home"
          size="2x"
          spin
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
      </div>
    );
  }
}
```

**[⬅ back](../)**&nbsp;&nbsp;&nbsp;&nbsp;**[⬆ back to top](#saiku-icon--component)**

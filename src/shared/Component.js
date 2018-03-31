import Grid from '../Grid';

import { isUndefined, getScaledRems } from '../utils';
import { isDefined, isNumber, isString } from '../validators';

let COMPONENT_ID = 0;

class Component {
  constructor(config = {}) {
    this.id = COMPONENT_ID++;

    this._validateConfig(config);

    this.div = null;
    this.config = { ...config };
    this.grid = new Grid({ width: this.config.width || 1, height: this.config.height || 1 });
  }

  _validateConfig(config) {
    const validators = {
      x: isNumber,
      y: isNumber,
      width: isNumber,
      height: isNumber,
      fill: isString,
      strokeColor: isString,
      strokeWidth: isNumber,
      textColor: isString,
      rounded: isNumber
    };

    Object.keys(config).forEach((k) => {
      if ( !(k in validators) ) throw new Error(`Component: Nonexistent style [${k}].`);
      if ( !validators[k](config[k]) ) throw new Error(`Component: Bad style [${k}].`);
    });
  }

  _getStyle(scale) {
    const base = {
      position: 'absolute',
      left: getScaledRems(this.config.x || 0, scale),
      top: getScaledRems(this.config.y || 0, scale),
      width: getScaledRems(this.config.width || 1, scale),
      height: getScaledRems(this.config.height || 1, scale),
      backgroundColor: this.config.fill || 'rgba(0, 0, 0, 0.05)',
      borderRadius: getScaledRems(this.config.rounded || 0, scale),
      transition: this.animated ? 'all .5s ease-in-out' : '',
    };

    return base;
  }

  _attachStyles(scale) {
    const styles = this._getStyle(scale);
    Object.keys(styles).forEach((key) => {
      this.div.style[key] = styles[key];
    });
  }

  add(component) {
    this.grid.add(component);
    return this;
  }

  remove(component) {
    this.grid.remove(component);
    return this;
  }

  copy() {
    const copy = new Component(this.config);
    this.grid.components.forEach((c) => {
      copy.add(c.copy());
    });
    return copy;
  }

  move(config) {
    if ('x' in config && isNumber(config.x)) this.config.x += config.x;
    if ('y' in config && isNumber(config.y)) this.config.y += config.y;
    return this;
  }

  alter(config) {
    this._validateConfig(config);

    if ('width' in config || 'height' in config) {
      this.grid = new Grid({
        width: config.width || this.config.width,
        height: config.height || this.cofig.height,
      });
    }

    this.config = {
      ...this.config,
      ...config,
    }

    return this;
  }

  render(scale) {
    this.div = document.createElement('div');

    this._attachStyles(scale);

    this.div.appendChild(this.grid.render(scale));

    return this.div;
  }
}

export default Component;

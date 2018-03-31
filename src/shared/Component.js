import Grid from '../Grid';

import { isUndefined, getScaledRems } from '../utils';

let COMPONENT_ID = 0;

class Component {
  constructor(config = {}) {
    this.config = config;
    this.id = COMPONENT_ID++;

    this.div = null;
    this.style = config.style || {};
    this.styles = {
      mouseEnter: {},
      mouseLeave: {},
      mouseDown: {},
      mouseUp: {},
    };
    this.interactions = {
      mouseEnter: false,
      mouseLeave: false,
      mouseDown: false,
      mouseUp: false,
    };
    this.animated = (isUndefined(config.animated)) ? true : config.animated;
    this.position = {
      top: config.top || 0,
      left: config.left || 0,
    };
    this.dimensions = {
      width: config.width || 1,
      height: config.height || 1,
    };
    this.grid = new Grid(this.dimensions);
  }

  _getStyle(scale) {
    const base = {
      position: 'absolute',
      top: getScaledRems(this._getPosition('top'), scale),
      left: getScaledRems(this._getPosition('left'), scale),
      width: getScaledRems(this._getDimension('width'), scale),
      height: getScaledRems(this._getDimension('height'), scale),
      transition: this.animated ? 'all .5s ease-in-out' : '',
    };

    return {
      ...this.style,
      ...(this.interactions.mouseEnter ? this.styles.mouseEnter : {}),
      ...base,
    }
  }

  _getPosition(pos) {
    if (this.interactions.mouseEnter && pos in this.styles.mouseEnter) {
      return this.styles.mouseEnter[pos];
    }
    return this.position[pos];
  }

  _getDimension(dim) {
    if (this.interactions.mouseEnter && dim in this.styles.mouseEnter) {
      return this.styles.mouseEnter[dim];
    }
    return this.dimensions[dim];
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
    return new Component(this.config);
  }

  move(pos = {}) {
    this.position = {
      ...this.position,
      ...pos,
    };
    return this;
  }

  resize(dims = {}) {
    this.dimensions = {
      ...this.dimensions,
      ...dims,
    };
    this.grid.resize(this.dimensions);
    return this;
  }

  stylize(style = {}) {
    this.style = {
      ...this.style,
      ...style,
    };
    return this;
  }

  onMouseEnter(style = {}) {
    this.styles.mouseEnter = style;
    return this;
  }
  _onMouseEnter(scale) {
    console.log('mouse enter', this.id);
    this.interactions.mouseEnter = true;
    this._attachStyles(scale);
  }
  _onMouseLeave(scale) {
    console.log('mouse leave', this.id);
    this.interactions.mouseEnter = false;
    this._attachStyles(scale);
  }

  render(scale) {
    this.div = document.createElement('div');

    this._attachStyles(scale);

    // Attach event handlers
    this.div.onmouseenter = () => this._onMouseEnter(scale);
    this.div.onmouseleave = () => this._onMouseLeave(scale);

    this.div.appendChild(this.grid.render(scale));

    return this.div;
  }
}

export default Component;

import { getScaledRems } from './utils';

class Grid {
  constructor(config = {}) {
    this.config = config;

    this.style = config.style || {};
    this.dimensions = {
      width: config.width || 10,
      height: config.height || 10,
    };
    this.grid = {
      scale: config.scale || 1,
    };

    this.components = [];
  }

  _getStyle(scale) {
    return {
      ...this.style,
      position: 'relative',
      backgroundColor: 'rgba(0, 0, 0, .05)',
      width: getScaledRems(this.dimensions.width, scale),
      height: getScaledRems(this.dimensions.height, scale),
    }
  }

  resize(dims = {}) {
    this.dimensions = {
      ...this.dimensions,
      ...dims,
    };
    return this;
  }

  add(component) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i] === component) console.warn('Grid: Child not added. Already exists.');
    }
    this.components.push(component);
    return this;
  }

  remove(component) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i] === component) {
        this.components.splice(i, 1);
        return this;
      }
    }
    console.warn('Grid: Child not removed. Does not exist.');
    return this;
  }

  mount(selector) {
    // ReactDOM.render(this.render(this.grid.scale), document.getElementById(elementId));
    document.querySelectorAll(selector).forEach((el) => {
      el.appendChild(this.render(this.grid.scale));
    });
  }

  render(scale) {
    const div = document.createElement('div');

    const styles = this._getStyle(scale);
    Object.keys(styles).forEach((key) => {
      div.style[key] = styles[key];
    });

    this.components.forEach((c) => {
      div.appendChild(c.render(scale));
    });

    return div;
  }
}

export default Grid;

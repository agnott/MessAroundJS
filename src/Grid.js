import { getScaledRems } from './utils';

class Grid {
  constructor(config = {}) {
    this.config = { ...config };
    this.grid = {
      scale: config.scale || 0.5,
    };

    this.components = [];
  }

  _getStyle(scale) {
    return {
      position: 'relative',
      overflow: 'hidden',
      width: getScaledRems(this.config.width || 1, scale),
      height: getScaledRems(this.config.height || 1, scale),
    }
  }

  resize(dims = {}) {
    if (dims.width) this.config.width = dims.width;
    if (dims.height) this.config.height = dims.height;
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

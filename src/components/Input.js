import Component from '../shared/Component';

class Input extends Component {
  constructor(config) {
    const base = {
      fill: 'white',
      height: 1,
      width: 5,
    };
    super({ ...base, ...config });
  }
}

export default Input;

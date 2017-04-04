import Block from '../Block/Block';

import './Button.scss';

export default class Button extends Block {
  constructor(attributes = {}) {
    super('button', attributes);
    this.setAttributeBlock('class', 'button');
  }

  start(event, callback) {
    this._getElement().addEventListener(event, callback);
  }
}

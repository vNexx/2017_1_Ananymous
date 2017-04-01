import Block from '../../components/Block/Block';

import './PreLoader.scss';
import template from './PreLoader.tmpl.xml';

class PreLoader extends Block {
  constructor() {
    super('div', {
      class: 'pre-loader__wrapper'
    });

    this.init();
  }

  init() {
    this._getElement().innerHTML = template();
  }
}

const preLoader = new PreLoader();

export default preLoader;

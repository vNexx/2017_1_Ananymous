import MainForm from '../MainForm/MainForm';

import template from './UnLogged.tmpl.xml';

export default class UnLogged extends MainForm {
  constructor() {
    super();
  }

  init() {
    this._setUrls(['/signin', '/signup']);

    this._getElement().innerHTML = template({
      buttons: [{
        text: 'SIGN IN'
      }, {
        text: 'REGISTER'
      }]
    });

    this._setMainButtons();
  }
}



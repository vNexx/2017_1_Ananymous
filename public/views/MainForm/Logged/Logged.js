import MainForm from '../MainForm/MainForm';
import viewService from '../../../services/ViewService/ViewService';

import './Logged.scss';
import template from './Logged.tmpl.xml';

export default class Logged extends MainForm {
  constructor() {
    super();
  }

  init() {
    this._setUrls(['/game', '/scoreboard', '']);

    this._getElement().innerHTML = template({
      buttons: [{
        text: 'GAME'
      }, {
        text: 'SCOREBOARD'
      }, {
        text: 'LOGOUT'
      }],
      username: viewService.getUser().login
    });

    this._setMainButtons();
    this._setLogoutButton();
  }

  _setLogoutButton() {
    this._findLogoutButton()
      .addEventListener('click', this.logout.bind(this));
  }

  logout() {
    viewService.showPreLoader();

    viewService.logout()
      .then(() => {
        viewService.hidePreLoader();
        viewService.go('/');
      });
  }

  _findLogoutButton() {
    return this._buttons[2].button;
  }
}

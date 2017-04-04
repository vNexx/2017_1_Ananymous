import MainForm from '../MainForm/MainForm';
import viewService from '../../../services/ViewService/ViewService';

import './Logged.scss';
import template from './Logged.tmpl.xml';

export default class Logged extends MainForm {
  constructor() {
    super();
  }

  init() {
    this._setUrls(['/game', '/scoreboard', '/about', '']);

    this._getElement().innerHTML = template({
      buttons: [{
        text: 'GAME'
      }, {
        text: 'SCOREBOARD'
      }, {
        text: 'ABOUT'
      }, {
        text: 'LOGOUT',
        class: 'button-logout'
      }],
      username: viewService.getUser().login
    });

    this._setMainButtons();
    this._setGameButton();
    this._setLogoutButton();
  }

  _setGameButton() {
    console.log(this._getButton(0));

    this._getButton(0)
      .addEventListener('click', this._game.bind(this));
  }

  _game() {
    viewService.showPreLoader();

    this._hideAll();
    viewService.go('/game');
    viewService.hidePreLoader();
  }

  _hideAll() {
    this._getDocument().querySelector('.wrapper').style.display = 'none';
  }

  _setLogoutButton() {
    this._getButton(3)
      .addEventListener('click', this._logout.bind(this));
  }

  _logout() {
    viewService.showPreLoader();

    viewService.logout()
      .then(() => {
        viewService.go('/');
        viewService.hidePreLoader();
      });
  }

  _getButton(number) {
    return this._buttons[number].button;
  }
}

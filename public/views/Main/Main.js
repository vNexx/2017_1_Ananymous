import Block from '../../components/Block/Block';
import viewService from '../../services/ViewService/ViewService';
import mainViewService from '../../services/MainViewService/MainViewService';
import preLoader from '../PreLoader/PreLoader';

import './Main.scss';
import template from './Main.tmpl.xml';

export default class Main extends Block {
  constructor() {
    super('div', {
      class: 'wrapper'
    });

    this._currentView = null;
    this._isAnimate = 0;
    this.toDocument(preLoader.render());
  }

  init() {
    this._builtBase(template());
    this.toDocument(this.render());
  }

  hide() {
  }

  show() {
    viewService.showPreLoader();

    viewService.isLogin()
      .then(response => {
        return {
          status: +response.status === 200,
          json: response.json()
        }
      })
      .then(data => {
        data.json
          .then(user => {
            if (!user.message) {
              viewService.setUser({
                login: user.login,
                email: user.email
              });
            }

            viewService.setState(data.status);
            this._changeView();

            viewService.hidePreLoader();
          });

      });
  }

  _changeView() {
    const newView = mainViewService.getMainForm();
    
    if (!this._currentView || newView._buttons.length !== this._currentView._buttons.length) {
      if (this._currentView) {
        this._currentView._getElement().style.display = 'none';
      }
      this._currentView = newView;
      this.append(this._currentView.render());
    }
  }

  _builtBase(template) {
    this._getElement().innerHTML = template;
  }
}

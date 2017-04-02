import Block from '../../../components/Block/Block';
import Popup from '../../../animations/Popup/Popup';
import Fade from '../../../animations/Fade/Fade';
import viewService from '../../../services/ViewService/ViewService';

export default class FormView extends Block {
  constructor(form) {
    super('div', {
      class: 'registration'
    });

    this._form = form;
    this._background = this._createBackground();
    this._form.renderTo(this._getElement());
  }

  init() {
    this._initAnimation();

    this._formView = this._setUp();
    this._getDocument().appendChild(this._formView.render());
  }

  show() {
    this._animationBackground.on();
    this._animationForm.on();

    this._hideAll();

    this._formView._getElement().style.display = 'block';
  }

  hide() {
    this._animationBackground.off();
    this._animationForm.off();

    viewService.go('/');
    this._showAll();

    setTimeout(() => {
      this._formView._getElement().style.display = 'none';
    }, 400);
  }

  getForm() {
    return this._getElement();
  }

  _hideAll() {
    this._getDocument().querySelector('.wrapper').style.display = 'none';
  }

  _showAll() {
    this._getDocument().querySelector('.wrapper').style.display = 'block';
  }

  _initAnimation() {
    this._animationForm = new Popup(this.render());
    this._animationBackground = new Fade(this._background.render());
  }

  _createBackground() {
    return new Block('div', {
      class: 'scoreboard__back'
    })
  }

  _setUp() {
    const wrapper = new Block('div', {
      class: 'wrapper__registration'
    });

    wrapper.append(this._background.render());
    wrapper.append(this.render());

    return wrapper;
  }
}

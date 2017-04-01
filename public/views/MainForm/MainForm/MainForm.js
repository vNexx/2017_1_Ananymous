import Block from '../../../components/Block/Block';
import viewService from '../../../services/ViewService/ViewService';

import './MainForm.scss';

export default class MainForm extends Block {
  constructor() {
    super('div', {
      class: 'wrapper__main__form'
    });

    this._urls = [];
    this._buttons = [];
    this.init();
  }

  init() {

  }

  _setUrls(urls) {
    this._urls = urls;
  }

  _setMainButtons() {
    this._setButtons(this._getButtons());
    this._setEvents();
    this._setActive(this._buttons[0]);
  }

  _setEvents() {
    this._setEventGoButtons(this._buttons);
    this._setActiveButtons(this._buttons);
  }

  _setEventGoButtons(buttons) {
    for (let button of buttons) {
      this._setEventGoButton(button.button, () => viewService.go(button.url));
    }
  }

  _setEventGoButton(button, onClickFunction) {
    button.addEventListener('click', () => onClickFunction());
  }

  _setActiveButtons(buttons) {
    for (let button of buttons) {
      button.button.addEventListener('mouseover', event => {
        if (event.type === 'mouseover') {
          const activeButton = this._checkActiveButton(buttons);

          if (activeButton.number !== button.number) {
            this._setPassive(activeButton);
            this._setActive(button);
          }
        }
      });
    }
  }

  _setPassive(button) {
    const background = this._getButtonField(button.button, 'div');
    const text = this._getButtonField(button.button, 'a');

    background.classList.remove('start__background');
    text.classList.remove('start__button');

    button.isActive = false;
  }

  _setActive(button) {
    const background = this._getButtonField(button.button, 'div');
    const text = this._getButtonField(button.button, 'a');

    background.classList.add('start__background');
    text.classList.add('start__button');

    button.isActive = true;
  }

  _checkActiveButton(buttons) {
    for (let button of buttons) {
      if (button.isActive) {
        return button;
      }
    }
  }

  _getButtonField(button, tag) {
    return button.querySelector(tag);
  }

  _getButtons() {
    return this._getElement().getElementsByClassName('main__form-button');
  }

  _setButtons(buttons) {
    for (let buttonIndex in buttons) {
      if (!isNaN(+buttonIndex)) {
        this._buttons.push({
          number: +buttonIndex + 1,
          button: buttons[+buttonIndex],
          url: this._urls[+buttonIndex],
          isActive: false
        });
      }
    }
  }
}

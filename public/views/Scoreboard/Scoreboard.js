import Block from "../../components/Block/Block";
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import Popup from '../../animations/Popup/Popup';
import Fade from '../../animations/Fade/Fade';
import viewService from '../../services/ViewService/ViewService';

import './Scoreboard.scss';

const table = {
  head: ['Nickname', 'Score'],
  body: [
    ['Marvin', '150'],
    ['Trash', '500'],
    ['Top', '10'],
    ['Winner', '1000']
  ].sort((lhs, rhs) => {
    return rhs[1] - lhs[1];
  })
};

class Scoreboard extends Table {
  constructor() {
    super(table);

    this._background = this._createBackground();
  }

  init() {
    this._getElement().append(this._backButton().render());

    this._initAnimation();

    this._scoreboardView = this._setUp();
    this._getDocument().appendChild(this._scoreboardView.render());

    this._sortTable();
  }

  showMain() {
    viewService.go('/');
  }

  show() {
    this._animationBackground.on();
    this._animationTable.on();

    this._scoreboardView._getElement().style.display = 'block';

  }

  hide() {
    this._animationBackground.off();
    this._animationTable.off();

    setTimeout(() => {
      this._scoreboardView._getElement().style.display = 'none';

    }, 400);
  }

  _initAnimation() {
    this._animationTable = new Popup(this.render());
    this._animationBackground = new Fade(this._background.render());
  }

  _sortTable() {
    const table = this.find('.scoreboard');

    table.onclick = event => {
      if (event.target.tagName !== 'TH') {
        return;
      }

      this._sort(table, event.target.cellIndex, event.target.getAttribute('data-type'));
    };
  }

  _sort(table, column, type) {
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = [].slice.call(tbody.rows);

    rows.sort(this._getCompare(type, column));

    this._changeBody(table, rows, tbody);
  }

  _changeBody(table, rows, tbody) {
    table.removeChild(tbody);

    for (let i of rows) {
      tbody.appendChild(i);
    }

    table.appendChild(tbody);
  }

  _getCompare(type, column) {
    switch (type) {
      case 'Score':
        return (lhs, rhs) => {
          return rhs.cells[column].innerHTML - lhs.cells[column].innerHTML;
        };
      case 'Nickname':
        return (lhs, rhs) => {
          return lhs.cells[column].innerHTML > rhs.cells[column].innerHTML ? 1 : -1;
        };
      default:
        return null;
    }
  }

  _backButton() {
    const back = new Button({
      text: 'Back'
    });

    back.setAttributeBlock('class', 'button__table');

    back.start('click', this.showMain.bind(this));

    return back;
  }

  _createBackground() {
    return new Block('div', {
      class: 'scoreboard__back'
    })
  }

  _setUp() {
    const wrapper = new Block('div', {
      class: 'scoreboard__wrapper'
    });

    wrapper.append(this._background.render());
    wrapper.append(this.render());

    return wrapper;
  }
}

export default Scoreboard;

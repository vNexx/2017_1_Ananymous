import Block from '../../components/Block/Block';
import GameScene from './core/GameScene';

import template from './Game.tmpl.xml';
import './Game.scss';

class Game extends Block {
  constructor() {
    super();
  }

  init() {
      this._getElement().innerHTML = template();
      this.toDocument(this.render());
      new GameScene();
  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default Game;

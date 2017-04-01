import Block from '../../components/Block/Block';
import GameScene from './core/GameScene';
import template from './Game.tmpl.xml';

import './Game.scss';

class Game extends Block {
  constructor() {
    super();
  }

  init() {

    // const block = new Block('div', {
    //   class: 'is_overlay',
    //   id: 'trailer'
    // });
    //
    // block._getElement().innerHTML = '<video id=\"video\" width=\"100%\" height=\"auto\" autoplay=\"autoplay\" ' +
    //   'loop=\"loop\" preload=\"auto\"><source src=\"/views/Game/background.mp4\"></source></video>';
    // document.body.appendChild(block.render());

      this._getElement().innerHTML = template;
      const gameScene = new GameScene();
      gameScene.render();

  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default Game;

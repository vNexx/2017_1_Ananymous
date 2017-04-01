import Animation from '../Animation/Animation';

import './Fade.scss';

export default class Fade extends Animation {
  constructor(block, animationType = 'opacity') {
    super(block);

    this._init(animationType);
  }

  _chooseType(type) {
    const popClass = `fade__${type}`;

    this._getClasses().add(popClass);
    return popClass + '-in';
  }

  _getClasses() {
    return this.getElement().classList;
  }
}

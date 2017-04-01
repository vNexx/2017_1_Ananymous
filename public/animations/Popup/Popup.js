import Animation from '../Animation/Animation';

import './Popup.scss';

export default class Popup extends Animation {
  constructor(block, animationType = 'top') {
    super(block);

    this._init(animationType);
  }

  _chooseType(type) {
    const popClass = `popup__${type}`;

    this._getClasses().add(popClass);
    return popClass + '-show';
  }
}

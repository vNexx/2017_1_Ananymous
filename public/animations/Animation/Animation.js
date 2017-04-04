export default class Animation {
  constructor(block) {
    this._block = block;
  }

  on() {
    this._start();
  }

  off() {
    this._stop();
  }

  getElement() {
    return this._block;
  }

  _init(type) {
    this._type = this._chooseType(type);
  }

  _start() {
    this._getClasses().add(this._type);
  }

  _stop() {
    this._getClasses().remove(this._type);
  }

  _chooseType(type) {
  }

  _getClasses() {
    return this.getElement().classList;
  }
}
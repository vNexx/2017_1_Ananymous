import isPath from '../OtherScripts/isPath/isPath';

export default class Route {
  constructor(pathname, view) {
    this._pathname = pathname;
    this.ViewType = view;
    this._view = null;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this._createView();
      this._view.resume();
    }
  }

  leave() {
    this._view && this._view.pause();
  }

  setRouter(router) {
    this._router = router;
  }

  match(pathname) {
    return isPath(pathname, this._pathname);
  }

  _createView() {
    if (!this._view) {
      const view = new this.ViewType();

      view.init();
      view.setRouter(this._router);

      this._view = view;
    }
  }

  _getRouter() {
    return this._router;
  }
}

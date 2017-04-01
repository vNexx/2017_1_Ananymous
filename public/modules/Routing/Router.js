import Route from './Route';
import viewService from '../../services/ViewService/ViewService';

class Router {
  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;

    Router.__instance = this;
  }

  use(pathname, view) {
    const route = new Route(pathname, view);

    route.setRouter(this);
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    this._onRoute('/');
    if (window.location.pathname !== '/') {
      this._onRoute(window.location.pathname);
    }
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    viewService.changeRoute(route, pathname);
  }

  go(pathname) {
    if (window.location.pathname === pathname) {
      return;
    }

    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  setHistory(history) {
    this.history = history;
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default Router;

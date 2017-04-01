import userService from '../UserService/UserService';
import preLoader from '../../views/PreLoader/PreLoader';

class ViewService {
  constructor() {
    if (ViewService.__instance) {
      return ViewService.__instance;
    }

    ViewService.__instance = this;
    this._currentRoute = null;
    this._previousRoute = null;
  }

  changeRoute(route, pathname) {
    this._previousRoute = this._currentRoute;
    this._currentRoute = route;

    if (this._previousRoute) {
      this.hideRoute(this._previousRoute);
    }

    this.showRoute(this._currentRoute, pathname);
  }

  showRoute(view, pathname) {
    view.navigate(pathname);
  }

  hideRoute(view) {
    view.leave();
  }

  go(url) {
    this._currentRoute._getRouter().go(url);
  }

  logout() {
    if (userService.getState()) {
      return userService.logout()
        .then(state => {
          userService.setState(!state);
        });
    }
  }

  isLogin() {
    return userService.isLogin();
  }

  getState() {
    return userService.getState();
  }

  setState(state) {
    userService.setState(state);
  }

  setUser(user) {
    userService.setData(user);
  }

  getUser() {
    return userService.getData();
  }

  showPreLoader() {
    preLoader.show();
  }

  hidePreLoader() {
    preLoader.hide();
  }
}

const viewService = new ViewService();

export default viewService;

import viewService from '../ViewService/ViewService';
import Logged from '../../views/MainForm/Logged/Logged';
import UnLogged from '../../views/MainForm/UnLogged/UnLogged';

class MainViewService {
  constructor() {
    if (MainViewService.__instance) {
      return MainViewService.__instance;
    }

    MainViewService.__instance = this;
  }

  getMainForm() {
    this._form = this._getState() ? new Logged() : new UnLogged();

    return this._form;
  }

  _getState() {
    return viewService.getState();
  }
}

const mainViewService = new MainViewService();

export default mainViewService;

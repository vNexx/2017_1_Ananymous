import transport from '../../modules/Transport/Transport';

class UserService {
  constructor() {
    if (UserService.__instance) {
      return UserService.__instance;
    }

    this._login = null;
    this._email = null;
    this._state = false;

    UserService.__instance = this;
  }

  getData() {
    return {
      login: this._login,
      email: this._email
    };
  }

  getState() {
    return this._state;
  }

  setData(data) {
    this._login = data.login;
    this._email = data.email;
  }

  setState(state) {
    this._state = state;
  }

  isLogin() {
    return transport.get('/cur-user');
  }

  logout() {
    return transport.post('/logout', JSON.stringify({ 'name': 'top' }))
      .then(response => {
        return +response.status === 200;
      });
  }
}

const userService = new UserService();

export default userService;

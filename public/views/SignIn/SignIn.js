import Form from '../../components/Form/Form';
import Block from '../../components/Block/Block';
import View from '../../modules/View/View';

const signInForm = new Form({
  class: 'form z-depth-2'
}, [{
  element: 'h2',
  text: 'Sign In',
  class: 'form-heading'
}, {
  element: 'label',
  text: 'Email address',
  for: 'nputEmail',
  class: 'sr-only'
}, {
  element: 'input',
  type: 'email',
  id: 'inputEmail',
  class: 'form-control',
  placeholder: 'Email address',
  required: true,
  autofocus: true
}, {
  element: 'label',
  text: 'Password',
  for: 'inputPassword',
  class: 'sr-only'
}, {
  element: 'input',
  type: 'password',
  id: 'inputPassword',
  class: 'form-control',
  placeholder: 'Password',
  required: true
}, {
  element: 'button',
  id: 'submit',
  type: 'submit',
  class: 'btn btn-lg btn-primary btn-block',
  text: 'Sign In'
}
]);

export default class SignIn extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    this._changeForm();
    signInForm.renderTo(this._el);
    document.body.appendChild(this._el);
  }

  _changeForm() {
    signInForm.append(this._backButton().render());
  }

  _backButton() {
    const back = new Block('button', {
      id: 'submit',
      type: 'submit',
      class: 'btn btn-lg btn-primary btn-block',
      text: 'Back'
    });
    back.start('click', this.showMain.bind(this));
    return back;
  }

  showMain() {
    this.getRouter().go('/');
  }
}
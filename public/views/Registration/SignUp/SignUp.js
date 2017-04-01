import FormView from '../FormView/FormView';
import Form from "../../../components/Form/Form";

import '../FormView/FormView.scss';

export default class SignUp extends FormView {
  constructor() {
    super(new Form({
      data: {
        title: 'Sign Up',
        fields: [{
          title: 'Login',
          name: 'login',
          type: 'text',
          description: 'Enter username',
          placeholder: 'Username'
        }, {
          title: 'Email',
          name: 'email',
          type: 'email',
          description: 'Enter email',
          placeholder: 'Email address'
        }, {
          title: 'Password',
          name: 'password1',
          type: 'password',
          description: 'Enter password',
          placeholder: '••••••••'
        }, {
          title: 'Repeat password',
          name: 'password2',
          type: 'password',
          description: 'Enter password',
          placeholder: '••••••••'
        }
        ],
        controls: [{
          text: 'Sign Up',
          action: '/signup'
        }]
      }
    }));
  }
}

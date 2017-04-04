import FormView from '../FormView/FormView';
import Form from '../../../components/Form/Form';

import '../FormView/FormView.scss';

export default class SignIn extends FormView {
  constructor() {
    super(new Form({
      data: {
        title: 'Sign In',
        fields: [{
          title: 'Login',
          name: 'login',
          type: 'text',
          description: 'Enter username',
          placeholder: 'Username'
        }, {
          title: 'Password',
          name: 'password1',
          type: 'password',
          description: 'Enter password',
          placeholder: '••••••••'
        }
        ],
        controls: [{
          text: 'Sign In',
          action: '/signin'
        }]
      }
    }));
  }
}

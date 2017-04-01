const express = require('express');
const parser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static('public'));
app.use('/SignUp', express.static('public'));
app.use('/SignIn', express.static('public'));

app.use(parser.json());

let emails = {};

app.post('/users', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  console.log('email: ' + email);
  console.log('password: ' + password);

  if (!emails[email]) {
    emails[email] = {
      password: password
    };
  }
  res.send(emails[email]);
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

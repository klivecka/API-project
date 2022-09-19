window.store.dispatch(window.sessionActions.login({
    credential: "john.smith@gmail.com",
    password: 'secret password'
  }));


  window.store.dispatch(window.sessionActions.signup({
    firstName: "firstname",
    lastName: "lastname",
    username: 'NewUser',
    email: 'new@user.io',
    password: 'password'
  }));
export const constants = {
  appName: 'Viovi',

  routes: {
    main: 'viovi',
    room: '/viovi/room',
    error: '*',
  },

  mainPageScreens: {
    main: 'main',
    signUp: 'signUp',
    signIn: 'signIn',
  },

  errors: {
    confirmPassword: `Confirm password don't match password`,
    requiredFields: 'All fields are required',
    noValidEmail: 'Email is not valid',
  },

  localStorageKeys: {
    authToken: 'authToken',
  },
};

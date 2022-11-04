import ApiManager from './ApiManager';
import Resources from './Resources';
import config from '~/config/appConfig';
const authConfig = config.auth;

class Auth extends Resources {
  authUser = {};
  routes = {
    login: 'token',
  };
  // Sandbox test user
  username = 'dung+octopus4@101digital.io';
  password = 'Abc@123456';

  constructor() {
    super(arguments);
  }

  setAuthToken(user) {
    if (user) {
      this.authUser = user;
    }
  }

  login = async payload => {
    payload = {
      ...authConfig,
      ...payload,
    };

    return ApiManager.post(this.routes.login, payload, true);
  };
}

const AuthService = new Auth();

export default AuthService;
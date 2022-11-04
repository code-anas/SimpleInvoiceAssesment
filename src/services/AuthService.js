import ApiManager from './ApiManager';
import Resources from './Resources';
import config from '~/config/appConfig';
const authConfig = config.auth;

class Auth extends Resources {
  authUser = {};
  routes = {
    login: 'token',
    me: 'membership-service/1.2.0/users/me',
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

  profile() {
    return ApiManager.get(this.routes.me).then(res => {
      this.authUser = res.data.data;
      return res.data.data;
    });
  }

  login = async payload => {
    payload = {
      ...authConfig,
      ...payload,
    };

    return ApiManager.post(this.routes.login, payload, true).then(({data}) => {
      if (data.error) {
        return data;
      }

      ApiManager.setHeaders(data.access_token);
      return this.profile();
    });
  };
}

const AuthService = new Auth();

export default AuthService;

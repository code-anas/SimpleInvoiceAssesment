import ApiManager from './ApiManager';
import Resources, {Singleton} from './Resources';

class AuthService extends Resources {
  authUser = {};
  routes = {
    login: 'token',
  };

  constructor() {
    super(arguments);
  }

  setAuthToken(user) {
    if (user) {
      this.authUser = user;
    }
  }

  login = async payload => {
    return ApiManager.post(this.routes.login, payload);
  };
}

export default Singleton(AuthService);

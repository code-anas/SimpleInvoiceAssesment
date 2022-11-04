/* eslint-disable no-alert */
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import config from '~/config/appConfig';

const BASE_URL = config.server_url;

axios.defaults.validateStatus = status => {
  return status >= 200 && status <= 500;
};

axios.defaults.timeout = 60000;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.accept = 'application/json';
axios.defaults.headers.post.crossDomain = true;

/*
  Use axios interceptors to configure headers, show response error messages etc.
*/
axios.interceptors.request.use(
  // eslint-disable-next-line no-shadow
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response !== undefined) {
      alert(error);
    }
    return Promise.reject(error);
  },
);

class Api {
  isInitialized = false;
  accessToken = '';

  constructor() {}

  init() {}

  getVersion() {
    return 'API Manager 1.0';
  }
  axios(options) {
    options.url = BASE_URL + options.url;
    console.log(options);
    return axios(options);
  }

  setHeaders(token) {
    axios.defaults.headers.common.Authorization =
      `Bearer ${token}` || this.accessToken;
  }

  removeAuth() {
    axios.defaults.headers.common.Authorization = '';
  }

  configureAPI(accessToken) {
    this.accessToken = accessToken;
    this.setHeaders(accessToken);
  }

  checkConfig(otherToken) {
    if (otherToken) {
      this.setHeaders(otherToken);
    }
    return new Promise((res, rej) => {
      NetInfo.fetch().then(({isConnected}) => {
        if (isConnected) {
          res(true);
        } else {
          rej({data: 'Network connection failed!', status: 400});
        }
      });
    });
  }

  async get(url, params = null, otherToken = '') {
    try {
      await this.checkConfig(otherToken);

      return axios.get(BASE_URL + url, {params: params});
    } catch (e) {
      return e;
    }
  }

  async put(url, body, otherToken = '') {
    try {
      await this.checkConfig(otherToken);
      return axios.put(BASE_URL + url, body);
    } catch (e) {
      return e;
    }
  }

  // eslint-disable-next-line no-shadow
  async patch(url, body, config, otherToken = '') {
    try {
      await this.checkConfig(otherToken);
      return axios.patch(BASE_URL + url, body, config);
    } catch (e) {
      return e;
    }
  }

  async post(url, body, isUrlEncoded = false, otherToken = '') {
    try {
      await this.checkConfig(otherToken);
      if (isUrlEncoded) {
        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        body = Object.keys(body)
          .map(key => `${key}=${encodeURIComponent(body[key])}`)
          .join('&');
      } else if (isUrlEncoded === 'uploadFile') {
        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
      } else {
        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
      }
      return axios.post(BASE_URL + url, body);
    } catch (e) {
      return e;
    }
  }

  async delete(url, params = null, otherToken = '') {
    try {
      await this.checkConfig(otherToken);
      return axios.delete(BASE_URL + url, {params: params});
    } catch (e) {
      return e;
    }
  }
}

const ApiManager = new Api();
export default ApiManager;

import {makeAutoObservable, observable} from 'mobx';

export class Customer {
  id = '';
  addresses = '';
  firstName = '';
  lastName = '';
  name = '';

  constructor(payload) {
    if (payload) {
      this.setPayload(payload);
    }
    makeAutoObservable(this);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  setPayload(payload) {
    Object.entries(payload).forEach(([name, value]) => {
      this.setAttribute(name, value);
    });
  }
}

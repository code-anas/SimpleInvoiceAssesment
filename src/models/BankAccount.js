import {makeAutoObservable} from 'mobx';

export class BankAccount {
  bankId = '';
  sortCode = '';
  accountNumber = '';
  accountName = '';

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

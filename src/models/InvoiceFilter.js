import {makeAutoObservable, observable} from 'mobx';
import moment from 'moment';

const ASCENDING = 'ASCENDING';
const DESCENDING = 'DESCENDING';

const CREATED_DATE = 'CREATED DATE';
const INVOICE_DATE = 'INVOICE DATE';
const DUE_DATE = 'DUE DATE';

const PAID = 'PAID';
const OVERDUE = 'OVERDUE';

export class InvoiceFilter {
  order = '';
  sortBy = '';
  fromDate = '';
  toDate = '';
  status = '';

  orders = [ASCENDING, DESCENDING];
  sorts = [CREATED_DATE, INVOICE_DATE];
  statuses = [PAID, OVERDUE];

  constructor() {
    makeAutoObservable(this);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  setOrder = order => {
    this.order = order;
  };

  setSortBy = sortBy => {
    this.sortBy = sortBy;
  };

  setStatusBy = status => {
    this.status = status;
  };

  get getFromDate() {
    return this.fromDate ? moment(this.fromDate).format('YYYY-MM-DD') : '';
  }

  get getToDate() {
    return this.toDate ? moment(this.toDate).format('YYYY-MM-DD') : '';
  }
}
const invoiceFilter = new InvoiceFilter();
export default invoiceFilter;

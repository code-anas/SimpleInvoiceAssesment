import {makeAutoObservable, observable} from 'mobx';

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
  sorts = [CREATED_DATE, INVOICE_DATE, DUE_DATE];
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
}
const invoiceFilter = new InvoiceFilter();
export default invoiceFilter;

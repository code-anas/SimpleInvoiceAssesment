import {runInAction, makeAutoObservable, observable} from 'mobx';
import {InvoiceService} from '~/services';
import {Customer} from './Customer';
import debounce from 'lodash/debounce';
import invoiceFilter from './InvoiceFilter';
export class Invoice {
  version = '';

  balanceAmount = 0;
  totalAmount = 0;
  totalDiscount = 0;
  totalPaid = 0;
  invoiceGrossTotal = 0;
  totalTax = 0;
  invoiceSubTotal = 0;

  currency = '';
  description = '';
  extensions = '';
  invoiceId = '';
  invoiceNumber = '';
  numberOfDocuments = '';
  referenceNo = '';
  subStatus = '';
  type = '';

  invoiceDate = '';
  dueDate = '';
  createdAt = '';

  customer = new Customer();

  constructor(payload) {
    if (payload) {
      this.setPayload(payload);
    }
    makeAutoObservable(this);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  setPayload(invoice) {
    Object.entries(invoice).forEach(([name, value]) => {
      this.setAttribute(name, value);
    });
    this.customer = new Customer(invoice.customer);
  }
}

export class InvoiceList {
  list = observable.array();
  loading = false;
  keyword = '';
  currentKeyword = '';

  paging = {
    totalRecords: 0,
    pageSize: 10,
    pageNumber: 0,
  };

  constructor() {
    this.init();

    makeAutoObservable(this);
  }

  init() {
    this.clearList;
    this.getInvoices();
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  setPayload(invoices) {
    this.list.push(...invoices.map(invoice => new Invoice(invoice)));
  }

  clearList() {
    this.list = [];
    this.paging = {
      totalRecords: 0,
      pageSize: 10,
      pageNumber: 0,
    };
  }

  getInvoices = () => {
    this.loading = true;

    if (this.keyword !== this.currentKeyword) {
      this.clearList();
      this.currentKeyword = this.keyword;
    }

    const params = {
      pageNum: this.paging.pageNumber + 1,
      keyword: this.keyword,
      // sortBy: invoiceFilter.sortBy,
      // ordering: invoiceFilter.order,
    };

    InvoiceService.find(params).then(res => {
      runInAction(() => {
        this.paging = res.data.paging;
        const invoices = res?.data?.data;
        if (invoices?.length) {
          this.setPayload(invoices);
        }
        this.loading = false;
      });
    });
  };

  onSearch = debounce(search => {
    this.keyword = search;
    this.getInvoices();
  }, 1000);

  get hasMoreRecorrds() {
    return this.paging.totalRecords > this.list.length;
  }
}

import {runInAction, makeAutoObservable, observable} from 'mobx';
import {InvoiceService} from '~/services';
import {Customer} from './Customer';

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
    this.getInvoices();
  }

  getInvoices = () => {
    this.loading = true;
    InvoiceService.find({pageNum: this.paging.pageNumber + 1}).then(res => {
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

  setAttribute(name, value) {
    this[name] = value;
  }

  setPayload(invoices) {
    this.list.push(...invoices.map(invoice => new Invoice(invoice)));
  }

  get hasMoreRecorrds() {
    return this.paging.totalRecords > this.list.length;
  }
}

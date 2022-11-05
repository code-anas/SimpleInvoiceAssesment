import {createRef} from 'react';
import {runInAction, makeAutoObservable, observable} from 'mobx';
import {InvoiceService} from '~/services';
import {Customer} from './Customer';
import debounce from 'lodash/debounce';
import invoiceFilter from './InvoiceFilter';
import {v4 as uuidv4} from 'uuid';
import {BankAccount} from './BankAccount';
import {showMessage} from 'react-native-flash-message';

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
  bankAccount = '';
  customer = new Customer();
  banks = [];

  messageRef = createRef();

  constructor(payload) {
    this.key = uuidv4();
    if (payload) {
      this.setPayload(payload);
    } else {
      this.genrateInvoiceNumber();
      this.banks.push(
        new BankAccount({
          sortCode: '09-01-01',
          accountNumber: '12345678',
          accountName: 'John Terry',
        }),
      );
      this.banks.push(
        new BankAccount({
          sortCode: '08-21-01',
          accountNumber: '98765432',
          accountName: 'Anas Naeem',
        }),
      );
    }
    makeAutoObservable(this);
  }

  genrateInvoiceNumber() {
    this.invoiceNumber = 'INV' + Math.random().toString().slice(2, 11);
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

  error = m =>
    this.messageRef.current.showMessage({
      message: m,
      type: 'danger',
    });

  validate() {
    if (!this.invoiceNumber) {
      this.error('Please enter the invoice number!');
      return false;
    }

    if (!this.bankAccount) {
      this.error('Please select the bank account!');
      return false;
    }

    if (!this.balanceAmount) {
      this.error('Please enter the balance ammount!');
      return false;
    }

    if (!this.description) {
      this.error('Please enter the description!');
      return false;
    }

    if (!this.dueDate) {
      this.error('Please select the due date!');
      return false;
    }

    if (!this.invoiceDate) {
      this.error('Please select the invoice date!');
      return false;
    }

    return true;
  }
}

export class InvoiceList {
  list = observable.array();
  loading = false;
  isSearching = false;
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
  }

  clearPagging() {
    if (this.isDifferentKeyword) {
      this.paging = {
        totalRecords: 0,
        pageSize: 10,
        pageNumber: 0,
      };
    }
  }

  getInvoices = () => {
    this.loading = true;
    this.clearPagging();

    const params = {
      pageNum: this.paging.pageNumber + 1,
      keyword: this.keyword,
      // sortBy: invoiceFilter.sortBy,
      // ordering: invoiceFilter.order,
    };

    InvoiceService.find(params).then(res => {
      // Clear the old data in the list if keyword is not similar from last search
      if (this.isDifferentKeyword) {
        this.clearList();
        this.currentKeyword = this.keyword;
      }

      runInAction(() => {
        this.paging = res.data.paging;
        const invoices = res?.data?.data;
        if (invoices?.length) {
          this.setPayload(invoices);
        }
        this.loading = false;
        this.isSearching = false;
      });
    });
  };

  onSearch = debounce(search => {
    runInAction(() => {
      this.keyword = search;
      this.isSearching = true;
      this.getInvoices();
    });
  }, 1000);

  get isDifferentKeyword() {
    return this.keyword !== this.currentKeyword;
  }

  get hasMoreRecorrds() {
    return this.paging.totalRecords > this.list.length;
  }
}

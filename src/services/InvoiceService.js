import ApiManager from './ApiManager';
import Resources from './Resources';
import config from '~/config/appConfig';

class Invoice extends Resources {
  routes = {
    resource: 'invoice-service/1.0.0/invoices',
  };

  constructor() {
    super(arguments);
  }
}

const InvoiceService = new Invoice();

export default InvoiceService;

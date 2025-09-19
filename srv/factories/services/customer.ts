import { CustomerService } from '@/services/customer/protocols';
import { CustomerServiceImplementation } from '@/services/customer/implementation';

const makeCustomerService = (): CustomerService => {
    return new CustomerServiceImplementation();
};

export const customerService = makeCustomerService();

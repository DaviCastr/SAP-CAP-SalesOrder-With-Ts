import { CustomerController } from '@/controllers/customer/protocols';
import { CustomerControllerImplementation } from '@/controllers/customer/implementation';
import { customerService } from '@/factories/services/customer';

const makeCustomerController = (): CustomerController => {
    return new CustomerControllerImplementation(customerService);
};

export const customerController = makeCustomerController();

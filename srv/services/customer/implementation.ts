import { Either, left, right } from '@sweet-monads/either';

import { CustomerModel } from '../../models/customer';

import { CustomerService } from '../../services/customer/protocols';

import { Customers } from '@models/sales';

import { AbstractError, ServerError } from '@/errors';

export class CustomerServiceImplementation implements CustomerService {
    public afterRead(customerList: Customers): Either<AbstractError, Customers> {
        try {
            const customers = customerList.map((customerLine) => {
                const customer = CustomerModel.with({
                    id: customerLine.id as string,

                    firstName: customerLine.firstName as string,

                    lastName: customerLine.lastName as string,

                    email: customerLine.email as string
                });

                return customer.setDefaultEmailDomain().toObject();
            });

            return right(customers);
        } catch (error) {
            const errorInstance: Error = error as Error;

            return left(new ServerError(errorInstance.stack as string, errorInstance.message));
        }
    }
}

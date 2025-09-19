import { describe, expect, it } from 'vitest';

import { Customers } from '@models/sales';
import { CustomerService, CustomerServiceImplementation } from '@/services/customer';

//SUT-> System under test
type SutTypes = {
    sut: CustomerService;
};

const makeSut = (): SutTypes => {
    return {
        sut: new CustomerServiceImplementation()
    };
};

const id = crypto.randomUUID();

const getCustomersWithoutEmail = (): Customers => [
    {
        id,
        firstName: 'Davi',
        lastName: 'Ferreira',
        email: ''
    }
];

const getCustomersWithFullEmail = (): Customers => [
    {
        id,
        firstName: 'Davi',
        lastName: 'Ferreira',
        email: 'davifgeo@gmail.com'
    }
];

const getCustomersWithEmailWithoutAt = (): Customers => [
    {
        id,
        firstName: 'Davi',
        lastName: 'Ferreira',
        email: 'davifgeo'
    }
];

describe('CustomerServiceImplementation test cases', () => {
    it('Should test if afterRead works if the customers array is empty', () => {
        const { sut } = makeSut();

        const customers = [];
        const result = sut.afterRead(customers);
        const expectedResult = [];

        expect(result.value).toEqual(expectedResult);
    });

    it('Should test if afterRead works even if the email is undefined or empty', () => {
        const { sut } = makeSut();

        const customers = getCustomersWithoutEmail();
        const result = sut.afterRead(customers);
        const expectedResult: Customers = [{ id, firstName: 'Davi', lastName: 'Ferreira', email: '' }];

        expect(result.value).toEqual(expectedResult);
    });

    it('Should test if afterRead does not changes the e-mail if a full e-mail is provided', () => {
        const { sut } = makeSut();

        const customers = getCustomersWithFullEmail();
        const result = sut.afterRead(customers);
        const expectedResult: Customers = [
            { id, firstName: 'Davi', lastName: 'Ferreira', email: 'davifgeo@gmail.com' }
        ];

        expect(result.value).toEqual(expectedResult);
    });

    it('Should test if afterRead does changes the e-mail if an e-mail is provided without At(@)', () => {
        const { sut } = makeSut();

        const customers = getCustomersWithEmailWithoutAt();
        const result = sut.afterRead(customers);
        const expectedResult: Customers = [
            { id, firstName: 'Davi', lastName: 'Ferreira', email: 'davifgeo@gmail.com' }
        ];

        expect(result.value).toEqual(expectedResult);
    });
});

import { api } from '@tests/e2e/config/api';

describe('Customers routes', () => {
    describe('afterRead Customers', () => {
        it('should get all customer with @gmail.com', async () => {
            const { data, status } = await api.get('/sales-order/Customers');
            const { value: customers } = data;
            //console.log(customers);

            expect(status).toBe(200);
            expect(customers.length).toBe(10);
            expect(customers).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        email: 'teste@gmail.com'
                    })
                ])
            );
        });

        it('should return at least one e-mail with @yahoo.com', async () => {
            const { data, status } = await api.get('/sales-order/Customers');
            const { value: customers } = data;
            //console.log(customers);

            expect(status).toBe(200);
            expect(customers.length).toBe(10);
            expect(customers).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        email: 'teste@yahoo.com'
                    })
                ])
            );
        });
    });
});

import { api } from '@tests/e2e/config/api';

describe('Testanto get na api', () => {
    it('should get all customer with @gmail.com', async () => {
        const { data } = await api.get('/sales/Customers');
        const { value: customers } = data;
        console.log(customers);

        expect(customers).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    email: 'teste@gmail.com'
                })
            ])
        );
    });
});

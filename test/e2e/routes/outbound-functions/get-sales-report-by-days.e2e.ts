import { api } from '@tests/e2e/config/api';

describe('getSalesReportByDays route', () => {
    it('should return 404 if no records were found', async () => {
        await expect(api.get('/sales-order/getSalesReportByDays()')).rejects.toThrow('Anything Sales Order found');
    });

    it('should return report data with status 200 if everything worked as expected', async () => {
        const { data, status } = await api.get('/sales-order/getSalesReportByDays(days=30)');
        const { value: report } = data;

        expect(status).toBe(200);

        expect(report).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    salesOrderId: '17749378-009b-4429-b6f2-b241c06c03c1',
                    salesOrderTotalAmount: 3542755.16,
                    customerId: '56934604-bdfe-4172-af1b-1776e0bc28b3',
                    customerFullName: 'firstName-5693460 lastName-5693460'
                })
            ])
        );
    });
});

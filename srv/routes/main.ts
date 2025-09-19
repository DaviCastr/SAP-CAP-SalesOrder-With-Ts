/* eslint-disable max-lines-per-function */
import '../configs/module-alias';

import { Request, Service } from '@sap/cds';

import { Customers, SalesOrderHeaders } from '@models/sales';

import { FullRequestParams } from '@/routes/protocols';
import { customerController } from '@/factories/controllers/customer';
import { salesOrderHeaderController } from '@/factories/controllers/sales-order-header';
import { salesReportController } from '@/factories/controllers/sales-report';

export default (service: Service) => {
    const { SalesOrderHeaders, Customers } = service.entities;

    service.before(['READ'], '*', (request: Request) => {
        if (!request.user.is('read_only_user') && !request.user.is('admin')) {
            request.reject(403, 'Read Not authorized');
        }
    });

    service.before(['WRITE', 'DELETE'], '*', (request: Request) => {
        if (!request.user.is('admin')) {
            request.reject(403, 'Write/Delete Not authorized');
        }
    });

    service.after('READ', Customers, (customersList: Customers, request: Request) => {
        const result = customerController.afterRead(customersList);

        if (result.status >= 400) {
            return request.error(result.status, result.data as string);
        }

        (request as unknown as FullRequestParams<Customers>).results = result.data as Customers;
    });

    service.before('CREATE', SalesOrderHeaders, async (request: Request) => {
        const results = await salesOrderHeaderController.beforeCreate(request.data);
        console.log(request.data.totalAmount);
        if (results.hasError) {
            return request.reject(400, results.error?.message as string);
        }

        request.data.totalAmount = results.totalAmount;
    });

    service.after('CREATE', SalesOrderHeaders, async (salesOrderHeaders: SalesOrderHeaders, request: Request) => {
        await salesOrderHeaderController.afterCreate(salesOrderHeaders, request.user);
    });

    // service.on('teste', (request: Request) => {
    //     console.log(`Params: ${JSON.stringify(request.params)}`);
    //     console.log(`Data: ${JSON.stringify(request.data)}`);

    //     return true;
    // });

    // service.on('teste2', (request: Request) => {
    //     console.log(`Params: ${JSON.stringify(request.params)}`);
    //     console.log(`Data: ${JSON.stringify(request.data)}`);

    //     return true;
    // });

    service.on('getSalesReportByDays', async (request: Request) => {
        const days = request.data?.days || 7;

        const result = await salesReportController.findByDays(days);

        if (result.status >= 400) {
            return request.error(result.status, result.data as string);
        }

        return result.data;
    });

    service.on('getSalesReportByCustomerId', async (request: Request) => {
        const [{ id: customerId }] = request.params as unknown as { id: string }[];

        const result = await salesReportController.findByCustomerId(customerId);

        if (result.status >= 400) {
            return request.error(result.status, result.data as string);
        }

        return result.data;
    });

    service.on('bulkCreateSalesOrder', (request: Request) => {
        const { user, data } = request;
        console.log(request.data);
        return salesOrderHeaderController.bulkCreate(data.payload, user);
    });

    service.on('cloneSalesOrder', (request: Request) => {
        const [{ id }] = request.params as unknown as { id: string }[];
        const { user } = request;

        console.log(request.data);
        return salesOrderHeaderController.cloneSalesOrder(id, user);
    });
};

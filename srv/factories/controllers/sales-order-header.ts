import { SalesOrderHeaderController } from '@/controllers/sales-order-header/protocols';
import { SalesOrderHeaderControllerImplementation } from '@/controllers/sales-order-header/implementation';
import { salesOrderHeaderService } from '@/factories/services/sales-order-header';

const makeSalesOrderHeaderController = (): SalesOrderHeaderController => {
    return new SalesOrderHeaderControllerImplementation(salesOrderHeaderService);
};

export const salesOrderHeaderController = makeSalesOrderHeaderController();

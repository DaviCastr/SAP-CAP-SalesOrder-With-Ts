import { CustomerRepositoryImplementation } from '@/repositories/customer/implementation';
import { ProductRepositoryImplementation } from '@/repositories/product/implementation';
import { SalesOrderHeaderRepositoryImplementation } from '@/repositories/sales-order-header/implementation';
import { SalesOrderHeaderService } from '@/services/sales-order-header/protocols';
import { SalesOrderHeaderServiceImplementation } from '@/services/sales-order-header/implementation';
import { SalesOrderLogRepositoryImplementation } from '@/repositories/sales-order-log/implementation';

const makeSalesOrderHeaderService = (): SalesOrderHeaderService => {
    const salesOrderHeaderRepository = new SalesOrderHeaderRepositoryImplementation();
    const customerRepository = new CustomerRepositoryImplementation();
    const productRepository = new ProductRepositoryImplementation();
    const salesOrderLogRepository = new SalesOrderLogRepositoryImplementation();

    return new SalesOrderHeaderServiceImplementation(
        salesOrderHeaderRepository,
        customerRepository,
        productRepository,
        salesOrderLogRepository
    );
};

export const salesOrderHeaderService = makeSalesOrderHeaderService();

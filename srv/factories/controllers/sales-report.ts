import { SalesReportController } from '@/controllers/sales-report/protocols';
import { SalesReportControllerImplementation } from '@/controllers/sales-report/implementation';
import { salesReportService } from '@/factories/services/sales-report';

const makeSalesReportController = (): SalesReportController => {
    return new SalesReportControllerImplementation(salesReportService);
};

export const salesReportController = makeSalesReportController();

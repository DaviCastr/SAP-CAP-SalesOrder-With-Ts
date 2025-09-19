import { SalesReportRepositoryImplementation } from '@/repositories/sales-report/implementation';
import { SalesReportService } from '@/services/sales-report/protocols';
import { SalesReportServiceImplementation } from '@/services/sales-report/implementation';

const makeSalesReportService = (): SalesReportService => {
    const repository = new SalesReportRepositoryImplementation();

    return new SalesReportServiceImplementation(repository);
};

export const salesReportService = makeSalesReportService();

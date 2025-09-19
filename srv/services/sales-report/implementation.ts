import { Either, left, right } from '@sweet-monads/either';

import { ExpectedResult as SalesReport } from '@models/db/types/SalesReport';

import { SalesReportRepository } from '@/repositories/sales-report/protocols';

import { SalesReportService } from './protocols';

import { AbstractError, NotFoundError, ServerError } from '@/errors';

export class SalesReportServiceImplementation implements SalesReportService {
    constructor(private readonly repository: SalesReportRepository) {}

    public async findByDays(days = 7): Promise<Either<AbstractError, SalesReport[]>> {
        try {
            const reportData = await this.repository.findByDays(days);

            if (!reportData) {
                const stack = new Error().stack as string;

                return left(new NotFoundError('Anything Sales Order found', stack));
            }

            const mappedData = reportData?.map((r) => r.toObject());

            return right(mappedData);
        } catch (error) {
            const errorInstance = error as Error;

            return left(new ServerError(errorInstance.stack as string, errorInstance.message));
        }
    }

    public async findByCustomerId(customerId: string): Promise<Either<AbstractError, SalesReport[]>> {
        try {
            const reportData = await this.repository.findByCustomerId(customerId);

            if (!reportData) {
                const stack = new Error().stack as string;

                return left(new NotFoundError('Anything Sales Order found', stack));
            }

            const mappedData = reportData?.map((r) => r.toObject());

            return right(mappedData);
        } catch (error) {
            const errorInstance = error as Error;

            return left(new ServerError(errorInstance.stack as string, errorInstance.message));
        }
    }
}

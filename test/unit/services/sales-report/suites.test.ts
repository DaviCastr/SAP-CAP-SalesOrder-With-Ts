/* eslint-disable max-lines-per-function */
import { describe, expect, it, vi } from 'vitest';

import { SalesReportRepository } from '@/repositories/sales-report';
import { SalesReportService, SalesReportServiceImplementation } from '@/services/sales-report/';

import { SalesReportRepositoryStub } from '@tests/unit/services/sales-report/stubs/repositories';

import { NotFoundError, ServerError } from '@/errors';

type SutTypes = {
    sut: SalesReportService;
    salesReportRepository: SalesReportRepository;
};

const makeSut = (): SutTypes => {
    const salesReportRepository = new SalesReportRepositoryStub();
    return {
        sut: new SalesReportServiceImplementation(salesReportRepository),
        salesReportRepository
    };
};

describe('SalesReportService test cases', () => {
    describe('method findByDays test cases', () => {
        it('should return ServerError if SalesReportRepository throws', async () => {
            const { sut, salesReportRepository } = makeSut();
            vi.spyOn(salesReportRepository, 'findByDays').mockRejectedValueOnce(() => {
                throw new ServerError('Fake Error'); // The text we put here in the test is not taken into account.
            });

            const result = await sut.findByDays(1);
            expect(result.isLeft()).toBeTruthy();
            expect(result.value).toBeInstanceOf(ServerError);
            const error = result.value as ServerError;
            expect(error.code).toBe(500);
            expect(error.message).toBe('internalServerError');
        });

        it('should return NotFoundError if no records were found for the provided parameters', async () => {
            const { sut, salesReportRepository } = makeSut();
            vi.spyOn(salesReportRepository, 'findByDays').mockReturnValueOnce(Promise.resolve(null));

            const result = await sut.findByDays(1);
            expect(result.isLeft()).toBeTruthy();
            expect(result.value).toBeInstanceOf(NotFoundError);
            const error = result.value as NotFoundError;
            expect(error.code).toBe(404);
            expect(error.message).toBe('Anything Sales Order found');
        });

        it('should return SalesReportByDays if everything worked as expected', async () => {
            const { sut } = makeSut();

            const result = await sut.findByDays(1);
            expect(result.isRight()).toBeTruthy();
            expect(result.value).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        salesOrderTotalAmount: 100,
                        customerFullName: 'Valid customer'
                    })
                ])
            );
        });
    });

    describe('method findByCustomerId test cases', () => {
        it('should return ServerError if SalesReportRepository throws', async () => {
            const { sut, salesReportRepository } = makeSut();
            vi.spyOn(salesReportRepository, 'findByCustomerId').mockRejectedValueOnce(() => {
                throw new ServerError('Fake Error'); // The text we put here in the test is not taken into account.
            });
            const customerId = crypto.randomUUID();
            const result = await sut.findByCustomerId(customerId);
            expect(result.isLeft()).toBeTruthy();
            expect(result.value).toBeInstanceOf(ServerError);
            const error = result.value as ServerError;
            expect(error.code).toBe(500);
            expect(error.message).toBe('internalServerError');
        });

        it('should return NotFoundError if no records were found for the provided parameters', async () => {
            const { sut, salesReportRepository } = makeSut();
            vi.spyOn(salesReportRepository, 'findByCustomerId').mockReturnValueOnce(Promise.resolve(null));

            const customerId = crypto.randomUUID();
            const result = await sut.findByCustomerId(customerId);
            expect(result.isLeft()).toBeTruthy();
            expect(result.value).toBeInstanceOf(NotFoundError);
            const error = result.value as NotFoundError;
            expect(error.code).toBe(404);
            expect(error.message).toBe('Anything Sales Order found');
        });

        it('should return SalesReportByCustomer if everything worked as expected', async () => {
            const { sut } = makeSut();

            const customerId = crypto.randomUUID();
            const result = await sut.findByCustomerId(customerId);
            expect(result.isRight()).toBeTruthy();
            expect(result.value).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        salesOrderTotalAmount: 100,
                        customerId,
                        customerFullName: 'Valid customer'
                    })
                ])
            );
        });
    });
});

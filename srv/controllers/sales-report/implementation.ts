import { SalesReportController } from './protocols';
import { SalesReportService } from '@/services/sales-report/protocols';
import { BaseControllerImplementation, BaseControllerResponse } from '@/controllers/base';

export class SalesReportControllerImplementation extends BaseControllerImplementation implements SalesReportController {
    constructor(private readonly service: SalesReportService) {
        super();
    }

    public async findByDays(days: number): Promise<BaseControllerResponse> {
        const result = await this.service.findByDays(days);

        if (result.isLeft()) {
            return this.error(result.value.code, result.value.message);
        }

        return this.success(result.value); //return this.service.findByDays(days);
    }

    public async findByCustomerId(customerId: string): Promise<BaseControllerResponse> {
        const result = await this.service.findByCustomerId(customerId);

        if (result.isLeft()) {
            return this.error(result.value.code, result.value.message);
        }

        return this.success(result.value);
        // return this.service.findByCustomerId(customerId);
    }
}

import { BaseController, BaseControllerResponse } from './protocols';

export class BaseControllerImplementation implements BaseController {
    public success(data: unknown): BaseControllerResponse {
        return {
            data,
            status: 200
        };
    }

    public error(code: number, message: string): BaseControllerResponse {
        return {
            status: code,
            data: message
        };
    }
}

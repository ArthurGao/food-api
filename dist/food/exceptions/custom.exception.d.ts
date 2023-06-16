import { HttpException, HttpStatus } from '@nestjs/common';
export declare class CustomHttpException extends HttpException {
    constructor(message?: string, statusCode?: HttpStatus);
}

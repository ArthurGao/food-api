import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(message?: string, statusCode?: HttpStatus) {
    const defaultMessage = 'Internal server error';
    const defaultStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    super(message || defaultMessage, statusCode || defaultStatusCode);
  }
}

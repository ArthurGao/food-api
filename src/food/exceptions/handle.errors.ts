import { BadRequestException } from '@nestjs/common';
import { CustomHttpException } from './custom.exception';

/**
 *  Handle all errors thrown by the decorated method which is not be caught excluding BadRequestException
 */
export function handleErrors(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    try {
      return originalMethod.apply(this, args);
    } catch (error) {
      // Check if error is an instance of BadRequestException
      if (error instanceof BadRequestException) {
        throw error; // Re-throw BadRequestException
      }
      console.error('Error occurred:', error);
      throw new CustomHttpException();
    }
  };

  return descriptor;
}

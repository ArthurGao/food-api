"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const common_1 = require("@nestjs/common");
const custom_exception_1 = require("./custom.exception");
function handleErrors(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        try {
            return originalMethod.apply(this, args);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            console.error('Error occurred:', error);
            throw new custom_exception_1.CustomHttpException();
        }
    };
    return descriptor;
}
exports.handleErrors = handleErrors;
//# sourceMappingURL=handle.errors.js.map
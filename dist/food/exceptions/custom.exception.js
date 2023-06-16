"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomHttpException = void 0;
const common_1 = require("@nestjs/common");
class CustomHttpException extends common_1.HttpException {
    constructor(message, statusCode) {
        const defaultMessage = 'Internal server error';
        const defaultStatusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        super(message || defaultMessage, statusCode || defaultStatusCode);
    }
}
exports.CustomHttpException = CustomHttpException;
//# sourceMappingURL=custom.exception.js.map
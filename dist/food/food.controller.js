"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const food_dto_1 = require("./dto/food.dto");
const food_service_1 = require("./services/food.service");
const perform_action_dto_1 = require("./dto/perform.action.dto");
const class_validator_1 = require("class-validator");
const handle_errors_1 = require("./exceptions/handle.errors");
const swagger_1 = require("@nestjs/swagger");
let FoodController = exports.FoodController = class FoodController {
    constructor(foodService) {
        this.foodService = foodService;
    }
    getAllOrSearchFoodItems(title, description, quantity, sortBy, sortOrder) {
        this.validateSort(sortBy, sortOrder);
        if (title || description || quantity) {
            return this.searchFoodItems(title, description, quantity, sortBy, sortOrder);
        }
        else {
            return this.getAllFoodItems(sortBy, sortOrder);
        }
    }
    getAllFoodItems(sortBy, sortOrder) {
        return this.foodService.getAllFoodItems(sortBy, sortOrder);
    }
    searchFoodItems(title, description, quantity, sortBy, sortOrder) {
        return this.foodService.searchFoodItems(title, description, quantity, sortBy, sortOrder);
    }
    getFoodItemById(id) {
        return this.foodService.getFoodItemById(id);
    }
    async createFoodItem(foodDto) {
        const validationErrors = await (0, class_validator_1.validate)(foodDto);
        if (validationErrors.length > 0) {
            throw new common_1.HttpException({ message: 'Validation failed', errors: validationErrors }, common_1.HttpStatus.BAD_REQUEST);
        }
        const id = await this.foodService.createFoodItem(foodDto);
        return { id };
    }
    async performFoodAction(id, actionPayload) {
        const validationErrors = await (0, class_validator_1.validate)(actionPayload);
        if (validationErrors.length > 0) {
            throw new common_1.HttpException({ message: 'Validation failed', errors: validationErrors }, common_1.HttpStatus.BAD_REQUEST);
        }
        const { action, quantity } = actionPayload;
        if (action === 'buy') {
            return this.foodService.buyFoodItem(id, quantity);
        }
        else if (action === 'replenish') {
            throw new common_1.BadRequestException('Not implemented');
        }
        else {
            throw new common_1.BadRequestException('Invalid action');
        }
    }
    validateSort(sortBy, sortOrder) {
        if (sortBy && !['createdDate', 'price'].includes(sortBy)) {
            throw new common_1.BadRequestException('Invalid sortBy value. Only "createdDate" and "price" are allowed.');
        }
        if (sortOrder &&
            sortOrder.toUpperCase() !== 'ASC' &&
            sortOrder.toUpperCase() !== 'DESC') {
            throw new common_1.BadRequestException('Invalid sortOrder value. Only "ASC", "asc" and "DESC", "desc" are allowed.');
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    handle_errors_1.handleErrors,
    (0, swagger_1.ApiQuery)({ name: 'title', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'description', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'quantity', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        type: String,
        enum: ['createdDate', 'price'],
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortOrder',
        type: String,
        enum: ['ASC', 'DESC'],
        required: false,
    }),
    openapi.ApiResponse({ status: 200, type: [require("./dto/food.dto").FoodDto] }),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('description')),
    __param(2, (0, common_1.Query)('quantity')),
    __param(3, (0, common_1.Query)('sortBy')),
    __param(4, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, String]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "getAllOrSearchFoodItems", null);
__decorate([
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('description')),
    __param(2, (0, common_1.Query)('quantity')),
    __param(3, (0, common_1.Query)('sortBy')),
    __param(4, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, String]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "searchFoodItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    handle_errors_1.handleErrors,
    openapi.ApiResponse({ status: 200, type: require("./dto/food.dto").FoodDto }),
    __param(0, (0, common_1.Param)('id', new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "getFoodItemById", null);
__decorate([
    (0, common_1.Post)(),
    handle_errors_1.handleErrors,
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [food_dto_1.FoodDto]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "createFoodItem", null);
__decorate([
    (0, common_1.Patch)(':id'),
    handle_errors_1.handleErrors,
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', new common_1.ValidationPipe())),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, perform_action_dto_1.PerformFoodActionDto]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "performFoodAction", null);
exports.FoodController = FoodController = __decorate([
    (0, common_1.Controller)('food'),
    (0, swagger_1.ApiTags)('Food'),
    __metadata("design:paramtypes", [food_service_1.default])
], FoodController);
//# sourceMappingURL=food.controller.js.map
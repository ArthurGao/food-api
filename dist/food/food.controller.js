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
const common_1 = require("@nestjs/common");
const food_dto_1 = require("./dto/food.dto");
const food_service_1 = require("./services/food.service");
let FoodController = exports.FoodController = class FoodController {
    constructor(foodService) {
        this.foodService = foodService;
    }
    getAllFoodItems() {
        return this.foodService.getAllFoodItems();
    }
    searchFoodItems(title, description, quantity) {
        return { message: 'Search results' };
    }
    getFoodItemById(id) {
        return this.foodService.getFoodItemById(id);
    }
    async createFoodItem(foodDto) {
        const id = await this.foodService.createFoodItem(foodDto);
        return { id };
    }
    buyFoodItem(id, quantity) {
        return { message: `Bought food item with ID ${id}` };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "getAllFoodItems", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('description')),
    __param(2, (0, common_1.Query)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "searchFoodItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "getFoodItemById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [food_dto_1.FoodDto]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "createFoodItem", null);
__decorate([
    (0, common_1.Post)('buy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "buyFoodItem", null);
exports.FoodController = FoodController = __decorate([
    (0, common_1.Controller)('food'),
    __metadata("design:paramtypes", [food_service_1.default])
], FoodController);
//# sourceMappingURL=food.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let FoodService = class FoodService {
    constructor() {
        this.foodItems = [];
    }
    createFoodItem(createFoodDto) {
        this.foodItems.push(createFoodDto);
    }
    getAllFoodItems() {
        return this.foodItems;
    }
    searchFoodItems(title, description, quantity) {
        return this.foodItems.filter((foodItem) => {
            return (foodItem.title.includes(title) ||
                foodItem.description.includes(description) ||
                foodItem.quantity === quantity);
        });
    }
    getFoodItemById(id) {
        return this.foodItems.find((foodItem) => foodItem.id === id);
    }
};
FoodService = __decorate([
    (0, common_1.Injectable)()
], FoodService);
exports.default = FoodService;
//# sourceMappingURL=food.service.js.map
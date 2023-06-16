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
const common_1 = require("@nestjs/common");
const food_mapper_1 = require("../mapper/food.mapper");
const food_entity_1 = require("../entities/food.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let FoodService = class FoodService {
    constructor(foodRepository, foodMapper) {
        this.foodRepository = foodRepository;
        this.foodMapper = foodMapper;
        this.foodItems = [];
    }
    async createFoodItem(foodDto) {
        if (!foodDto) {
            throw new Error('Invalid food data. FoodDto cannot be null.');
        }
        const foodEntity = this.foodMapper.toEntity(foodDto);
        const savedFoodEntity = await this.foodRepository.save(foodEntity);
        return savedFoodEntity.id;
    }
    async getAllFoodItems(sortBy, sortOrder) {
        const findOptions = {
            order: this.getSortingOrder(sortBy, sortOrder),
        };
        const foodEntities = await this.foodRepository.find(findOptions);
        const foodDtos = foodEntities.map((foodEntity) => this.foodMapper.toDto(foodEntity));
        return foodDtos;
    }
    async searchFoodItems(title, description, quantity, sortBy, sortOrder) {
        if (!title && !description && !quantity) {
            throw new Error('At least one of title, description, or quantity must be provided.');
        }
        const queryBuilder = this.foodRepository.createQueryBuilder('food');
        if (title) {
            queryBuilder.andWhere('food.title LIKE :title', { title: `%${title}%` });
        }
        if (description) {
            queryBuilder.andWhere('food.description LIKE :description', {
                description: `%${description}%`,
            });
        }
        if (quantity) {
            queryBuilder.andWhere('food.quantity >= :quantity', { quantity });
        }
        if (sortBy === 'createdDate') {
            queryBuilder.orderBy('food.createdDate', sortOrder);
        }
        else if (sortBy === 'price') {
            queryBuilder.orderBy('food.price', sortOrder);
        }
        const foodEntities = await queryBuilder.getMany();
        const foodDtos = foodEntities.map((foodEntity) => this.foodMapper.toDto(foodEntity));
        return foodDtos;
    }
    async getFoodItemById(id) {
        if (!id) {
            throw new Error('Invalid ID. ID must be provided.');
        }
        const options = {
            where: { id },
        };
        const food = await this.foodRepository.findOne(options);
        return food;
    }
    async buyFoodItem(id, quantity) {
        if (!id) {
            throw new Error('Invalid ID. ID must be provided.');
        }
        if (quantity === 0) {
            throw new Error('Invalid quantity. Quantity must be greater than 0.');
        }
        const food = await this.getFoodItemById(id);
        if (food) {
            if (food.quantity === 0) {
                throw new Error('Food item is out of stock.');
            }
            food.quantity -= quantity;
            await this.foodRepository.save(food);
        }
    }
    getSortingOrder(sortBy, sortOrder) {
        const sortingOrder = {};
        if (sortBy === 'createdDate') {
            sortingOrder.createdDate =
                sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        }
        else if (sortBy === 'price') {
            sortingOrder.price = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        }
        return sortingOrder;
    }
};
FoodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(food_entity_1.Food)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        food_mapper_1.FoodMapper])
], FoodService);
exports.default = FoodService;
//# sourceMappingURL=food.service.js.map
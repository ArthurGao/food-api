import { FoodDto } from './dto/food.dto';
import FoodService from './services/food.service';
export declare class FoodController {
    private readonly foodService;
    constructor(foodService: FoodService);
    getAllFoodItems(): Promise<FoodDto[]>;
    searchFoodItems(title: string, description: string, quantity: number): {
        message: string;
    };
    getFoodItemById(id: string): Promise<FoodDto>;
    createFoodItem(foodDto: FoodDto): Promise<{
        id: string;
    }>;
    buyFoodItem(id: string, quantity: number): {
        message: string;
    };
}

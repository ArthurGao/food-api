import { FoodDto } from './dto/food.dto';
import FoodService from './services/food.service';
import { PerformFoodActionDto } from './dto/perform.action.dto';
export declare class FoodController {
    private readonly foodService;
    constructor(foodService: FoodService);
    getAllOrSearchFoodItems(title: string, description: string, quantity: number, sortBy: string, sortOrder: 'ASC' | 'DESC'): Promise<FoodDto[]>;
    getAllFoodItems(sortBy: string, sortOrder: 'ASC' | 'DESC'): Promise<FoodDto[]>;
    searchFoodItems(title: string, description: string, quantity: number, sortBy: string, sortOrder: 'ASC' | 'DESC'): Promise<FoodDto[]>;
    getFoodItemById(id: string): Promise<FoodDto>;
    createFoodItem(foodDto: FoodDto): Promise<{
        id: string;
    }>;
    performFoodAction(id: string, actionPayload: PerformFoodActionDto): Promise<void>;
    private validateSort;
}

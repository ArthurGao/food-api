import { FoodDto } from '../dto/food.dto';
import { FoodMapper } from '../mapper/food.mapper';
import { Food } from '../entities/food.entity';
import { Repository } from 'typeorm';
export default class FoodService {
    private readonly foodRepository;
    private readonly foodMapper;
    private foodItems;
    constructor(foodRepository: Repository<Food>, foodMapper: FoodMapper);
    createFoodItem(foodDto: FoodDto): Promise<string>;
    getAllFoodItems(sortBy?: string, sortOrder?: 'ASC' | 'DESC'): Promise<FoodDto[]>;
    searchFoodItems(title?: string, description?: string, quantity?: number, sortBy?: string, sortOrder?: 'ASC' | 'DESC'): Promise<FoodDto[]>;
    getFoodItemById(id: string): Promise<FoodDto | undefined>;
    buyFoodItem(id: string, quantity: number): Promise<void>;
    private getSortingOrder;
}

import { CreateFoodDto } from '../dto/create-food.dto';
export default class FoodService {
    private foodItems;
    createFoodItem(createFoodDto: CreateFoodDto): void;
    getAllFoodItems(): CreateFoodDto[];
    searchFoodItems(title: string, description: string, quantity: number): CreateFoodDto[];
    getFoodItemById(id: string): CreateFoodDto;
}

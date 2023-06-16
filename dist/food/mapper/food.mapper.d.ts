import { FoodDto } from '../dto/food.dto';
import { Food } from '../entities/food.entity';
export declare class FoodMapper {
    toEntity(foodDto: FoodDto): Food;
    toDto(food: Food): FoodDto;
}

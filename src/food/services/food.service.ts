import { Injectable } from '@nestjs/common';
import { FoodDto } from '../dto/food.dto';
import { FoodMapper } from '../mapper/food.mapper';
import { Food } from '../entity/food.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class FoodService {
  private foodItems: FoodDto[] = [];
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    private readonly foodMapper: FoodMapper,
  ) {}

  createFoodItem(foodDto: FoodDto): void {
    // Logic to create a new food item
    const foodEntity: Food = this.foodMapper.toEntity(foodDto);
   // const foodRepository = TypeOrmModule.getRepository(Food);

    this.foodItems.push(foodDto);
  }

  getAllFoodItems(): FoodDto[] {
    // Logic to retrieve and return all food items
    return this.foodItems;
  }

  searchFoodItems(
    title: string,
    description: string,
    quantity: number,
  ): FoodDto[] {
    // Logic to search food items based on the provided parameters
    // Return the matching food items
    return this.foodItems.filter((foodItem) => {
      return (
        foodItem.title.includes(title) ||
        foodItem.description.includes(description) ||
        foodItem.quantity === quantity
      );
    });
  }

  async getFoodItemById(id: string): Promise<FoodDto | undefined> {
    const options = {
      where: { id }, // Specify the ID as part of the where clause
    };
    const food = await this.foodRepository.findOne(options);
    return food;
  }
}

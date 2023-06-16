import { Injectable } from '@nestjs/common';
import { FoodDto } from '../dto/food.dto';
import { FoodMapper } from '../mapper/food.mapper';
import { Food } from '../entities/food.entity';
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

  async createFoodItem(foodDto: FoodDto): Promise<string> {
    // Logic to create a new food item
    const foodEntity: Food = this.foodMapper.toEntity(foodDto);
    const savedFoodEntity = await this.foodRepository.save(foodEntity);
    return savedFoodEntity.id;
  }

  async getAllFoodItems(): Promise<FoodDto[]> {
    // Use the find method of the repository to retrieve all records
    const foodEntities = await this.foodRepository.find();
    // Use the FoodMapper to convert each Food entity to a FoodDto
    const foodDtos = foodEntities.map((foodEntity) =>
      this.foodMapper.toDto(foodEntity),
    );
    return foodDtos;
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

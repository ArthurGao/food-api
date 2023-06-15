import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from '../dto/create-food.dto';

@Injectable()
export default class FoodService {
  private foodItems: CreateFoodDto[] = [];

  createFoodItem(createFoodDto: CreateFoodDto): void {
    // Logic to create a new food item
    this.foodItems.push(createFoodDto);
  }

  getAllFoodItems(): CreateFoodDto[] {
    // Logic to retrieve and return all food items
    return this.foodItems;
  }

  searchFoodItems(
    title: string,
    description: string,
    quantity: number,
  ): CreateFoodDto[] {
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

  getFoodItemById(id: string): CreateFoodDto {
    // Logic to retrieve and return a specific food item by ID
    return this.foodItems.find((foodItem) => foodItem.id === id);
  }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FoodDto } from './dto/food.dto';
import { Food } from './entities/food.entity';
import FoodService from './services/food.service';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  getAllFoodItems() {
    // Logic to retrieve and return all food items
    // Return the list of food items or an appropriate response
    return this.foodService.getAllFoodItems();
  }

  @Get('search')
  searchFoodItems(
    @Query('title') title: string,
    @Query('description') description: string,
    @Query('quantity') quantity: number,
  ) {
    // Logic to search food items based on the provided parameters
    // Return the matching food items or an appropriate response
    return { message: 'Search results' };
  }

  @Get(':id')
  getFoodItemById(@Param('id') id: string) {
    // Logic to retrieve and return a specific food item by ID
    // Return the food item or an appropriate response
    return this.foodService.getFoodItemById(id);
  }

  @Post()
  async createFoodItem(@Body() foodDto: FoodDto): Promise<{ id: string }> {
    const id = await this.foodService.createFoodItem(foodDto);
    return { id };
  }

  @Post('buy/:id')
  buyFoodItem(@Param('id') id: string, @Body('quantity') quantity: number) {
    // Logic to buy a food item and reduce the quantity
    // Return a success message or an appropriate response
    return { message: `Bought food item with ID ${id}` };
  }
}

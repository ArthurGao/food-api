import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { FoodDto } from './dto/food.dto';
import FoodService from './services/food.service';
import { PerformFoodActionDto } from './dto/perform.action.dto';
import { validate } from 'class-validator';
import { handleErrors } from './exceptions/handle.errors';
import {
  ApiBody,
  ApiQuery,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('food')
@ApiTags('Food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  @handleErrors
  getAllOrSearchFoodItems(
    @Query('title') title: string,
    @Query('description') description: string,
    @Query('quantity') quantity: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
  ) {
    this.validateSort(sortBy, sortOrder);
    if (title || description || quantity) {
      // Call searchFoodItems if any query parameter is present
      return this.searchFoodItems(
        title,
        description,
        quantity,
        sortBy,
        sortOrder,
      );
    } else {
      // Call getAllFoodItems if no query parameters are present
      return this.getAllFoodItems(sortBy, sortOrder);
    }
  }

  getAllFoodItems(sortBy: string, sortOrder: 'ASC' | 'DESC') {
    // Logic to retrieve and return all food items
    // Return the list of food items
    return this.foodService.getAllFoodItems(sortBy, sortOrder);
  }

  searchFoodItems(
    @Query('title') title: string,
    @Query('description') description: string,
    @Query('quantity') quantity: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
  ) {
    // Logic to search food items based on the provided parameters
    // Return the matching food items or an appropriate response
    return this.foodService.searchFoodItems(
      title,
      description,
      quantity,
      sortBy,
      sortOrder,
    );
  }

  @Get(':id')
  @handleErrors
  getFoodItemById(@Param('id', new ValidationPipe()) id: string) {
    // Logic to retrieve and return a specific food item by ID
    // Return the food item or an appropriate response
    return this.foodService.getFoodItemById(id);
  }

  @Post()
  @handleErrors
  async createFoodItem(
    @Body(new ValidationPipe()) foodDto: FoodDto,
  ): Promise<{ id: string }> {
    const validationErrors = await validate(foodDto);
    if (validationErrors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors: validationErrors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = await this.foodService.createFoodItem(foodDto);
    return { id };
  }

  @Patch(':id')
  @handleErrors
  async performFoodAction(
    @Param('id', new ValidationPipe()) id: string,
    @Body(new ValidationPipe()) actionPayload: PerformFoodActionDto,
  ) {
    const validationErrors = await validate(actionPayload);
    if (validationErrors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors: validationErrors },
        HttpStatus.BAD_REQUEST,
      );
    }
    // Extract the action from the request payload
    const { action, quantity } = actionPayload;

    if (action === 'buy') {
      // Logic to buy a food item and reduce the quantity
      return this.foodService.buyFoodItem(id, quantity);
    } else if (action === 'replenish') {
      // Logic to replenish a food item and increase the quantity
      //return this.foodService.replenishFoodItem(id, quantity);
      throw new BadRequestException('Not implemented');
    } else {
      // Handle invalid action
      throw new BadRequestException('Invalid action');
    }
  }

  private validateSort(sortBy: string, sortOrder: string) {
    if (sortBy && !['createdDate', 'price'].includes(sortBy)) {
      throw new BadRequestException(
        'Invalid sortBy value. Only "createdDate" and "price" are allowed.'
      );
    }
    if (
      sortOrder &&
      sortOrder.toUpperCase() !== 'ASC' &&
      sortOrder.toUpperCase() !== 'DESC'
    ) {
      throw new BadRequestException(
        'Invalid sortOrder value. Only "ASC", "asc" and "DESC", "desc" are allowed.',
      );
    }
  }
}

import { Injectable } from '@nestjs/common';
import { FoodDto } from '../dto/food.dto';
import { FoodMapper } from '../mapper/food.mapper';
import { Food } from '../entities/food.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, OrderByCondition, Repository } from 'typeorm';

@Injectable()
export default class FoodService {
  private foodItems: FoodDto[] = [];
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    private readonly foodMapper: FoodMapper,
  ) {}

  async createFoodItem(foodDto: FoodDto): Promise<string> {
    if (!foodDto) {
      throw new Error('Invalid food data. FoodDto cannot be null.');
    }
    // Logic to create a new food item
    const foodEntity: Food = this.foodMapper.toEntity(foodDto);
    const savedFoodEntity = await this.foodRepository.save(foodEntity);
    return savedFoodEntity.id;
  }

  async getAllFoodItems(
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC',
  ): Promise<FoodDto[]> {
    const findOptions: FindManyOptions<Food> = {
      order: this.getSortingOrder(sortBy, sortOrder),
    };

    const foodEntities = await this.foodRepository.find(findOptions);
    // Use the FoodMapper to convert each Food entity to a FoodDto
    const foodDtos = foodEntities.map((foodEntity) =>
      this.foodMapper.toDto(foodEntity),
    );
    return foodDtos;
  }

  async searchFoodItems(
    title?: string,
    description?: string,
    quantity?: number,
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC',
  ): Promise<FoodDto[]> {
    // Check if at least one of title, description, or quantity is provided
    if (!title && !description && !quantity) {
      throw new Error(
        'At least one of title, description, or quantity must be provided.',
      );
    }
    const queryBuilder = this.foodRepository.createQueryBuilder('food');
    if (title) {
      queryBuilder.andWhere('food.title LIKE :title', { title: `%${title}%` });
    }
    if (description) {
      queryBuilder.andWhere('food.description LIKE :description', {
        description: `%${description}%`,
      });
    }
    if (quantity) {
      queryBuilder.andWhere('food.quantity >= :quantity', { quantity });
    }
    if (sortBy === 'createdDate') {
      queryBuilder.orderBy('food.createdDate', sortOrder);
    } else if (sortBy === 'price') {
      queryBuilder.orderBy('food.price', sortOrder);
    }
    const foodEntities = await queryBuilder.getMany();
    const foodDtos = foodEntities.map((foodEntity) =>
      this.foodMapper.toDto(foodEntity),
    );
    return foodDtos;
  }

  async getFoodItemById(id: string): Promise<FoodDto | undefined> {
    if (!id) {
      throw new Error('Invalid ID. ID must be provided.');
    }
    const options = {
      where: { id }, // Specify the ID as part of the where clause
    };
    const food = await this.foodRepository.findOne(options);
    return food;
  }

  async buyFoodItem(id: string, quantity: number): Promise<void> {
    if (!id) {
      throw new Error('Invalid ID. ID must be provided.');
    }
    if (quantity === 0) {
      throw new Error('Invalid quantity. Quantity must be greater than 0.');
    }
    const food = await this.getFoodItemById(id);
    if (food) {
      if (food.quantity === 0) {
        throw new Error('Food item is out of stock.');
      }
      food.quantity -= quantity;
      await this.foodRepository.save(food);
    } else {
      throw new Error('Food item not found.');
    }
  }

  private getSortingOrder(
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC',
  ): OrderByCondition {
    const sortingOrder: OrderByCondition = {};
    if (sortBy === 'createdDate') {
      sortingOrder.createdDate =
        sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    } else if (sortBy === 'price') {
      sortingOrder.price = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    }
    return sortingOrder;
  }
}

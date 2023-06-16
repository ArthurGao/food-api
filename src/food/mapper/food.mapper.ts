import { Injectable } from '@nestjs/common';
import { FoodDto } from '../dto/food.dto';
import { Food } from '../entities/food.entity';
import { plainToClass, classToPlain } from 'class-transformer';

@Injectable()
export class FoodMapper {
  toEntity(foodDto: FoodDto): Food {
    return plainToClass(Food, foodDto);
  }

  toDto(food: Food): FoodDto {
    return classToPlain(food) as FoodDto;
  }
}

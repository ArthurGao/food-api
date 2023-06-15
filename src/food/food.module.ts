import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import FoodService from './services/food.service';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}

import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import FoodService from './services/food.service';
import { Food } from './entities/food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodMapper } from './mapper/food.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Food])], // Register Food repository in TypeOrmModule
  controllers: [FoodController],
  providers: [FoodService, FoodMapper],
})
export class FoodModule {}

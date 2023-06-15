import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './food/food.module';
import { FoodController } from './food/food.controller';
import FoodService from './food/services/food.service';
import { Food } from './food/entity/food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      entities: [Food],
      synchronize: true,
    }),
    FoodModule,
  ],
  controllers: [AppController],
  providers: [AppService, FoodService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from './environment';
import { Food } from '../food/entities/food.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'postgres',
        port: environment.dbPort,
        username: 'postgres',
        password: 'mysecretpassword',
        database: 'postgres',
        entities: [Food],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {
  static createTypeOrmOptions() {
    return {
      type: 'postgres',
      host: 'localhost',
      port: environment.dbPort,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      entities: [Food],
      synchronize: true,
    };
  }
}

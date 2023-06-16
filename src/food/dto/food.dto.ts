import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FoodDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  createdDate: Date;

  @IsNotEmpty()
  id: string;
}

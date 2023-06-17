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

  @IsOptional()
  createdDate: Date;

  @IsOptional()
  id: string;
}

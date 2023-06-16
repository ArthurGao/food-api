import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PerformFoodActionDto {
  @IsNotEmpty()
  @IsString()
  action: 'buy' | 'replenish';

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

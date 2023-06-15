import { FoodMapper } from './food.mapper';
import { FoodDto } from '../dto/food.dto';
import { Food } from '../entity/food.entity';

describe('FoodMapper', () => {
  let foodMapper: FoodMapper;

  beforeEach(() => {
    foodMapper = new FoodMapper();
  });

  describe('toEntity', () => {
    it('should map FoodDto to Food entity', () => {
      const foodDto: FoodDto = {
        title: 'Chicken Burger',
        description: 'Delicious chicken burger',
        price: 9.99,
        quantity: 10,
        id: '1',
      };

      const foodEntity: Food = foodMapper.toEntity(foodDto);

      expect(foodEntity).toBeInstanceOf(Food);
      expect(foodEntity.title).toBe(foodDto.title);
      expect(foodEntity.description).toBe(foodDto.description);
      expect(foodEntity.price).toBe(foodDto.price);
      expect(foodEntity.quantity).toBe(foodDto.quantity);
      expect(foodEntity.id).toBe(foodDto.id);
    });
  });

  describe('toDto', () => {
    it('should map Food entity to FoodDto', () => {
      const foodEntity: Food = new Food();
      foodEntity.title = 'Pizza';
      foodEntity.description = 'Delicious pizza';
      foodEntity.price = 12.99;
      foodEntity.quantity = 8;
      foodEntity.id = '2';

      const foodDto: FoodDto = foodMapper.toDto(foodEntity);

      expect(foodDto).toEqual({
        title: foodEntity.title,
        description: foodEntity.description,
        price: foodEntity.price,
        quantity: foodEntity.quantity,
        id: foodEntity.id,
      });
    });
  });
});

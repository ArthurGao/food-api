import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from '../entities/food.entity';
import FoodService from './food.service';
import { FoodMapper } from '../mapper/food.mapper';
import { FoodDto } from '../dto/food.dto';

describe('FoodService', () => {
  let service: FoodService;
  let repo: Repository<Food>;
  let mapper: FoodMapper;

  const testFoodEntity: Food = {
    title: 'title',
    description: 'desc',
    price: 1.0,
    quantity: 20,
    id: '1234',
  };

  const testFoodDto: FoodDto = {
    title: 'title',
    description: 'desc',
    price: 1.0,
    quantity: 20,
    id: '1234',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        {
          provide: getRepositoryToken(Food),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn().mockResolvedValue({
              testFoodEntity,
            }),
            find: jest.fn().mockResolvedValue([testFoodEntity]),
          },
        },
        FoodMapper,
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
    repo = module.get<Repository<Food>>(getRepositoryToken(Food));
    mapper = module.get<FoodMapper>(FoodMapper);
  });

  it('should get food by id', async () => {
    const id = '123';
    const food = {
      id,
      title: 'Apple',
      description: 'A red apple',
      price: 1.0,
      quantity: 10,
    };
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(food);
    expect(await service.getFoodItemById(id)).toEqual(food);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('should create food item', () => {
    const foodDto: FoodDto = {
      title: 'title',
      description: 'desc',
      price: 1.0,
      quantity: 20,
      id: '1234',
    };

    jest.spyOn(mapper, 'toEntity').mockReturnValueOnce(testFoodEntity);
    service.createFoodItem(foodDto);
    expect(mapper.toEntity).toHaveBeenCalledWith(foodDto);
    expect(repo.save).toHaveBeenCalledWith(testFoodEntity);
  });

  describe('getAllFoodItems', () => {
    it('should return an array of FoodDto objects', async () => {
      jest.spyOn(service['foodMapper'], 'toDto').mockReturnValue(testFoodDto);
      // Call the getAllFoodItems method and assert the returned value
      const result = await service.getAllFoodItems();
      expect(result).toEqual([testFoodDto]);
    });
  });
});

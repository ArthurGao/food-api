import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from '../entities/food.entity';
import FoodService from './food.service';
import { FoodMapper } from '../mapper/food.mapper';
import { FoodDto } from '../dto/food.dto';

describe('FoodService', () => {
  let service: FoodService;
  let repository: Repository<Food>;
  let mapper: FoodMapper;

  const testFoodEntity: Food = {
    title: 'title',
    description: 'desc',
    price: 1.0,
    quantity: 20,
    id: '1234',
    createdDate: new Date('2023-06-17T08:00:00Z'),
  };

  const testFoodDto: FoodDto = {
    title: 'title',
    description: 'desc',
    price: 1.0,
    quantity: 20,
    id: '1234',
    createdDate: new Date('2023-06-17T08:00:00Z'),
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
    repository = module.get<Repository<Food>>(getRepositoryToken(Food));
    mapper = module.get<FoodMapper>(FoodMapper);
  });

  describe('getAllFoodItems', () => {
    it('should get food by id', async () => {
      const id = '123';
      const food = {
        id,
        title: 'Apple',
        description: 'A red apple',
        price: 1.0,
        quantity: 10,
        createdDate: new Date('2023-06-17T08:00:00Z'),
      };
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(food);
      expect(await service.getFoodItemById(id)).toEqual(food);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
    it('should throw an error for invalid ID (null or empty)', async () => {
      // Arrange
      const invalidId: string = null;
      // Act & Assert
      await expect(service.getFoodItemById(invalidId)).rejects.toThrow(
        'Invalid ID. ID must be provided.',
      );
    });
  });
  describe('getAllFoodItems', () => {
    it('should create food item', () => {
      const foodDto: FoodDto = {
        title: 'title',
        description: 'desc',
        price: 1.0,
        quantity: 20,
        id: '1234',
        createdDate: new Date('2023-06-17T08:00:00Z'),
      };

      jest.spyOn(mapper, 'toEntity').mockReturnValueOnce(testFoodEntity);
      service.createFoodItem(foodDto);
      expect(mapper.toEntity).toHaveBeenCalledWith(foodDto);
      expect(repository.save).toHaveBeenCalledWith(testFoodEntity);
    });
    it('should throw an error for invalid food data (null foodDto)', async () => {
      // Arrange
      const foodDto: FoodDto = null;
      // Act & Assert
      await expect(service.createFoodItem(foodDto)).rejects.toThrow(
        'Invalid food data. FoodDto cannot be null.',
      );
    });
  });

  describe('getAllFoodItems', () => {
    it('should return an array of FoodDto objects', async () => {
      jest.spyOn(service['foodMapper'], 'toDto').mockReturnValue(testFoodDto);
      // Call the getAllFoodItems method and assert the returned value
      const result = await service.getAllFoodItems('createdDate', 'ASC');
      expect(result).toEqual([testFoodDto]);
    });

    it('should return an empty array if no food items are found', async () => {
      // Mock the foodRepository.find() method to return an empty array
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      // Call the getAllFoodItems method
      const result = await service.getAllFoodItems();

      // Check the returned result
      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    });

    it('should return an array of FoodDto sorted by createdDate in descending order', async () => {
      // Mock the foodRepository.find() method to return an array of Food entities
      const mockFoodEntities: Food[] = [
        {
          id: '1',
          title: 'Food 1',
          description: 'Description 1',
          price: 9.99,
          quantity: 10,
          createdDate: new Date('2022-01-01'),
        },
        {
          id: '2',
          title: 'Food 2',
          description: 'Description 2',
          price: 7.99,
          quantity: 5,
          createdDate: new Date('2022-02-01'),
        },
        {
          id: '3',
          title: 'Food 3',
          description: 'Description 3',
          price: 5.99,
          quantity: 3,
          createdDate: new Date('2022-03-01'),
        },
      ];
      jest.spyOn(repository, 'find').mockImplementation(async () => {
        // Sort the entities by createdDate in descending order
        return mockFoodEntities.sort(
          (a, b) => b.createdDate.getTime() - a.createdDate.getTime(),
        );
      });

      // Call the getAllFoodItems method with sortBy = 'createdDate' and sortOrder = 'DESC'
      const result = await service.getAllFoodItems('createdDate', 'DESC');
      // Check the returned result
      expect(result).toBeDefined();
      expect(result).toHaveLength(3);
      expect(result[0].id).toEqual('3');
      expect(result[1].id).toEqual('2');
      expect(result[2].id).toEqual('1');
    });

    it('should return an array of FoodDto sorted by price in ascending order', async () => {
      // Mock the foodRepository.find() method to return an array of Food entities
      const mockFoodEntities: Food[] = [
        {
          id: '1',
          title: 'Food 1',
          description: 'Description 1',
          price: 9.99,
          quantity: 10,
          createdDate: new Date('2022-01-01'),
        },
        {
          id: '2',
          title: 'Food 2',
          description: 'Description 2',
          price: 7.99,
          quantity: 5,
          createdDate: new Date('2022-02-01'),
        },
        {
          id: '3',
          title: 'Food 3',
          description: 'Description 3',
          price: 5.99,
          quantity: 3,
          createdDate: new Date('2022-03-01'),
        },
      ];
      jest.spyOn(repository, 'find').mockImplementation(async () => {
        // Sort the entities by createdDate in descending order
        return mockFoodEntities.sort(
          (a, b) => b.createdDate.getTime() - a.createdDate.getTime(),
        );
      });

      // Call the getAllFoodItems method with sortBy = 'price' and sortOrder = 'ASC'
      const result = await service.getAllFoodItems('price', 'ASC');

      // Check the returned result
      expect(result).toBeDefined();
      expect(result).toHaveLength(3);
      expect(result[0].id).toEqual('3');
      expect(result[1].id).toEqual('2');
      expect(result[2].id).toEqual('1');
    });
  });

  describe('buyFoodItem', () => {
    it('should throw an error if quantity is 0', async () => {
      const id = '1234';
      const quantity = 0;

      await expect(service.buyFoodItem(id, quantity)).rejects.toThrow(
        'Invalid quantity. Quantity must be greater than 0.',
      );
    });

    it('should throw an error if food item quantity is 0', async () => {
      const id = '1234';
      const quantity = 5;

      // Mock the getFoodItemById method to return a food item with quantity 0
      jest.spyOn(service, 'getFoodItemById').mockResolvedValueOnce({
        id: '1234',
        quantity: 0,
        price: 1.0,
        title: 'title',
        description: 'desc',
        createdDate: new Date('2023-06-17T08:00:00Z'),
      });

      await expect(service.buyFoodItem(id, quantity)).rejects.toThrow(
        'Food item is out of stock.',
      );
    });

    it('should reduce the quantity of the food item', async () => {
      const id = '1234';
      const quantity = 5;

      // Mock the getFoodItemById method to return a food item with quantity 10
      const foodItem = {
        id: '1234',
        quantity: 6,
        price: 1.0,
        title: 'title',
        description: 'desc',
        createdDate: new Date('2023-06-17T08:00:00Z'),
      };
      jest.spyOn(service, 'getFoodItemById').mockResolvedValueOnce(foodItem);

      // Mock the foodRepository.save method
      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(foodItem);

      await service.buyFoodItem(id, quantity);

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith({ ...foodItem, quantity: 1 });
    });
  });
  it('should throw an error when food item is not found', async () => {
    // Arrange
    const id = 'nonexistent-id';
    const quantity = 10;
    jest.spyOn(service, 'getFoodItemById').mockResolvedValue(null);
    // Act
    try {
      await service.buyFoodItem(id, quantity);
      fail('Expected an error to be thrown');
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Food item not found.');
    }
  });
});

import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { PostgreSqlContainer } from 'testcontainers';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { environment } from './../src/environments/environment';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const pg = await new PostgreSqlContainer('postgres')
      .withExposedPorts(5432)
      .withDatabase('postgres')
      .withUsername('postgres')
      .withPassword('mysecretpassword')
      .start();

    environment.dbPort = pg.getMappedPort(5432);
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should finish a whole life circle', async () => {
    const foodDto = {
      title: 'title',
      description: 'desc',
      price: 1.0,
      quantity: 20,
    };

    const response = await request(app.getHttpServer())
      .post('/food')
      .send(foodDto)
      .expect(HttpStatus.CREATED);

    const responseBody = response.body;
    expect(responseBody).toBeDefined();
    expect(responseBody.id).toBeDefined();

    const createdFoodId = responseBody.id;
    const getResponse = await request(app.getHttpServer())
      .get('/food/' + createdFoodId)
      .expect(HttpStatus.OK);
    const fetchedFood = getResponse.body;
    expect(fetchedFood.title).toEqual(foodDto.title);
    expect(fetchedFood.description).toEqual(foodDto.description);
    const expectedPrice =
      typeof foodDto.price === 'number'
        ? foodDto.price.toFixed(2)
        : foodDto.price;
    expect(fetchedFood.price).toEqual(expectedPrice);
    expect(fetchedFood.quantity).toEqual(foodDto.quantity);
    expect(fetchedFood.createdDate).toBeDefined();
    expect(fetchedFood.id).toBeDefined();

    const getAllResponse = await request(app.getHttpServer())
      .get('/food')
      .expect(HttpStatus.OK);
    const fetchedAllFood = getAllResponse.body;
    expect(fetchedAllFood.length).toEqual(1);

    const buyFood = {
      quantity: 10,
      action: 'buy',
    };
    await request(app.getHttpServer())
      .patch('/food/' + createdFoodId)
      .send(buyFood)
      .expect(HttpStatus.OK);

    const getAfterBuyingResponse = await request(app.getHttpServer())
      .get('/food/' + createdFoodId)
      .expect(HttpStatus.OK);
    const fetchedFoodAfterBuying = getAfterBuyingResponse.body;
    expect(fetchedFoodAfterBuying.quantity).toEqual(foodDto.quantity - 10);
  });
});

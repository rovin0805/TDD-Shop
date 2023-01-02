import { rest } from 'msw';

export const BASE_URL = 'http://localhost:5001';

const productHandler = rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
  return res(
    ctx.json([
      { name: 'America', imagePath: '/images/america/jpeg' },
      { name: 'England', imagePath: '/images/england/jpeg' },
    ])
  );
});

const optionsHandler = rest.get(`${BASE_URL}/options`, (req, res, ctx) => {
  return res(
    ctx.json([
      {
        name: 'Insurance',
      },
      {
        name: 'Dinner',
      },
    ])
  );
});

const completeHandler = rest.post(`${BASE_URL}/order`, (req, res, ctx) => {
  let dummyData = [{ orderNumber: 123123, price: 2000 }];
  return res(ctx.json(dummyData));
});

export const handlers = [productHandler, optionsHandler, completeHandler];

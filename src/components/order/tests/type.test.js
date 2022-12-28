import { render, screen } from '@testing-library/react';
import Type from '../type';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import { BASE_URL } from '../../../mocks/handlers';

test('서버에서 여행 상품 이미지를 가져온다.', async () => {
  render(<Type orderType='products' />);

  const productImages = await screen.findAllByRole('img', {
    name: /product$/i,
  });
  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt);
  expect(altText).toEqual(['America product', 'England product']);
});

test('서버에서 에러 발생 시 에러 문구를 표출한다.', async () => {
  server.resetHandlers(
    rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Type orderType='products' />);

  const errorBanner = await screen.findByTestId('error-banner');
  expect(errorBanner).toHaveTextContent('에러가 발생했습니다.');
});

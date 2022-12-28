import { render, screen } from '@testing-library/react';
import Type from '../type';

test('서버에서 여행 상품 이미지를 가져온다.', async () => {
  render(<Type orderType='products' />);

  const productImages = await screen.findAllByRole('img', {
    name: /product$/i,
  });
  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt);
  expect(altText).toEqual(['America product', 'England product']);
});

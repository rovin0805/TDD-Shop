import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderContextProvider } from '../../../contexts/orderContext';
import Type from '../type';

test('상품이 선택됐을 때 상품의 총 상품값이 바뀐다.', async () => {
  render(<Type orderType={'products'} />, { wrapper: OrderContextProvider });

  const productsTotal = screen.getByText('총 가격', { exact: false });
  expect(productsTotal).toHaveTextContent('0');

  const americaInput = await screen.findByRole('spinbutton', {
    name: 'America',
  });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, '1');
  expect(productsTotal).toHaveTextContent('1000');

  const englandInput = await screen.findByRole('spinbutton', {
    name: 'England',
  });
  userEvent.clear(englandInput);
  userEvent.type(englandInput, '3');
  expect(productsTotal).toHaveTextContent('4000');
});

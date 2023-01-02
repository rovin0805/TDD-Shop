import userEvent from '@testing-library/user-event';
import Order from '../../../pages/order';
import { render, screen } from '../../../utils/test-utils';
import Type from '../type';

test('상품이 선택됐을 때 상품의 총 상품값이 바뀐다.', async () => {
  render(<Type orderType={'products'} />);

  const productsTotal = screen.getByText('상품 총 가격', { exact: false });
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

test('옵션 체크 박스를 체크하면 옵션 총 가격을 업데이트 한다', async () => {
  render(<Type orderType={'options'} />);

  const optionsTotal = screen.getByText('옵션 총 가격', { exact: false });
  expect(optionsTotal).toHaveTextContent('0');

  const insuranceCheckbox = await screen.findByRole('checkbox', {
    name: 'Insurance',
  });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent('500');

  const dinnerCheckbox = await screen.findByRole('checkbox', {
    name: 'Dinner',
  });
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('1000');

  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('500');
});

describe('상품 가격과 옵션을 더한 총 가격', () => {
  test('total price starts with 0 and updating total price when adding one product', async () => {
    render(<Order />);

    const total = screen.getByText('Total Price', { exact: false });
    expect(total).toHaveTextContent('0');

    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1000');
  });

  test('updating total price when adding one option', async () => {
    render(<Order />);

    const total = screen.getByText('Total Price', { exact: false });

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });
    userEvent.click(insuranceCheckbox);

    expect(total).toHaveTextContent('500');
  });

  test('updating total price when removing option and product', async () => {
    render(<Order />);

    const total = screen.getByText('Total Price', { exact: false });

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });
    userEvent.click(insuranceCheckbox);

    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '3');

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1500');
  });
});

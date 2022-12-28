import { render, screen } from '@testing-library/react';
import Summary from '..';

test('주문 체크박스를 눌러야만 주문 확인 버튼을 누를 수 있다.', () => {
  render(<Summary />);
  const checkbox = screen.getByRole('checkbox', {
    name: '주문하려는 것을 확인하셨나요?',
  });
  expect(checkbox.checked).toBeFalsy();
  const confirmButton = screen.getByRole('button', {
    name: '주문 확인',
  });
  expect(confirmButton).toBeDisabled();
});

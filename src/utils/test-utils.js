import { render } from '@testing-library/react';
import { OrderContextProvider } from '../contexts/orderContext';

const customRender = (ui, options) =>
  render(ui, { wrapper: OrderContextProvider, ...options });

export * from '@testing-library/react';

export { customRender as render };

import { OrderContextProvider } from './contexts/orderContext';
import Order from './pages/order';

function App() {
  return (
    <div style={{ padding: '4rem' }}>
      <OrderContextProvider>
        <Order />
      </OrderContextProvider>
    </div>
  );
}

export default App;

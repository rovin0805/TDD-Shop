import { useState } from 'react';
import { OrderContextProvider } from './contexts/orderContext';
import Complete from './pages/complete';
import Order from './pages/order';
import Summary from './pages/summary';

function App() {
  const [step, setStep] = useState(0);

  return (
    <div style={{ padding: '4rem' }}>
      <OrderContextProvider>
        {step === 0 && <Order setStep={setStep} />}
        {step === 1 && <Summary setStep={setStep} />}
        {step === 2 && <Complete setStep={setStep} />}
      </OrderContextProvider>
    </div>
  );
}

export default App;

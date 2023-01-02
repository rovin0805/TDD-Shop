import React, { useContext, useState } from 'react';
import { OrderContext } from '../../contexts/orderContext';

const Summary = ({ setStep }) => {
  const [orderData] = useContext(OrderContext);
  const [checked, setChecked] = useState(false);

  const productArr = Array.from(orderData.products);

  const hasOptions = orderData.options.size > 0;
  let orderRender = null;
  if (hasOptions) {
    const optionsArr = Array.from(orderData.options.keys());
    orderRender = (
      <>
        <h2>옵션 : {orderData.totals.options}</h2>
        <ul>
          {optionsArr.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(2);
  };

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품 : {orderData.totals.products}</h2>
      <ul>
        {productArr.map(([key, value]) => (
          <li key={key}>
            {value} {key}
          </li>
        ))}
      </ul>
      {orderRender}
      <form>
        <input
          id='confirm-checkbox'
          type={'checkbox'}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor='confirm-checkbox'>주문하려는 것을 확인하셨나요?</label>
        <br />
        <button type='submit' disabled={!checked} onClick={handleSubmit}>
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default Summary;

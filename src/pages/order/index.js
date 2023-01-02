import React, { useContext } from 'react';
import Type from '../../components/order/type';
import { OrderContext } from '../../contexts/orderContext';

const Order = ({ setStep }) => {
  const [orderData] = useContext(OrderContext);

  return (
    <div>
      <h1>Travel Products</h1>
      <Type orderType={'products'} />
      <div style={{ display: 'flex', marginTop: 20 }}>
        <div style={{ width: '50%' }}>
          <Type orderType={'options'} />
        </div>
        <div>
          <h2>Total Price : {orderData.totals.total}</h2>
          <br />
          <button onClick={() => setStep(1)}>주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default Order;

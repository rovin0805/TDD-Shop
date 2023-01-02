import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ErrorBanner from '../../components/common/errorBanner';
import { OrderContext } from '../../contexts/orderContext';
import { BASE_URL } from '../../mocks/handlers';

const Complete = ({ setStep }) => {
  const [orderData] = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderCompleted();
  });

  const orderCompleted = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/order`, orderData);
      setOrderHistory(res.data);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner />;
  }
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>주문이 성공했습니다.</h2>
      <h3>지금까지의 모든 주문</h3>
      <br />
      <table style={{ margin: 'auto' }}>
        <tbody>
          <tr>
            <th>주문 번호</th>
            <th>주문 가격</th>
          </tr>
          {orderHistory.map((item) => (
            <tr key={item.orderNumber}>
              <td>{item.orderNumber}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setStep(0)}>첫 페이지로</button>
    </div>
  );
};

export default Complete;

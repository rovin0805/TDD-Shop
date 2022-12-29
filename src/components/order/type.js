import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../mocks/handlers';
import Products from './products';
import ErrorBanner from '../common/errorBanner';
import Options from './options';
import { OrderContext } from '../../contexts/orderContext';

const Type = ({ orderType }) => {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [orderData, updateItemCount] = useContext(OrderContext);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      const response = await axios(`${BASE_URL}/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setHasError(true);
    }
  };

  const ItemComponent = orderType === 'products' ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount({ itemName, newItemCount, orderType })
      }
    />
  ));

  if (hasError) {
    return <ErrorBanner />;
  }
  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>
        {orderType === 'products' ? '상품' : '옵션'} 총 가격:{' '}
        {orderData.totals[orderType]}
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: orderType === 'options' && 'column',
        }}
      >
        {optionItems}
      </div>
    </>
  );
};

export default Type;

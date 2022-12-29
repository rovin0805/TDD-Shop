import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../mocks/handlers';
import Products from './products';
import ErrorBanner from '../common/errorBanner';
import Options from './options';

const Type = ({ orderType }) => {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

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
    />
  ));

  if (hasError) {
    return <ErrorBanner />;
  }
  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격:</p>
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